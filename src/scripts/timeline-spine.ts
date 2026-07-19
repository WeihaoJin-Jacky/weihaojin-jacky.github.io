/**
 * Drives `--spine-progress` (0..1) on each `[data-spine]` container so the
 * accent line draws as far as a "reading line" at 75% of the viewport height
 * has advanced through the container. Scrubs in both scroll directions.
 */

const READING_LINE_RATIO = 0.75;

type SpineGeometry = {
  container: HTMLElement;
  top: number;
  height: number;
};

export function startTimelineSpines(): void {
  const containers = [...document.querySelectorAll<HTMLElement>('[data-spine]')];
  if (containers.length === 0) return;

  let geometries = measure();
  let updateQueued = false;

  containers.forEach((container) => container.style.setProperty('--spine-progress', '0'));
  queueUpdate();

  window.addEventListener('scroll', queueUpdate, { passive: true });
  window.addEventListener('resize', () => {
    geometries = measure();
    queueUpdate();
  });

  function measure(): SpineGeometry[] {
    return containers.map((container) => {
      const bounds = container.getBoundingClientRect();
      return { container, top: bounds.top + window.scrollY, height: bounds.height };
    });
  }

  function queueUpdate(): void {
    if (updateQueued) return;
    updateQueued = true;
    requestAnimationFrame(() => {
      updateQueued = false;
      applyProgress();
    });
  }

  function applyProgress(): void {
    const readingLine = window.scrollY + window.innerHeight * READING_LINE_RATIO;
    for (const { container, top, height } of geometries) {
      const progress = Math.min(Math.max((readingLine - top) / height, 0), 1);
      container.style.setProperty('--spine-progress', String(progress));
    }
  }
}
