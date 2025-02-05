'use client'

import { AgGridReact, type AgGridReactProps } from 'ag-grid-react'
import { themeQuartz, ModuleRegistry, AllCommunityModule } from 'ag-grid-community'

ModuleRegistry.registerModules([AllCommunityModule])

export function DataTable<TData>(props: AgGridReactProps) {
    const myTheme = themeQuartz.withParams({
        backgroundColor: '#000000',
        browserColorScheme: 'dark',
        chromeBackgroundColor: {
            ref: 'foregroundColor',
            mix: 0.07,
            onto: 'backgroundColor',
        },
        foregroundColor: '#FFF',
        headerFontSize: 14,
    })

    return (
        <div className="h-full">
            <AgGridReact {...props} theme={myTheme} />
        </div>
    )
}
