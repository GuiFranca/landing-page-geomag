export interface Stat {
  label: string;
  value: string;
}

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

export interface Spec {
  label: string;
  value: string;
}

export interface ProjectMeta {
  tag: string;
  title: string;
  specs: Spec[];
}

export interface GalleryItem {
  src: string;
  alt: string;
  caption?: string;
}

export interface CaseCard {
  id: string;
  tag: string;
  title: string;
  thumb: string;
  gallery: GalleryItem[];
}

export interface HeroScene {
  kind: 'hero';
  video: VideoAsset;
  title: string;
  kicker: string;
  stats: Stat[];
}

export interface LayerMorphScene {
  kind: 'layer-morph';
  project: ProjectMeta;
  layers: Layer[];
  embeddedVideo?: VideoAsset;
}

export interface StripScene {
  kind: 'strip';
  cases: CaseCard[];
}

export type Scene = HeroScene | LayerMorphScene | StripScene;
