import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { profileInfoSchema } from "~/validation/recruter/profileInfo";

// Recruter router
export const recruterRouter = createTRPCRouter({
  /**
   * Create recruter
   * @access protected
   * @schema profileInfoSchema
   * @returns recruter
   */
  createRecruter: protectedProcedure
    .input(profileInfoSchema)
    .mutation(({ input, ctx }) => {
      // Create recruter prisma orm
      const recruter = ctx.prisma.recruter.create({
        data: {
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
          ...input,
        },
      });
      // Return recruter
      return recruter;
    }),
  /**
   * Check recruter
   * @access protected
   * @returns boolean
   */
  checkRecruter: protectedProcedure.query(async ({ ctx }) => {
    // Check if recruter exists
    const recruter = await ctx.prisma.recruter.findFirst({
      where: {
        userId: ctx.session.user.id,
      },
    });
    // Return true if recruter exists
    if (recruter) {
      return true;
    }
    return false;
  }),
  /**
   * Get user recruter
   * @access protected
   * @returns recruter
   */
  getUserRecruter: protectedProcedure.query(async ({ ctx }) => {
    // Get recruter
    const recruter = await ctx.prisma.recruter.findFirst({
      where: {
        userId: ctx.session.user.id,
      },
    });
    // Return recruter
    return recruter;
  }),
});
