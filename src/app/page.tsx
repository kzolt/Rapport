import { RedirectToSignIn } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function Home() {
    const user = await currentUser()

    if (!user) {
        return <RedirectToSignIn />
    }

    return redirect('/dashboard')
}
