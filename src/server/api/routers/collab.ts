import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { CollabInputValidator } from "@/server/validator/collab";
import {
  CollabRequestResponseValidator,
  SingleCollabReqResponseValidator,
} from "@/server/validator/index";
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

  getSingle: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ input }) => {
      const { projectId } = input;
      try {
        const r = await (
          await fetch(
            `${SERVER_CONFIG.EXTERNAL_API_URL}/union/collaboration-request?id=${projectId}`,
          )
        ).json();

        if (r.message !== "OK") {
          throw new TRPCError({
            message: "Failed fetching single collab request",
            code: "PARSE_ERROR",
          });
        }

        const vRes = SingleCollabReqResponseValidator.safeParse(
          r.data.collaborationRequests.at(0),
        );
        if (!vRes.success) {
          throw new TRPCError({
            message: "Failed z validating single collab request",
            code: "PARSE_ERROR",
            cause: vRes.error,
          });
        }

        return { ...vRes.data };
      } catch (e) {
        if (e instanceof Error) {
          throw new TRPCError({
            message: "Failed fetching single collab request",
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
            `${SERVER_CONFIG.EXTERNAL_API_URL}/union/collaboration-request?requested_by=${requestedBy}&limit=${limit}`,
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

  collabAddRole: protectedProcedure
    .input(
      z.object({
        wl_role: z.string(),
        wl_list: z.array(z.string()),
        collabReqId: z.string(),
        type: z.number(),
        targetServerDiscId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      // Type here specify if the role is for General Whitelist or Team Whielist
      const { wl_role, wl_list, collabReqId, type, targetServerDiscId } = input;

      const payload = {
        wl_role,
        wl_list,
        collaboration_request_id: collabReqId,
        type,
      };

      try {
        const r = await (
          await fetch(
            `${SERVER_CONFIG.EXTERNAL_API_URL}/union/discord-bot/server/${targetServerDiscId}/roles/whitelists`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ ...payload }),
            },
          )
        ).json();

        return r;
      } catch (e) {
        if (e instanceof Error) {
          throw new Error(`Error on adding role, ${e.message}`);
        }
        // Typescript Sheananigans
        throw new Error(`Unrecoverable error adding role`);
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

  updateStatus: protectedProcedure
    .input(z.object({ collabReqId: z.string(), status: z.number() }))
    .mutation(async ({ input }) => {
      const { collabReqId, status } = input;

      const payload = {
        status: status,
      };

      try {
        const r = await (
          await fetch(
            `${SERVER_CONFIG.EXTERNAL_API_URL}/union/collaboration-request/${collabReqId}/status`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ ...payload }),
            },
          )
        ).json();

        return r;
      } catch (e) {
        if (e instanceof Error) {
          throw new Error(`Error on updating collab status, ${e.message}`);
        }
        // Typescript Sheananigans
        throw new Error(`Unrecoverable updating collab status`);
      }
    }),
});
