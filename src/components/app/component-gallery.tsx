import { ComponentCard } from './component-card';
import { Skeleton } from '@/components/ui/skeleton';
import type { ComponentInfo, ImagePlaceholder } from '@/lib/types';
import { Frown } from 'lucide-react';

type ComponentGalleryProps = {
  components: ComponentInfo[];
  isLoading: boolean;
  imageMap: Map<string, ImagePlaceholder>;
};

export function ComponentGallery({ components, isLoading, imageMap }: ComponentGalleryProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="flex flex-col space-y-3 rounded-xl border bg-card p-3">
            <Skeleton className="aspect-[4/3] w-full rounded-lg" />
            <div className="space-y-2 pt-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (components.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 py-24 text-center">
        <Frown className="h-16 w-16 text-muted-foreground/50" />
        <h3 className="mt-4 text-xl font-semibold">Nothing to see here</h3>
        <p className="mt-2 text-muted-foreground">No components found for your current selection.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
      {components.map((component) => (
        <ComponentCard key={component.id} component={component} image={imageMap.get(component.imageId)} />
      ))}
    </div>
  );
}
