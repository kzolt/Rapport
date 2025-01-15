import { RedirectToSignIn, SignOutButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import { BarChart, ChevronsUpDown, Home, LogOut, MapPin, Users } from 'lucide-react'
import { Suspense } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
} from '~/components/ui/breadcrumb'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'

import { Separator } from '~/components/ui/separator'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
} from '~/components/ui/sidebar'
import { LocationSwitcher } from './location-switcher'
import { LocationProvider } from '~/components/location-context'
import Link from 'next/link'

export default function DashboardLayout(props: { children: React.ReactNode }) {
    return (
        <LocationProvider>
            <SidebarProvider>
                <Suspense fallback={<div>Loading...</div>}>
                    <AppSidebar />
                </Suspense>
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2">
                        <div className="flex items-center gap-2 px-4">
                            <SidebarTrigger className="-ml-1" />
                            <Separator orientation="vertical" className="mr-2 h-4" />
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem className="hidden md:block">
                                        <BreadcrumbLink href="#">
                                            Dashboard
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                    </header>
                    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                        {props.children}
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </LocationProvider>
    )
}

async function AppSidebar() {
    const user = await currentUser()

    if (!user) {
        return <RedirectToSignIn />
    }

    return (
        <Sidebar variant="inset">
            <SidebarHeader>
                <LocationSwitcher />
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    <SidebarGroup>
                        <SidebarGroupLabel>General</SidebarGroupLabel>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link href={'/dashboard'}>
                                    <Home className="size-4" />
                                    <span>Home</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link href={'/dashboard/participants'}>
                                    <Users className="size-4" />
                                    <span>Participants</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link href={'/dashboard/reports'}>
                                    <BarChart className="size-4" />
                                    <span>Reports</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarGroup>
                    {user.privateMetadata.role === 'admin' && (
                        <SidebarGroup>
                            <SidebarGroupLabel>Admin</SidebarGroupLabel>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href={'/dashboard/locations'}>
                                        <MapPin className="size-4" />
                                        <span>Locations</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarGroup>
                    )}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    size={'lg'}
                                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                >
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarImage src={user?.imageUrl} />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-right">
                                        <span className="truncate font-semibold">
                                            {user?.firstName} {user?.lastName}
                                        </span>
                                        <span className="truncate text-xs">
                                            {user?.emailAddresses[0]?.emailAddress}
                                        </span>
                                    </div>
                                    <ChevronsUpDown className="ml-auto size-4" />
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                            align="end"
                            sideOffset={4}
                        >
                            <DropdownMenuLabel className="p-0 font-normal">
                                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarImage src={user?.imageUrl} />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-right">
                                        <span className="truncate font-semibold">
                                            {user?.firstName} {user?.lastName}
                                        </span>
                                        <span className="truncate text-xs">
                                            {user?.emailAddresses[0]?.emailAddress}
                                        </span>
                                    </div>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <SignOutButton>
                                <DropdownMenuItem>
                                    <LogOut className="size-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </SignOutButton>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
