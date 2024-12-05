import { Skeleton } from "@/components/ui/skeleton"

export function Sidebarskeleton() {
  return (
    <div className="h-screen w-64 bg-zinc-950 border-r border-zinc-800 p-4 space-y-4">
      {/* New Task button skeleton */}
      <Skeleton className="h-10 w-full bg-zinc-800" />

      {/* Main navigation items */}
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-8 w-full bg-zinc-800" />
        ))}
      </div>

      {/* Separator */}
      <Skeleton className="h-[1px] w-full bg-zinc-800" />

      {/* Organizations section */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-24 bg-zinc-800" /> {/* "Organizations" label */}
        <div className="grid grid-cols-2 gap-2">
          <Skeleton className="h-24 w-full bg-zinc-800" />
          <Skeleton className="h-24 w-full bg-zinc-800" />
        </div>
        <Skeleton className="h-8 w-full bg-zinc-800" /> {/* Add Organization button */}
      </div>

      {/* Separator */}
      <Skeleton className="h-[1px] w-full bg-zinc-800" />

      {/* Settings link */}
      <Skeleton className="h-8 w-full bg-zinc-800" />
    </div>
  )
}