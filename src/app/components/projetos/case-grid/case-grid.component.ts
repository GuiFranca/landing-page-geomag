/* @standby — substituido por SceneStripComponent + CaseModalComponent; mantido por decisao do projeto. */
import { Component, Input, signal, HostListener } from '@angular/core';

export interface CaseSpec {
  label: string;
  value: string;
}

export interface CaseGalleryItem {
  src: string;
  label: string;
}

export interface CaseItem {
  tag: string;
  title: string;
  meta: string;
  img: string;
  desc: string;
  gallery: CaseGalleryItem[];
  specs: CaseSpec[];
}

@Component({
  selector: 'app-case-grid',
  standalone: true,
  imports: [],
  templateUrl: './case-grid.component.html',
  styleUrls: ['./case-grid.component.scss'],
})
export class CaseGridComponent {
  @Input() cases: CaseItem[] = [];

  modalCase = signal<CaseItem | null>(null);

  openModal(c: CaseItem): void {
    this.modalCase.set(c);
  }

  openModalFromKeyboard(e: KeyboardEvent, c: CaseItem): void {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.openModal(c);
    }
  }

  closeModal(): void {
    this.modalCase.set(null);
  }

  onBackdropClick(e: MouseEvent): void {
    if ((e.target as HTMLElement).classList.contains('pj-modal')) {
      this.closeModal();
    }
  }

  onBackdropKeydown(e: KeyboardEvent): void {
    if (e.key === 'Enter' || e.key === ' ') {
      this.closeModal();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeModal();
  }
}
