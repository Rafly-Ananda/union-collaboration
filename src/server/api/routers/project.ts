import { z } from "zod";
import { env } from "@/env";
import { TRPCError } from "@trpc/server";
import {
    createTRPCRouter,
    protectedProcedure,
} from "@/server/api/trpc";
import { ProjectValidator } from "@/server/validator/project";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { SERVER_CONFIG } from '@/server/_config/config'

export const projectRouter = createTRPCRouter({

    get: protectedProcedure
        .input(z.object({
            projectId: z.string(),
        }))
        .query(async ({ input }) => {
            const { projectId } = input;

            try {
                const r = await (await fetch(`${SERVER_CONFIG.EXTERNAL_API_URL}/union/project/?id=${projectId}`)).json()
                if (r.message !== 'OK') {
                    throw new TRPCError({ message: "Failed fetching project", code: "PARSE_ERROR" });
                }

                const vRes = ProjectValidator.safeParse(r.data.projects.at(0));
                if (!vRes.success) {
                    throw new TRPCError({ message: "Failed z validting project", code: "PARSE_ERROR", cause: vRes.error });
                }

                return {
                    ...vRes.data
                };
            } catch (e) {
                if (e instanceof Error) {
                    throw new TRPCError({ message: "Failed fetching all projects", code: "INTERNAL_SERVER_ERROR", cause: e.message });
                }

            }
        }),

    getAll: protectedProcedure
        .input(z.object({
            page: z.number(),
            pageSize: z.number(),
        }))
        .query(async ({ input }) => {
            const { page, pageSize } = input;

            try {
                const r = await (await fetch(`${SERVER_CONFIG.EXTERNAL_API_URL}/union/project?page=${page}&page_size=${pageSize}`)).json()
                if (r.message !== 'OK') {
                    throw new TRPCError({ message: "Failed fetching all projects", code: "PARSE_ERROR" });
                }

                const vRes = ProjectValidator.safeParse(r.data.projects.at(0));
                if (!vRes.success) {
                    throw new TRPCError({ message: "Failed z validting all projects", code: "PARSE_ERROR", cause: vRes.error });
                }

                return {
                    projects: [...r.data.projects],
                };
            } catch (e) {
                if (e instanceof Error) {
                    throw new TRPCError({ message: "Failed fetching all projects", code: "INTERNAL_SERVER_ERROR", cause: e.message });
                }

            }
        }),

    create: protectedProcedure
        .input(z.object({ userId: z.string(), logoFile: z.string(), details: ProjectValidator }))
        .mutation(async ({ ctx, input }) => {
            const { userId, logoFile, details } = input;
            const s3Client = ctx.s3.connector;

            const { url, fields } = await createPresignedPost(s3Client, {
                Bucket: ctx.s3.bucket_name,
                Key: input.logoFile,
                Conditions: [
                    { bucket: ctx.s3.bucket_name },
                    ["starts-with", "$Content-Type", "image/"],
                ],
                Expires: 600,
            });

            console.log("aa")

            // simulate a slow db call
            // await new Promise((resolve) => setTimeout(resolve, 1000));

            // return ctx.db.post.create({
            //     data: {
            //         name: input.name,
            //         createdBy: { connect: { id: ctx.session.user.id } },
            //     },
            // });
        }),

    getLatest: protectedProcedure.query(({ ctx }) => {
        return ctx.db.post.findFirst({
            orderBy: { createdAt: "desc" },
            where: { createdBy: { id: ctx.session.user.id } },
        });
    }),

    getSecretMessage: protectedProcedure.query(() => {
        return "you can now see this secret message!";
    }),
});
