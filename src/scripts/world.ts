import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type Key = { y: number; v: number };

// Interpola un valor por tramos según la posición de scroll.
const piecewise = (y: number, keys: Key[]) => {
  if (y <= keys[0].y) return keys[0].v;
  for (let i = 1; i < keys.length; i++) {
    const a = keys[i - 1];
    const b = keys[i];
    if (y <= b.y) return a.v + (b.v - a.v) * ((y - a.y) / (b.y - a.y || 1));
  }
  return keys[keys.length - 1].v;
};

const clamp = gsap.utils.clamp(0, 1);

// Paseo por Arko: el scroll mueve los clips (o las fotos, mientras el clip del tramo no ha cargado) y cada parada
// muestra su texto. Cada parada tiene un clip que va de ella a la siguiente; el de la última sigue hasta el final.
// `w` es la posición en el paseo: 0 en la primera parada, 1 en la segunda, 2.5 a medio camino entre la tercera y la
// cuarta. Al acabar la sección vale `stops.length`, para que el último clip también tenga su tramo.
export function initWorld(world: HTMLElement, reduceMotion: boolean) {
  const stage = world.querySelector<HTMLElement>('[data-stage]');
  if (!stage) return;
  const stops = [...world.querySelectorAll<HTMLElement>('[data-stop]')];
  const frames = [...stage.querySelectorAll<HTMLElement>('[data-frame]')];
  const links = [...stage.querySelectorAll<HTMLAnchorElement>('[data-goto]')];
  const fill = stage.querySelector<HTMLElement>('[data-rail-fill]');
  const hint = stage.querySelector<HTMLElement>('[data-hint]');
  const clips = [...stage.querySelectorAll<HTMLVideoElement>('[data-clip]')];
  const last = stops.length - 1;
  const focus = stops.map((stop) => Number(stop.dataset.focus ?? 50));

  // Cada parada llega cuando su artículo toca el borde superior; el paseo termina al acabar la sección.
  const marks = stops.map((stop) => ScrollTrigger.create({ trigger: stop, start: 'top top' }));
  const ready = clips.map(() => false);
  let current = -1;
  let w = 0;
  let active = 0;
  let shown = -1;
  let time = 0;

  const setCurrent = (index: number) => {
    if (index === current) return;
    current = index;
    stops.forEach((stop, i) => stop.classList.toggle('is-current', i === index));
    links.forEach((link, i) => link.setAttribute('aria-current', String(i === index)));
  };

  // El clip del tramo entra en cuanto ha buscado su fotograma. Si aún no ha cargado, las fotos vuelven a verse.
  const show = () => {
    if (shown !== active) {
      shown = active;
      clips.forEach((clip, i) => clip.classList.toggle('is-shown', i === active));
    }
    stage.dataset.mode = 'video';
  };

  const sync = () => {
    const clip = clips[active];
    if (!clip || !ready[active]) {
      delete stage.dataset.mode;
      return;
    }
    if (clip.seeking) return;
    if (Math.abs(clip.currentTime - time) > 0.01) clip.currentTime = time;
    else show();
  };

  clips.forEach((clip, i) =>
    clip.addEventListener('seeked', () => {
      if (i !== active) return;
      show();
      sync();
    }),
  );

  const render = (self: ScrollTrigger) => {
    const y = self.scroll();
    w = piecewise(y, [...marks.map((mark, i) => ({ y: mark.start, v: i })), { y: self.end, v: stops.length }]);
    const at = Math.min(w, last);

    setCurrent(Math.round(at));
    stage.style.setProperty('--focus-x', `${piecewise(y, marks.map((mark, i) => ({ y: mark.start, v: focus[i] })))}%`);
    if (fill) fill.style.transform = `scaleY(${at / last})`;
    if (hint) hint.style.opacity = String(clamp(1 - w * 4));

    // Fotogramas (debajo de los clips): cada uno está entero y sin escalar justo en su parada, donde empieza su clip, así
    // el vídeo entra encima sin que se note. Aparece en la segunda mitad del tramo anterior y se acerca al avanzar.
    frames.forEach((frame, i) => {
      frame.style.opacity = String(i === 0 ? 1 : clamp((w - i + 0.5) / 0.5));
      if (!reduceMotion) frame.style.transform = `scale(${1 + 0.06 * clamp(w - i)})`;
    });

    if (!clips.length) return;
    active = Math.min(clips.length - 1, Math.floor(w));
    const { duration } = clips[active];
    if (ready[active]) time = Math.min((w - active) * duration, duration - 0.05);
    sync();
  };

  const span = ScrollTrigger.create({
    trigger: world,
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: render,
    onRefresh: render,
  });
  render(span);

  // Con movimiento reducido o ahorro de datos se quedan las fotos.
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
  if (!clips.length || reduceMotion || saveData) return;

  // Los clips se cargan de uno en uno: primero el del tramo actual y después el más cercano a la posición del scroll.
  // A igual distancia va antes el que viene por delante.
  const distance = (i: number) => {
    if (i === active) return -1;
    if (i > w) return i - w;
    return w - (i + 1) + 0.5;
  };
  const queue = clips.map((_, i) => i);

  const loadNext = async () => {
    queue.sort((a, b) => distance(a) - distance(b));
    const i = queue.shift();
    if (i === undefined) return;
    const clip = clips[i];
    const src = clip.dataset.src ?? '';
    clip.preload = 'auto';

    // Cada clip se descarga entero (blob) para que el scrub no dependa de la red.
    try {
      const res = await fetch(src);
      if (!res.ok) throw new Error(res.statusText);
      clip.src = URL.createObjectURL(await res.blob());
    } catch {
      clip.src = src;
    }

    const loaded = await new Promise<boolean>((resolve) => {
      clip.addEventListener('loadeddata', () => resolve(true), { once: true });
      clip.addEventListener('error', () => resolve(false), { once: true });
    });
    if (loaded) {
      // iOS no pinta los fotogramas buscados hasta que el vídeo se ha reproducido una vez.
      await clip.play().catch(() => {});
      clip.pause();
      ready[i] = true;
      render(span);
    }
    loadNext();
  };

  if (document.readyState === 'complete') loadNext();
  else window.addEventListener('load', loadNext, { once: true });
}
