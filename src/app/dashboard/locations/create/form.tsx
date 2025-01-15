'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import Link from 'next/link'
import { api } from '~/trpc/react'
import { toast } from 'sonner'

const schema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    company: z.string().min(1, { message: 'Company is required' }),
})

type CreateFormSchema = z.infer<typeof schema>

export function CreateForm() {
    const apiUtils = api.useUtils()
    const form = useForm<CreateFormSchema>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: '',
            company: '',
        },
        mode: 'onSubmit',
    })

    const setLocation = api.locations.set_location.useMutation({
        onMutate: () => {
            const toast_id = toast.loading('Creating location...')

            return { toast_id }
        },
        onSuccess: (_, __, context) => {
            void apiUtils.locations.get_locations.invalidate()

            toast.success('Location Created!', {
                id: context?.toast_id,
            })
        },
        onError: (_, __, context) => {
            toast.error('Failed to create location', {
                id: context?.toast_id,
            })
        },
    })

    const onSubmit = (values: CreateFormSchema) => {
        setLocation.mutate(values)
    }

    return (
        <Form {...form}>
            <form
                className="flex flex-col gap-2 container mx-auto max-w-xl"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Location Name:</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Location Name" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Company Name:</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Company Name" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-between items-center">
                    <Button variant={'outline'} asChild>
                        <Link href="/dashboard/locations">Cancel</Link>
                    </Button>
                    <Button type="submit" disabled={setLocation.isPending}>
                        Create Location
                    </Button>
                </div>
            </form>
        </Form>
    )
}
