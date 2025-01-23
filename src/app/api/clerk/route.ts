import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { clerkClient, type WebhookEvent } from '@clerk/nextjs/server'

import { type NextRequest } from 'next/server'
import { env } from '~/env'
import { type UserMetadata } from '~/types/core'

export async function POST(req: NextRequest) {
    // Create new svix instance with secret
    const wh = new Webhook(env.CLERK_WEBHOOK_SECRET_KEY)

    // Get headers
    const headerPayload = await headers()
    const svix_id = headerPayload.get('svix-id')
    const svix_timestamp = headerPayload.get('svix-timestamp')
    const svix_signature = headerPayload.get('svix-signature')

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error occured', { status: 400 })
    }

    // Get body
    const payload = (await req.json()) as unknown
    const body = JSON.stringify(payload)

    let event: WebhookEvent
    try {
        event = wh.verify(body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        }) as WebhookEvent
    } catch (err) {
        console.log(err)
        return new Response('Error occured', { status: 400 })
    }

    const clerk_client = await clerkClient()

    switch (event.type) {
        case 'user.created':
            {
                const data = event.data
                await clerk_client.users.updateUserMetadata(data.id, {
                    privateMetadata: {
                        role: 'staff',
                        locations: [],
                    } as UserMetadata,
                })
            }
            break
    }

    return new Response('Success', { status: 200 })
}
