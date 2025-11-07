import { Skeleton } from "@/components/ui/skeleton";

function Loading() {
  return (
    <div className="flex flex-col justify-center items-start">
      <Skeleton className="h-4 w-full mt-5" />
      <Skeleton className="h-12 w-full mt-8" />
      <Skeleton className="h-8 w-full mt-6" />
      <Skeleton className="h-[450px] w-full mt-8" />
    </div>
  );
}

export default Loading;
