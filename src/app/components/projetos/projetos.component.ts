import { Component, signal } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';
import { SceneHeroComponent } from './scenes/scene-hero/scene-hero.component';
import { SceneLayerMorphComponent } from './scenes/scene-layer-morph/scene-layer-morph.component';
import { SceneStripComponent } from './scenes/scene-strip/scene-strip.component';
import { CaseModalComponent } from './case-modal/case-modal.component';
import { Scene, CaseCard } from './projetos.types';

const IMG = (path: string) => `assets/images/projetos/${path}`;
const VID = (path: string) => `assets/videos/projetos/${path}`;

const SCENES: Scene[] = [
  {
    kind: 'hero',
    kicker: 'Do voo à planta',
    title: 'Cada projeto em três camadas.',
    video: {
      src: VID('beira-rio-transition.mp4'),
      poster: VID('beira-rio-transition-poster.jpg'),
    },
    stats: [
      { label: 'Projetos', value: '7' },
      { label: 'Hectares mapeados', value: '14ha' },
      { label: 'Precisão', value: '±2cm' },
    ],
  },
  {
    kind: 'layer-morph',
    project: {
      tag: 'Mato Dentro · Rural',
      title: 'Ortofoto + DEM + CAD Topográfico',
      specs: [
        { label: 'Área', value: '8,4ha' },
        { label: 'GSD', value: '2,8cm/px' },
        { label: 'Datum', value: 'SIRGAS 2000' },
      ],
    },
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
    project: {
      tag: 'Paróquia · Indaiatuba',
      title: 'Levantamento Urbano + 3D',
      specs: [
        { label: 'Área', value: '1,2ha' },
        { label: 'Precisão', value: '±2cm' },
        { label: 'Datum', value: 'UTM 23S' },
      ],
    },
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
    project: {
      tag: 'Beira Rio · Rural',
      title: 'Mapeamento com Transição DEM',
      specs: [],
    },
    layers: [
      {
        src: IMG('beira-rio-orto.webp'),
        label: 'Ortofoto',
        desc: 'Ortomosaico da área rural às margens do rio gerado a partir de voo com drone RTK.',
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
        tag: 'Casa Branca · HB',
        title: 'Pranchas Técnicas Georreferenciadas',
        thumb: IMG('casa-branca-thumb.jpg'),
        gallery: [
          { src: IMG('casa-branca-1.jpg'), alt: 'Casa Branca — Prancha com foto aérea' },
          { src: IMG('casa-branca-2.jpg'), alt: 'Casa Branca — Prancha técnica' },
        ],
      },
      {
        id: 'golinelli',
        tag: 'LEPAC · Parque',
        title: 'Parque Golinelli — Prancha LEPAC',
        thumb: IMG('golinelli-thumb.jpg'),
        gallery: [{ src: IMG('golinelli.jpg'), alt: 'Parque Golinelli — Prancha LEPAC entregue' }],
      },
      {
        id: 'estrela-do-sul',
        tag: 'Estrela do Sul II',
        title: 'Projeto de Loteamento',
        thumb: IMG('estrela-do-sul-thumb.jpg'),
        gallery: [
          { src: IMG('estrela-do-sul.jpg'), alt: 'Estrela do Sul II — Projeto de Loteamento' },
        ],
      },
      {
        id: 'terraplanagem',
        tag: 'Terraplanagem',
        title: 'Evolução da Obra — 4 Etapas',
        thumb: IMG('terraplanagem-01-thumb.jpg'),
        gallery: [
          { src: IMG('terraplanagem-01.jpg'), alt: 'Terraplanagem — Etapa 1' },
          { src: IMG('terraplanagem-02.jpg'), alt: 'Terraplanagem — Etapa 2' },
          { src: IMG('terraplanagem-03.jpg'), alt: 'Terraplanagem — Etapa 3' },
          { src: IMG('terraplanagem-04.jpg'), alt: 'Terraplanagem — Etapa 4' },
        ],
      },
    ],
  },
];

@Component({
  selector: 'app-projetos',
  standalone: true,
  imports: [
    RevealDirective,
    SceneHeroComponent,
    SceneLayerMorphComponent,
    SceneStripComponent,
    CaseModalComponent,
  ],
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.scss'],
})
export class ProjetosComponent {
  readonly scenes = SCENES;
  activeModal = signal<CaseCard | null>(null);

  openModal(c: CaseCard): void {
    this.activeModal.set(c);
  }

  closeModal(): void {
    this.activeModal.set(null);
  }
}
