"use client";

import { useEffect } from "react";
import { Terminal } from "lucide-react"
 
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Button } from "@/components/ui/button";
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <Alert variant={"destructive"}>
      <Terminal className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
      Something went wrong!
      </AlertDescription>
      <Button onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }>Try Again</Button>
    </Alert>
    </div>
  );
}