import {
  Component,
  Input,
  Output,
  EventEmitter,
  signal,
  HostListener,
  ElementRef,
  inject,
  AfterViewInit,
} from '@angular/core';
import { CaseCard } from '../projetos.types';

@Component({
  selector: 'app-case-modal',
  standalone: true,
  templateUrl: './case-modal.component.html',
  styleUrls: ['./case-modal.component.scss'],
})
export class CaseModalComponent implements AfterViewInit {
  @Input() case!: CaseCard;
  @Output() dismissed = new EventEmitter<void>();

  private el = inject(ElementRef);

  activeImg = signal(0);
  private touchStartX = 0;

  get isSlider(): boolean {
    return this.case.gallery.length > 1;
  }

  ngAfterViewInit(): void {
    const first = this.el.nativeElement.querySelector('button, [tabindex="0"]') as HTMLElement;
    first?.focus();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.dismissed.emit();
  }

  @HostListener('document:keydown.arrowleft')
  onArrowLeft(): void {
    if (!this.isSlider) return;
    this.prev();
  }

  @HostListener('document:keydown.arrowright')
  onArrowRight(): void {
    if (!this.isSlider) return;
    this.next();
  }

  prev(): void {
    this.activeImg.update((i) => Math.max(i - 1, 0));
  }

  next(): void {
    this.activeImg.update((i) => Math.min(i + 1, this.case.gallery.length - 1));
  }

  onBackdropClick(e: MouseEvent): void {
    if ((e.target as HTMLElement).classList.contains('cm-backdrop')) {
      this.dismissed.emit();
    }
  }

  onBackdropKeydown(e: KeyboardEvent): void {
    if (e.key === 'Enter' || e.key === ' ') {
      this.dismissed.emit();
    }
  }

  onTouchStart(e: TouchEvent): void {
    if (!this.isSlider) return;
    this.touchStartX = e.touches[0].clientX;
  }

  onTouchEnd(e: TouchEvent): void {
    if (!this.isSlider) return;
    const delta = e.changedTouches[0].clientX - this.touchStartX;
    if (Math.abs(delta) < 30) return;
    if (delta < 0) {
      this.next();
    } else {
      this.prev();
    }
  }
}
