export interface VideoAsset {
  src: string;
  poster: string;
  durationSec?: number;
}

export interface Layer {
  src: string;
  srcset?: string;
  label: string;
  desc: string;
}

export interface GalleryItem {
  src: string;
  alt: string;
  caption?: string;
}

export interface CaseCard {
  id: string;
  thumb: string;
  alt: string;
  tag?: string;
  title?: string;
  gallery: GalleryItem[];
}

export interface HeroScene {
  kind: 'hero';
  video: VideoAsset;
  title: string;
  kicker: string;
}

export interface LayerMorphScene {
  kind: 'layer-morph';
  layers: Layer[];
  embeddedVideo?: VideoAsset;
}

export interface StripScene {
  kind: 'strip';
  cases: CaseCard[];
}

export type Scene = HeroScene | LayerMorphScene | StripScene;
