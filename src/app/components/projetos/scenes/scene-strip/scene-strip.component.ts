import { Component, Input } from '@angular/core';
import { CaseCard } from '../../projetos.types';

@Component({
  selector: 'app-scene-strip',
  standalone: true,
  templateUrl: './scene-strip.component.html',
  styleUrls: ['./scene-strip.component.scss'],
})
export class SceneStripComponent {
  @Input() cases: CaseCard[] = [];
}
