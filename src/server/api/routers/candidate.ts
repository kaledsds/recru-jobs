import { profileInfoSchema } from "~/validation/candidate/profileInfo";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import {
  editCandidateResumeSchema,
  editCondidateInfoSchema,
  editCondidateSocialsSchema,
} from "~/validation/candidate";
import { z } from "zod";

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
  getCandidateProfile: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      // Get candidate
      const candidate = await ctx.prisma.candidate.findFirst({
        where: {
          userId: input.id,
        },
      });
      return candidate;
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
  /**
   * Edit candidate info
   * @access protected
   * @schema editCandidateInfoSchema
   * @returns candidate
   */
  editCondidateInfo: protectedProcedure
    .input(editCondidateInfoSchema)
    .mutation(({ ctx, input }) => {
      // Update candidate
      const candidate = ctx.prisma.candidate.update({
        where: {
          userId: ctx.session.user.id,
        },
        data: {
          ...input,
        },
      });
      return candidate;
    }),
  /**
   * Edit candidate socials
   * @access protected
   * @schema editCandidateSocialsSchema
   * @returns candidate
   */
  editCondidateSocials: protectedProcedure
    .input(editCondidateSocialsSchema)
    .mutation(({ ctx, input }) => {
      // Update candidate
      const candidate = ctx.prisma.candidate.update({
        where: {
          userId: ctx.session.user.id,
        },
        data: {
          ...input,
        },
      });
      return candidate;
    }),
  editCondidateResume: protectedProcedure
    .input(editCandidateResumeSchema)
    .mutation(({ ctx, input }) => {
      // Update candidate
      const candidate = ctx.prisma.candidate.update({
        where: {
          userId: ctx.session.user.id,
        },
        data: {
          ...input,
        },
      });
      return candidate;
    }),
  deleteCandidate: protectedProcedure.mutation(({ ctx }) => {
    // Delete candidate
    const candidate = ctx.prisma.candidate.delete({
      where: {
        userId: ctx.session.user.id,
      },
    });
    return candidate;
  }),
});
