'use client'

import { useParams } from 'next/navigation'
import { api } from '~/trpc/react'

export function ReportTable() {
    const { id } = useParams()
    const { data, isLoading } = api.reports.get_report.useQuery({
        id: id as string,
    })

    if (isLoading) return <div>Loading...</div>

    return <pre>{JSON.stringify(data, null, 2)}</pre>
}
