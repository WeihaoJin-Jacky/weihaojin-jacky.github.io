export const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

export function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}
