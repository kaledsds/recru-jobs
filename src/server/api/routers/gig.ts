import { editGigInputSchema, gigInputSchema } from "~/validation/gig";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";

export const gigRouter = createTRPCRouter({
  getGigs: publicProcedure
    .input(
      z.object({
        searchValue: z.string(),
        serviceType: z.string(),
        category: z.string(),
        limit: z.number(),
        cursor: z.string().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { searchValue, serviceType, category, limit, cursor } = input;

      const jobs = await ctx.prisma.gig.findMany({
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
          AND: [
            {
              title: {
                contains: searchValue,
              },
            },
            {
              serviceType: {
                contains: serviceType,
              },
            },
            {
              category: {
                contains: category,
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
  // getgigs: publicProcedure.query(async ({ ctx }) => {
  //   const gigs = await ctx.prisma.gig.findMany({
  //     include: {
  //       candidate: {
  //         include: {
  //           user: true,
  //         },
  //       },
  //     },
  //   });
  //   return gigs;
  // }),
  createGig: protectedProcedure
    .input(gigInputSchema)
    .mutation(async ({ input, ctx }) => {
      // Create job prisma orm
      const candidate = await ctx.prisma.candidate.findFirst({
        where: {
          userId: ctx.session.user.id,
        },
        select: {
          id: true,
        },
      });
      if (!candidate) {
        throw new Error("Candidate not found");
      }
      const createGigPost = await ctx.prisma.gig.create({
        data: {
          candidateId: candidate.id,
          ...input,
        },
      });
      // Return createJobPost
      return createGigPost;
    }),
  editGigPost: protectedProcedure
    .input(editGigInputSchema)
    .mutation(async ({ input, ctx }) => {
      const { id, title, category, serviceType, salary } = input;
      const editGigPost = await ctx.prisma.gig.update({
        where: {
          id,
        },
        data: {
          title,
          category,
          serviceType,
          salary,
        },
      });
      return editGigPost;
    }),
  getGigByCondidate: protectedProcedure.query(async ({ ctx }) => {
    const gigs = await ctx.prisma.gig.findMany({
      include: {
        candidate: true,
      },
      where: {
        candidate: {
          userId: ctx.session.user.id,
        },
      },
    });
    return gigs;
  }),
  getGigById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      if (!input.id) {
        return null;
      }
      const gig = await ctx.prisma.gig.findFirst({
        where: {
          id: input.id,
        },
      });
      if (!gig) {
        throw new Error("Job not found");
      }
      return gig;
    }),
  deleteGig: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const gig = await ctx.prisma.gig.findFirst({
        where: {
          id: input.id,
          candidate: {
            userId: ctx.session.user.id,
          },
        },
      });
      if (!gig) {
        throw new Error("Job not found");
      }
      const deleteGig = await ctx.prisma.gig.delete({
        where: {
          id: input.id,
        },
      });
      return deleteGig;
    }),
});
