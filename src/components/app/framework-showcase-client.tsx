"use client";

import React, { useState, useEffect, useTransition } from 'react';
import { Header } from './header';
import { ComponentGallery } from './component-gallery';
import { getComponentsForFramework } from '@/lib/data';
import type { Framework, ComponentInfo } from '@/lib/types';
import data from '@/lib/placeholder-images.json';
import type { ImagePlaceholder } from '@/lib/types';

const imageMap: Map<string, ImagePlaceholder> = new Map(
  data.placeholderImages.map((img) => [img.id, img])
);

export function FrameworkShowcaseClient() {
  const [selectedFramework, setSelectedFramework] = useState<Framework>('Bootstrap');
  const [displayedComponents, setDisplayedComponents] = useState<ComponentInfo[]>([]);
  const [headerMessage, setHeaderMessage] = useState<string>('Discover components for Bootstrap.');
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      const components = getComponentsForFramework(selectedFramework);
      setDisplayedComponents(components);
      setHeaderMessage(`Discover components for ${selectedFramework}.`);
    });
  }, [selectedFramework]);

  const handleFrameworkChange = (framework: Framework) => {
    setSelectedFramework(framework);
  };
  
  const handleSearchResults = (results: ComponentInfo[], query: string) => {
    startTransition(() => {
      setDisplayedComponents(results);
      if (results.length > 0) {
        setHeaderMessage(`Showing ${results.length} results for "${query}" in ${selectedFramework}.`);
      } else {
        setHeaderMessage(`No results found for "${query}" in ${selectedFramework}. To clear, select a framework above.`);
      }
    });
  };
  
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header
        selectedFramework={selectedFramework}
        onFrameworkChange={handleFrameworkChange}
        onSearchResults={handleSearchResults}
      />
      <main className="flex-1 p-4 md:p-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-6 text-lg text-muted-foreground">{headerMessage}</p>
          <ComponentGallery
            components={displayedComponents}
            isLoading={isPending}
            imageMap={imageMap}
          />
        </div>
      </main>
    </div>
  );
}
