import { Component, inject, signal } from '@angular/core';
import { ThemeService } from '../../../services/theme';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [],
  templateUrl: './theme-toggle.html',
  styleUrl: './theme-toggle.css'
})
export class ThemeToggle {
  themeService = inject(ThemeService);

  readonly isChanging = signal(false);

  private readonly animationDuration = 700;

  onToggleTheme(): void {
    if (this.isChanging()) {
      return;
    }

    this.isChanging.set(true);
    this.themeService.toggleTheme();

    window.setTimeout(() => {
      this.isChanging.set(false);
    }, this.animationDuration);
  }
}