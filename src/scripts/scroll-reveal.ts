/**
 * Reveals `[data-reveal]` elements on first scroll into view. Elements
 * entering in the same observer batch get a small staggered delay.
 */

const STAGGER_MS = 70;
const MAX_STAGGER_MS = 210;

export function watchReveals(): void {
  const targets = document.querySelectorAll('[data-reveal]');
  if (targets.length === 0) return;

  const observer = new IntersectionObserver(revealEnteringBatch, {
    rootMargin: '0px 0px -12% 0px',
    threshold: 0.1,
  });
  targets.forEach((target) => observer.observe(target));

  function revealEnteringBatch(entries: IntersectionObserverEntry[]): void {
    const entering = entries
      .filter((entry) => entry.isIntersecting)
      .map((entry) => entry.target as HTMLElement)
      .sort(byDocumentOrder);

    entering.forEach((element, index) => {
      element.style.setProperty('--reveal-delay', `${Math.min(index * STAGGER_MS, MAX_STAGGER_MS)}ms`);
      element.classList.add('is-revealed');
      observer.unobserve(element);
    });
  }
}

function byDocumentOrder(a: Element, b: Element): number {
  return a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
}
