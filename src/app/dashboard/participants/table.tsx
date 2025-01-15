'use client'

import type { ColumnDef } from '@tanstack/react-table'

import { DataTable } from '~/components/data-table'
import { useLocation } from '~/components/location-context'
import { api, type RouterOutputs } from '~/trpc/react'

export function ParticipantsTable() {
    const { currentLocation } = useLocation()
    const { data, isLoading } = api.participants.get_participants.useQuery({
        location_id: currentLocation?.id ?? null,
    })

    const columns: ColumnDef<
        RouterOutputs['participants']['get_participants'][number]
    >[] = [
        {
            accessorKey: 'first_name',
            header: 'First Name',
        },
        {
            accessorKey: 'last_name',
            header: 'Last Name',
        },
        {
            accessorKey: 'rank',
            header: 'Rank',
        },
    ]

    if (!data) {
        return <div>No participants found</div>
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    return <DataTable columns={columns} data={data} />
}
