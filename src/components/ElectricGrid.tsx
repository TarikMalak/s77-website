'use client';

import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface Pulse {
  fromIdx: number;
  toIdx: number;
  progress: number;
  speed: number;
}

const NODE_COUNT = 60;
const CONNECTION_DIST = 200;
const PULSE_CHANCE = 0.003;
const ACCENT = { r: 108, g: 99, b: 255 }; // #6C63FF

export default function ElectricGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf: number;
    let w = 0;
    let h = 0;

    const nodes: Node[] = [];
    const pulses: Pulse[] = [];

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      w = canvas!.clientWidth;
      h = canvas!.clientHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function init() {
      resize();
      nodes.length = 0;
      for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
        });
      }
    }

    function tick() {
      ctx!.clearRect(0, 0, w, h);

      // Move nodes
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.12;
            ctx!.beginPath();
            ctx!.moveTo(nodes[i].x, nodes[i].y);
            ctx!.lineTo(nodes[j].x, nodes[j].y);
            ctx!.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx!.lineWidth = 0.5;
            ctx!.stroke();

            // Maybe spawn a pulse
            if (Math.random() < PULSE_CHANCE) {
              pulses.push({
                fromIdx: i,
                toIdx: j,
                progress: 0,
                speed: 0.01 + Math.random() * 0.02,
              });
            }
          }
        }
      }

      // Draw & advance pulses
      for (let p = pulses.length - 1; p >= 0; p--) {
        const pulse = pulses[p];
        pulse.progress += pulse.speed;
        if (pulse.progress > 1) {
          pulses.splice(p, 1);
          continue;
        }

        const from = nodes[pulse.fromIdx];
        const to = nodes[pulse.toIdx];
        const px = from.x + (to.x - from.x) * pulse.progress;
        const py = from.y + (to.y - from.y) * pulse.progress;

        // Glow
        const gradient = ctx!.createRadialGradient(px, py, 0, px, py, 20);
        gradient.addColorStop(0, `rgba(${ACCENT.r}, ${ACCENT.g}, ${ACCENT.b}, 0.6)`);
        gradient.addColorStop(0.5, `rgba(${ACCENT.r}, ${ACCENT.g}, ${ACCENT.b}, 0.15)`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx!.beginPath();
        ctx!.arc(px, py, 20, 0, Math.PI * 2);
        ctx!.fillStyle = gradient;
        ctx!.fill();

        // Bright core
        ctx!.beginPath();
        ctx!.arc(px, py, 1.5, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255, 255, 255, 0.8)`;
        ctx!.fill();
      }

      // Draw nodes (small dots)
      for (const n of nodes) {
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, 1, 0, Math.PI * 2);
        ctx!.fillStyle = 'rgba(255, 255, 255, 0.15)';
        ctx!.fill();
      }

      raf = requestAnimationFrame(tick);
    }

    init();
    raf = requestAnimationFrame(tick);

    const onResize = () => {
      resize();
      // Re-clamp nodes
      for (const n of nodes) {
        if (n.x > w) n.x = w;
        if (n.y > h) n.y = h;
      }
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
