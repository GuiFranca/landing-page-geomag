/* @standby — substituido por SceneLayerMorphComponent; mantido por decisao do projeto. */
import { Component, Input, signal } from '@angular/core';
import { NgClass } from '@angular/common';

export interface LayerDef {
  tab: string;
  title: string;
  desc: string;
  src: string;
}

@Component({
  selector: 'app-layer-stack',
  standalone: true,
  imports: [NgClass],
  templateUrl: './layer-stack.component.html',
  styleUrls: ['./layer-stack.component.scss'],
})
export class LayerStackComponent {
  @Input() layers: LayerDef[] = [];

  activeIdx = signal(0);

  setActive(i: number): void {
    this.activeIdx.set(i);
  }
}
