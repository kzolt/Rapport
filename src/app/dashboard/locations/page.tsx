import Link from 'next/link'
import { Button } from '~/components/ui/button'
import { Plus } from 'lucide-react'

export default function LocationsPage() {
    return (
        <div className="flex w-full flex-col gap-2">
            <div className="flex flex-1 justify-between items-center w-full gap-2">
                <h1 className="text-2xl font-bold">Locations</h1>
                <Button asChild>
                    <Link href={'/dashboard/locations/create'}>
                        <Plus className="size-4" />
                        <span>Create Location</span>
                    </Link>
                </Button>
            </div>
        </div>
    )
}
