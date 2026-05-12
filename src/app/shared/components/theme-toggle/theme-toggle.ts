import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  computed,
  inject,
} from '@angular/core';
import { ThemeService } from '@slateui/theme';
import { ThemeTransitionService } from '../../../core/theme';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [],
  templateUrl: './theme-toggle.html',
  styleUrl: './theme-toggle.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeToggle {
  @ViewChild('toggleThemeButton', { static: true })
  private readonly toggleButton!: ElementRef<HTMLButtonElement>;

  private readonly themeService = inject(ThemeService);
  private readonly themeTransition = inject(ThemeTransitionService);

  readonly isDark = computed(() => this.themeService.isDark());

  readonly isChanging = this.themeTransition.isRunning;

  readonly ariaLabel = computed(() =>
    this.isDark() ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'
  );

  readonly switchText = computed(() =>
    this.isDark() ? 'Modo oscuro activado' : 'Modo oscuro desactivado'
  );

  async onToggleTheme(): Promise<void> {
    if (this.isChanging()) {
      return;
    }

    try {
      await this.themeTransition.run(
        this.toggleButton.nativeElement,
        () => {
          const nextTheme = this.isDark() ? 'light' : 'dark';
          this.themeService.setTheme(nextTheme);
        }
      );
    } catch (error) {
      console.warn('No se pudo cambiar el tema:', error);
    }
  }
}