import { eq } from 'drizzle-orm'
import { createTRPCRouter, protectedProcedure } from '../trpc'
import { z } from 'zod'
import { progress_report } from '~/server/db/schema'

export const reportsRouter = createTRPCRouter({
    get_reports: protectedProcedure
        .input(
            z.object({
                location_id: z.string(),
            })
        )
        .query(async ({ input, ctx }) => {
            return await ctx.db.query.progress_report.findMany({
                where: eq(progress_report.location_id, input.location_id),
            })
        }),
})
