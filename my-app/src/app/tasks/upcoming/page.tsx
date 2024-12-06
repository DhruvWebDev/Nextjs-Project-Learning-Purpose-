'use client'

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {useEffect} from "react"
export default function Page() {
  const {user, isLoaded} = useUser();
  const router = useRouter();
  useEffect(() => {
    if(isLoaded && !user) {
        router.push("/sign-in")
    }
}, [])

  return <h1>Welcome to page!</h1>;
}