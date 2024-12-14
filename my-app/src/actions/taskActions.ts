
import { Liveblocks, RoomInfo } from "@liveblocks/node";
import { v4 as uuidv4 } from 'uuid';

import { liveblocksClient } from "@/lib/liveblocks";

export const createRoomForOrganisation = async (name: string, email: string): Promise<false | RoomInfo> => {
  // Specify RoomId
  const roomId = uuidv4(); // Generate a unique room ID
  return await liveblocksClient.createRoom(roomId, {
      defaultAccesses: [],
      groupsAccesses: {
          [email]: ['room:write'], // Assign write access to the user with the provided email
      },
      metadata: {
          organisationName: name, // Set the organisation name
      },
  });
};
export const addEmailToRoom = async (roomId: string, email: string): Promise<boolean> => {
  const room = await liveblocksClient.getRoom(roomId);
  const groupsAccesses = room.groupsAccesses;
  groupsAccesses[email] = ['room:write']; // Assign write access to the user
  console.log(groupsAccesses);

  await liveblocksClient.updateRoom(roomId, { groupsAccesses }); // Corrected `roomId` variable name
  return true;
};

export const removeEmailFromRoom = async (roomId: string, email: string): Promise<boolean> => {
  const room = await liveblocksClient.getRoom(roomId);
  const groupsAccesses = room.groupsAccesses;
  delete groupsAccesses[email]; // Use delete to remove the access
  console.log(groupsAccesses);

  await liveblocksClient.updateRoom(roomId, { groupsAccesses }); // Corrected `roomId` variable name
  return true;
};

export const deleteRoom = async (roomId: string): Promise<boolean> => {
  await liveblocksClient.deleteRoom(roomId); // Corrected `roomId` variable name
  return true;
};
