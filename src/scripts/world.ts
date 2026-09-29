// Motor del recorrido. Método de oso95/scroll-world adaptado a GSAP + Lenis y a
// un solo vídeo: los cinco tramos de Higgsfield unidos con ffmpeg (fundido de 4
// fotogramas en cada unión) y codificados con todos los fotogramas como keyframe.
// El vídeo está pausado y el scroll decide su currentTime. El tramo N va del
// centro del bloque de texto N al centro del N+1, así que el scroll siempre
// mueve la cámara y no hay cambios de vídeo que den tirones.
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const mobileQuery = window.matchMedia('(max-width: 1023px)');

// Cada tramo dura 121 fotogramas a 24 fps y se solapa 4 con el siguiente.
const FPS = 24;
const CLIP = 121 / FPS;
const XFADE = 4 / FPS;
// Segundo del vídeo en el que la cámara está en cada parada.
const STOP_TIME = [0, 1, 2, 3, 4].map((k) => (k === 0 ? 0 : k * (CLIP - XFADE) + XFADE / 2));
STOP_TIME.push(5 * CLIP - 4 * XFADE - 1 / FPS);
// Fundido entre la foto (con su cinemagraph) y el vídeo al principio y al final.
const END_FADE = 0.3;

const clamp = (x: number, min = 0, max = 1) => Math.min(max, Math.max(min, x));
const smooth = (x: number) => {
  const t = clamp(x);
  return t * t * (3 - 2 * t);
};

type StopLayer = {
  el: HTMLElement;
  label: string;
  cine: HTMLVideoElement | null;
  cineStatus: 'idle' | 'loading' | 'ready';
  opacity: number;
};

let lenis: Lenis | null = null;

// El vídeo no compite con el LCP: se empieza a cargar tras el evento load
// (en un momento libre) o en cuanto el visitante interactúa. Hasta entonces se ve
// la foto de la parada, que es el póster.
let mediaAllowed = false;
function allowMediaSoon() {
  const allow = () => (mediaAllowed = true);
  const onLoad = () =>
    'requestIdleCallback' in window ? requestIdleCallback(allow, { timeout: 2500 }) : setTimeout(allow, 1200);
  if (document.readyState === 'complete') onLoad();
  else window.addEventListener('load', onLoad, { once: true });
  for (const type of ['pointerdown', 'touchstart', 'wheel', 'keydown']) {
    window.addEventListener(type, allow, { once: true, passive: true });
  }
}

