import { Component } from '@angular/core';

import { RevealDirective } from '../../directives/reveal.directive';

interface Client {
  name: string;
  logo: string;
}

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  standalone: true,
  imports: [RevealDirective],
})
export class ClientsComponent {
  tooltipText = '';
  tooltipX = 0;
  tooltipY = 0;
  tooltipVisible = false;

  clients: Client[] = [
    { name: 'Armelin', logo: 'assets/images/clientes/armelin.webp' },
    { name: 'Azul Empreendimentos', logo: 'assets/images/clientes/azul.webp' },
    { name: 'CAWF Empreendimentos', logo: 'assets/images/clientes/cawf.webp' },
    { name: 'CPFL Energia', logo: 'assets/images/clientes/cpfl.webp' },
    { name: 'Ferezini Engenharia', logo: 'assets/images/clientes/ferezini.webp' },
    { name: 'Fornaziero Estruturas Metálicas', logo: 'assets/images/clientes/fornaziero.webp' },
    { name: 'Granja Lobo', logo: 'assets/images/clientes/granja-lobo.webp' },
    { name: 'Longitude', logo: 'assets/images/clientes/longitude.webp' },
    { name: 'Martiterra Urbanização', logo: 'assets/images/clientes/martiterra.webp' },
    { name: 'Pet Food Solution', logo: 'assets/images/clientes/pet-food.webp' },
    { name: 'Prefeitura de Capivari', logo: 'assets/images/clientes/prefeitura-capivari.webp' },
    { name: 'Projesan', logo: 'assets/images/clientes/projesan.webp' },
    { name: 'São Carlos', logo: 'assets/images/clientes/sao-carlos.webp' },
    { name: 'Solve Brasil', logo: 'assets/images/clientes/solve.webp' },
    { name: 'Superior', logo: 'assets/images/clientes/superior.webp' },
    { name: 'Teani Engenharia', logo: 'assets/images/clientes/teani.webp' },
    { name: 'TPF Engenharia', logo: 'assets/images/clientes/tpf.webp' },
    { name: 'VEC', logo: 'assets/images/clientes/vec.webp' },
    { name: 'Vettor', logo: 'assets/images/clientes/vettor.webp' },
    { name: 'Zorzi', logo: 'assets/images/clientes/zorzi.webp' },
    { name: 'Zuin Empreendimentos', logo: 'assets/images/clientes/zuin.webp' },
  ];

  showTooltip(event: MouseEvent, name: string): void {
    const el = event.target as HTMLElement;
    const rect = el.getBoundingClientRect();
    this.tooltipText = name;
    this.tooltipX = rect.left + rect.width / 2;
    this.tooltipY = rect.top - 8;
    this.tooltipVisible = true;
  }

  hideTooltip(): void {
    this.tooltipVisible = false;
  }
}
