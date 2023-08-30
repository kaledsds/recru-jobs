import { recruterRouter } from "~/server/api/routers/recruter";
import { createTRPCRouter } from "~/server/api/trpc";
import { candidateRouter } from "./routers/candidate";
import { jobRouter } from "./routers/job";
import { gigRouter } from "./routers/gig";
import { jobRequestRouter } from "./routers/jobRequest";
import { gigRequestRouter } from "./routers/gigRequest";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  recruter: recruterRouter,
  candidate: candidateRouter,
  job: jobRouter,
  gig: gigRouter,
  jobRequest: jobRequestRouter,
  gigRequest: gigRequestRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
