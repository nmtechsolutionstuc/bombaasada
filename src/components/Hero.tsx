import { MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { whatsappLink } from "../lib/contact";
import logo from "../assets/images/logo.webp";
import heroAlpha from "../assets/images/hamburguesa-armado-alpha.webp";
import heroPoster from "../assets/images/hamburguesa-armado-poster.webp";
import smokeVideo from "../assets/videos/humo-ambiente.mp4";
import HeroGlow from "./HeroGlow";

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

export default function Hero() {
  const reducedMotion = useReducedMotion();
  const smokeRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = smokeRef.current;
    if (!video) return;
    if (reducedMotion) video.pause();
    else video.play().catch(() => {});
  }, [reducedMotion]);

  return (
    <section
      id="inicio"
      className="relative flex min-h-[92vh] flex-col justify-center overflow-hidden bg-char px-6 py-32 sm:px-10 lg:px-16"
    >
      <HeroGlow reducedMotion={reducedMotion} />

      <video
        ref={smokeRef}
        src={smokeVideo}
        autoPlay={!reducedMotion}
        muted
        loop
        playsInline
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-bottom opacity-40 mix-blend-screen"
      />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <div className="order-2 animate-riseIn lg:order-1">
          <div className="mb-6 flex items-center gap-3">
            <img
              src={logo}
              alt="Bomba Asada"
              className="h-14 w-14 rounded-full ring-2 ring-char-line sm:h-16 sm:w-16"
            />
            <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-cheddar-soft">
              Puesto a las brasas · J.B. Alberdi
            </span>
          </div>

          <h1 className="font-display text-[15vw] leading-[0.86] uppercase text-paper sm:text-[9vw] lg:text-[5.4vw]">
            The Real
            <br />
            <span className="text-ember">Grilled</span> Boom
          </h1>

          <p className="mt-7 max-w-md text-lg leading-relaxed text-paper-dim sm:text-xl">
            Hamburguesas smash, matambre y choripán a las brasas.{" "}
            <span className="text-paper">Todo con papas.</span> Hechas a pedido,
            servidas calientes, sin vueltas.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href={whatsappLink("Hola! Quiero hacer un pedido en Bomba Asada 🔥")}
              target="_blank"
              rel="noreferrer"
              className="ember-glow inline-flex items-center justify-center rounded-full bg-ember px-8 py-4 font-mono text-sm font-bold uppercase tracking-[0.14em] text-char transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
            >
              Pedí por WhatsApp
            </a>
            <a
              href="#menu"
              className="inline-flex items-center justify-center rounded-full border border-char-line px-8 py-4 font-mono text-sm font-bold uppercase tracking-[0.14em] text-paper transition-colors duration-200 hover:border-cheddar hover:text-cheddar"
            >
              Ver el menú
            </a>
          </div>

          <a
            href="https://www.google.com/maps/search/?api=1&query=Juan+Bautista+Alberdi+Tucuman+Bomba+Asada"
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-paper-dim transition-colors hover:text-paper"
          >
            <MapPin className="h-4 w-4 text-cheddar" strokeWidth={2.25} />
            Juan Bautista Alberdi, Tucumán
          </a>
        </div>

        <div className="relative order-1 animate-riseIn justify-self-center lg:order-2 [animation-delay:120ms]">
          <div className="relative animate-float">
            <picture>
              <source media="(prefers-reduced-motion: reduce)" srcSet={heroPoster} />
              <img
                src={heroAlpha}
                alt="Hamburguesa Bomba Asada armándose capa por capa"
                className="aspect-[640/523] w-[300px] object-contain sm:w-[380px] lg:w-[420px] xl:w-[480px]"
                style={{
                  filter:
                    "drop-shadow(0 30px 26px rgba(0,0,0,0.55)) drop-shadow(0 10px 10px rgba(0,0,0,0.4))",
                }}
              />
            </picture>
            <span className="absolute -bottom-2 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.14em] text-cheddar-soft">
              <span className="h-1.5 w-1.5 animate-flicker rounded-full bg-ember" />
              Directo de la brasa
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
