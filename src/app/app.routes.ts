import { Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { ServicesComponent } from './components/services/services.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'servicos', component: ServicesComponent },
  { path: 'sobre', component: AboutComponent },
  { path: 'contato', component: ContactComponent },
  { path: '**', redirectTo: '' },
];
