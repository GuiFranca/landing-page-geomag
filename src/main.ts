import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, withHashLocation } from '@angular/router';
import { routes } from './app/app.routes';
import { inject } from '@vercel/analytics';

// Initialize Vercel Web Analytics
inject();

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withHashLocation())
  ]
}).catch(err => console.error(err));
