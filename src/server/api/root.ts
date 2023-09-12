import { recruterRouter } from "~/server/api/routers/recruter";
import { createTRPCRouter } from "~/server/api/trpc";
import { candidateRouter } from "./routers/candidate";
import { jobRouter } from "./routers/job";
import { gigRouter } from "./routers/gig";
import { jobRequestRouter } from "./routers/jobRequest";
import { gigRequestRouter } from "./routers/gigRequest";
import { userAdminRouter } from "./routers/admin/user";
import { recruiterAdminRouter } from "./routers/admin/recruiter";
import { candidateAdminRouter } from "./routers/admin/candidate";
import { jobAdminRouter } from "./routers/admin/job";
import { gigAdminRouter } from "./routers/admin/gig";
import { contactRouter } from "./routers/admin/contact";
import { reportRouter } from "./routers/admin/report";

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
  userAdmin: userAdminRouter,
  recruiterAdmin: recruiterAdminRouter,
  candidateAdmin: candidateAdminRouter,
  jobAdmin: jobAdminRouter,
  gigAdmin: gigAdminRouter,
  contact: contactRouter,
  report: reportRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
