import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  imports: [CommonModule]
})
export class AboutComponent {
  team = [
    {
      name: 'Nome do Profissional 1',
      position: 'Engenheiro Civil',
      bio: 'Profissional com mais de 10 anos de experiência em projetos de topografia e engenharia.',
      image: 'assets/images/team-1.jpg'
    },
    {
      name: 'Nome do Profissional 2',
      position: 'Topógrafo',
      bio: 'Especialista em levantamentos topográficos e georreferenciamento.',
      image: 'assets/images/team-2.jpg'
    },
    {
      name: 'Nome do Profissional 3',
      position: 'Engenheiro Ambiental',
      bio: 'Responsável por estudos ambientais e projetos sustentáveis.',
      image: 'assets/images/team-3.jpg'
    }
  ];
}
