export type Framework = 'Bootstrap' | 'Webpack' | 'JQuery';

export type ComponentInfo = {
  id: string;
  name: string;
  description: string;
  documentationLink: string;
  imageId: string;
};

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};
