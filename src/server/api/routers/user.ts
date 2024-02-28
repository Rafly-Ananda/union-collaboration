import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  UserGuildResponseValidator,
  VerifiedLinksResponseValidator,
  DiscordGuildRolesResponseValidator,
} from "@/server/validator/index";
import type {
  UserOwnDiscordGuild,
  DiscordGuildRoles,
  VerifiedLinks,
} from "@/server/validator/index";
import { SERVER_CONFIG } from "@/server/_config/config";

interface IUserData {
  user: UserOwnDiscordGuild[] | DiscordGuildRoles[];
  verifiedLinks: VerifiedLinks[];
}

interface ISingleVerifiedLink {
  verifiedLinks: {
    results: VerifiedLinks;
  };
}

interface fetchResponse<T> {
  message: string;
  data: T;
}

export const userRouter = createTRPCRouter({
  getGuilds: protectedProcedure.query(async ({ ctx, input }) => {
    try {
      const r = (await (
        await fetch(
          `${SERVER_CONFIG.EXTERNAL_API_URL}/user/user-guild?user_id=${ctx.session.user.extras.id}`,
        )
      ).json()) as fetchResponse<IUserData>;
      if (r.message !== "OK") {
        throw new TRPCError({
          message: "Failed fetching user guilds",
          code: "PARSE_ERROR",
        });
      }

      const vRes = UserGuildResponseValidator.safeParse(r.data.user);
      if (!vRes.success) {
        throw new TRPCError({
          message: "Failed z validating user guilds",
          code: "PARSE_ERROR",
          cause: vRes.error,
        });
      }

      return [...vRes.data];
    } catch (e) {
      if (e instanceof Error) {
        throw new TRPCError({
          message: "Failed fetching user guilds",
          code: "INTERNAL_SERVER_ERROR",
          cause: e.message,
        });
      }
    }
  }),

  getGuildsRoles: protectedProcedure
    .input(z.object({ guild_discord_id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { guild_discord_id } = input;
      try {
        const r = (await (
          await fetch(
            `${SERVER_CONFIG.EXTERNAL_API_URL}/union/discord-bot/server/${guild_discord_id}/roles`,
          )
        ).json()) as fetchResponse<IUserData>;
        if (r.message !== "OK") {
          throw new TRPCError({
            message: "Failed fetching guild roles",
            code: "PARSE_ERROR",
          });
        }

        const vRes = DiscordGuildRolesResponseValidator.safeParse(r.data);
        if (!vRes.success) {
          throw new TRPCError({
            message: "Failed z validating guild roles",
            code: "PARSE_ERROR",
            cause: vRes.error,
          });
        }

        return {
          ...vRes.data,
        };
      } catch (e) {
        if (e instanceof Error) {
          throw new TRPCError({
            message: "Failed fetching guild roles",
            code: "INTERNAL_SERVER_ERROR",
            cause: e.message,
          });
        }
      }
    }),

  getAllVerReqLinks: protectedProcedure
    .input(
      z.object({
        page: z.number(),
        pageSize: z.number(),
        externalUserId: z.string().optional(),
      }),
    )
    .query(async ({ input }) => {
      const { page, pageSize, externalUserId } = input;

      try {
        const r = (await (
          await fetch(
            `${SERVER_CONFIG.EXTERNAL_API_URL}/user/${externalUserId}/verified-links?page=${page}&page_size=${pageSize}`,
          )
        ).json()) as fetchResponse<IUserData>;

        if (r.message !== "OK") {
          throw new TRPCError({
            message: "Failed fetching all verified links",
            code: "PARSE_ERROR",
          });
        }

        const vRes = VerifiedLinksResponseValidator.safeParse(
          r.data.verifiedLinks,
        );

        if (!vRes.success) {
          throw new TRPCError({
            message: "Failed z validating all verified links",
            code: "PARSE_ERROR",
            cause: vRes.error,
          });
        }

        return {
          data: [...vRes.data],
          // totalPage: r.data.verifiedLinks.totalPage,
          // total: r.data.verifiedLinks.total,
        };
      } catch (e) {
        if (e instanceof Error) {
          throw new TRPCError({
            message: "Failed fetching all verified links",
            code: "INTERNAL_SERVER_ERROR",
            cause: e.message,
          });
        }
      }
    }),

  getSingleVerifiedLink: protectedProcedure
    .input(
      z.object({
        url: z.string().optional(),
        externalUserId: z.string().optional(),
      }),
    )
    .query(async ({ input }) => {
      const { url } = input;

      try {
        const r = (await (
          await fetch(
            `${SERVER_CONFIG.EXTERNAL_API_URL}/user/verified-links/${url}`,
          )
        ).json()) as fetchResponse<ISingleVerifiedLink>;

        console.log(r);

        if (r.message !== "OK") {
          throw new TRPCError({
            message: "Failed fetching single verified links",
            code: "PARSE_ERROR",
          });
        }

        if (r.data.verifiedLinks === null) return null;

        const vRes = VerifiedLinksResponseValidator.safeParse(
          r.data.verifiedLinks,
        );

        if (!vRes.success) {
          throw new TRPCError({
            message: "Failed z validating single verified links",
            code: "PARSE_ERROR",
            cause: vRes.error,
          });
        }

        return {
          data: [...vRes.data],
          // totalPage: r.data.verifiedLinks.totalPage,
          // total: r.data.verifiedLinks.total,
        };
      } catch (e) {
        console.log("err occ");
        console.log(e);
        if (e instanceof Error) {
          throw new TRPCError({
            message: "Failed fetching single verified links",
            code: "INTERNAL_SERVER_ERROR",
            cause: e.message,
          });
        }
      }
    }),

  createVerifiedLink: protectedProcedure
    .input(
      z.object({
        url: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { url } = input;
      const externalUserId = ctx.session.user.extras.id;

      const payload = { url, created_by: externalUserId };

      try {
        const r = (await (
          await fetch(`${SERVER_CONFIG.EXTERNAL_API_URL}/user/verified-links`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...payload }),
          })
        ).json()) as unknown;

        return r;
      } catch (e) {
        if (e instanceof Error) {
          throw new TRPCError({
            message: "Failed creating verified link",
            code: "INTERNAL_SERVER_ERROR",
            cause: e.message,
          });
        }
      }
    }),
});
