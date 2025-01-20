import { RedirectToSignIn } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import { PlusIcon } from 'lucide-react'
import Link from 'next/link'

import { Button } from '~/components/ui/button'
import { ParticipantsTable } from './table'
import type { UserMetadata } from '~/types/core'

export default async function ParticipantsPage() {
    const current_user = await currentUser()

    if (!current_user) {
        return <RedirectToSignIn />
    }

    const metadata = current_user?.privateMetadata as UserMetadata

    return (
        <div className="container mx-auto flex w-full flex-col gap-4">
            <div className="flex w-full justify-between">
                <h1 className="text-2xl font-bold">Participants</h1>
                {metadata.role === 'admin' && (
                    <Button asChild>
                        <Link href="/dashboard/participants/create">
                            <PlusIcon className="mr-2 h-4 w-4" />
                            Create
                        </Link>
                    </Button>
                )}
            </div>

            <ParticipantsTable />
        </div>
    )
}
