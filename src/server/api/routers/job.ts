import { jobInputSchema } from "~/validation/job";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const jobRouter = createTRPCRouter({
  /**
   * Create job post
   * @access protected
   * @schema createJobSchema
   * @returns createJobPost
   *  */
  createJob: protectedProcedure
    .input(jobInputSchema)
    .mutation(async ({ input, ctx }) => {
      // Create job prisma orm
      const recruter = await ctx.prisma.recruter.findFirst({
        where: {
          userId: ctx.session.user.id,
        },
        select: {
          id: true,
        },
      });
      if (!recruter) {
        throw new Error("Recruter not found");
      }
      const createJobPost = await ctx.prisma.job.create({
        data: {
          recruterId: recruter.id,
          ...input,
        },
      });
      // Return createJobPost
      return createJobPost;
    }),
});
