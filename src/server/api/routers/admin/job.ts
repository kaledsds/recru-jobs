import { z } from "zod";
import { adminProcedure, createTRPCRouter } from "../../trpc";

export const jobAdminRouter = createTRPCRouter({
  getjobs: adminProcedure
    .input(
      z.object({
        searchValue: z.string(),
        limit: z.number(),
        cursor: z.string().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { searchValue, limit, cursor } = input;

      const jobs = await ctx.prisma.job.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        include: {
          recruter: {
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
              recruter: {
                OR: [
                  {
                    orgName: {
                      contains: searchValue,
                    },
                  },
                  {
                    fullName: {
                      contains: searchValue,
                    },
                  },
                ],
              },
            },
          ],
        },
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (jobs.length > limit) {
        const nextJob = jobs.pop(); // return the last item from the array
        nextCursor = nextJob?.id;
      }
      return { jobs, nextCursor };
    }),
  deletejob: adminProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      await ctx.prisma.job.delete({
        where: {
          id,
        },
      });
      return true;
    }),
});
