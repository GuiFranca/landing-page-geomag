import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ServicesComponent {
  services = [
    {
      title: 'Levantamento planialtimétrico',
      description: 'Mapeamento detalhado do terreno com curvas de nível e elementos existentes. Essencial para projetos de engenharia, arquitetura e urbanismo, fornecendo informações precisas sobre a topografia do terreno.',
      image: 'assets/images/service-1.jpg',
      features: [
        'Representação das curvas de nível',
        'Localização de construções existentes',
        'Identificação de vegetação e corpos d\'água',
        'Determinação de limites e divisas'
      ]
    },
    {
      title: 'Locação e demarcação de áreas',
      description: 'Definição precisa de limites e áreas para construção e regularização. Serviço fundamental para garantir que a execução da obra siga fielmente o projeto, evitando erros e retrabalhos.',
      image: 'assets/images/service-2.jpg',
      features: [
        'Demarcação de lotes e terrenos',
        'Locação de eixos e elementos construtivos',
        'Verificação de alinhamentos e níveis',
        'Controle de execução de obras'
      ]
    },
    {
      title: 'Aerolevantamento',
      description: 'Captura de imagens aéreas para mapeamento e análise de grandes áreas. Utilizamos drones e equipamentos de última geração para obter imagens de alta resolução e precisão.',
      image: 'assets/images/service-3.jpg',
      features: [
        'Mapeamento de grandes áreas',
        'Geração de ortofotomosaicos',
        'Modelos digitais de terreno (MDT)',
        'Análise de uso e ocupação do solo'
      ]
    },
    {
      title: 'Batimetria',
      description: 'Medição de profundidade e relevo de corpos d\'água como rios, lagos e represas. Essencial para projetos hidráulicos, dragagem e estudos ambientais.',
      image: 'assets/images/service-4.jpg',
      features: [
        'Mapeamento de leitos de rios e lagos',
        'Cálculo de volumes de reservatórios',
        'Estudos para projetos de dragagem',
        'Monitoramento de assoreamento'
      ]
    },
    {
      title: 'Laser Scanner (Lidar)',
      description: 'Escaneamento 3D de alta precisão para modelagem detalhada de estruturas, terrenos e ambientes complexos, gerando nuvens de pontos com milhões de medições.',
      image: 'assets/images/service-5.jpg',
      features: [
        'Modelagem 3D de estruturas',
        'Levantamento de fachadas e monumentos',
        'Documentação de patrimônio histórico',
        'Análise de deformações e patologias'
      ]
    },
    {
      title: 'Levantamento indoor e outdoor',
      description: 'Mapeamento completo de ambientes internos e externos, integrando diferentes tecnologias para fornecer uma visão completa do espaço.',
      image: 'assets/images/service-6.jpg',
      features: [
        'Plantas baixas detalhadas',
        'Modelagem BIM para edificações',
        'Integração com projetos arquitetônicos',
        'Documentação as-built'
      ]
    }
  ];
}
