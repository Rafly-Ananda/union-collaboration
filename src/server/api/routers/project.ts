import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { ProjectValidator } from "@/server/validator/project";
import { projectResponseValidator } from "@/server/validator/index";
import { SERVER_CONFIG } from "@/server/_config/config";
import { genPresignedUrl } from "@/server/_utils/s3/main";

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

        const imageUrl = await genPresignedUrl(vRes.data.at(0)?.logo_url!);

        return {
          ...vRes.data.at(0),
          logo_url: imageUrl,
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

        const enrichedWithImg = await Promise.all(
          vRes.data.map(async (e) => {
            const imageUrl = await genPresignedUrl(e.logo_url);
            return { ...e, logo_url: imageUrl };
          }),
        );

        return {
          projects: [...enrichedWithImg],
          totalPage: r.data.projects.totalPage,
          total: r.data.projects.total,
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
        project: ProjectValidator,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { project } = input;
      const userExternalId = ctx.session.user.extras.id;

      const payload = {
        ...project,
        created_by: userExternalId,
      };

      try {
        const r = await (
          await fetch(`${SERVER_CONFIG.EXTERNAL_API_URL}/union/project`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...payload }),
          })
        ).json();
        return r;
      } catch (e) {
        if (e instanceof Error) {
          throw new Error(`Error on creating project/dao, ${e.message}`);
        }
        // Typescript Sheananigans
        throw new Error(`Unrecoverable error project/dao`);
      }
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
    .input(z.object({ project: ProjectValidator }))
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
});
