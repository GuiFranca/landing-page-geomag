import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss'],
  standalone: true,
  imports: [CommonModule, RevealDirective]
})
export class MetricsComponent {
  metrics = [
    { value: '500', unit: '+', label: 'Projetos Entregues' },
    { value: '15', unit: '+', label: 'Anos de Experiência' },
    { value: '98', unit: '%', label: 'Clientes Satisfeitos' },
    { value: '3', unit: '', label: 'Estados Atendidos' },
  ];
}
