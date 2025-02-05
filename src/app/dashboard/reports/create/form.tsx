'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { useLocation } from '~/components/location-context'
import { Button } from '~/components/ui/button'
import { Checkbox } from '~/components/ui/checkbox'
import { Combobox } from '~/components/ui/combobox'
import { DatePicker } from '~/components/ui/date-picker'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '~/components/ui/form'
import { Textarea } from '~/components/ui/textarea'

import { api } from '~/trpc/react'
import { JrActivity, juniorActivities } from '~/types/core'

const schema = z.object({
    participant_id: z.string(),
    activities: z.array(z.string()),
    notes: z.string(),
    date: z.date(),
})

type SchemaType = z.infer<typeof schema>

export function CreateForm() {
    const { currentLocation } = useLocation()
    const { data: participants, isLoading } = api.participants.get_participants.useQuery({
        location_id: currentLocation?.id ?? null,
    })

    const setReport = api.reports.set_report.useMutation({
        onMutate: () => {
            const toast_id = toast.loading('Creating report')

            return { toast_id }
        },
        onError: (_, __, context) => {
            toast.error('Failed to create report', {
                id: context?.toast_id,
            })
        },
        onSuccess: (_, __, context) => {
            toast.success('Report created', {
                id: context?.toast_id,
            })
        },
    })

    const form = useForm<SchemaType>({
        resolver: zodResolver(schema),
        mode: 'onSubmit',
        defaultValues: {
            participant_id: '',
            activities: [],
            notes: '',
            date: new Date(),
        },
    })

    const onSubmit = (data: SchemaType) => {
        setReport.mutate({
            ...data,
            location_id: currentLocation?.id ?? '',
        })
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!participants) {
        return <div>No participants found</div>
    }

    return (
        <Form {...form}>
            <form
                className="flex flex-col gap-4 max-w-xl mx-auto"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormField
                    control={form.control}
                    name="participant_id"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-2 w-full">
                            <FormLabel>Participant: </FormLabel>
                            <Combobox
                                placeholder="Select participant"
                                options={participants.map((participant) => ({
                                    value: participant.id,
                                    label: `${participant.first_name} ${participant.last_name}`,
                                }))}
                                value={field.value}
                                onChange={field.onChange}
                            />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="activities"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-2 justify-start">
                            <FormLabel>Activities: </FormLabel>
                            <div className="flex flex-col gap-4 justify-start items-start">
                                {juniorActivities.map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-2 justify-start"
                                    >
                                        <Checkbox
                                            checked={field.value.includes(item)}
                                            onCheckedChange={(checked) => {
                                                return checked
                                                    ? field.onChange([
                                                          ...field.value,
                                                          item,
                                                      ])
                                                    : field.onChange(
                                                          field.value?.filter(
                                                              (a) =>
                                                                  a !== (item as string)
                                                          )
                                                      )
                                            }}
                                        />
                                        <FormLabel>
                                            {item
                                                .replace(/[^a-zA-Z]/g, ' ')
                                                .replace(/-/g, ' ')}
                                        </FormLabel>
                                    </div>
                                ))}
                            </div>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-2">
                            <FormLabel>Date</FormLabel>
                            <FormControl>
                                <DatePicker date={field.value} setDate={field.onChange} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Notes: </FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Enter notes"
                                    className="resize-none"
                                    rows={6}
                                    value={field.value}
                                    onChange={field.onChange}
                                ></Textarea>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-between">
                    <Button variant={'outline'} asChild>
                        <Link href={'/dashboard/reports'}>Cancel</Link>
                    </Button>
                    <Button type="submit" disabled={setReport.isPending}>
                        <Plus className="size-4" />
                        Create
                    </Button>
                </div>
            </form>
        </Form>
    )
}
