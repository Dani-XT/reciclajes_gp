import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  NgZone,
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
  private readonly zone = inject(NgZone);

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
  private removeListeners: Array<() => void> = [];

  ngAfterViewInit(): void {
    const element = this.elementRef.nativeElement;

    this.renderer.setStyle(element, 'will-change', 'transform, opacity');
    this.renderer.setStyle(element, 'transform-origin', 'center center');
    this.renderer.setStyle(element, 'pointer-events', 'none');

    this.zone.runOutsideAngular(() => {
      const onFrameRequest = () => this.scheduleUpdate();

      window.addEventListener('scroll', onFrameRequest, { passive: true });
      window.addEventListener('resize', onFrameRequest, { passive: true });

      this.removeListeners.push(() => {
        window.removeEventListener('scroll', onFrameRequest);
        window.removeEventListener('resize', onFrameRequest);
      });

      this.updateParallax();
    });
  }

  ngOnDestroy(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
    }

    this.removeListeners.forEach(remove => remove());
  }

  private scheduleUpdate(): void {
    if (this.rafId !== null) return;

    this.rafId = requestAnimationFrame(() => {
      this.rafId = null;
      this.updateParallax();
    });
  }

  private updateParallax(): void {
    const element = this.elementRef.nativeElement;
    const scene = element.closest('[data-parallax-one-scene]') as HTMLElement | null;

    if (!scene) return;

    const rect = scene.getBoundingClientRect();

    if (rect.bottom < 0 || rect.top > window.innerHeight) {
      return;
    }

    const totalScroll = Math.max(1, rect.height - window.innerHeight);
    const currentScroll = -rect.top;

    const rawProgress = this.clamp(currentScroll / totalScroll, 0, 1);
    const normalizedProgress = this.normalizeProgress(rawProgress);
    const easedProgress = this.easeOutCubic(normalizedProgress);

    /**
     * Variables globales de la escena.
     * Esto nos permite hacer atardecer, oscurecimiento del cielo,
     * aparición de estrellas, etc. desde CSS.
     */
    scene.style.setProperty('--parallax-progress', rawProgress.toFixed(4));
    scene.style.setProperty('--parallax-eased', easedProgress.toFixed(4));

    /**
     * Atardecer progresivo entre 22% y 68% del scroll.
     */
    const sunsetProgress = this.smoothStep(0.28, 0.78, rawProgress);
    scene.style.setProperty('--sunset-progress', sunsetProgress.toFixed(4));

    /**
     * Oscurecimiento cuando el sol “entra” visualmente en zona de nubes.
     * Esto simula la superposición sin tener que calcular colisiones reales.
     */
    const cloudShadowIn = this.smoothStep(0.30, 0.42, rawProgress);
    const cloudShadowOut = 1 - this.smoothStep(0.56, 0.70, rawProgress);
    const cloudShadow = this.clamp(cloudShadowIn * cloudShadowOut, 0, 1);

    scene.style.setProperty('--cloud-shadow', cloudShadow.toFixed(4));

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

    element.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;

    if (
      this.parallaxOneOpacityStart !== null &&
      this.parallaxOneOpacityEnd !== null
    ) {
      const opacity =
        this.parallaxOneOpacityStart +
        easedProgress * (this.parallaxOneOpacityEnd - this.parallaxOneOpacityStart);

      element.style.opacity = String(this.clamp(opacity, 0, 1));
    }
  }

  private smoothStep(edge0: number, edge1: number, value: number): number {
    const x = this.clamp((value - edge0) / (edge1 - edge0), 0, 1);
    return x * x * (3 - 2 * x);
  }

  private normalizeProgress(progress: number): number {
    const start = this.clamp(this.parallaxOneStart, 0, 1);
    const end = this.clamp(this.parallaxOneEnd, 0, 1);

    if (end <= start) return progress;

    return this.clamp((progress - start) / (end - start), 0, 1);
  }

  private easeOutCubic(value: number): number {
    return 1 - Math.pow(1 - value, 3);
  }

  private clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  }
}