'use client'

import { Sidebar } from "@/components/sidebar";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {useEffect} from "react"
export default function Page() {
  const { isSignedIn, user, isLoaded } = useUser()
  const router = useRouter();
  useEffect(() => {
    if(isSignedIn && isLoaded && !user) {
        router.push("/sign-in")
    }
    if(isLoaded){
      console.log(user)
      console.log("Helloooooo")
    }
}, [])

  return <Sidebar/>;
}