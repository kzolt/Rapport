'use client'

import {
    createContext,
    useContext,
    useEffect,
    useState,
    type Dispatch,
    type SetStateAction,
} from 'react'

import { api } from '~/trpc/react'

type LocationContextType = {
    currentLocation: LocationData | null
    setCurrentLocation: Dispatch<SetStateAction<LocationData | null>>

    locations: LocationData[]
}

const LocationContext = createContext<LocationContextType | null>(null)

export function LocationProvider(props: { children: React.ReactNode }) {
    const [currentLocation, setCurrentLocation] = useState<LocationData | null>(null)
    const [locations, setLocations] = useState<LocationData[]>([])

    const { data } = api.locations.get_locations.useQuery()

    useEffect(() => {
        if (data) {
            setLocations(data)
            setCurrentLocation(data[0] ?? null)
        }
    }, [data])

    return (
        <LocationContext.Provider
            value={{ currentLocation, setCurrentLocation, locations }}
        >
            {props.children}
        </LocationContext.Provider>
    )
}

export function useLocation() {
    const context = useContext(LocationContext)

    if (!context) {
        throw new Error('useLocationContext must be used within a LocationProvider')
    }

    return context
}
