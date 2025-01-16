import { createId } from '@paralleldrive/cuid2'
import { adminProcedure, createTRPCRouter, protectedProcedure } from '../trpc'
import { z } from 'zod'
import { participant } from '~/server/db/schema'
import { eq } from 'drizzle-orm'
import type { Rank } from '~/types/core'

export const participantsRouter = createTRPCRouter({
    set_participant: adminProcedure
        .input(
            z.object({
                first_name: z.string(),
                last_name: z.string(),
                rank: z.string(),
                location_id: z.string(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            await ctx.db.insert(participant).values({
                id: createId(),
                first_name: input.first_name,
                last_name: input.last_name,
                rank: input.rank as Rank,
                location_id: input.location_id,
            })
        }),

    get_participants: protectedProcedure
        .input(
            z.object({
                location_id: z.string().nullable(),
            })
        )
        .query(async ({ input, ctx }) => {
            if (!input.location_id) {
                return null
            }

            return await ctx.db.query.participant.findMany({
                where: eq(participant.location_id, input.location_id),
            })
        }),
})
