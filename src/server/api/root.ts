import { locationsRouter } from '~/server/api/routers/locations'
import { participantsRouter } from '~/server/api/routers/participants'
import { reportsRouter } from '~/server/api/routers/reports'

import { createCallerFactory, createTRPCRouter } from '~/server/api/trpc'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    locations: locationsRouter,
    participants: participantsRouter,
    reports: reportsRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter)
