import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import {
  editRecruiterInfoSchema,
  editRecruiterSocialsSchema,
} from "~/validation/recruter";
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
  /**
   * edit recruiter
   * @access protected
   * @schema profileInfoSchema
   * @returns recruter
   */
  editRecruiterInfo: protectedProcedure
    .input(editRecruiterInfoSchema)
    .mutation(async ({ input, ctx }) => {
      // Get recruter
      const recruter = await ctx.prisma.recruter.update({
        where: {
          userId: ctx.session.user.id,
        },
        data: {
          ...input,
        },
      });
      // Return updated recruter
      return recruter;
    }),
  editRecruiterSocials: protectedProcedure
    .input(editRecruiterSocialsSchema)
    .mutation(async ({ input, ctx }) => {
      // Get recruter
      const recruter = await ctx.prisma.recruter.update({
        where: {
          userId: ctx.session.user.id,
        },
        data: {
          ...input,
        },
      });
      // Return updated recruter
      return recruter;
    }),
});
