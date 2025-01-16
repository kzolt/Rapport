'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { api } from '~/trpc/react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '~/components/ui/select'
import { Button } from '~/components/ui/button'
import Link from 'next/link'
import { useLocation } from '~/components/location-context'
import { toast } from 'sonner'

const schema = z.object({
    location_id: z.string().min(1),
    first_name: z.string().min(1),
    last_name: z.string().min(1),
    rank: z.string().min(1),
})

type SchemaType = z.infer<typeof schema>

export function CreateForm() {
    const { currentLocation } = useLocation()

    const form = useForm<SchemaType>({
        resolver: zodResolver(schema),
        defaultValues: {
            first_name: '',
            last_name: '',
            rank: '',
        },
        mode: 'onSubmit',
    })

    const setParticipant = api.participants.set_participant.useMutation({
        onMutate: () => {
            const toast_id = toast.loading('Creating participant')

            return { toast_id }
        },
        onError: (error, variables, context) => {
            toast.error('Failed to create participant', {
                id: context?.toast_id,
            })
        },
        onSuccess: (data, variables, context) => {
            toast.success('Participant created', {
                id: context?.toast_id,
            })
        },
    })

    const on_submit = (values: SchemaType) => {
        if (!currentLocation?.id) {
            toast.error('No location selected')

            return
        }

        setParticipant.mutate({
            ...values,
            location_id: currentLocation.id,
        })
    }

    return (
        <Form {...form}>
            <form
                className="flex flex-col gap-5 max-w-xl mx-auto"
                onSubmit={form.handleSubmit(on_submit)}
            >
                <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="First Name" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="last_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Last Name" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="rank"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Rank</FormLabel>
                            <FormControl>
                                <Select
                                    {...field}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Rank" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="junior">Junior</SelectItem>
                                        <SelectItem value="white">White</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-between">
                    <Button variant="outline" asChild>
                        <Link href="/dashboard/participants">Cancel</Link>
                    </Button>
                    <Button type="submit">Create</Button>
                </div>
            </form>
        </Form>
    )
}