function initSmoothScroll() {
  if (reduceMotion) return;
  lenis = new Lenis({ lerp: 0.08, wheelMultiplier: 0.9 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

function initWorld() {
  const stage = document.querySelector<HTMLElement>('[data-stage]');
  const tourVideo = stage?.querySelector<HTMLVideoElement>('[data-tour]');
  const blocks = [...document.querySelectorAll<HTMLElement>('[data-stop]')];
  if (!stage || !tourVideo || blocks.length < 2) return;
  const video: HTMLVideoElement = tourVideo;

  const caption = document.querySelector<HTMLElement>('[data-stage-caption]');
  const captionLabel = caption?.querySelector<HTMLElement>('[data-caption-label]');
  const ambient = document.querySelector<HTMLCanvasElement>('[data-ambient]');
  const ambientCtx = ambient?.getContext('2d', { alpha: false }) ?? null;
  const labels = ['La entrada', 'Los espejos', 'La mesa especial', 'El comedor', 'La barra', 'El reservado de mimbre'];
  const last = blocks.length - 1;

  const stops: StopLayer[] = [...stage.querySelectorAll<HTMLElement>('[data-stop-layer]')].map((el, k) => ({
    el,
    label: labels[k] ?? '',
    cine: el.querySelector<HTMLVideoElement>('[data-cine]'),
    cineStatus: 'idle',
    opacity: k === 0 ? 1 : 0,
  }));

  // Un único ScrollTrigger en modo scrub, del centro del primer bloque al del último.
  // "marks" guarda dónde cae el centro de cada bloque dentro de ese recorrido (0 a 1).
  const scrub = { p: 0 };
  let marks = blocks.map((_, k) => k / last);
  const measure = (self: ScrollTrigger) => {
    const span = self.end - self.start || 1;
    marks = blocks.map((el) => {
      const r = el.getBoundingClientRect();
      const center = r.top + window.scrollY + r.height / 2 - window.innerHeight / 2;
      return clamp((center - self.start) / span);
    });
    marks[0] = 0;
    marks[last] = 1;
  };
  gsap.to(scrub, {
    p: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: blocks[0],
      start: 'center center',
      endTrigger: blocks[last],
      end: 'center center',
      scrub: reduceMotion ? true : 0.4,
      onRefresh: measure,
    },
  });

  // Del progreso del scroll al tramo (k), el avance dentro de él y el segundo del vídeo.
  function locate(p: number) {
    let k = 0;
    while (k < last - 1 && p > marks[k + 1]) k++;
    const local = clamp((p - marks[k]) / (marks[k + 1] - marks[k] || 1));
    return { k, local, time: STOP_TIME[k] + local * (STOP_TIME[k + 1] - STOP_TIME[k]) };
  }

  // El vídeo entero como Blob: cualquier salto de currentTime es inmediato.
  let status: 'idle' | 'loading' | 'ready' = 'idle';
  let painted = false;
  function loadTour() {
    if (reduceMotion || !mediaAllowed || status !== 'idle') return;
    status = 'loading';
    const url = (mobileQuery.matches && video.dataset.srcMobile) || video.dataset.src;
    if (!url) return;
    fetch(url)
      .then((res) => (res.ok ? res.blob() : Promise.reject(new Error(res.statusText))))
      .then((blob) => {
        video.addEventListener(
          'loadeddata',
          () => {
            status = 'ready';
            // Muted + inline se puede reproducir sin gesto; así iOS decodifica el primer fotograma.
            video.play().then(() => video.pause(), () => {});
            video.addEventListener('seeked', () => (painted = true), { once: true });
            video.currentTime = 0.001;
          },
          { once: true },
        );
        video.src = URL.createObjectURL(blob);
        video.load();
      })
      .catch(() => {
        status = 'idle';
      });
  }

  function loadCine(stop: StopLayer) {
    const { cine } = stop;
    if (!cine || reduceMotion || !mediaAllowed || stop.cineStatus !== 'idle') return;
    stop.cineStatus = 'loading';
    cine.addEventListener('loadeddata', () => (stop.cineStatus = 'ready'), { once: true });
    cine.addEventListener('playing', () => (cine.style.opacity = '1'));
    cine.src = cine.dataset.src ?? '';
    cine.load();
  }

  function setOpacity(stop: StopLayer, value: number) {
    const v = Math.round(value * 1000) / 1000;
    if (stop.opacity === v) return;
    stop.opacity = v;
    stop.el.style.opacity = String(v);
  }

  // Leyenda: fuera el texto viejo, dentro el nuevo. En marcha muestra el destino.
  let captionKey = 'stop-0';
  let captionTimer = 0;
  function setCaption(key: string, text: string, moving: boolean, progress: number) {
    if (!caption || !captionLabel) return;
    caption.style.setProperty('--progress', progress.toFixed(3));
    if (key === captionKey) return;
    captionKey = key;
    window.clearTimeout(captionTimer);
    caption.classList.add('is-swapping');
    captionTimer = window.setTimeout(
      () => {
        captionLabel.textContent = text;
        caption.classList.toggle('is-moving', moving);
        caption.classList.remove('is-swapping');
      },
      reduceMotion ? 0 : 320,
    );
  }

  // Ambilight: copia el fotograma visible a un lienzo de 48×85 px ya difuminado.
  let ambientSource: CanvasImageSource | null = null;
  let ambientTime = -1;
  if (ambientCtx) ambientCtx.filter = 'blur(1.5px) saturate(1.2)';
  function drawAmbient(source: HTMLVideoElement | HTMLImageElement | null) {
    if (!ambient || !ambientCtx || mobileQuery.matches || !source) return;
    const isVideo = source instanceof HTMLVideoElement;
    if (isVideo ? source.readyState < 2 : !source.complete || !source.naturalWidth) return;
    const time = isVideo ? source.currentTime : 0;
    if (source === ambientSource && time === ambientTime) return;
    ambientSource = source;
    ambientTime = time;
    try {
      ambientCtx.drawImage(source, -4, -4, ambient.width + 8, ambient.height + 8);
    } catch {
      // Un fotograma que aún no se puede leer: se intenta en el siguiente tick.
    }
  }

  let holding = 0;

  function render() {
    const p = scrub.p;
    const { k, local, time } = locate(p);
    const hold = p <= 0.0005 ? 0 : p >= 0.9995 ? last : -1;

    loadTour();
    if (k === 0) loadCine(stops[0]);
    if (k >= last - 2) loadCine(stops[last]);

    const videoOn = painted && !reduceMotion;
    const end = STOP_TIME[last];

    stops.forEach((stop, j) => {
      let o = 0;
      if (videoOn) {
        // Con vídeo, las fotos solo cubren el principio y el final (con su cinemagraph).
        if (j === 0) o = 1 - smooth(time / END_FADE);
        else if (j === last) o = smooth((time - (end - END_FADE)) / END_FADE);
      } else if (hold === last) {
        o = j === last ? 1 : 0;
      } else {
        // Sin vídeo (cargando o prefers-reduced-motion): fundido entre las dos fotos.
        if (j === k) o = 1;
        else if (j === k + 1) o = smooth(local);
      }
      setOpacity(stop, o);
      // Las fotos de paradas lejanas no se pintan (ni se descargan: son lazy).
      const near = o > 0 || (mediaAllowed && Math.abs(j - k) <= 1);
      if (stop.el.hidden === near) stop.el.hidden = !near;
    });

    video.style.opacity = videoOn ? '1' : '0';
    if (videoOn && !video.seeking && Math.abs(video.currentTime - time) > 0.02) video.currentTime = time;

    // Cinemagraph: solo se mueve arriba del todo y al final del recorrido, siempre
    // desde el fotograma 0, que es la foto, para que no dé saltos.
    if (hold !== holding) {
      const prev = stops[holding]?.cine;
      if (prev) {
        prev.pause();
        prev.currentTime = 0;
      }
      const next = stops[hold]?.cine;
      if (next && !reduceMotion) {
        next.currentTime = 0;
        next.play().catch(() => {});
      }
      holding = hold;
    } else if (hold >= 0) {
      const cine = stops[hold]?.cine;
      if (cine && cine.paused && stops[hold].cineStatus === 'ready' && !reduceMotion) cine.play().catch(() => {});
    }

    if (hold >= 0) setCaption(`stop-${hold}`, stops[hold]?.label ?? '', false, 0);
    else setCaption(`to-${k + 1}`, stops[k + 1]?.label ?? '', true, local);

    // Fuente del ambilight: lo que más se ve ahora mismo en el escenario.
    let top: StopLayer | null = null;
    for (const stop of stops) if (!stop.el.hidden && stop.opacity > (top?.opacity ?? 0)) top = stop;
    if (videoOn && (top?.opacity ?? 0) < 0.5) drawAmbient(video);
    else if (top) {
      const cine = top.cine;
      drawAmbient(cine && !cine.paused && cine.readyState >= 2 ? cine : top.el.querySelector('img'));
    }
  }

  gsap.ticker.add(render);
  render();
}


function initTagline() {
  const tagline = document.querySelector<HTMLElement>('[data-tagline]');
  if (!tagline) return;
  const words = [...tagline.querySelectorAll<HTMLElement>('.tagline-word')];
  if (reduceMotion) {
    words.forEach((w) => w.classList.add('is-lit'));
    return;
  }
  ScrollTrigger.create({
    trigger: tagline,
    start: 'top 80%',
    end: 'bottom 45%',
    onUpdate: (self) => {
      const lit = Math.round(self.progress * words.length);
      words.forEach((w, i) => w.classList.toggle('is-lit', i < lit));
    },
  });
}

function initReveals() {
  const items = document.querySelectorAll<HTMLElement>('[data-reveal]');
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.15 },
  );
  items.forEach((el) => io.observe(el));
}

