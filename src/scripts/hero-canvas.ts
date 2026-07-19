/**
 * Generative hero backdrop: a drifting node-and-edge graph in which pulses of
 * activation travel a few hops from node to node — a nod to message passing
 * in neural networks. A keepalive guarantees something is always gently lit.
 * The cursor behaves like a live node: nearby dots part, brighten, and link
 * back to it, so moving the mouse energizes and pulls the local graph.
 */

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  activation: number;
};

type Pointer = {
  x: number;
  y: number;
  active: boolean;
};

type PendingHop = {
  node: Node;
  fireAtMs: number;
  hops: number;
};

const NODE_AREA_DIVISOR = 14_000;
const MAX_NODES = 180;
const EDGE_DISTANCE = 130;
const DRIFT_SPEED = 0.15;
const POINTER_RADIUS = 140;
const POINTER_FORCE = 0.6;
// The cursor acts as a live node: dots within this radius brighten and link
// back to it, so moving the mouse pulls a small constellation along.
const POINTER_LINK_RADIUS = 180;
const POINTER_GLOW = 0.55;
const ACTIVATION_DECAY = 0.005;
const ACTIVATION_CHANCE_PER_FRAME = 0.008;
const PULSE_HOPS = 3;
const HOP_DELAY_MS = 160;
const KEEPALIVE_DIM_FRAMES = 90;
const MAX_DEVICE_PIXEL_RATIO = 2;

