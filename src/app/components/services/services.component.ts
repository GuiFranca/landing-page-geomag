import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../directives/reveal.directive';

interface Service {
  title: string;
  description: string;
  tag: string;
  iconPath: string;
  num: string;
}

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  standalone: true,
  imports: [CommonModule, RevealDirective]
})
export class ServicesComponent {
  services: Service[] = [
    {
      num: '01',
      title: 'Topografia Convencional',
      description: 'Levantamentos planialtimétricos com estação total e GNSS, fornecendo dados precisos para projetos de engenharia e construção civil.',
      tag: 'Precisão',
      iconPath: 'M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0'
    },
    {
      num: '02',
      title: 'Georreferenciamento',
      description: 'Georreferenciamento de imóveis rurais e urbanos conforme normas do INCRA, com certificação e registro em cartório.',
      tag: 'INCRA',
      iconPath: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 7m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0'
    },
    {
      num: '03',
      title: 'Divisão e Desmembramento',
      description: 'Parcelamento de glebas e lotes com memorial descritivo, plantas e aprovação junto aos órgãos competentes.',
      tag: 'Parcelamento',
      iconPath: 'M15 3h6v6 M9 21H3v-6 M21 3l-7 7 M3 21l7-7'
    },
    {
      num: '04',
      title: 'Acompanhamento de Obras',
      description: 'Locação de obras, controle geométrico e acompanhamento topográfico durante toda execução do projeto.',
      tag: 'Controle',
      iconPath: 'M2 20h20 M4 20V8l4-4h8l4 4v12 M9 20v-6h6v6 M9 8h6'
    },
    {
      num: '05',
      title: 'Regularização Fundiária',
      description: 'Regularização de imóveis urbanos e rurais, com levantamento, memorial descritivo e acompanhamento processual.',
      tag: 'Documentação',
      iconPath: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8'
    },
    {
      num: '06',
      title: 'Mapeamento 3D',
      description: 'Escaneamento a laser e fotogrametria com drones para geração de modelos tridimensionais de alta resolução.',
      tag: 'Tecnologia',
      iconPath: 'M12 2L2 7l10 5l10-5-10-5z M2 17l10 5l10-5 M2 12l10 5l10-5'
    },
  ];
}
