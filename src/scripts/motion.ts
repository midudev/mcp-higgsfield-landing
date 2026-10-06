import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initWorld } from './world';

declare global {
  interface Window {
    lenis?: Lenis;
  }
}

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Scroll suave sincronizado con ScrollTrigger.
if (!reduceMotion) {
  const lenis = new Lenis({ autoRaf: false, anchors: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  window.lenis = lenis;
}

// Entradas al hacer scroll: IntersectionObserver, nunca un listener de scroll.
const reveal = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-in');
      reveal.unobserve(entry.target);
    }
  },
  { rootMargin: '0px 0px -10% 0px' },
);
document.querySelectorAll('[data-reveal]').forEach((el) => reveal.observe(el));

// Scroll world: el paseo por Arko.
const world = document.querySelector<HTMLElement>('[data-world]');
if (world) initWorld(world, reduceMotion);

// Frase principal: cada palabra pasa del tono apagado al crema, una a una y en orden de lectura.
document.querySelectorAll<HTMLElement>('[data-words]').forEach((block) => {
  const words = [...block.querySelectorAll<HTMLElement>('[data-word]')];
  if (reduceMotion) {
    words.forEach((word) => word.classList.add('is-lit'));
    return;
  }
  ScrollTrigger.create({
    trigger: block,
    start: 'top 80%',
    end: 'bottom 45%',
    onUpdate: (self) => {
      const lit = Math.round(self.progress * words.length);
      words.forEach((word, i) => word.classList.toggle('is-lit', i < lit));
    },
  });
});

// Espirales de arena: los surcos se dibujan del centro hacia fuera.
document.querySelectorAll<SVGSVGElement>('[data-spiral-draw]').forEach((svg) => {
  const rings = svg.querySelectorAll('path');
  if (reduceMotion) return;
  gsap.set(rings, { strokeDasharray: 1, strokeDashoffset: 1 });
  gsap.to(rings, {
    strokeDashoffset: 0,
    ease: 'none',
    stagger: 0.08,
    scrollTrigger: { trigger: svg, start: 'top 85%', end: 'center 40%', scrub: 1 },
  });
});
