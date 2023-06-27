import { profileInfoSchema } from "~/validation/candidate/profileInfo";
import { createTRPCRouter, protectedProcedure } from "../trpc";

// Candidate router
export const candidateRouter = createTRPCRouter({
  /**
   * Create candidate
   * @access protected
   * @schema profileInfoSchema
   * @returns candidate
   */
  createCandidate: protectedProcedure
    .input(profileInfoSchema)
    .mutation(({ input, ctx }) => {
      // Create candidate prisma orm
      const candidate = ctx.prisma.candidate.create({
        data: {
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
          ...input,
        },
      });
      // Return candidate
      return candidate;
    }),
  /**
   * Check candidate
   * @access protected
   * @returns boolean
   */
  checkCandidate: protectedProcedure.query(async ({ ctx }) => {
    // Check if candidate exists
    const candidate = await ctx.prisma.candidate.findFirst({
      where: {
        userId: ctx.session.user.id,
      },
    });
    // Return true if candidate exists
    if (candidate) {
      return true;
    }
    return false;
  }),
  /**
   * Get user candidate
   * @access protected
   * @returns candidate
   */
  getUserCandidate: protectedProcedure.query(async ({ ctx }) => {
    // Get candidate
    const candidate = await ctx.prisma.candidate.findFirst({
      where: {
        userId: ctx.session.user.id,
      },
    });
    return candidate;
  }),
});
