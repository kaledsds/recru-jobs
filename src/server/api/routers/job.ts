import { jobInputSchema } from "~/validation/job";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";
import { editJobPostSchema } from "~/validation/job/editJobPost";

export const jobRouter = createTRPCRouter({
  getjobs: publicProcedure
    .input(
      z.object({
        searchValue: z.string(),
        jobType: z.string(),
        experience: z.string(),
        limit: z.number(),
        cursor: z.string().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { searchValue, jobType, experience, limit, cursor } = input;

      const jobs = await ctx.prisma.job.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        include: {
          recruter: true,
        },
        where: {
          AND: [
            {
              title: {
                contains: searchValue,
              },
            },
            jobType === "All" ? {} : { type: jobType },
            experience === "All" ? {} : { yearsOfExperience: experience },
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
  getJobsByCandidateRequest: protectedProcedure.query(async ({ ctx }) => {
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
    const jobs = await ctx.prisma.job.findMany({
      where: {
        jobRequest: {
          some: {
            candidateId: candidate.id,
          },
        },
      },
    });
    return { jobs };
  }),
  getjobsFordetails: publicProcedure
    .input(
      z.object({
        limit: z.number(),
        cursor: z.string().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { limit, cursor } = input;
      const jobs = await ctx.prisma.job.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        include: {
          recruter: true,
        },
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (jobs.length > limit) {
        const nextJob = jobs.pop(); // return the last item from the array
        nextCursor = nextJob?.id;
      }
      return { jobs, nextCursor };
    }),
  /**
   * Create job post
   * @access protected
   * @schema createJobSchema
   * @returns createJobPost
   *  */
  createJob: protectedProcedure
    .input(jobInputSchema)
    .mutation(async ({ input, ctx }) => {
      // Create job prisma orm
      const recruter = await ctx.prisma.recruter.findFirst({
        where: {
          userId: ctx.session.user.id,
        },
        select: {
          id: true,
        },
      });
      if (!recruter) {
        throw new Error("Recruter not found");
      }
      const createJobPost = await ctx.prisma.job.create({
        data: {
          recruterId: recruter.id,
          ...input,
        },
      });
      // Return createJobPost
      return createJobPost;
    }),
  /**
   * Edit job post
   * @access protected
   * @schema editJobPostSchema
   * @returns editJobPost
   * */
  editJobPost: protectedProcedure
    .input(editJobPostSchema)
    .mutation(async ({ input, ctx }) => {
      const {
        id,
        description,
        hoursofwork,
        location,
        salary,
        title,
        type,
        yearsOfExperience,
      } = input;
      const editJobPost = await ctx.prisma.job.update({
        where: {
          id,
        },
        data: {
          description,
          hoursofwork,
          location,
          salary,
          title,
          type,
          yearsOfExperience,
        },
      });
      return editJobPost;
    }),
  /**
   * Edit job post
   * @access protected
   * @schema editJobPostSchema
   * @returns editJobPost
   * */
  getJobByRecruter: protectedProcedure.query(async ({ ctx }) => {
    const jobs = await ctx.prisma.job.findMany({
      include: {
        recruter: true,
      },
      where: {
        recruter: {
          userId: ctx.session.user.id,
        },
      },
    });
    return jobs;
  }),
  getJobByRecruterId: protectedProcedure.query(async ({ ctx }) => {
    const jobs = await ctx.prisma.job.findMany({
      where: {
        recruter: {
          userId: ctx.session.user.id,
        },
      },
    });
    return jobs;
  }),
  getJobById: publicProcedure
    .input(
      z.object({
        id: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      if (!input.id) {
        return null;
      }
      const jobPost = await ctx.prisma.job.findFirst({
        where: {
          id: input.id,
        },
        include: {
          recruter: {
            include: {
              user: true,
            },
          },
        },
      });
      return jobPost;
    }),

  deleteJob: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const job = await ctx.prisma.job.findFirst({
        where: {
          id: input.id,
          recruter: {
            userId: ctx.session.user.id,
          },
        },
      });
      if (!job) {
        throw new Error("Job not found");
      }
      const deleteJob = await ctx.prisma.job.delete({
        where: {
          id: input.id,
        },
      });
      return deleteJob;
    }),
});
