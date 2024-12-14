'use server';

import {liveblocksClient} from "@/lib/liveblocksClient";
import { useUser } from "@clerk/nextjs";
import OrgUI from "./OrgUI";

export default async function Boards() {
    const {user} = useUser();
  const email = await getUserEmail();
  const {data:rooms} = await liveblocksClient.getRooms({userId: email});
  return (
    <OrgUI boards={rooms} />
  );
}