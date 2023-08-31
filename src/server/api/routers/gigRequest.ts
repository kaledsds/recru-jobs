import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const gigRequestRouter = createTRPCRouter({
  // checkRequest: protectedProcedure
  //   .input(
  //     z.object({
  //       gigId: z.string({ required_error: "request id is required" }).cuid(),
  //       jobId: z.string({ required_error: "request id is required" }).cuid(),
  //     })
  //   )
  //   .query(async ({ ctx, input }) => {
  //     const recruter = await ctx.prisma.recruter.findFirst({
  //       where: {
  //         userId: ctx.session.user.id,
  //       },
  //       select: {
  //         id: true,
  //       },
  //     });
  //     if (!recruter) {
  //       throw new Error("recruter not found");
  //     }
  //     const gig = await ctx.prisma.gigRequest.findFirst({
  //       where: {
  //         AND: [
  //           { jobPostId: input.jobId },
  //           { recruterId: recruter.id },
  //           { gigPostId: input.gigId },
  //         ],
  //       },
  //     });
  //     if (!gig) {
  //       return true;
  //     }
  //     return false;
  //   }),
  getGigRequestByCandidate: protectedProcedure.query(async ({ ctx }) => {
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
    const gigRequests = await ctx.prisma.gigRequest.findMany({
      where: {
        gig: {
          candidateId: candidate.id,
        },
      },
      include: {
        gig: true,
        job: true,
        recruter: {
          include: {
            user: true,
          },
        },
      },
    });
    return { gigRequests };
  }),
  getRequestByRecruter: protectedProcedure.query(async ({ ctx }) => {
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
    const gigRequests = await ctx.prisma.gigRequest.findMany({
      where: {
        job: {
          recruterId: recruter.id,
        },
      },
      include: {
        gig: {
          include: {
            candidate: {
              include: {
                user: true,
              },
            },
          },
        },
        job: true,
      },
    });
    return { gigRequests };
  }),
  createGigRequest: protectedProcedure
    .input(
      z.object({
        gigId: z.string({ required_error: "job request id is required" }),
        jobId: z.string({ required_error: "job request id is required" }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const recruter = await ctx.prisma.recruter.findFirst({
        where: {
          userId: ctx.session.user.id,
        },
        select: {
          id: true,
        },
      });
      if (!recruter) {
        throw new Error("recruter not found");
      }

      const jobRequest = await ctx.prisma.gigRequest.create({
        data: {
          gigPostId: input.gigId,
          recruterId: recruter.id,
          jobPostId: input.jobId,
          status: "pending", // add status property with a default value
        },
      });
      if (!jobRequest) {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }
      return { jobRequest };
    }),
  editGigRequest: publicProcedure
    .input(
      z.object({
        id: z.string({ required_error: "job request id is required" }),
        status: z.enum(["pending", "accepted", "declined"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, status } = input;
      const gigRequest = await ctx.prisma.gigRequest.update({
        where: {
          id: id,
        },
        data: {
          status: status,
        },
      });
      return { gigRequest };
    }),
  deletGigRequest: protectedProcedure
    .input(
      z.object({
        id: z.string({ required_error: "request id is required" }).cuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const gigRequest = await ctx.prisma.gigRequest.findFirst({
        where: {
          id: input.id,
        },
        include: {
          recruter: true,
        },
      });
      if (!gigRequest) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      if (gigRequest.recruter.userId !== ctx.session.user.id) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }
      return await ctx.prisma.gigRequest.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
