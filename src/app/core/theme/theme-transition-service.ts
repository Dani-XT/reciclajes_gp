import { DOCUMENT } from '@angular/common';
import { Injectable, NgZone, inject, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeTransitionService {
  private readonly document = inject(DOCUMENT);
  private readonly zone = inject(NgZone);

  private readonly isRunningSignal = signal(false);

  readonly isRunning = this.isRunningSignal.asReadonly();

  private readonly switchingClass = 'theme-switching';
  private readonly fallbackTimeoutMs = 2000;

  private activeController: AbortController | null = null;
  private activeRun: Promise<void> | null = null;

  run(hostElement: HTMLElement, changeTheme: () => void): Promise<void> {
    if (this.activeRun) {
      return this.activeRun;
    }

    const controller = new AbortController();
    this.activeController = controller;

    this.isRunningSignal.set(true);
    this.document.documentElement.classList.add(this.switchingClass);

    this.activeRun = this.executeRun(hostElement, changeTheme, controller);

    return this.activeRun;
  }

  cancel(): void {
    this.activeController?.abort();
    this.cleanup();
  }

  private async executeRun(
    hostElement: HTMLElement,
    changeTheme: () => void,
    controller: AbortController
  ): Promise<void> {
    try {
      changeTheme();

      await this.zone.runOutsideAngular(() =>
        this.waitForAnimations(hostElement, controller.signal)
      );
    } finally {
      if (this.activeController === controller) {
        this.cleanup();
      }
    }
  }

  private cleanup(): void {
    this.document.documentElement.classList.remove(this.switchingClass);

    this.activeController = null;
    this.activeRun = null;

    this.zone.run(() => {
      this.isRunningSignal.set(false);
    });
  }

  private async waitForAnimations(
    element: HTMLElement,
    signal: AbortSignal
  ): Promise<void> {
    await this.nextFrame();
    await this.nextFrame();

    if (signal.aborted) {
      return;
    }

    const animations = element
      .getAnimations({ subtree: true })
      .filter((animation) => this.isFiniteAnimation(animation))
      .filter((animation) => this.isRelevantAnimation(animation, element))
      .filter((animation) => animation.playState !== 'finished');

    if (animations.length === 0) {
      return;
    }

    await Promise.race([
      Promise.allSettled(animations.map((animation) => animation.finished)),
      this.waitForAbort(signal),
      this.wait(this.fallbackTimeoutMs, signal),
    ]);
  }

  private isRelevantAnimation(
    animation: Animation,
    hostElement: HTMLElement
  ): boolean {
    const effect = animation.effect as KeyframeEffect | null;
    const target = effect?.target;

    if (!(target instanceof Element)) {
      return false;
    }

    return (
      target === hostElement ||
      target.hasAttribute('data-theme-animation')
    );
  }

  private isFiniteAnimation(animation: Animation): boolean {
    const timing = animation.effect?.getComputedTiming();

    if (!timing) {
      return true;
    }

    return timing.iterations !== Infinity;
  }

  private nextFrame(): Promise<void> {
    return new Promise((resolve) => {
      requestAnimationFrame(() => resolve());
    });
  }

  private waitForAbort(signal: AbortSignal): Promise<void> {
    return new Promise((resolve) => {
      if (signal.aborted) {
        resolve();
        return;
      }

      signal.addEventListener('abort', () => resolve(), { once: true });
    });
  }

  private wait(ms: number, signal: AbortSignal): Promise<void> {
    return new Promise((resolve) => {
      if (signal.aborted) {
        resolve();
        return;
      }

      const timeoutId = window.setTimeout(resolve, ms);

      signal.addEventListener(
        'abort',
        () => {
          window.clearTimeout(timeoutId);
          resolve();
        },
        { once: true }
      );
    });
  }
}