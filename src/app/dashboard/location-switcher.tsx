import { Link } from '@radix-ui/react-navigation-menu'
import { Command } from 'lucide-react'
import { useLocation } from '~/components/location-context'
import { SidebarMenuButton, SidebarMenuItem } from '~/components/ui/sidebar'

import { SidebarMenu } from '~/components/ui/sidebar'

export function LocationSwitcher() {
    const { currentLocation } = useLocation()

    if (!currentLocation) {
        return null
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton size={'lg'} asChild>
                    <Link href={'/dashboard'}>
                        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                            <Command className="size-4" />
                        </div>
                        <div className="grid flex-1 text-left text-sm leading-right">
                            <span className="truncate font-semibold">
                                {currentLocation}
                            </span>
                            <span className="truncate text-xs">Code Ninjas</span>
                        </div>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
