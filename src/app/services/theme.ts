import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';

type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly storageKey = 'reciclajes-gp-theme';

  private readonly _theme = signal<Theme>('light');

  readonly theme = this._theme.asReadonly();

  constructor() {
    const savedTheme = localStorage.getItem(this.storageKey) as Theme | null;

    // Ignora la preferencia del sistema.
    // Si no hay tema guardado, siempre inicia en light.
    this.setTheme(savedTheme ?? 'light');
  }

  setTheme(theme: Theme): void {
    this._theme.set(theme);
    localStorage.setItem(this.storageKey, theme);

    this.document.documentElement.classList.toggle('dark', theme === 'dark');
  }

  toggleTheme(): void {
    const nextTheme: Theme = this._theme() === 'dark' ? 'light' : 'dark';
    this.setTheme(nextTheme);
  }

  isDark(): boolean {
    return this._theme() === 'dark';
  }
}