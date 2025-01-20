'use client'

import type { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import { useEffect } from 'react'
import { DataTable } from '~/components/data-table'
import { useLocation } from '~/components/location-context'
import { Button } from '~/components/ui/button'
import { api } from '~/trpc/react'

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

    const columns: ColumnDef<(typeof data)[number]>[] = [
        {
            header: 'Name',
            cell: ({ row }) => {
                const participant = row.original.participant
                return `${participant?.first_name} ${participant?.last_name}`
            },
        },
        {
            header: 'Date',
            cell: ({ row }) => {
                const date = row.original.created_at
                return date?.toLocaleDateString()
            },
        },
        {
            id: 'actions',
            cell: ({ row }) => {
                return (
                    <Button asChild>
                        <Link href={`/dashboard/reports/${row.original.id}`}>View</Link>
                    </Button>
                )
            },
        },
    ]

    return <DataTable columns={columns} data={data} />
}
