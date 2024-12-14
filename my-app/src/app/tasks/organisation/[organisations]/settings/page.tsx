  'use client'
  import { liveblocksClient } from '@/lib/liveblocks';
  import { useUser } from '@clerk/nextjs';
  import Link from 'next/link';
  import React, { useEffect, useState } from 'react';
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import EmailsAccessList from '@/components/EmailAccessList';
  import NewBoardAccess from '@/components/forms/NewRoomAccessForm';
  import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
  import Loader from "@/components/Loader"
  const Page = () => {
      //Toggle Mode --> For Organisation
      //Persist theme in the localStorage
    const [boardId, setBoardId] = useState<string | null>(null);
    const [roomInfo, setRoomInfo] = useState<any>(null); // State to hold room info
    const { user } = useUser();
    const userEmail = user?.primaryEmailAddress?.emailAddress;

    useEffect(() => {
      // Get the current URL
      const currentUrl = window.location.href;
      console.log("Current URL:", currentUrl); // Debugging: Log the current URL

      // Create a URL object
      const url = new URL(currentUrl);
      // Extract the id from the URL
      const idParam = url.pathname.split('/').find(part => part.startsWith('id='));
      const id = idParam ? idParam.split('=')[1] : null;

      console.log("Extracted ID:", id); // Debugging: Log the extracted ID
      setBoardId(id); // Set the boardId state
    }, []);

    useEffect(() => {
      const fetchRoomInfo = async () => {
        if (boardId) {
          console.log("Fetching room info for board ID:", boardId); // Debugging: Log the board ID being fetched
          const roomInfo = await liveblocksClient.getRoom(boardId);

          if (!roomInfo) {
            console.log("Room info not found for board ID:", boardId); // Debugging: Log if room info is not found
            return;
          }

          console.log("Room Info:", roomInfo); // Debugging: Log the fetched room info
          setRoomInfo(roomInfo); // Set the room info state
        }
      };

      fetchRoomInfo(); // Call the async function
    }, [boardId]);

    if (!boardId) {
      console.log("Board ID is not yet available."); // Debugging: Log when boardId is not available
      return (
        <div className="flex justify-center items-center h-screen">
          <Loader /> {/* Show loading state while fetching the ID */}
        </div>
      );
        }

    if (!roomInfo) {
      console.log("Loading room information..."); // Debugging: Log while loading room info
      return <Loader />; // Show loading state while fetching room info
    }

    // Check access for the user
    if (!roomInfo.groupsAccesses ) {
      console.log("Access denied for user:", userEmail); // Debugging: Log access denial
      return <div>Access denied</div>; // Return access denied message
    }

    return (
      <div>
        <Link className="inline-flex gap-1 items-center btn mb-4" href={`/tasks/organisation/${boardId}`}>
          <FontAwesomeIcon icon={faArrowLeft} />
          Go back to board
        </Link>
        <h1 className="text-2xl">Access to Organisation {roomInfo.metadata.organisationName}:</h1>
        <div className="mb-8">
          <EmailsAccessList 
            boardId={boardId} 
            usersAccesses={roomInfo?.groupsAccesses || {}} // Pass the entire groupsAccesses object
          />
        </div>
        <NewBoardAccess boardId={boardId} />
      </div>
    );
  };

  export default Page;