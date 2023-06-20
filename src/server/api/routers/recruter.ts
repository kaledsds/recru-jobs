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
});
