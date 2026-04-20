import {
  Component,
  Input,
  ElementRef,
  ViewChild,
  HostListener,
  signal,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-comparator',
  standalone: true,
  templateUrl: './comparator.component.html',
  styleUrls: ['./comparator.component.scss'],
})
export class ComparatorComponent {
  @Input() before = '';
  @Input() after = '';
  @Input() labelBefore = 'Ortofoto';
  @Input() labelAfter = 'CAD Vetorial';

  @ViewChild('cmpRef') cmpRef!: ElementRef<HTMLDivElement>;

  pos = signal(55);
  private dragging = false;
  private platformId = inject(PLATFORM_ID);

  get clipPath(): string {
    return `inset(0 ${100 - this.pos()}% 0 0)`;
  }

  onPointerDown(e: MouseEvent | TouchEvent): void {
    this.dragging = true;
    this.move(e);
  }

  @HostListener('document:mousemove', ['$event'])
  @HostListener('document:touchmove', ['$event'])
  onPointerMove(e: MouseEvent | TouchEvent): void {
    if (!this.dragging) return;
    this.move(e);
  }

  @HostListener('document:mouseup')
  @HostListener('document:touchend')
  onPointerUp(): void {
    this.dragging = false;
  }

  private move(e: MouseEvent | TouchEvent): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const el = this.cmpRef?.nativeElement;
    if (!el) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    this.pos.set(Math.max(2, Math.min(98, p)));
  }
}
