import { RedirectToSignIn } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import { PlusIcon } from 'lucide-react'
import Link from 'next/link'

import { Button } from '~/components/ui/button'
import type { UserMetadata } from '~/types/core'

export default async function ReportsPage() {
    const current_user = await currentUser()

    if (!current_user) {
        return <RedirectToSignIn />
    }

    const metadata = current_user.privateMetadata as UserMetadata

    return (
        <div className="flex flex-col gap-5">
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold">Reports</h1>
                {metadata.role === 'admin' && (
                    <Button asChild>
                        <Link href="/dashboard/reports/create">
                            <PlusIcon className="mr-2 h-4 w-4" />
                            Create
                        </Link>
                    </Button>
                )}
            </div>
        </div>
    )
}
