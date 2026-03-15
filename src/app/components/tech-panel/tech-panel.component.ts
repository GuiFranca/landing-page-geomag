import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-tech-panel',
  templateUrl: './tech-panel.component.html',
  styleUrls: ['./tech-panel.component.scss'],
  standalone: true,
  imports: [CommonModule, RevealDirective]
})
export class TechPanelComponent {
  technologies = [
    {
      name: 'GNSS/RTK',
      description: 'Posicionamento por satélite com precisão centimétrica em tempo real.',
      iconPath: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'
    },
    {
      name: 'Estação Total',
      description: 'Medição angular e de distâncias com tecnologia robótica automatizada.',
      iconPath: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 100 6 3 3 0 000-6z'
    },
    {
      name: 'Drones',
      description: 'Aerofotogrametria e mapeamento aéreo com câmeras de alta resolução.',
      iconPath: 'M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z'
    },
  ];
}
