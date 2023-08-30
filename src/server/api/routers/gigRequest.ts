import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
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
});
