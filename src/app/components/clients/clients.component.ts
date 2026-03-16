import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  imports: [CommonModule, RevealDirective]
})
export class ClientsComponent {
  clients: Client[] = [
    { name: 'Armelin', logo: 'assets/images/clientes/armelin.png' },
    { name: 'Azul Empreendimentos', logo: 'assets/images/clientes/azul.png' },
    { name: 'CAWF Empreendimentos', logo: 'assets/images/clientes/cawf.png' },
    { name: 'CPFL Energia', logo: 'assets/images/clientes/cpfl.png' },
    { name: 'Ferezini Engenharia', logo: 'assets/images/clientes/ferezini.png' },
    { name: 'Fornaziero Estruturas Metálicas', logo: 'assets/images/clientes/fornaziero.png' },
    { name: 'Granja Lobo', logo: 'assets/images/clientes/granja-lobo.png' },
    { name: 'Longitude', logo: 'assets/images/clientes/longitude.png' },
    { name: 'Martiterra Urbanização', logo: 'assets/images/clientes/martiterra.png' },
    { name: 'Pet Food Solution', logo: 'assets/images/clientes/pet-food.png' },
    { name: 'Prefeitura de Capivari', logo: 'assets/images/clientes/prefeitura-capivari.png' },
    { name: 'Projesan', logo: 'assets/images/clientes/projesan.png' },
    { name: 'São Carlos', logo: 'assets/images/clientes/sao-carlos.webp' },
    { name: 'Solve Brasil', logo: 'assets/images/clientes/solve.png' },
    { name: 'Superior', logo: 'assets/images/clientes/superior.png' },
    { name: 'Teani Engenharia', logo: 'assets/images/clientes/teani.png' },
    { name: 'TPF Engenharia', logo: 'assets/images/clientes/tpf.png' },
    { name: 'VEC', logo: 'assets/images/clientes/vec.png' },
    { name: 'Vettor', logo: 'assets/images/clientes/vettor.png' },
    { name: 'Zorzi', logo: 'assets/images/clientes/zorzi.webp' },
    { name: 'Zuin Empreendimentos', logo: 'assets/images/clientes/zuin.png' },
  ];
}
