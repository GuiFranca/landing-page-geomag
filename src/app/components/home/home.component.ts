import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class HomeComponent {
  services = [
    {
      title: 'Levantamento planialtimétrico',
      description: 'Mapeamento detalhado do terreno com curvas de nível e elementos existentes.',
      image: 'assets/images/service-1.jpg'
    },
    {
      title: 'Locação e demarcação de áreas',
      description: 'Definição precisa de limites e áreas para construção e regularização.',
      image: 'assets/images/service-2.jpg'
    },
    {
      title: 'Aerolevantamento',
      description: 'Captura de imagens aéreas para mapeamento e análise de grandes áreas.',
      image: 'assets/images/service-3.jpg'
    },
    {
      title: 'Batimetria',
      description: 'Medição de profundidade e relevo de corpos d\'água.',
      image: 'assets/images/service-4.jpg'
    },
    {
      title: 'Laser Scanner (Lidar)',
      description: 'Escaneamento 3D de alta precisão para modelagem detalhada.',
      image: 'assets/images/service-5.jpg'
    },
    {
      title: 'Levantamento indoor e outdoor',
      description: 'Mapeamento completo de ambientes internos e externos.',
      image: 'assets/images/service-6.jpg'
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
