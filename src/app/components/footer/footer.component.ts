import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  serviceLinks = [
    { label: 'Topografia', href: '#servicos' },
    { label: 'Georreferenciamento', href: '#servicos' },
    { label: 'Mapeamento 3D', href: '#servicos' },
    { label: 'Regularização', href: '#servicos' },
  ];

  techLinks = [
    { label: 'GNSS RTK', href: '#tecnologia' },
    { label: 'Estação Total', href: '#tecnologia' },
    { label: 'Drones/UAV', href: '#tecnologia' },
  ];

  companyLinks = [
    { label: 'Sobre Nós', href: '#inicio' },
    { label: 'Contato', href: '#contato' },
  ];
}
