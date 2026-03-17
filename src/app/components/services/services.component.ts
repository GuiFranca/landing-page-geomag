import { Component } from '@angular/core';

import { RevealDirective } from '../../directives/reveal.directive';

interface Service {
  title: string;
  description: string;
  tag: string;
  icon: string;
  num: string;
}

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  standalone: true,
  imports: [RevealDirective],
})
export class ServicesComponent {
  services: Service[] = [
    {
      num: '01',
      title: 'Levantamento Topográfico',
      description:
        'Levantamentos planialtimétricos com estação total e GNSS, fornecendo dados precisos para projetos de engenharia e construção civil.',
      tag: 'Precisão',
      icon: 'assets/images/services/estacao-total.png',
    },
    {
      num: '02',
      title: 'Mapeamento Cartográfico (SIG)',
      description:
        'Elaboração de mapas temáticos e bases cartográficas digitais integradas a sistemas de informação geográfica para análise e planejamento territorial.',
      tag: 'SIG',
      icon: 'assets/images/services/geologico.png',
    },
    {
      num: '03',
      title: 'Georreferenciamento',
      description:
        'Georreferenciamento de imóveis rurais e urbanos conforme normas do INCRA, com certificação e registro em cartório.',
      tag: 'INCRA',
      icon: 'assets/images/services/rover.png',
    },
    {
      num: '04',
      title: 'Aerofotogrametria',
      description:
        'Levantamentos aerofotogramétricos com drones de alta resolução para geração de ortomosaicos, MDT e modelos tridimensionais.',
      tag: 'Drone',
      icon: 'assets/images/services/drone.png',
    },
    {
      num: '05',
      title: 'Regularização de Imóvel',
      description:
        'Regularização de imóveis urbanos e rurais, com levantamento, memorial descritivo e acompanhamento processual junto aos órgãos competentes.',
      tag: 'Documentação',
      icon: 'assets/images/services/verificado.png',
    },
    {
      num: '06',
      title: 'Proj. e Acomp. de Terraplanagem',
      description:
        'Projetos de corte e aterro com cálculo de volumes, acompanhamento topográfico e controle geométrico durante toda a execução.',
      tag: 'Terraplenagem',
      icon: 'assets/images/services/escavadora.png',
    },
    {
      num: '07',
      title: 'Topografia para Obras',
      description:
        'Locação de obras, controle geométrico e acompanhamento topográfico durante toda a execução do projeto de construção.',
      tag: 'Controle',
      icon: 'assets/images/services/construcao.png',
    },
    {
      num: '08',
      title: 'Desmembramento de Imóveis',
      description:
        'Parcelamento de glebas e lotes com memorial descritivo, plantas e aprovação junto aos órgãos competentes municipais e estaduais.',
      tag: 'Parcelamento',
      icon: 'assets/images/services/divisao-areas.png',
    },
    {
      num: '09',
      title: 'Estudo de Empreendimento',
      description:
        'Análise topográfica e estudos de viabilidade para empreendimentos imobiliários, industriais e de infraestrutura.',
      tag: 'Viabilidade',
      icon: 'assets/images/services/engenheiro.png',
    },
    {
      num: '10',
      title: 'Locação de Divisas e Infra',
      description:
        'Locação de divisas, implantação de infraestrutura e demarcação de redes com precisão milimétrica em campo.',
      tag: 'Implantação',
      icon: 'assets/images/services/locacao.png',
    },
    {
      num: '11',
      title: 'Cadastro Ambiental Rural (CAR)',
      description:
        'Elaboração e regularização do Cadastro Ambiental Rural conforme legislação vigente, com georreferenciamento e submissão ao SICAR.',
      tag: 'CAR',
      icon: 'assets/images/services/fazenda.png',
    },
  ];
}
