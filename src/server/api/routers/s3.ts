import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { genPresignedUrl, uploadImage } from "@/server/_utils/s3/main";

export const S3Router = createTRPCRouter({
  genPresignedUrl: publicProcedure
    .input(z.object({ key: z.string() }))
    .query(async ({ input, ctx }) => {
      const { key } = input;
      const r = await genPresignedUrl(key);

      return r;
    }),

  createPresignedUrl: protectedProcedure
    .input(z.object({ fileName: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { fileName } = input;
      const { url, fields } = await uploadImage(fileName);

      return {
        url,
        fields,
      };
    }),
});
