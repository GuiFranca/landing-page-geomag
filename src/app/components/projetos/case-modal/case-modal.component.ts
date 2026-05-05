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
}
