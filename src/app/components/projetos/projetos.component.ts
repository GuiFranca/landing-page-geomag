import { Component } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';
import { ComparatorComponent } from './comparator/comparator.component';
import { LayerDef } from './layer-stack/layer-stack.component';
import { CaseItem } from './case-grid/case-grid.component';

const IMG = (path: string) => `assets/images/projetos/${path}`;

const LAYER_DEFS: LayerDef[] = [
  {
    tab: 'Ortofoto',
    title: 'Ortomosaico Aéreo',
    desc: 'Imagem georreferenciada de alta resolução gerada por drone RTK. Precisão horizontal de ±2 cm.',
    src: IMG('mato-dentro-orto.png'),
  },
  {
    tab: 'DEM',
    title: 'Modelo Digital de Elevação',
    desc: 'Superfície 3D colorizada por altitude. Permite análise de relevo, bacias e volumetria.',
    src: IMG('mato-dentro-dem.png'),
  },
  {
    tab: 'CAD',
    title: 'Vetorização Topográfica',
    desc: 'Planta CAD com curvas de nível, elementos vetorizados e pontos notáveis prontos para projeto.',
    src: IMG('mato-dentro-cad.png'),
  },
];

const CASES: CaseItem[] = [
  {
    tag: 'Paróquia · Indaiatuba',
    title: 'Levantamento Urbano + Vetorização CAD',
    meta: '1.2 ha · Ortofoto ↔ CAD · 2025',
    img: IMG('paroquia-orto-cad.png'),
    desc: 'Levantamento aerofotogramétrico de área urbana com posterior vetorização de edificações, calçadas, vegetação e divisas em ambiente CAD. Entregue com base georreferenciada UTM 23S.',
    gallery: [
      { src: IMG('paroquia-orto.png'), label: 'Ortofoto' },
      { src: IMG('paroquia-orto-cad.png'), label: 'Orto + CAD' },
      { src: IMG('paroquia-cad.png'), label: 'CAD Final' },
    ],
    specs: [
      { label: 'Área', value: '1,2 ha' },
      { label: 'Precisão', value: '±2 cm' },
      { label: 'Datum', value: 'SIRGAS 2000' },
    ],
  },
  {
    tag: 'Mato Dentro · Rural',
    title: 'Ortofoto + DEM + CAD Topográfico',
    meta: '8.4 ha · Tríptico Completo · 2025',
    img: IMG('mato-dentro-dem.png'),
    desc: 'Mapeamento rural entregue em três camadas: ortomosaico aéreo, modelo digital de elevação (DEM) e planta CAD com curvas de nível para projeto de manejo.',
    gallery: [
      { src: IMG('mato-dentro-orto.png'), label: 'Ortofoto' },
      { src: IMG('mato-dentro-dem.png'), label: 'DEM' },
      { src: IMG('mato-dentro-cad.png'), label: 'CAD' },
    ],
    specs: [
      { label: 'Área', value: '8,4 ha' },
      { label: 'Resolução DEM', value: '0,5 m' },
      { label: 'GSD', value: '2,8 cm/px' },
    ],
  },
  {
    tag: 'LEPAC · Parque',
    title: 'Projeto Vetorizado Georreferenciado',
    meta: 'Área Pública · Entrega Final',
    img: IMG('lepac-entrega.jpg'),
    desc: 'Produto final de entrega para cliente: prancha técnica georreferenciada do parque com carimbo GeoMAG, legenda e coordenadas em sistema UTM.',
    gallery: [{ src: IMG('lepac-entrega.jpg'), label: 'Prancha Final' }],
    specs: [
      { label: 'Tipo', value: 'Prancha A3' },
      { label: 'Sistema', value: 'UTM 23S' },
    ],
  },
];

@Component({
  selector: 'app-projetos',
  standalone: true,
  imports: [RevealDirective, ComparatorComponent],
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.scss'],
})
export class ProjetosComponent {
  readonly layerDefs = LAYER_DEFS;
  readonly cases = CASES;

  readonly beforeImg = IMG('paroquia-orto.png');
  readonly afterImg = IMG('paroquia-orto-cad.png');
}
