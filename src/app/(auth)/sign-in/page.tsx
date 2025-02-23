'use client'
import { useSession, signIn, signOut } from "next-auth/react"
import { toast } from "sonner"
export default function Component() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <div className="bg-slate-700 h-full w-full min-h-screen">
      Not signed in <br />
      <button className="bg-orange-500 px-3 py-2 ml-2 mt-4 rounded-md" 
      onClick={() => {
        toast.success('Event has been created', {
          description: 'Monday, January 3rd at 6:00pm',
        })
      }}
      >Sign in</button>
    </div>
  )
}