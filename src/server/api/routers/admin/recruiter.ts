import { z } from "zod";
import { adminProcedure, createTRPCRouter } from "../../trpc";

export const recruiterAdminRouter = createTRPCRouter({
  getRecruterProfile: adminProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      // Get recruter
      const recruter = await ctx.prisma.recruter.findFirst({
        where: {
          id: input.id,
        },
      });
      // Return recruter
      return recruter;
    }),
  deleteRecruiter: adminProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Delete recruter
      const recruter = await ctx.prisma.recruter.delete({
        where: {
          id: input.id,
        },
      });
      // Return recruter
      return recruter;
    }),
});
