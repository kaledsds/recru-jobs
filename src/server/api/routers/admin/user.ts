import { z } from "zod";
import { adminProcedure, createTRPCRouter } from "../../trpc";

export const userAdminRouter = createTRPCRouter({
  getUsers: adminProcedure
    .input(
      z.object({
        searchValue: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { searchValue } = input;
      const users = await ctx.prisma.user.findMany({
        where: {
          AND: [
            {
              role: "USER",
            },
            {
              // name: {
              //   contains: searchValue,
              // }

              OR: [
                {
                  name: {
                    contains: searchValue,
                  },
                },
                {
                  recruter: {
                    OR: [
                      {
                        fullName: {
                          contains: searchValue,
                        },
                      },
                      {
                        orgName: {
                          contains: searchValue,
                        },
                      },
                    ],
                  },
                },
                {
                  candidate: {
                    fullName: searchValue,
                  },
                },
              ],
            },
          ],
        },
        include: {
          candidate: true,
          recruter: true,
        },
      });
      return users;
    }),

  deleteUser: adminProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId } = input;
      const user = await ctx.prisma.user.delete({
        where: {
          id: userId,
        },
      });
      return user;
    }),
});
