type JrActivity =
    | 'code-spark'
    | 'scratch-jr'
    | 'paper-circuits'
    | 'snap-circuits'
    | 'mouse-practice'
    | 'typing'
    | 'reading'

type ProgressReport = {
    activity: JrActivity
    date: Date
    notes: string
}
