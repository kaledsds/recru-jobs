import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const jobRequestRouter = createTRPCRouter({
  checkRequest: protectedProcedure
    .input(
      z.object({
        jobId: z.string({ required_error: "request id is required" }).cuid(),
      })
    )
    .query(async ({ ctx, input }) => {
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
      const job = await ctx.prisma.jobRequest.findFirst({
        where: {
          AND: [{ jobPostId: input.jobId }, { candidateId: candidate.id }],
        },
      });
      if (!job) {
        return true;
      }
      return false;
    }),
  getJobRequestByRecruter: protectedProcedure.query(async ({ ctx }) => {
    const recruter = await ctx.prisma.recruter.findFirst({
      where: {
        userId: ctx.session.user.id,
      },
      select: {
        id: true,
      },
    });
    if (!recruter) {
      throw new Error("Candidate not found");
    }
    const jobRequests = await ctx.prisma.jobRequest.findMany({
      where: {
        job: {
          recruterId: recruter.id,
        },
      },
      include: {
        candidate: {
          include: {
            user: true,
          },
        },
        job: true,
      },
    });
    return { jobRequests };
  }),
  getRequestByCandidate: protectedProcedure.query(async ({ ctx }) => {
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
    const jobRequests = await ctx.prisma.jobRequest.findMany({
      where: {
        candidateId: candidate.id,
      },
      include: {
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
    return { jobRequests };
  }),
  createJobRequest: protectedProcedure
    .input(
      z.object({
        id: z.string({ required_error: "job request id is required" }),
      })
    )
    .mutation(async ({ ctx, input }) => {
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
      const jobRequest = await ctx.prisma.jobRequest.create({
        data: {
          candidateId: candidate.id,
          jobPostId: input.id,
          status: "pending", // add status property with a default value
        },
      });
      if (!jobRequest) {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }
      return { jobRequest };
    }),
  editJobRequest: publicProcedure
    .input(
      z.object({
        id: z.string({ required_error: "job request id is required" }),
        status: z.enum(["pending", "accepted", "declined"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, status } = input;
      const jobRequest = await ctx.prisma.jobRequest.update({
        where: {
          id: id,
        },
        data: {
          status: status,
        },
      });
      return { jobRequest };
    }),
  deletJobRequest: protectedProcedure
    .input(
      z.object({
        id: z.string({ required_error: "request id is required" }).cuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      const jobRequest = await ctx.prisma.jobRequest.findFirst({
        where: {
          id,
        },
        include: {
          candidate: true,
        },
      });
      if (!jobRequest) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      if (jobRequest.candidate.userId !== ctx.session.user.id) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }
      return await ctx.prisma.jobRequest.delete({
        where: {
          id,
        },
      });
    }),
});
