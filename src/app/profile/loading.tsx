import { Skeleton } from "@/components/ui/skeleton";

function Loading() {
  return (
    <div className="flex flex-col justify-center items-start">
      <Skeleton className="h-4 w-[200px] mt-5" />
      <Skeleton className="h-12 w-[250px] mt-8" />
      <Skeleton className="h-8 w-[280px] mt-6" />
      <Skeleton className="h-[450px] w-[280px] mt-8" />
    </div>
  );
}

export default Loading;
