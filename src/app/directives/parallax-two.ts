import { AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2, inject } from '@angular/core';

@Directive({
  selector: '[appParallaxTwo]',
  standalone: true
})
export class ParallaxTwoDirective implements AfterViewInit {
  @Input() scrollSpeed = 0.1;
  @Input() mouseSpeed = 10;
  @Input() maxMovement = 120;
  @Input() layerScale = 1.12;

  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);

  private ticking = false;

  private mouseX = 0;
  private mouseY = 0;

  ngAfterViewInit(): void {
    const element = this.elementRef.nativeElement;

    this.renderer.setStyle(element, 'will-change', 'transform');
    this.renderer.setStyle(element, 'transform-origin', 'center center');
    this.renderer.setStyle(element, 'pointer-events', 'none');

    this.updatePosition();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.requestTick();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.requestTick();
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    this.mouseX = (event.clientX - centerX) / centerX;
    this.mouseY = (event.clientY - centerY) / centerY;

    this.requestTick();
  }

  private requestTick(): void {
    if (this.ticking) {
      return;
    }

    this.ticking = true;

    window.requestAnimationFrame(() => {
      this.updatePosition();
      this.ticking = false;
    });
  }

  private updatePosition(): void {
    const element = this.elementRef.nativeElement;
    const section = element.closest('[data-parallax-section]') as HTMLElement | null;

    if (!section) {
      return;
    }

    const rect = section.getBoundingClientRect();

    /*
      Mientras más baja la página, más se desplazan las capas.
    */
    const scrollMovement = -rect.top * this.scrollSpeed;

    const limitedY = Math.max(
      -this.maxMovement,
      Math.min(this.maxMovement, scrollMovement)
    );

    const mouseMovementX = this.mouseX * this.mouseSpeed;
    const mouseMovementY = this.mouseY * this.mouseSpeed;

    const finalX = mouseMovementX;
    const finalY = limitedY + mouseMovementY;

    this.renderer.setStyle(
      element,
      'transform',
      `translate3d(${finalX}px, ${finalY}px, 0) scale(${this.layerScale})`
    );
  }

}
