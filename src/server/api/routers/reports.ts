import { and, eq } from 'drizzle-orm'
import { createTRPCRouter, protectedProcedure } from '../trpc'
import { z } from 'zod'
import { progress_report } from '~/server/db/schema'
import { createId } from '@paralleldrive/cuid2'
import type { JrActivity, ProgressReport } from '~/types/core'

export const reportsRouter = createTRPCRouter({
    get_reports: protectedProcedure
        .input(
            z.object({
                location_id: z.string().optional(),
            })
        )
        .query(async ({ input, ctx }) => {
            if (!input.location_id) {
                return null
            }

            return await ctx.db.query.progress_report.findMany({
                where: eq(progress_report.location_id, input.location_id),
                with: {
                    participant: true,
                },
            })
        }),

    get_report: protectedProcedure
        .input(
            z.object({
                id: z.string(),
            })
        )
        .query(async ({ ctx, input }) => {
            return await ctx.db.query.progress_report.findFirst({
                where: eq(progress_report.id, input.id),
                with: {
                    participant: true,
                },
            })
        }),

    set_report: protectedProcedure
        .input(
            z.object({
                participant_id: z.string(),
                location_id: z.string(),
                activities: z.array(z.string()),
                notes: z.string(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const prog_report = await ctx.db.query.progress_report.findFirst({
                where: and(
                    eq(progress_report.participant_id, input.participant_id),
                    eq(progress_report.location_id, input.location_id)
                ),
            })

            const new_report = {
                activities: input.activities as JrActivity[],
                date: new Date(),
                notes: input.notes,
            } satisfies ProgressReport

            if (!prog_report?.content) {
                await ctx.db.insert(progress_report).values({
                    id: createId(),
                    participant_id: input.participant_id,
                    location_id: input.location_id,
                    content: [new_report],
                })

                return
            }

            await ctx.db
                .update(progress_report)
                .set({
                    content: [...prog_report.content, new_report],
                })
                .where(eq(progress_report.id, prog_report.id))
        }),
})
