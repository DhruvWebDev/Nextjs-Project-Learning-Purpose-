'use client'

import { useOthers } from "@liveblocks/react";

export function WhoIsHere() {
    const userCount = useOthers((others) => others.length);
    return <div>There are {userCount} other users online</div>;
  }