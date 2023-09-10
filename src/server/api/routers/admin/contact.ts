import { z } from "zod";
import { adminProcedure, createTRPCRouter, publicProcedure } from "../../trpc";
import { contactInputSchema } from "~/validation/cotactInput";

export const contactRouter = createTRPCRouter({
  getContacts: adminProcedure.query(async ({ ctx }) => {
    const contacts = await ctx.prisma.contact.findMany();
    return contacts;
  }),
  createContact: publicProcedure
    .input(contactInputSchema)
    .mutation(async ({ ctx, input }) => {
      const contact = await ctx.prisma.contact.create({
        data: {
          fullName: input.fullName,
          email: input.email,
          subject: input.subject,
          message: input.message,
        },
      });
      return contact;
    }),
  deleteContact: adminProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const contact = await ctx.prisma.contact.delete({
        where: {
          id: input.id,
        },
      });
      return contact;
    }),
});
