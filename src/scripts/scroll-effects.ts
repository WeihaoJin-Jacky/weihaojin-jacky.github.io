/**
 * Page-level orchestrator: one observer drives entry reveals and spine-node
 * light-ups (via the .is-revealed class). Under reduced motion nothing runs —
 * the CSS defaults in motion.css already render the page fully visible and
 * static.
 */

import { reducedMotionQuery } from './motion';
import { watchReveals } from './scroll-reveal';
import { startTimelineSpines } from './timeline-spine';

export function startScrollEffects(): void {
  if (reducedMotionQuery.matches) return;

  watchReveals();
  startTimelineSpines();
}
