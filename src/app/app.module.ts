import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule,
    ComponentsModule,
    AppComponent
  ]
})
export class AppModule { }
