import { Skeleton } from '@/components/ui/skeleton';

export function PostPageLoading() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-3xl mx-auto py-8 px-4 md:px-0">
        <Skeleton className="h-64 w-full mb-4" />
        <div className="space-y-6">
          <Skeleton className="h-6 w-20" />
          <div className="space-y-2">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-8 w-16" />
          </div>
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    </div>
  );
}

export function PostCardsLoading() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-3xl mx-auto py-8 px-4 md:px-0 space-y-12">
        <div className="space-y-2 ">
          <Skeleton className="h-72 w-full mb-4" />
          <Skeleton className="w-20 h-10 ml-auto" />
        </div>
        <Skeleton className="h-64 w-full mb-4" />
        <Skeleton className="h-64 w-full mb-4" />
      </div>
    </div>
  );
}
