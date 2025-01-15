'use client'

import { MapPin } from 'lucide-react'
import { useLocation } from '~/components/location-context'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '~/components/ui/sidebar'

export function LocationSwitcher() {
    const { currentLocation, locations, setCurrentLocation } = useLocation()

    if (!currentLocation) {
        return null
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size={'lg'}
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                <MapPin className="size-4" />
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-right">
                                <span className="truncate font-semibold">
                                    {currentLocation.name}
                                </span>
                                <span className="truncate text-xs">
                                    {currentLocation.company}
                                </span>
                            </div>
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width]"
                        align="start"
                    >
                        {locations.map((location) => (
                            <DropdownMenuItem
                                key={location.id}
                                onSelect={() => setCurrentLocation(location)}
                            >
                                {location.name}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
