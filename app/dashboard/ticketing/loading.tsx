import { Skeleton } from "@/components/ui/skeleton"

export default function TicketingLoading() {
  return (
    <div className="flex min-h-screen bg-gray-50/40 dark:bg-gray-950">
      <div className="w-64 border-r border-gray-100 dark:border-gray-800">
        <Skeleton className="h-screen w-full" />
      </div>
      <div className="flex-1 p-6 md:p-8 lg:p-10">
        <div className="flex items-center justify-between mb-8">
          <Skeleton className="h-8 w-48" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-24" />
          </div>
        </div>
        <Skeleton className="h-12 w-full mb-8" />
        <div className="space-y-6">
          <Skeleton className="h-[600px] w-full" />
        </div>
      </div>
    </div>
  )
}
