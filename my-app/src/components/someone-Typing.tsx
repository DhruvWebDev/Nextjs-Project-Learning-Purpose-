'use client'

import { useOthers } from "@liveblocks/react";

export function SomeoneIsTyping() {
    const someoneIsTyping = useOthers((others) =>
      others.some((other) => other.presence.isTyping)
    );
    return <div>{someoneIsTyping ? "Someone is typing..." : ""}</div>;
  }