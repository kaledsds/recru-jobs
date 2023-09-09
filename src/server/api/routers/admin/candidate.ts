import { z } from "zod";
import { adminProcedure, createTRPCRouter } from "../../trpc";

export const candidateAdminRouter = createTRPCRouter({
  getCandidateProfile: adminProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      // Get candidate
      const candidate = await ctx.prisma.candidate.findFirst({
        where: {
          id: input.id,
        },
      });
      return candidate;
    }),
  deleteCandidate: adminProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Delete candidate
      const candidate = await ctx.prisma.candidate.delete({
        where: {
          id: input.id,
        },
      });
      // Return candidate
      return candidate;
    }),
});
