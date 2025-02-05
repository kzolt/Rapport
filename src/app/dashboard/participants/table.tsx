'use client'

import { Eye } from 'lucide-react'
import Link from 'next/link'
import { DataTable } from '~/components/data-table'
import { useLocation } from '~/components/location-context'
import { Button } from '~/components/ui/button'
import { api, type RouterOutputs } from '~/trpc/react'

export function ParticipantsTable() {
    const { currentLocation } = useLocation()
    const { data, isLoading } = api.participants.get_participants.useQuery({
        location_id: currentLocation?.id ?? null,
    })

    if (!data) {
        return <div>No participants found</div>
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <DataTable
            columnDefs={[
                {
                    field: 'first_name',
                    headerName: 'First Name',
                    filter: true,
                },
                {
                    field: 'last_name',
                    headerName: 'Last Name',
                },
                {
                    field: 'rank',
                    headerName: 'Rank',
                    flex: 1,
                },
                {
                    field: 'id',
                    headerName: 'Actions',
                    cellRenderer: ({
                        data,
                    }: {
                        data: NonNullable<
                            RouterOutputs['participants']['get_participants']
                        >[number]
                    }) => {
                        return (
                            <div className="flex items-center w-full h-full">
                                <Button variant={'outline'} size={'icon'} asChild>
                                    <Link href={`/dashboard/reports/${data.id}`}>
                                        <Eye className="size-4" />
                                        <span className="sr-only">View Reports</span>
                                    </Link>
                                </Button>
                            </div>
                        )
                    },
                },
            ]}
            rowData={data}
        />
    )
}
