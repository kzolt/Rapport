import { location } from '~/server/db/schema'
import { adminProcedure, createTRPCRouter, protectedProcedure } from '../trpc'
import { z } from 'zod'

import { createId } from '@paralleldrive/cuid2'
import { clerkClient } from '@clerk/nextjs/server'

export const locationsRouter = createTRPCRouter({
    get_locations: protectedProcedure.query(async ({ ctx }) => {
        const metadata = ctx.user.privateMetadata as UserMetadata

        if (!metadata.locations) {
            return null
        }

        return metadata.locations
    }),

    set_location: adminProcedure
        .input(
            z.object({
                name: z.string(),
                company: z.string(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const clerk_client = await clerkClient()
            const metadata = ctx.user.privateMetadata as UserMetadata

            const location_id = createId()
            await ctx.db.insert(location).values({
                id: location_id,
                name: input.name,
                company: input.company,
            })

            const locations: LocationData[] = [
                ...(metadata.locations ?? []),
                {
                    id: location_id,
                    name: input.name,
                    company: input.company,
                },
            ]

            await clerk_client.users.updateUserMetadata(ctx.user.id, {
                privateMetadata: {
                    locations,
                },
            })
        }),
})
