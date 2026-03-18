import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  standalone: true,
  imports: [],
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('topoCanvas', { static: false }) topoCanvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('vizCanvas', { static: false }) vizCanvasRef!: ElementRef<HTMLCanvasElement>;

  whatsappUrl = `https://wa.me/${environment.whatsappNumber}?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20um%20or%C3%A7amento%20para%20servi%C3%A7os%20de%20topografia.`;

  stats = [
    { value: '500', suffix: '+', label: 'Projetos\nEntregues' },
    { value: '15', suffix: '+', label: 'Anos de\nExperiência' },
    { value: '98', suffix: '%', label: 'Clientes\nSatisfeitos' },
  ];

  private resizeHandler?: () => void;
  private resizeTimeout?: ReturnType<typeof setTimeout>;

  // Seeded PRNG for consistent contour lines across reloads
  private seed = 42;
  private seededRandom(): number {
    this.seed = (this.seed * 16807 + 0) % 2147483647;
    return (this.seed - 1) / 2147483646;
  }
  private resetSeed(): void {
    this.seed = 42;
  }

  ngAfterViewInit(): void {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    this.drawCanvases();
    this.resizeHandler = () => {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => this.drawCanvases(), 200);
    };
    window.addEventListener('resize', this.resizeHandler);
  }

  ngOnDestroy(): void {
    if (this.resizeHandler) window.removeEventListener('resize', this.resizeHandler);
    clearTimeout(this.resizeTimeout);
  }

  private drawCanvases(): void {
    this.drawTopoLines(this.topoCanvasRef?.nativeElement);
    this.drawTopoLines(this.vizCanvasRef?.nativeElement, true);
  }

  private drawTopoLines(canvas: HTMLCanvasElement | undefined, circular = false): void {
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    this.resetSeed();

    if (circular) {
      ctx.beginPath();
      ctx.arc(
        canvas.width / 2,
        canvas.height / 2,
        Math.min(canvas.width, canvas.height) / 2,
        0,
        Math.PI * 2,
      );
      ctx.clip();
    }

    const lineCount = 10;
    for (let i = 0; i < lineCount; i++) {
      const opacity = 0.08 + this.seededRandom() * 0.07;
      ctx.strokeStyle = `rgba(74, 128, 164, ${opacity})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      const startY = (canvas.height / (lineCount + 1)) * (i + 1) + (this.seededRandom() - 0.5) * 40;
      ctx.moveTo(0, startY);
      const segments = 4 + Math.floor(this.seededRandom() * 2);
      const segW = canvas.width / segments;
      for (let s = 0; s < segments; s++) {
        const cp1x = segW * s + segW * 0.3;
        const cp1y = startY + (this.seededRandom() - 0.5) * 60;
        const cp2x = segW * s + segW * 0.7;
        const cp2y = startY + (this.seededRandom() - 0.5) * 60;
        const endX = segW * (s + 1);
        const endY = startY + (this.seededRandom() - 0.5) * 30;
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);
      }
      ctx.stroke();
    }
  }
}
