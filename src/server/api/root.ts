import { createTRPCRouter } from "@/server/api/trpc";

import { projectRouter } from "./routers/project";
import { userRouter } from "./routers/user";
import { collabRouter } from "./routers/collab";
import { S3Router } from "./routers/s3";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  project: projectRouter,
  user: userRouter,
  collab: collabRouter,
  s3: S3Router,
});

// export type definition of API
export type AppRouter = typeof appRouter;
