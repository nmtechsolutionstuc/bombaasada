import { MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { whatsappLink } from "../lib/contact";
import logo from "../assets/images/logo.webp";
import heroVideo from "../assets/videos/bomba-scroll-optimized.mp4";

function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

function ramp(p: number, a: number, b: number) {
  if (b <= a) return p >= b ? 1 : 0;
  return Math.min(1, Math.max(0, (p - a) / (b - a)));
}

function band(p: number, a: number, b: number, c: number, d: number) {
  return Math.max(0, ramp(p, a, b) - ramp(p, c, d));
}

const PHASE_PADDING = "px-[clamp(20px,6vw,80px)]";

export default function Hero() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const phase1Ref = useRef<HTMLDivElement>(null);
  const phase2Ref = useRef<HTMLDivElement>(null);
  const phase3Ref = useRef<HTMLDivElement>(null);
  const phase4Ref = useRef<HTMLDivElement>(null);
  const phase5Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    if (reducedMotion) {
      if (phase1Ref.current) {
        phase1Ref.current.style.opacity = "0";
        phase1Ref.current.style.pointerEvents = "none";
      }
      for (const ref of [phase2Ref, phase3Ref, phase4Ref]) {
        if (ref.current) ref.current.style.opacity = "0";
      }
      if (phase5Ref.current) {
        phase5Ref.current.style.opacity = "1";
        phase5Ref.current.style.transform = "translateY(0)";
        phase5Ref.current.style.pointerEvents = "auto";
      }
      const setEnd = () => {
        video
          .play()
          .then(() => {
            video.pause();
            video.currentTime = video.duration || 0;
          })
          .catch(() => {
            try {
              video.currentTime = video.duration || 0;
            } catch {
              // seeking can throw before metadata is ready; safe to ignore
            }
          });
      };
      if (video.readyState >= 1) setEnd();
      else video.addEventListener("loadedmetadata", setEnd, { once: true });
      return;
    }

    let target = 0;
    let current = 0;
    let lastTick = 0;
    let rafId = 0;

    const updateTargets = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      const currentScroll = Math.max(0, -rect.top);
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, currentScroll / scrollable)) : 0;

      const duration = video.duration && isFinite(video.duration) ? video.duration : 0;
      target = progress * duration;

      // rAF throttled (backgrounded tab, etc.) — snap directly on the scroll/resize event itself
      if (duration > 0 && (lastTick === 0 || performance.now() - lastTick > 200)) {
        current = target;
        if (video.readyState >= 1 && Math.abs(video.currentTime - target) > 0.01) {
          try {
            video.currentTime = target;
          } catch {
            // ignore transient seek errors
          }
        }
      }

      const p1 = phase1Ref.current;
      if (p1) {
        const out = ramp(progress, 0.15, 0.22);
        p1.style.opacity = String(1 - out);
        p1.style.transform = `translateY(${-25 * out}px) scale(${1 - 0.03 * out})`;
        p1.style.pointerEvents = out > 0.5 ? "none" : "auto";
      }

      const p2 = phase2Ref.current;
      if (p2) {
        const v = band(progress, 0.24, 0.3, 0.36, 0.42);
        p2.style.opacity = String(v);
        p2.style.transform = `translateY(${20 * (1 - v)}px)`;
      }

      const p3 = phase3Ref.current;
      if (p3) {
        const v = band(progress, 0.5, 0.55, 0.6, 0.66);
        p3.style.opacity = String(v * 0.95);
        p3.style.transform = `translateY(${14 * (1 - v)}px)`;
      }

      const p4 = phase4Ref.current;
      if (p4) {
        const inV = ramp(progress, 0.7, 0.75);
        const outV = ramp(progress, 0.8, 0.85);
        p4.style.opacity = String(Math.max(0, inV - outV));
        p4.style.transform = `translateY(${25 * (1 - inV) - 15 * outV}px)`;
      }

      const p5 = phase5Ref.current;
      if (p5) {
        const v = ramp(progress, 0.82, 0.9);
        p5.style.opacity = String(v);
        p5.style.transform = `translateY(${30 * (1 - v)}px)`;
        p5.style.pointerEvents = v > 0.5 ? "auto" : "none";
      }
    };

    const tick = (now: number) => {
      updateTargets();
      lastTick = now;
      current += (target - current) * 0.24;
      if (video.readyState >= 1 && isFinite(current) && Math.abs(video.currentTime - current) > 0.01) {
        try {
          video.currentTime = current;
        } catch {
          // ignore transient seek errors
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", updateTargets, { passive: true });
    window.addEventListener("resize", updateTargets, { passive: true });
    updateTargets();
    rafId = requestAnimationFrame(tick);

    if (video.readyState === 0) {
      try {
        video.load();
      } catch {
        // ignore
      }
    }

    // Some browsers keep a paused, never-played <video> stuck on its poster
    // frame internally even though .currentTime and the decoded buffer are
    // updating correctly — a video that never played doesn't get its
    // compositor layer repainted from bare currentTime writes alone. A
    // one-shot muted play immediately followed by a pause "primes" that
    // pipeline without ever visibly playing anything; scrubbing after this
    // still happens exclusively via currentTime.
    const primeVideo = () => {
      video
        .play()
        .then(() => video.pause())
        .catch(() => {
          // autoplay rejected (e.g. no user gesture yet) — currentTime
          // scrubbing still engages the pipeline in browsers that need this
        });
    };
    if (video.readyState >= 2) primeVideo();
    else video.addEventListener("loadeddata", primeVideo, { once: true });

    return () => {
      window.removeEventListener("scroll", updateTargets);
      window.removeEventListener("resize", updateTargets);
      video.removeEventListener("loadeddata", primeVideo);
      cancelAnimationFrame(rafId);
    };
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className={`relative ${reducedMotion ? "h-screen" : "h-[300vh] lg:h-[450vh]"}`}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-char">
        <video
          ref={videoRef}
          src={heroVideo}
          muted
          playsInline
          preload="auto"
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(10,5,2,0.82) 0%, rgba(10,5,2,0.4) 42%, rgba(10,5,2,0.05) 72%)",
          }}
        />

        {/* Fase 1 — intro (0–15%, sale 15–22%) */}
        <div ref={phase1Ref} className={`absolute inset-0 flex items-center ${PHASE_PADDING}`}>
          <div className="max-w-[min(560px,88vw)]">
            <div className="mb-[18px] flex items-center gap-3">
              <img
                src={logo}
                alt="Bomba Asada"
                className="h-[52px] w-[52px] rounded-full ring-2 ring-char-line"
              />
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-cheddar-soft">
                Puesto a las brasas · J.B. Alberdi
              </span>
            </div>

            <h1 className="font-display text-[clamp(2.5rem,7vw,5rem)] leading-[0.88] uppercase text-paper">
              The Real
              <br />
              <span className="text-ember">Grilled</span> Boom
            </h1>

            <p className="mt-[22px] max-w-[420px] text-[clamp(1rem,1.5vw,1.15rem)] leading-[1.65] text-paper-dim">
              Hamburguesas smash, matambre y choripán a las brasas.{" "}
              <span className="text-paper">Todo con papas.</span> Hechas a pedido, servidas
              calientes, sin vueltas.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={whatsappLink("Hola! Quiero hacer un pedido en Bomba Asada 🔥")}
                target="_blank"
                rel="noreferrer"
                className="ember-glow inline-flex items-center justify-center rounded-full bg-ember px-8 py-4 font-mono text-[13px] font-bold uppercase tracking-[0.14em] text-char transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
              >
                Pedí por WhatsApp
              </a>
              <a
                href="#menu"
                className="inline-flex items-center justify-center rounded-full border border-char-line px-8 py-4 font-mono text-[13px] font-bold uppercase tracking-[0.14em] text-paper transition-colors duration-200 hover:border-cheddar hover:text-cheddar"
              >
                Ver el menú
              </a>
            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Juan+Bautista+Alberdi+Tucuman+Bomba+Asada"
              target="_blank"
              rel="noreferrer"
              className="mt-[26px] inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-paper-dim transition-colors hover:text-paper"
            >
              <MapPin className="h-3.5 w-3.5 text-cheddar" strokeWidth={2.25} />
              Juan Bautista Alberdi, Tucumán
            </a>
          </div>
        </div>

        {/* Fase 2 — desarme (24–42%) */}
        <div
          ref={phase2Ref}
          className={`absolute inset-0 flex items-center opacity-0 ${PHASE_PADDING}`}
        >
          <h2 className="max-w-[min(460px,80vw)] font-display text-[clamp(1.9rem,4.4vw,3.2rem)] leading-[0.95] uppercase text-paper">
            Todo empieza
            <br />
            <span className="text-ember">en las brasas.</span>
          </h2>
        </div>

        {/* Fase 3 — destello (50–66%) */}
        <div
          ref={phase3Ref}
          className={`absolute inset-0 flex items-end pb-[clamp(48px,8vh,96px)] opacity-0 ${PHASE_PADDING}`}
        >
          <p className="font-display text-[clamp(1.4rem,3vw,2.2rem)] leading-[1.05] uppercase tracking-[0.02em] text-paper">
            Smash. <span className="text-cheddar">Fuego.</span> Boom.
          </p>
        </div>

        {/* Fase 4 — reconstrucción (70–85%) */}
        <div
          ref={phase4Ref}
          className={`absolute inset-0 flex items-center opacity-0 ${PHASE_PADDING}`}
        >
          <h2 className="max-w-[min(480px,82vw)] font-display text-[clamp(1.9rem,4.4vw,3.2rem)] leading-[0.95] uppercase text-paper">
            Hecha al momento.
            <br />
            <span className="text-cheddar">Como tiene que ser.</span>
          </h2>
        </div>

        {/* Fase 5 — combo final (entra 82–90%, se mantiene hasta 100%) */}
        <div
          ref={phase5Ref}
          className={`absolute inset-0 flex items-center opacity-0 ${PHASE_PADDING}`}
        >
          <div className="max-w-[min(560px,88vw)]">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-cheddar">
              No te quedes con hambre
            </span>
            <h2 className="mt-4 font-display text-[clamp(2.3rem,6vw,4.2rem)] leading-[0.9] uppercase text-paper">
              A las brasas.
              <br />
              <span className="text-cheddar">Sin vueltas.</span>
            </h2>
            <p className="mt-5 max-w-[440px] text-[1.05rem] leading-[1.65] text-paper-dim">
              Smash, matambre y choripán hechos al momento. Con papas, aderezos y todo lo que
              tiene que tener.
            </p>
            <div className="mt-[30px] flex flex-wrap gap-4">
              <a
                href={whatsappLink("Hola! Quiero hacer un pedido en Bomba Asada 🔥")}
                target="_blank"
                rel="noreferrer"
                className="ember-glow inline-flex items-center justify-center rounded-full bg-ember px-8 py-4 font-mono text-[13px] font-bold uppercase tracking-[0.14em] text-char transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
              >
                Pedí ahora
              </a>
              <a
                href="#menu"
                className="inline-flex items-center justify-center rounded-full border border-char-line px-8 py-4 font-mono text-[13px] font-bold uppercase tracking-[0.14em] text-paper transition-colors duration-200 hover:border-cheddar hover:text-cheddar"
              >
                Ver el menú
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
