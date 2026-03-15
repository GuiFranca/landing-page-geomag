import { Component } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { MetricsComponent } from '../metrics/metrics.component';
import { ServicesComponent } from '../services/services.component';
import { TechPanelComponent } from '../tech-panel/tech-panel.component';
import { CtaComponent } from '../cta/cta.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    HeroComponent,
    MetricsComponent,
    ServicesComponent,
    TechPanelComponent,
    CtaComponent,
  ]
})
export class HomeComponent {
  whatsappFloatUrl = `https://wa.me/${environment.whatsappNumber}?text=Ol%C3%A1%2C%20preciso%20de%20ajuda%20com%20topografia.`;
}
