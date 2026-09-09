import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { whatsappLink } from "../lib/contact";
import logo from "../assets/images/logo.webp";
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

  return (
    <section
      id="inicio"
      className="relative flex min-h-[92vh] flex-col justify-center overflow-hidden bg-char px-6 py-32 sm:px-10 lg:px-16"
    >
      <HeroGlow reducedMotion={reducedMotion} />

      <div className="relative mx-auto w-full max-w-3xl">
        <div className="animate-riseIn">
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
      </div>
    </section>
  );
}
