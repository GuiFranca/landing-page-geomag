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
import { VideoAsset, Stat } from '../../projetos.types';

@Component({
  selector: 'app-scene-hero',
  standalone: true,
  templateUrl: './scene-hero.component.html',
  styleUrls: ['./scene-hero.component.scss'],
})
export class SceneHeroComponent implements AfterViewInit, OnDestroy {
  @Input() video!: VideoAsset;
  @Input() title = '';
  @Input() kicker = '';
  @Input() stats: Stat[] = [];

  @ViewChild('videoRef') videoRef?: ElementRef<HTMLVideoElement>;

  private platformId = inject(PLATFORM_ID);
  private observer?: IntersectionObserver;

  isMobile = signal(false);
  prefersReducedMotion = false;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.isMobile.set(window.innerWidth <= 768);
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (this.isMobile() || this.prefersReducedMotion) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const vid = this.videoRef?.nativeElement;
          if (vid && !vid.src) {
            vid.src = this.video.src;
            vid.load();
          }
          this.observer?.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    const el = this.videoRef?.nativeElement;
    if (el) this.observer.observe(el);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
