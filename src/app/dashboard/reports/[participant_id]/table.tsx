'use client'

import { DataTable } from '~/components/data-table'
import { api } from '~/trpc/react'
import { type ProgressReport } from '~/types/core'

export function ReportTable(props: { participant_id: string }) {
    const { data, isLoading } = api.reports.get_participant_reports.useQuery({
        participant_id: props.participant_id,
    })

    if (isLoading) return <div>Loading...</div>

    if (!data?.content) {
        return <div>No reports found</div>
    }

    return (
        <DataTable
            columnDefs={[
                {
                    field: 'date',
                    headerName: 'Date',
                    filter: 'agDateColumnFilter',
                    valueGetter: ({ data }: { data: ProgressReport }) => {
                        return new Date(data.date)
                    },
                    valueFormatter: ({ data }: { data: ProgressReport }) => {
                        return new Date(data.date).toLocaleDateString()
                    },
                },
                {
                    field: 'content',
                    headerName: 'Activities',
                    autoHeight: true,
                    cellRenderer: ({ data }: { data: ProgressReport }) => {
                        return (
                            <div className="flex flex-col">
                                {data.activities.map((activity) => (
                                    <span key={activity}>
                                        {activity
                                            .replace(/-/g, ' ')
                                            .replace(/\b\w/g, (c) => c.toUpperCase())}
                                    </span>
                                ))}
                            </div>
                        )
                    },
                },
                {
                    field: 'notes',
                    headerName: 'Notes',
                    autoHeight: true,
                    valueFormatter: ({ data }: { data: ProgressReport }) => {
                        return data.notes
                    },
                    wrapText: true,
                },
            ]}
            rowData={data.content}
        />
    )
}
