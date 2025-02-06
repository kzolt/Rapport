import { ReportTable } from './table'

export default async function ReportPage({
    params,
}: {
    params: Promise<{ participant_id: string }>
}) {
    const { participant_id } = await params
    return (
        <div className="flex flex-col flex-1">
            <ReportTable participant_id={participant_id} />
        </div>
    )
}
