'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { DataTable } from '~/components/data-table'
import { useLocation } from '~/components/location-context'
import { Button } from '~/components/ui/button'
import { api, type RouterOutputs } from '~/trpc/react'

export default function ReportsTable() {
    const { currentLocation } = useLocation()
    const { data, isLoading, refetch } = api.reports.get_reports.useQuery({
        location_id: currentLocation?.id,
    })

    useEffect(() => {
        if (currentLocation) {
            void refetch()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentLocation])

    if (isLoading) return <div>Loading...</div>

    if (!data) return <div>No reports found</div>

    return (
        <DataTable
            columnDefs={[
                {
                    field: 'first_name',
                    headerName: 'Name',
                    cellRenderer: ({
                        data,
                    }: {
                        data: NonNullable<RouterOutputs['reports']['get_reports']>[number]
                    }) => {
                        const participant = data.participant
                        return `${participant?.first_name} ${participant?.last_name}`
                    },
                },
                {
                    field: 'created_at',
                    headerName: 'Date',
                    valueFormatter: ({
                        data,
                    }: {
                        data: NonNullable<RouterOutputs['reports']['get_reports']>[number]
                    }) => {
                        if (!data.created_at) {
                            return 'Invalid Date Value'
                        }

                        return data.created_at.toDateString()
                    },
                },
                {
                    headerName: 'Actions',
                    cellRenderer: ({
                        data,
                    }: {
                        data: NonNullable<RouterOutputs['reports']['get_reports']>[number]
                    }) => {
                        return (
                            <Button asChild>
                                <Link href={`/dashboard/reports/${data.participant_id}`}>
                                    View
                                </Link>
                            </Button>
                        )
                    },
                },
            ]}
            rowData={data}
        />
    )
}
