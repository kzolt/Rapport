import { TRPCError } from '@trpc/server'
import { createTRPCRouter, privateProcedure } from '../trpc'

export const locationsRouter = createTRPCRouter({
    get_locations: privateProcedure.query(async ({ ctx }) => {
        const locations = (await ctx.user.privateMetadata.locations) as string[]

        if (!locations) {
            throw new TRPCError({ code: 'NOT_FOUND', message: 'No locations found' })
        }

        return locations
    }),
})
