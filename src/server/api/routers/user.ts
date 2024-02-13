import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { UserGuildResponseValidator } from "@/server/validator/index";
import { SERVER_CONFIG } from "@/server/_config/config";

export const userRouter = createTRPCRouter({
  getGuilds: protectedProcedure.query(async ({ ctx, input }) => {
    try {
      const r = await (
        await fetch(
          `${SERVER_CONFIG.EXTERNAL_API_URL}/user/user-guild?user_id=${ctx.session.user.extras.id}`,
        )
      ).json();
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
});
