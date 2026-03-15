import { Component } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-cta',
  templateUrl: './cta.component.html',
  styleUrls: ['./cta.component.scss'],
  standalone: true,
  imports: [RevealDirective]
})
export class CtaComponent {
  whatsappUrl = `https://wa.me/${environment.whatsappNumber}?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20servi%C3%A7os%20da%20GeoMAG.`;
  emailUrl = 'mailto:contato@geomag.com.br';
}
