import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  mapsUrl =
    'https://www.google.com/maps/place/GeoMAG+-+Topografia+%26+Projetos/@-22.9980153,-47.4944111,17.31z/data=!4m6!3m5!1s0x94c61c5564326e43:0x41798ab6376e004c!8m2!3d-22.9941702!4d-47.4901624!16s%2Fg%2F11d_y8rbzt';

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
