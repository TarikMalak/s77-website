'use client';

import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  phase: number; // for subtle breathing
}

interface Pulse {
  fromIdx: number;
  toIdx: number;
  progress: number;
  speed: number;
}

const NODE_COUNT = 40;
const CONNECTION_DIST = 280;
const PULSE_CHANCE = 0.005;
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
    let time = 0;

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
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    function tick() {
      ctx!.clearRect(0, 0, w, h);
      time += 0.016; // ~60fps

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
            const alpha = (1 - dist / CONNECTION_DIST) * 0.28;
            ctx!.beginPath();
            ctx!.moveTo(nodes[i].x, nodes[i].y);
            ctx!.lineTo(nodes[j].x, nodes[j].y);
            ctx!.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx!.lineWidth = 0.9;
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

        // Glow — larger and stronger
        const gradient = ctx!.createRadialGradient(px, py, 0, px, py, 40);
        gradient.addColorStop(0, `rgba(${ACCENT.r}, ${ACCENT.g}, ${ACCENT.b}, 1)`);
        gradient.addColorStop(0.3, `rgba(${ACCENT.r}, ${ACCENT.g}, ${ACCENT.b}, 0.35)`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx!.beginPath();
        ctx!.arc(px, py, 40, 0, Math.PI * 2);
        ctx!.fillStyle = gradient;
        ctx!.fill();

        // Bright core
        ctx!.beginPath();
        ctx!.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx!.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx!.fill();
      }

      // Draw nodes — subtle breathing dots
      for (const n of nodes) {
        const breath = 0.015 + Math.sin(time * 1.5 + n.phase) * 0.01;
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, 0.6, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255, 255, 255, ${breath})`;
        ctx!.fill();
      }

      raf = requestAnimationFrame(tick);
    }

    init();
    raf = requestAnimationFrame(tick);

    const onResize = () => {
      resize();
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
