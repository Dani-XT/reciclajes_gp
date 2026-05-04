import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { ThemeService } from '../../../../services/theme';

import { ParallaxOneDirective } from '../../../../directives/parallax-one';

@Component({
  selector: 'app-parallax-one',
  standalone: true,
  imports: [CommonModule, ParallaxOneDirective],
  templateUrl: './parallax-one.html',
  styleUrl: './parallax-one.css'
})
export class ParallaxOne {
  readonly themeService = inject(ThemeService);

  readonly dayPath = 'assets/parallax/parallax-one/day';
  readonly nightPath = 'assets/parallax/parallax-one/night';

  get basePath(): string {
    return this.themeService.isDark() ? this.nightPath : this.dayPath;
  }

  get fondo(): string {
    return `${this.basePath}/fondo.png`;
  }

  get montana(): string {
    return `${this.basePath}/montana.png`;
  }

  get bodega(): string {
    return `${this.basePath}/bodega.png`;
  }

  get carretera(): string {
    return `${this.basePath}/carretera.png`;
  }

  get camion(): string {
    return `${this.basePath}/camion.png`;
  }

  get primerPlano(): string {
    return `${this.basePath}/primer-plano.png`;
  }
}