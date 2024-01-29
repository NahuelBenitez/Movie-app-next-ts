// components/MovieSkeleton.tsx
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const MovieSkeleton: React.FC = () => {
  return (
    <div className="p-4">
      <Skeleton className="w-full h-[200px] mb-4" />
      <Skeleton className="w-[80%] h-[20px]" />
      <Skeleton className="w-[60%] h-[16px]" />
    </div>
  );
};

export default MovieSkeleton;
