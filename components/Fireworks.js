"use client";
import { useEffect, useRef } from "react";

const COLORS = ["#ff8fb3", "#ffc94d", "#5fa8ff", "#a98bff", "#4fd1b0", "#ff9d6c", "#f06bb0"];
const rnd = (a, b) => a + Math.random() * (b - a);

export default function Fireworks({ active }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cv = ref.current, ctx = cv.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W, H;
    const resize = () => { W = innerWidth; H = innerHeight; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    resize(); addEventListener("resize", resize);

    let rockets = [], parts = [], raf, launching = true, last = performance.now(), count = 0;
    const timers = [];
    const launch = () => rockets.push({ x: rnd(.3, .7) * W, y: H, px: 0, py: H, tx: rnd(.12, .88) * W, ty: rnd(.12, .45) * H, c: COLORS[(Math.random() * COLORS.length) | 0] });
    const burst = (x, y, c) => {
      const n = 80, top = rnd(4, 6.5);
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2 + rnd(-.04, .04), s = rnd(1.2, top);
        parts.push({ x, y, px: x, py: y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 1, decay: rnd(.007, .014), c: Math.random() < .22 ? "#ffd36b" : c });
      }
    };
    const loop = (now) => {
      const k = Math.min((now - last) / 16.7, 3); last = now;
      ctx.clearRect(0, 0, W, H);
      ctx.lineCap = "round";
      rockets = rockets.filter((r) => {
        r.px = r.x; r.py = r.y;
        r.x += (r.tx - r.x) * .05 * k; r.y += (r.ty - r.y) * .05 * k;
        ctx.globalAlpha = 1; ctx.strokeStyle = r.c; ctx.lineWidth = 2.5;
        ctx.beginPath(); ctx.moveTo(r.px, r.py); ctx.lineTo(r.x, r.y); ctx.stroke();
        if (Math.hypot(r.tx - r.x, r.ty - r.y) < 10) { burst(r.x, r.y, r.c); return false; }
        return true;
      });
      parts = parts.filter((p) => {
        p.px = p.x; p.py = p.y;
        p.vx *= Math.pow(.985, k); p.vy = p.vy * Math.pow(.985, k) + .05 * k;
        p.x += p.vx * k; p.y += p.vy * k; p.life -= p.decay * k;
        if (p.life <= 0) return false;
        ctx.globalAlpha = Math.max(p.life, 0); ctx.strokeStyle = p.c; ctx.lineWidth = 2.4;
        ctx.beginPath(); ctx.moveTo(p.px, p.py); ctx.lineTo(p.x, p.y); ctx.stroke();
        return true;
      });
      if (launching || rockets.length || parts.length) raf = requestAnimationFrame(loop);
      else ctx.clearRect(0, 0, W, H);
    };
    timers.push(setTimeout(() => {
      last = performance.now();
      raf = requestAnimationFrame(loop);
      launch(); timers.push(setTimeout(launch, 200)); timers.push(setTimeout(launch, 400));
      const iv = setInterval(() => { launch(); if (++count > 15) { clearInterval(iv); launching = false; } }, 380);
      timers.push(iv);
    }, 800));
    return () => { cancelAnimationFrame(raf); timers.forEach((t) => { clearTimeout(t); clearInterval(t); }); removeEventListener("resize", resize); };
  }, [active]);
  return <canvas ref={ref} className="fw" aria-hidden />;
}
