import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";

// Resume router
export const resumeRouter = createTRPCRouter({
  /**
   * Create resume
   * @access protected
   * @returns resume
   */
  createResume: protectedProcedure
    .input(z.object({ url: z.string() }))
    .mutation(({ ctx, input }) => {
      const resume = ctx.prisma.resume.create({
        data: {
          url: input.url,
          owner: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });
      return resume;
    }),
});
