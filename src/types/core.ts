export enum JrActivity {
    CODE_SPARK = 'code-spark',
    SCRATCH_JR = 'scratch-jr',
    PAPER_CIRCUITS = 'paper-circuits',
    SNAP_CIRCUITS = 'snap-circuits',
    MOUSE_PRACTICE = 'mouse-practice',
    TYPING = 'typing',
    READING = 'reading',
}

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
