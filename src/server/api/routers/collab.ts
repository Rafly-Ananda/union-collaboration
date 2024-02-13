import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { CollabInputValidator } from "@/server/validator/collab";
import { CollabRequestResponseValidator } from "@/server/validator/index";
import { SERVER_CONFIG } from "@/server/_config/config";

export const collabRouter = createTRPCRouter({
  getAllIncoming: protectedProcedure
    .input(z.object({ projectId: z.string(), limit: z.number().optional() }))
    .query(async ({ ctx, input }) => {
      const { projectId, limit } = input;
      try {
        const r = await (
          await fetch(
            `${SERVER_CONFIG.EXTERNAL_API_URL}/union/collaboration-request?project_id=${projectId}&limit=${limit}`,
          )
        ).json();

        if (r.message !== "OK") {
          throw new TRPCError({
            message: "Failed fetching all collab request",
            code: "PARSE_ERROR",
          });
        }

        const vRes = CollabRequestResponseValidator.safeParse(
          r.data.collaborationRequests,
        );
        if (!vRes.success) {
          throw new TRPCError({
            message: "Failed z validating all collab request",
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
            message: "Failed fetching all collab request",
            code: "INTERNAL_SERVER_ERROR",
            cause: e.message,
          });
        }
      }
    }),

  getAllSent: protectedProcedure
    .input(z.object({ requestedBy: z.string(), limit: z.number().optional() }))
    .query(async ({ ctx, input }) => {
      const { requestedBy, limit } = input;
      try {
        const r = await (
          await fetch(
            `${SERVER_CONFIG.EXTERNAL_API_URL}/union/collaboration-request?project_id=${requestedBy}&limit=${limit}`,
          )
        ).json();

        if (r.message !== "OK") {
          throw new TRPCError({
            message: "Failed fetching all collab request",
            code: "PARSE_ERROR",
          });
        }

        const vRes = CollabRequestResponseValidator.safeParse(
          r.data.collaborationRequests,
        );
        if (!vRes.success) {
          throw new TRPCError({
            message: "Failed z validating all collab request",
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
            message: "Failed fetching all collab request",
            code: "INTERNAL_SERVER_ERROR",
            cause: e.message,
          });
        }
      }
    }),

  create: protectedProcedure
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