export function startHeroCanvas(canvas: HTMLCanvasElement): void {
  const context = canvas.getContext('2d');
  if (!context) return;

  const colors = readThemeColors(canvas);
  const pointer: Pointer = { x: 0, y: 0, active: false };
  const pendingHops: PendingHop[] = [];
  let nodes: Node[] = [];
  let frameHandle = 0;
  let lastTimestamp = 0;
  let isVisible = true;
  let elapsedMs = 0;
  let dimFrames = 0;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function resize(): void {
    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DEVICE_PIXEL_RATIO);
    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    context!.setTransform(dpr, 0, 0, dpr, 0, 0);
    nodes = seedNodes(width, height);
    drawFrame();
  }

  function seedNodes(width: number, height: number): Node[] {
    const count = Math.min(Math.floor((width * height) / NODE_AREA_DIVISOR), MAX_NODES);
    const seeded: Node[] = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 2 * DRIFT_SPEED,
      vy: (Math.random() - 0.5) * 2 * DRIFT_SPEED,
      radius: 1.8 + Math.random() * 1.2,
      activation: 0,
    }));
    // Pre-lit nodes so even a static reduced-motion frame shows the identity.
    for (let i = 0; i < Math.min(3, seeded.length); i++) {
      seeded[Math.floor(Math.random() * seeded.length)]!.activation = 0.8;
    }
    return seeded;
  }

  function stepSimulation(deltaFrames: number): void {
    const { width, height } = canvas.getBoundingClientRect();
    elapsedMs += deltaFrames * 16.7;
    let brightest = 0;
    for (const node of nodes) {
      node.x = wrap(node.x + node.vx * deltaFrames, width);
      node.y = wrap(node.y + node.vy * deltaFrames, height);
      if (pointer.active) {
        pushAwayFromPointer(node, deltaFrames);
        energizeFromPointer(node);
      }
      node.activation = Math.max(0, node.activation - ACTIVATION_DECAY * deltaFrames);
      brightest = Math.max(brightest, node.activation);
    }
    firePendingHops();
    if (Math.random() < ACTIVATION_CHANCE_PER_FRAME * deltaFrames) startPulse();
    keepPulsesAlive(brightest, deltaFrames);
  }

  function keepPulsesAlive(brightest: number, deltaFrames: number): void {
    dimFrames = brightest < 0.3 ? dimFrames + deltaFrames : 0;
    if (dimFrames >= KEEPALIVE_DIM_FRAMES) {
      startPulse();
      dimFrames = 0;
    }
  }

  function pushAwayFromPointer(node: Node, deltaFrames: number): void {
    const dx = node.x - pointer.x;
    const dy = node.y - pointer.y;
    const distance = Math.hypot(dx, dy);
    if (distance === 0 || distance > POINTER_RADIUS) return;
    const falloff = (1 - distance / POINTER_RADIUS) ** 2;
    node.x += (dx / distance) * falloff * POINTER_FORCE * deltaFrames;
    node.y += (dy / distance) * falloff * POINTER_FORCE * deltaFrames;
  }

  function energizeFromPointer(node: Node): void {
    const distance = Math.hypot(node.x - pointer.x, node.y - pointer.y);
    if (distance > POINTER_LINK_RADIUS) return;
    const proximity = 1 - distance / POINTER_LINK_RADIUS;
    node.activation = Math.max(node.activation, proximity * POINTER_GLOW);
  }

  function startPulse(): void {
    const node = nodes[Math.floor(Math.random() * nodes.length)];
    if (node) activate(node, PULSE_HOPS);
  }

  function activate(node: Node, hops: number): void {
    node.activation = 1;
    if (hops <= 0) return;
    const next = nearestDimNeighbor(node);
    if (next) pendingHops.push({ node: next, fireAtMs: elapsedMs + HOP_DELAY_MS, hops: hops - 1 });
  }

  function firePendingHops(): void {
    for (let i = pendingHops.length - 1; i >= 0; i--) {
      if (pendingHops[i]!.fireAtMs > elapsedMs) continue;
      const hop = pendingHops.splice(i, 1)[0]!;
      activate(hop.node, hop.hops);
    }
  }

  function nearestDimNeighbor(origin: Node): Node | null {
    let nearest: Node | null = null;
    let nearestDistance = EDGE_DISTANCE;
    for (const node of nodes) {
      if (node === origin || node.activation > 0.5) continue;
      const distance = Math.hypot(node.x - origin.x, node.y - origin.y);
      if (distance < nearestDistance) {
        nearest = node;
        nearestDistance = distance;
      }
    }
    return nearest;
  }

  function drawFrame(): void {
    const { width, height } = canvas.getBoundingClientRect();
    context!.clearRect(0, 0, width, height);
    drawEdges();
    drawPointerLinks();
    drawNodes();
  }

  function drawPointerLinks(): void {
    if (!pointer.active) return;
    context!.strokeStyle = colors.accent;
    for (const node of nodes) {
      const distance = Math.hypot(node.x - pointer.x, node.y - pointer.y);
      if (distance > POINTER_LINK_RADIUS) continue;
      const proximity = 1 - distance / POINTER_LINK_RADIUS;
      context!.globalAlpha = proximity * 0.5;
      context!.beginPath();
      context!.moveTo(pointer.x, pointer.y);
      context!.lineTo(node.x, node.y);
      context!.stroke();
    }
    // A soft anchor at the cursor so the links read as intentional.
    context!.globalAlpha = 0.1;
    context!.fillStyle = colors.accent;
    context!.beginPath();
    context!.arc(pointer.x, pointer.y, 5, 0, Math.PI * 2);
    context!.fill();
    context!.globalAlpha = 1;
  }

  function drawEdges(): void {
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i]!;
        const b = nodes[j]!;
        const distance = Math.hypot(a.x - b.x, a.y - b.y);
        if (distance > EDGE_DISTANCE) continue;
        const proximity = 1 - distance / EDGE_DISTANCE;
        const glow = Math.max(a.activation, b.activation);
        context!.strokeStyle = glow > 0.1 ? colors.accent : colors.ink;
        context!.globalAlpha = proximity * (0.24 + glow * 0.35);
        context!.beginPath();
        context!.moveTo(a.x, a.y);
        context!.lineTo(b.x, b.y);
        context!.stroke();
      }
    }
    context!.globalAlpha = 1;
  }

  function drawNodes(): void {
    for (const node of nodes) {
      if (node.activation > 0.4) {
        context!.fillStyle = colors.accent;
        context!.globalAlpha = node.activation * 0.12;
        context!.beginPath();
        context!.arc(node.x, node.y, node.radius * 4, 0, Math.PI * 2);
        context!.fill();
      }
      context!.fillStyle = node.activation > 0.1 ? colors.accent : colors.ink;
      context!.globalAlpha = 0.42 + node.activation * 0.5;
      context!.beginPath();
      context!.arc(node.x, node.y, node.radius + node.activation * 2.5, 0, Math.PI * 2);
      context!.fill();
    }
    context!.globalAlpha = 1;
  }

  function tick(timestamp: number): void {
    const deltaFrames = lastTimestamp ? Math.min((timestamp - lastTimestamp) / 16.7, 3) : 1;
    lastTimestamp = timestamp;
    stepSimulation(deltaFrames);
    drawFrame();
    frameHandle = requestAnimationFrame(tick);
  }

  function startLoop(): void {
    if (frameHandle || reducedMotion.matches || !isVisible || document.hidden) return;
    lastTimestamp = 0;
    frameHandle = requestAnimationFrame(tick);
  }

  function stopLoop(): void {
    cancelAnimationFrame(frameHandle);
    frameHandle = 0;
  }

  function syncLoopToVisibility(): void {
    if (isVisible && !document.hidden) startLoop();
    else stopLoop();
  }

  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) {
      stopLoop();
      drawFrame();
    } else {
      startLoop();
    }
  });

  new ResizeObserver(resize).observe(canvas);

  new IntersectionObserver((entries) => {
    isVisible = entries[0]?.isIntersecting ?? true;
    syncLoopToVisibility();
  }).observe(canvas);

  document.addEventListener('visibilitychange', syncLoopToVisibility);

  const heroSection = canvas.closest('section') ?? document.body;
  heroSection.addEventListener(
    'pointermove',
    (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
      pointer.active = true;
    },
    { passive: true },
  );
  heroSection.addEventListener('pointerleave', () => {
    pointer.active = false;
  });

  resize();
  startLoop();
}

function wrap(value: number, max: number): number {
  if (value < -10) return max + 10;
  if (value > max + 10) return -10;
  return value;
}

function readThemeColors(element: HTMLElement): { ink: string; accent: string } {
  const style = getComputedStyle(element);
  return {
    ink: style.getPropertyValue('--ink-soft').trim() || '#6b6259',
    accent: style.getPropertyValue('--accent').trim() || '#9c3d1e',
  };
}
