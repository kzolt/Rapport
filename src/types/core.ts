export const juniorActivities = [
    'code-spark',
    'scratch-jr',
    'paper-circuits',
    'snap-circuits',
    'mouse-practice',
    'typing',
    'reading',
    'make-code-arcade',
    'lego-robotics',
] as const
export type JrActivity = (typeof juniorActivities)[number]

export type Rank = 'junior' | 'white'

export type ProgressReport = {
    activities: JrActivity[]
    date: Date
    notes: string
}

export type SessionType = 'camp' | 'day-camp'

export type LocationData = {
    id: string
    name: string
    company: string
}

export type UserMetadata = {
    locations: LocationData[] | undefined
    role: 'admin' | 'staff'
}
