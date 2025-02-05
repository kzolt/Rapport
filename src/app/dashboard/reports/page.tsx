import { RedirectToSignIn } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import { PlusIcon } from 'lucide-react'
import Link from 'next/link'

import { Button } from '~/components/ui/button'
import ReportsTable from './table'

export default async function ReportsPage() {
    const current_user = await currentUser()

    if (!current_user) {
        return <RedirectToSignIn />
    }

    return (
        <div className="flex flex-col flex-1 gap-5">
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold">Reports</h1>
                <Button asChild>
                    <Link href="/dashboard/reports/create">
                        <PlusIcon className="mr-2 h-4 w-4" />
                        Create
                    </Link>
                </Button>
            </div>

            <ReportsTable />
        </div>
    )
}
