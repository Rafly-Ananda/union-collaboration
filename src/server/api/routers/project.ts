import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  DaoInputValidator,
  ProjectValidator,
  CollabInputValidator,
} from "@/server/validator/project";
import { projectResponseValidator } from "@/server/validator/index";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { SERVER_CONFIG } from "@/server/_config/config";

export const projectRouter = createTRPCRouter({
  get: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { projectId } = input;

      try {
        const r = await (
          await fetch(
            `${SERVER_CONFIG.EXTERNAL_API_URL}/union/project?id=${projectId}`,
          )
        ).json();
        if (r.message !== "OK") {
          throw new TRPCError({
            message: "Failed fetching project",
            code: "PARSE_ERROR",
          });
        }

        const vRes = projectResponseValidator.safeParse(
          r.data.projects.results,
        );
        if (!vRes.success) {
          throw new TRPCError({
            message: "Failed z validating project",
            code: "PARSE_ERROR",
            cause: vRes.error,
          });
        }

        return {
          ...vRes.data.at(0),
        };
      } catch (e) {
        if (e instanceof Error) {
          throw new TRPCError({
            message: "Failed fetching projects",
            code: "INTERNAL_SERVER_ERROR",
            cause: e.message,
          });
        }
      }
    }),

  getAll: protectedProcedure
    .input(
      z.object({
        page: z.number(),
        pageSize: z.number(),
        externalUserId: z.string().optional(),
      }),
    )
    .query(async ({ input }) => {
      const { page, pageSize, externalUserId } = input;

      let fetchUrl = `${SERVER_CONFIG.EXTERNAL_API_URL}/union/project?page=${page}&page_size=${pageSize}`;

      fetchUrl = externalUserId
        ? `${fetchUrl}&created_by=${externalUserId}`
        : fetchUrl;

      try {
        const r = await (await fetch(`${fetchUrl}`)).json();
        if (r.message !== "OK") {
          throw new TRPCError({
            message: "Failed fetching all projects",
            code: "PARSE_ERROR",
          });
        }

        const vRes = projectResponseValidator.safeParse(
          r.data.projects.results,
        );
        if (!vRes.success) {
          throw new TRPCError({
            message: "Failed z validating all projects",
            code: "PARSE_ERROR",
            cause: vRes.error,
          });
        }

        return {
          projects: [...vRes.data],
        };
      } catch (e) {
        if (e instanceof Error) {
          throw new TRPCError({
            message: "Failed fetching all projects",
            code: "INTERNAL_SERVER_ERROR",
            cause: e.message,
          });
        }
      }
    }),

  create: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        logoFile: z.string(),
        details: ProjectValidator,
      }),
    )
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

      // simulate a slow db call
      // await new Promise((resolve) => setTimeout(resolve, 1000));

      // return ctx.db.post.create({
      //     data: {
      //         name: input.name,
      //         createdBy: { connect: { id: ctx.session.user.id } },
      //     },
      // });
    }),

  editProjectStatus: protectedProcedure
    .input(z.object({ projectId: z.string(), status: z.string() }))
    .mutation(async ({ input }) => {
      const { projectId, status } = input;

      try {
        const r = await (
          await fetch(
            `${SERVER_CONFIG.EXTERNAL_API_URL}/union/project/${projectId}/status`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ status }),
            },
          )
        ).json();

        return r;
      } catch (e) {
        if (e instanceof Error) {
          throw new Error(`Error on update project status, ${e.message}`);
        }
        // Typescript Sheananigans
        throw new Error(`Unrecoverable error updating project status`);
      }
    }),

  editProject: protectedProcedure
    .input(z.object({ project: DaoInputValidator }))
    .mutation(async ({ input }) => {
      const { project } = input;

      try {
        const r = await (
          await fetch(
            `${SERVER_CONFIG.EXTERNAL_API_URL}/union/project/${project.id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ ...project }),
            },
          )
        ).json();

        return r;
      } catch (e) {
        if (e instanceof Error) {
          throw new Error(`Error on update project , ${e.message}`);
        }
        // Typescript Sheananigans
        throw new Error(`Unrecoverable error updating project`);
      }
    }),

  createCollab: protectedProcedure
    .input(z.object({ collabReq: CollabInputValidator }))
    .mutation(async ({ input }) => {
      const { collabReq } = input;

      try {
        const r = await (
          await fetch(
            `${SERVER_CONFIG.EXTERNAL_API_URL}/union/collaboration-request`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ ...collabReq }),
            },
          )
        ).json();

        console.log(r)

        return r;
      } catch (e) {
        if (e instanceof Error) {
          throw new Error(`Error on creating collab , ${e.message}`);
        }
        // Typescript Sheananigans
        throw new Error(`Unrecoverable error creating collab`);
      }
    }),
});
