"use client";

import { LiveblocksProvider } from "@liveblocks/react";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
      afterSignOutUrl="/"
    >
      <LiveblocksProvider
        publicApiKey={process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY!}
      >
        {children}
      </LiveblocksProvider>
    </ClerkProvider>
  );
}