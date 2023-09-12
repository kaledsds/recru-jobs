import { z } from "zod";
import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "../../trpc";
import { reportInputSchema } from "~/validation/reportInput";

export const reportRouter = createTRPCRouter({
  getReports: adminProcedure.query(async ({ ctx }) => {
    const reports = await ctx.prisma.signal.findMany({
      include: {
        user: true,
        recruter: true,
        gig: {
          include: {
            candidate: {
              include: {
                user: true,
              },
            },
          },
        },
        candidate: true,
        job: {
          include: {
            recruter: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });
    return { reports };
  }),
  createGigReport: protectedProcedure
    .input(reportInputSchema)
    .mutation(async ({ ctx, input }) => {
      const report = await ctx.prisma.signal.create({
        data: {
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
          gig: {
            connect: {
              id: input.id,
            },
          },
          recruter: {},
          candidate: {},
          job: {},
          reason: input.reason,
        },
      });
      return report;
    }),
  createCandidateReport: protectedProcedure
    .input(reportInputSchema)
    .mutation(async ({ ctx, input }) => {
      const report = await ctx.prisma.signal.create({
        data: {
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
          candidate: {
            connect: {
              id: input.id,
            },
          },
          recruter: {},
          gig: {},
          job: {},
          reason: input.reason,
        },
      });
      return report;
    }),
  createJobReport: protectedProcedure
    .input(reportInputSchema)
    .mutation(async ({ ctx, input }) => {
      const report = await ctx.prisma.signal.create({
        data: {
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
          job: {
            connect: {
              id: input.id,
            },
          },
          recruter: {},
          gig: {},
          candidate: {},
          reason: input.reason,
        },
      });
      return report;
    }),
  createRecruiterReport: protectedProcedure
    .input(reportInputSchema)
    .mutation(async ({ ctx, input }) => {
      const report = await ctx.prisma.signal.create({
        data: {
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
          recruter: {
            connect: {
              id: input.id,
            },
          },
          job: {},
          gig: {},
          candidate: {},
          reason: input.reason,
        },
      });
      return report;
    }),
  deleteReport: adminProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const report = await ctx.prisma.signal.delete({
        where: {
          id: input.id,
        },
      });
      return report;
    }),
});
