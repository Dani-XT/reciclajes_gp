import { ChangeDetectionStrategy, Component, HostListener, signal } from '@angular/core';
import { ThemeToggle } from '../theme-toggle/theme-toggle';

@Component({
  selector: 'app-header',
  imports: [ThemeToggle],
  templateUrl: './header.html',
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Header {
  readonly isMenuOpen = signal(false);

  readonly whatsappUrl =
    'https://wa.me/56979763180?text=Hola%2C%20quiero%20solicitar%20un%20retiro%20o%20cotizar%20materiales%20reciclables.';

  toggleMenu(): void {
    this.isMenuOpen.update(value => !value);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  scrollToSection(sectionId: string, event?: Event): void {
    event?.preventDefault();

    const section = document.getElementById(sectionId);
    const header = document.querySelector('.gp-header') as HTMLElement | null;

    if (!section) return;

    const headerHeight = header?.offsetHeight ?? 80;
    const extraSpace = 12;

    const targetPosition =
      section.getBoundingClientRect().top + window.scrollY - headerHeight - extraSpace;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });

    this.closeMenu();
  }

  scrollToTop(event?: Event): void {
    event?.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    this.closeMenu();
  }

  @HostListener('window:keydown.escape')
  onEscape(): void {
    this.closeMenu();
  }
}