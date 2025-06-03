import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

interface Service {
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class HomeComponent {
  whatsappNumber = environment.whatsappNumber;

  services: Service[] = [
    {
      title: 'Levantamentos Topográficos',
      description: 'Levantamentos precisos para projetos de construção, planejamento urbano e rural.',
      icon: 'map'
    },
    {
      title: 'Georreferenciamento',
      description: 'Serviços de georreferenciamento para certificação de imóveis rurais e urbanos.',
      icon: 'globe'
    },
    {
      title: 'Divisão e Unificação de Áreas',
      description: 'Processos de divisão e unificação de áreas, garantindo a regularização fundiária.',
      icon: 'ruler'
    },
    {
      title: 'Topografia para Obras',
      description: 'Topografia especializada para obras de infraestrutura, edificações e loteamentos.',
      icon: 'mountain'
    },
    {
      title: 'Regularização Fundiária',
      description: 'Regularização de imóveis, incluindo retificação de áreas e limites.',
      icon: 'home'
    },
    {
      title: 'Mapeamento 3D',
      description: 'Serviços avançados de digitalização e modelagem 3D para projetos arquitetônicos e de engenharia complexos.',
      icon: 'layers'
    }
  ];

  projects = [
    {
      title: 'Projeto 1',
      description: 'Levantamento topográfico para construção civil',
      image: 'assets/images/project-1.jpg'
    },
    {
      title: 'Projeto 2',
      description: 'Aerolevantamento para estudo ambiental',
      image: 'assets/images/project-2.jpg'
    },
    {
      title: 'Projeto 3',
      description: 'Batimetria para projeto hidrelétrico',
      image: 'assets/images/project-3.jpg'
    }
  ];

  testimonials = [
    {
      content: 'A GeoMAG realizou um excelente trabalho no levantamento topográfico do nosso terreno. Profissionais qualificados e atendimento de primeira.',
      author: 'Cliente 1',
      company: 'Empresa de Construção'
    },
    {
      content: 'Contratamos o serviço de aerolevantamento e ficamos muito satisfeitos com a qualidade e precisão dos resultados entregues.',
      author: 'Cliente 2',
      company: 'Incorporadora'
    }
  ];
}
