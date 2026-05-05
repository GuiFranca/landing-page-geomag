import {
  Component,
  Input,
  signal,
  inject,
  PLATFORM_ID,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Layer, ProjectMeta, VideoAsset } from '../../projetos.types';

@Component({
  selector: 'app-scene-layer-morph',
  standalone: true,
  templateUrl: './scene-layer-morph.component.html',
  styleUrls: ['./scene-layer-morph.component.scss'],
})
export class SceneLayerMorphComponent implements AfterViewInit, OnDestroy {
  @Input() project!: ProjectMeta;
  @Input() layers: Layer[] = [];
  @Input() embeddedVideo?: VideoAsset;

  @ViewChild('containerRef') containerRef?: ElementRef<HTMLElement>;

  private platformId = inject(PLATFORM_ID);
  private observer?: IntersectionObserver;
  private intervalId?: ReturnType<typeof setInterval>;

  activeIdx = signal(0);
  isMobile = false;
  prefersReducedMotion = false;

  private touchStartX = 0;

  get totalLayers(): number {
    return this.layers.length + (this.embeddedVideo ? 1 : 0);
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.isMobile = window.innerWidth <= 768;
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (this.isMobile || this.prefersReducedMotion) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          this.startAutoAdvance();
        } else {
          this.stopAutoAdvance();
        }
      },
      { threshold: 0.5 },
    );

    const el = this.containerRef?.nativeElement;
    if (el) this.observer.observe(el);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.stopAutoAdvance();
  }

  setActive(i: number): void {
    this.stopAutoAdvance();
    this.activeIdx.set(i);
  }

  onTouchStart(e: TouchEvent): void {
    this.touchStartX = e.touches[0].clientX;
  }

  onTouchEnd(e: TouchEvent): void {
    const delta = e.changedTouches[0].clientX - this.touchStartX;
    if (Math.abs(delta) < 30) return;
    if (delta < 0) {
      this.activeIdx.update((i) => Math.min(i + 1, this.totalLayers - 1));
    } else {
      this.activeIdx.update((i) => Math.max(i - 1, 0));
    }
  }

  private startAutoAdvance(): void {
    this.intervalId = setInterval(() => {
      this.activeIdx.update((i) => (i + 1) % this.totalLayers);
    }, 3000);
  }

  private stopAutoAdvance(): void {
    if (this.intervalId) clearInterval(this.intervalId);
  }
}
