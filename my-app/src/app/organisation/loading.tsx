import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Skeleton */}
      <header className="flex items-center justify-between p-6 border-b border-gray-800">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-8 w-8 rounded-full bg-gray-700" />
          <Skeleton className="h-8 w-32 bg-gray-700" />
        </div>
        <div className="flex items-center space-x-6">
          <Skeleton className="h-4 w-20 bg-gray-700" />
          <Skeleton className="h-4 w-20 bg-gray-700" />
          <Skeleton className="h-9 w-24 bg-gray-700" />
        </div>
      </header>

      {/* Main Content Skeleton */}
      <main className="relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="relative container mx-auto px-6 py-12">
          <div className="max-w-3xl mx-auto">
            <Skeleton className="h-12 w-3/4 mx-auto mb-8 bg-gray-700" />
            
            <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-800 p-6 mb-8">
              <div className="space-y-6">
                <div>
                  <Skeleton className="h-6 w-40 mb-2 bg-gray-700" />
                  <Skeleton className="h-10 w-full bg-gray-700" />
                </div>
                <div>
                  <Skeleton className="h-6 w-32 mb-2 bg-gray-700" />
                  <Skeleton className="h-32 w-full bg-gray-700" />
                </div>
                <Skeleton className="h-10 w-full bg-blue-500" />
              </div>
            </Card>

            <div className="grid gap-8 md:grid-cols-3">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="text-center">
                  <Skeleton className="h-12 w-12 mx-auto mb-4 rounded-full bg-gray-700" />
                  <Skeleton className="h-6 w-3/4 mx-auto mb-2 bg-gray-700" />
                  <Skeleton className="h-4 w-full bg-gray-700" />
                  <Skeleton className="h-4 w-5/6 mx-auto mt-2 bg-gray-700" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer Skeleton */}
      <footer className="border-t border-gray-800 mt-12 py-6 text-center">
        <Skeleton className="h-4 w-48 mx-auto bg-gray-700" />
      </footer>
    </div>
  )
}