function initNav() {
  const links = [...document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]')];
  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      const id = link.getAttribute('href');
      if (!id?.startsWith('#')) return;
      const target = document.querySelector<HTMLElement>(id);
      if (!target) return;
      event.preventDefault();
      // Cada bloque mide al menos una pantalla: su borde superior es su parada (o casi).
      const y = id === '#entrada' ? 0 : target.getBoundingClientRect().top + window.scrollY;
      if (lenis) lenis.scrollTo(y, { duration: 1.8 });
      else window.scrollTo({ top: y });
      history.replaceState(null, '', id);
    });
  });

  // Enlace de la sección actual marcado con aria-current.
  const sections = links
    .map((link) => link.getAttribute('href'))
    .filter((href, i, all): href is string => !!href?.startsWith('#') && all.indexOf(href) === i)
    .map((href) => document.querySelector<HTMLElement>(href))
    .filter((el): el is HTMLElement => !!el);

  sections.forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: 'top 60%',
      end: 'bottom 40%',
      onToggle: (self) => {
        if (!self.isActive) return;
        links.forEach((link) => {
          const current = link.getAttribute('href') === `#${section.id}`;
          if (current) link.setAttribute('aria-current', 'true');
          else link.removeAttribute('aria-current');
        });
      },
    });
  });
}

function initMobileCta() {
  const cta = document.querySelector<HTMLElement>('[data-mobile-cta]');
  const hero = document.querySelector('[data-hero-cta]');
  const final = document.querySelector('[data-final-cta]');
  const footer = document.querySelector('footer');
  if (!cta || !hero || !final) return;
  const visible = new Map<Element, boolean>();
  let menuOpen = false;
  const update = () => {
    const show = !menuOpen && !visible.get(hero) && !visible.get(final) && !visible.get(footer as Element);
    cta.classList.toggle('opacity-0', !show);
    cta.classList.toggle('translate-y-24', !show);
    cta.inert = !show;
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => visible.set(entry.target, entry.isIntersecting));
    update();
  });
  [hero, final, footer].forEach((el) => el && io.observe(el));
  document.addEventListener('arko:menu', (event) => {
    menuOpen = (event as CustomEvent<{ open: boolean }>).detail.open;
    if (menuOpen) lenis?.stop();
    else lenis?.start();
    update();
  });
  update();
}

export function initPage() {
  allowMediaSoon();
  initSmoothScroll();
  initWorld();
  initTagline();
  initReveals();
  initNav();
  initMobileCta();
  window.addEventListener('load', () => ScrollTrigger.refresh());
}
