import { recruterRouter } from "~/server/api/routers/recruter";
import { createTRPCRouter } from "~/server/api/trpc";
import { candidateRouter } from "./routers/candidate";
import { resumeRouter } from "./routers/resume";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  recruter: recruterRouter,
  candidate: candidateRouter,
  resume: resumeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
