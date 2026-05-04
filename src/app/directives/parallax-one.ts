import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  Renderer2,
  inject
} from '@angular/core';

@Directive({
  selector: '[appParallaxOne]',
  standalone: true
})
export class ParallaxOneDirective implements AfterViewInit, OnDestroy {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);

  @Input() parallaxOneSpeedX = 0;
  @Input() parallaxOneSpeedY = 0;
  @Input() parallaxOneScale = 0;
  @Input() parallaxOneBaseScale = 1;

  @Input() parallaxOneMaxX = 200;
  @Input() parallaxOneMaxY = 160;

  @Input() parallaxOneStart = 0;
  @Input() parallaxOneEnd = 1;

  @Input() parallaxOneOpacityStart: number | null = null;
  @Input() parallaxOneOpacityEnd: number | null = null;

  private rafId: number | null = null;

  ngAfterViewInit(): void {
    const element = this.elementRef.nativeElement;

    this.renderer.setStyle(element, 'will-change', 'transform, opacity');
    this.renderer.setStyle(element, 'transform-origin', 'center center');
    this.renderer.setStyle(element, 'pointer-events', 'none');

    this.updateParallax();
  }

  ngOnDestroy(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
    }
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scheduleUpdate();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.scheduleUpdate();
  }

  private scheduleUpdate(): void {
    if (this.rafId !== null) {
      return;
    }

    this.rafId = requestAnimationFrame(() => {
      this.rafId = null;
      this.updateParallax();
    });
  }

  private updateParallax(): void {
    const element = this.elementRef.nativeElement;
    const scene = element.closest('[data-parallax-one-scene]') as HTMLElement | null;

    if (!scene) {
      return;
    }

    const rect = scene.getBoundingClientRect();
    const totalScroll = Math.max(1, rect.height - window.innerHeight);
    const currentScroll = -rect.top;

    const rawProgress = this.clamp(currentScroll / totalScroll, 0, 1);
    const normalizedProgress = this.normalizeProgress(rawProgress);
    const easedProgress = this.easeOutCubic(normalizedProgress);

    const x = this.clamp(
      easedProgress * this.parallaxOneSpeedX,
      -this.parallaxOneMaxX,
      this.parallaxOneMaxX
    );

    const y = this.clamp(
      easedProgress * this.parallaxOneSpeedY,
      -this.parallaxOneMaxY,
      this.parallaxOneMaxY
    );

    const scale = this.parallaxOneBaseScale + easedProgress * this.parallaxOneScale;

    this.renderer.setStyle(
      element,
      'transform',
      `translate3d(${x}px, ${y}px, 0) scale(${scale})`
    );

    if (
      this.parallaxOneOpacityStart !== null &&
      this.parallaxOneOpacityEnd !== null
    ) {
      const opacity =
        this.parallaxOneOpacityStart +
        easedProgress * (this.parallaxOneOpacityEnd - this.parallaxOneOpacityStart);

      this.renderer.setStyle(element, 'opacity', String(this.clamp(opacity, 0, 1)));
    }
  }

  private normalizeProgress(progress: number): number {
    const start = this.clamp(this.parallaxOneStart, 0, 1);
    const end = this.clamp(this.parallaxOneEnd, 0, 1);

    if (end <= start) {
      return progress;
    }

    return this.clamp((progress - start) / (end - start), 0, 1);
  }

  private easeOutCubic(value: number): number {
    return 1 - Math.pow(1 - value, 3);
  }

  private clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  }
}