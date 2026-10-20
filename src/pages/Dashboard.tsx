import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  return (
    <div className="p-3 grid grid-rows-3 grid-cols-1 gap-2 h-full w-full">
      <div className="flex justify-around space-x-2">
        <Skeleton className="w-full"></Skeleton>
        <Skeleton className="w-full"></Skeleton>
        <Skeleton className="w-full"></Skeleton>
      </div>
      <Skeleton className="w-full"></Skeleton>
      <div className="grid grid-cols-4 gap-2">
        <Skeleton className="w-full col-span-3"></Skeleton>
        <Skeleton className="w-full"></Skeleton>
      </div>
    </div>
  )
}
