import { Component, signal, isDevMode, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RevealDirective } from '../../directives/reveal.directive';
import { SceneHeroComponent } from './scenes/scene-hero/scene-hero.component';
import { SceneLayerMorphComponent } from './scenes/scene-layer-morph/scene-layer-morph.component';
import { SceneStripComponent } from './scenes/scene-strip/scene-strip.component';
import { Scene, HeroScene, LayerMorphScene, StripScene } from './projetos.types';

const IMG = (path: string) => `assets/images/projetos/${path}`;
const VID = (path: string) => `assets/videos/projetos/${path}`;

const SCENES: Scene[] = [
  {
    kind: 'hero',
    kicker: 'Do voo à planta',
    title: 'O terreno em alta resolução.',
    video: {
      src: VID('beira-rio-transition.mp4'),
      poster: VID('beira-rio-transition-poster.jpg'),
    },
  },
  {
    kind: 'layer-morph',
    layers: [
      {
        src: IMG('mato-dentro-orto.png'),
        label: 'Ortofoto',
        desc: 'Imagem georreferenciada de alta resolução gerada por drone RTK. Precisão horizontal de ±2 cm.',
      },
      {
        src: IMG('mato-dentro-dem.png'),
        label: 'DEM',
        desc: 'Superfície 3D colorizada por altitude. Permite análise de relevo, bacias e volumetria.',
      },
      {
        src: IMG('mato-dentro-cad.png'),
        label: 'CAD',
        desc: 'Planta CAD com curvas de nível, elementos vetorizados e pontos notáveis prontos para projeto.',
      },
    ],
  },
  {
    kind: 'layer-morph',
    layers: [
      {
        src: IMG('paroquia-orto.png'),
        label: 'Ortofoto',
        desc: 'Levantamento aerofotogramétrico de área urbana com georreferenciamento em SIRGAS 2000.',
      },
      {
        src: IMG('paroquia-orto-cad.png'),
        label: 'Orto + CAD',
        desc: 'Sobreposição da vetorização técnica sobre a ortofoto para validação em campo.',
      },
      {
        src: IMG('paroquia-cad.png'),
        label: 'CAD Final',
        desc: 'Planta CAD com edificações, calçadas, vegetação e divisas — entregue em DWG + PDF.',
      },
    ],
    embeddedVideo: {
      src: VID('paroquia-3d.mp4'),
      poster: VID('paroquia-3d-poster.jpg'),
      durationSec: 8,
    },
  },
  {
    kind: 'layer-morph',
    layers: [
      {
        src: IMG('beira-rio-orto.webp'),
        label: 'Ortofoto',
        desc: 'Ortomosaico gerado a partir de voo com drone RTK. Base para todos os produtos derivados.',
      },
      {
        src: IMG('beira-rio-dem.webp'),
        label: 'DEM',
        desc: 'Modelo digital de elevação com colorização hipsométrica revelando o relevo da região.',
      },
    ],
  },
  {
    kind: 'strip',
    cases: [
      {
        id: 'casa-branca',
        thumb: IMG('casa-branca-thumb.jpg'),
        alt: 'Pranchas técnicas georreferenciadas',
      },
      {
        id: 'golinelli',
        thumb: IMG('golinelli-thumb.jpg'),
        alt: 'Prancha LEPAC — Parque Golinelli',
      },
      {
        id: 'estrela-do-sul',
        thumb: IMG('estrela-do-sul-thumb.jpg'),
        alt: 'Projeto de loteamento',
      },
      {
        id: 'terraplanagem',
        thumb: IMG('terraplanagem-01-thumb.jpg'),
        alt: 'Evolução de obra — terraplanagem',
      },
    ],
  },
];

export type LayoutMode = 'A' | 'B' | 'C';

@Component({
  selector: 'app-projetos',
  standalone: true,
  imports: [RevealDirective, SceneHeroComponent, SceneLayerMorphComponent, SceneStripComponent],
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.scss'],
})
export class ProjetosComponent {
  private platformId = inject(PLATFORM_ID);

  readonly scenes = SCENES;
  readonly isDev = isDevMode();

  layoutMode = signal<LayoutMode>(this.getStoredLayout());

  private getStoredLayout(): LayoutMode {
    if (isPlatformBrowser(this.platformId)) {
      return (localStorage.getItem('pj-layout') as LayoutMode) ?? 'A';
    }
    return 'A';
  }

  setLayout(mode: LayoutMode): void {
    this.layoutMode.set(mode);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('pj-layout', mode);
    }
  }

  getHeroScene(): HeroScene | undefined {
    return this.scenes.find((s): s is HeroScene => s.kind === 'hero');
  }

  getMorphScenes(): LayerMorphScene[] {
    return this.scenes.filter((s): s is LayerMorphScene => s.kind === 'layer-morph');
  }

  getStripScene(): StripScene | undefined {
    return this.scenes.find((s): s is StripScene => s.kind === 'strip');
  }
}
