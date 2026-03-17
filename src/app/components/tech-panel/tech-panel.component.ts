import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-tech-panel',
  templateUrl: './tech-panel.component.html',
  styleUrls: ['./tech-panel.component.scss'],
  standalone: true,
  imports: [CommonModule, RevealDirective],
})
export class TechPanelComponent {
  technologies = [
    {
      name: 'GNSS/RTK',
      description: 'Posicionamento por satélite com precisão centimétrica em tempo real.',
      icon: 'assets/images/services/rover.png',
    },
    {
      name: 'Estação Total',
      description: 'Medição angular e de distâncias com tecnologia robótica automatizada.',
      icon: 'assets/images/services/estacao-total.png',
    },
    {
      name: 'Drones',
      description: 'Aerofotogrametria e mapeamento aéreo com câmeras de alta resolução.',
      icon: 'assets/images/services/drone.png',
    },
  ];
}
