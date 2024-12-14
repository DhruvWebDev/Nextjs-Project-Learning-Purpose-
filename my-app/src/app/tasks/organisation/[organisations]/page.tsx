"use client";
import { useState, useEffect } from "react";
import {
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react";
import { useUser } from "@clerk/nextjs";
import { liveblocksClient } from "@/lib/liveblocks";
import Room from "@/components/Room"; // Import the Room component

function Loading() {
  console.log("Rendering Loading component");
  return <div className="loading">Loading ...</div>;
}

export default function Page() {
  console.log("Page component rendering");
  const { user, isLoaded } = useUser();
  const [hasAccess, setHasAccess] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [roomId, setRoomId] = useState<string | null>(null);

  console.log("User loaded:", isLoaded);
  console.log("Current user:", user);

  useEffect(() => {
    console.log("useEffect for access check running");
    async function checkAccess() {
      if (user) {
        const currentUrl = window.location.href;
        const idMatch = currentUrl.match(/id=([^&]+)/);
        const extractedRoomId = idMatch ? idMatch[1] : null;
        setRoomId(extractedRoomId);

        if (!extractedRoomId) {
          console.log("Missing required data for access check");
          return;
        }

        try {
          console.log("Fetching room data for roomId:", extractedRoomId);
          const room = await liveblocksClient.getRoom(extractedRoomId);
          console.log("Room data:", room);
          const userEmail = user?.primaryEmailAddress?.emailAddress;
          console.log("User email:", userEmail);
          
          if (userEmail && room.groupsAccesses && room.groupsAccesses[userEmail]) {
            console.log("User has access to the room");
            setHasAccess(true);
          } else {
            console.log("User does not have access to the room");
            setHasAccess(false);
          }
        } catch (error) {
          console.error("Error checking room access:", error);
          setHasAccess(false);
        } finally {
          setIsChecking(false);
        }
      }
    }

    checkAccess();
  }, [user, isLoaded]);

  if (!isLoaded || isChecking) {
    console.log("Still loading or checking access");
    return <Loading />;
  }

  if (!hasAccess) {
    console.log("User does not have access, rendering access denied message");
    return <div>You do not have access to this room.</div>;
  }

  console.log("Rendering RoomProvider");
  return (
    <RoomProvider id={roomId}>
      <ClientSideSuspense fallback={<div>Loading…</div>}>
        <Room id={roomId} /> {/* Pass the roomId to the Room component */}
      </ClientSideSuspense>
    </RoomProvider>
  );
}