import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';
import type { ComponentInfo, ImagePlaceholder } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

type ComponentCardProps = {
  component: ComponentInfo;
  image?: ImagePlaceholder;
};

const placeholderImage: ImagePlaceholder = {
  id: 'generic-placeholder',
  imageUrl: 'https://picsum.photos/seed/placeholder/600/400',
  imageHint: 'abstract gray',
  description: 'A placeholder image.',
};

export function ComponentCard({ component, image }: ComponentCardProps) {
  const displayImage = image || placeholderImage;
  const isSearchResult = component.id.startsWith('search-');

  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="p-0 border-b">
        <Link href={component.documentationLink} target="_blank" rel="noopener noreferrer" className="aspect-[4/3] block w-full overflow-hidden" aria-label={`View documentation for ${component.name}`}>
          <Image
            src={displayImage.imageUrl}
            alt={component.name}
            width={600}
            height={400}
            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={displayImage.imageHint}
          />
        </Link>
      </CardHeader>
      <CardContent className="flex-1 p-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{component.name}</CardTitle>
          {isSearchResult && <Badge variant="outline" className="border-accent text-accent">AI Match</Badge>}
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{component.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild variant="outline" className="w-full">
          <Link href={component.documentationLink} target="_blank" rel="noopener noreferrer">
            View Docs <ArrowUpRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
