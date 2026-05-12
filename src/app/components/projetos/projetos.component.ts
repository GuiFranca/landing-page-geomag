import { Component, signal } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';
import { SceneHeroComponent } from './scenes/scene-hero/scene-hero.component';
import { SceneLayerMorphComponent } from './scenes/scene-layer-morph/scene-layer-morph.component';
import { SceneStripComponent } from './scenes/scene-strip/scene-strip.component';
import { Scene, HeroScene, LayerMorphScene, StripScene, CaseCard } from './projetos.types';

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
        gallery: [],
      },
      {
        id: 'golinelli',
        thumb: IMG('golinelli-thumb.jpg'),
        alt: 'Prancha LEPAC — Parque Golinelli',
        gallery: [],
      },
      {
        id: 'estrela-do-sul',
        thumb: IMG('estrela-do-sul-thumb.jpg'),
        alt: 'Projeto de loteamento',
        gallery: [],
      },
      {
        id: 'terraplanagem',
        thumb: IMG('terraplanagem-01-thumb.jpg'),
        alt: 'Evolução de obra — terraplanagem',
        gallery: [],
      },
    ],
  },
];

@Component({
  selector: 'app-projetos',
  standalone: true,
  imports: [RevealDirective, SceneHeroComponent, SceneLayerMorphComponent, SceneStripComponent],
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.scss'],
})
export class ProjetosComponent {
  readonly heroScene = SCENES.find((s): s is HeroScene => s.kind === 'hero');
  readonly morphScenes = SCENES.filter((s): s is LayerMorphScene => s.kind === 'layer-morph');
  readonly stripScene = SCENES.find((s): s is StripScene => s.kind === 'strip');

  activeModal = signal<CaseCard | null>(null);

  openModal(c: CaseCard) {
    this.activeModal.set(c);
  }

  closeModal() {
    this.activeModal.set(null);
  }
}
