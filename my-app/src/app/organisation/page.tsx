// src/app/organisation/page.tsx
'use client';

import { createRoomForOrganisation } from "@/actions/taskActions";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Page() {
  const { user, isLoaded } = useUser(); // Destructure isLoaded to check user readiness
  const router = useRouter();
  const email = user?.primaryEmailAddress?.emailAddress; 

  async function handleNewOrgSubmit(event) {
    event.preventDefault();

    
    console.log("Is Loaded:", isLoaded);
        console.log("User:", user);


    // Ensure user is loaded
    if (!isLoaded) {
      console.error("User is not loaded");
      return;
    }

    // Check if user is defined
    if (!user) {
      console.error("User is undefined");
      return;
    }

    const formData = new FormData(event.target);
    const boardName = formData.get("name")?.toString() || "";

    try {
      // Safely access the primary email address
      console.log("EMAIL:", email);
      const roomInfo = await createRoomForOrganisation(boardName, email || "");
      if (roomInfo) {
        console.log(roomInfo);
        router.push(`/tasks/organisation/id=${roomInfo.id}`);
      }
    } catch (error) {
      console.error("Error creating room:", error);
    }
  }

  return (
    <div>
      <form onSubmit={handleNewOrgSubmit} className="max-w-xs block">
        <h1 className="text-2xl mb-4">Create new board</h1>
        <input type="text" name="name" placeholder="board name" required />
        <button type="submit" className="mt-2 w-full">
          Create board
        </button>
      </form>
    </div>
  );
}