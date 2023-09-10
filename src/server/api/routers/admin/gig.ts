import { z } from "zod";
import { adminProcedure, createTRPCRouter } from "../../trpc";

export const gigAdminRouter = createTRPCRouter({
  getGigs: adminProcedure
    .input(
      z.object({
        searchValue: z.string(),
        limit: z.number(),
        cursor: z.string().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { searchValue, limit, cursor } = input;
      const gigs = await ctx.prisma.gig.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        include: {
          candidate: {
            include: {
              user: true,
            },
          },
        },
        where: {
          OR: [
            {
              title: {
                contains: searchValue,
              },
            },
            {
              candidate: {
                fullName: { contains: searchValue },
              },
            },
          ],
        },
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (gigs.length > limit) {
        const nextGig = gigs.pop(); // return the last item from the array
        nextCursor = nextGig?.id;
      }
      return { gigs, nextCursor };
    }),
  deleteGig: adminProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      const gig = await ctx.prisma.gig.delete({
        where: {
          id: id,
        },
      });
      return { gig };
    }),
});
