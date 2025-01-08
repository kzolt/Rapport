type JrActivity =
    | 'code-spark'
    | 'scratch-jr'
    | 'paper-circuits'
    | 'snap-circuits'
    | 'mouse-practice'
    | 'typing'
    | 'reading'

type Rank = 'junior' | 'white'

type ProgressReport = {
    activity: JrActivity
    date: Date
    notes: string
}

type SessionType = 'camp' | 'day-camp'
