import { ArrowUpRight } from "lucide-react";
import { whatsappLink } from "../lib/contact";
import Reveal from "./Reveal";
import LazyVideo from "./LazyVideo";
import comboImg from "../assets/images/hamburguesa-combo-papas.webp";
import dobleImg from "../assets/images/hamburguesa-doble-cheddar-bacon.webp";
import trioImg from "../assets/images/hamburguesas-trio-cenital.webp";
import parrillaVideo from "../assets/videos/parrilla-viva.mp4";

const PRODUCTS = [
  {
    name: "Smash Doble Cheddar",
    tag: "La firma de la casa",
    desc: "Dos medallones smasheados, doble cheddar derretido, panceta y cebolla caramelizada en pan de sésamo casero.",
    img: dobleImg,
    message: "Hola! Quiero pedir la Smash Doble Cheddar 🧀",
  },
  {
    name: "Combo Bomba",
    tag: "Con papas y bebida",
    desc: "Tu hamburguesa favorita con papas bien cargadas y una bebida bien fría. Todo en la clásica bandeja a cuadros.",
    img: comboImg,
    message: "Hola! Quiero pedir el Combo Bomba 🍔🍟",
  },
  {
    name: "Trío Bomba",
    tag: "Para compartir (o no)",
    desc: "Tres smash burgers en pan de sésamo, recién salidas de la plancha. Ideales para no soltar ninguna.",
    img: trioImg,
    message: "Hola! Quiero pedir el Trío Bomba 🔥",
  },
];

export default function Menu() {
  return (
    <section id="menu" className="bg-char px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-cheddar">
              El menú
            </span>
            <h2 className="mt-3 font-display text-4xl uppercase leading-[0.95] text-paper sm:text-5xl">
              Lo que sale de la brasa
            </h2>
          </div>
          <p className="max-w-sm text-paper-dim">
            Precios y promos del día se confirman por WhatsApp — la carta cambia
            según lo que esté a punto.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {PRODUCTS.map((product, i) => (
            <Reveal key={product.name} delay={i * 110} className="h-full">
              <article className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-char-line bg-char-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-cheddar/60">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={product.img}
                    alt={product.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-char-soft via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-char/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-cheddar-soft backdrop-blur-sm">
                    {product.tag}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-2xl uppercase text-paper">{product.name}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-paper-dim">
                    {product.desc}
                  </p>
                  <a
                    href={whatsappLink(product.message)}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-[0.14em] text-ember-soft transition-colors group-hover:text-cheddar"
                  >
                    Consultar por WhatsApp
                    <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={PRODUCTS.length * 110}>
          <div className="mt-6 grid gap-6 overflow-hidden rounded-[28px] border border-char-line bg-char-soft sm:grid-cols-[1fr_1.2fr]">
            <div className="relative aspect-[4/3] overflow-hidden sm:aspect-auto">
              <LazyVideo src={parrillaVideo} className="h-full w-full object-cover" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-char-soft/40 via-transparent to-transparent sm:bg-gradient-to-r" />
            </div>
            <div className="flex flex-col justify-center gap-3 p-8 sm:p-10">
              <span className="font-mono text-xs uppercase tracking-[0.28em] text-cheddar">
                El mismo fuego
              </span>
              <h3 className="font-display text-3xl uppercase leading-[0.95] text-paper sm:text-4xl">
                Matambre &amp; Choripán
              </h3>
              <p className="max-w-sm text-sm text-paper-dim">
                También a las brasas, todo con papas. La carta del día (y qué hay
                disponible) se confirma por WhatsApp.
              </p>
              <a
                href={whatsappLink("Hola! Quiero consultar por el matambre y el choripán 🥩🥖")}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-cheddar px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.14em] text-char transition-transform hover:scale-105"
              >
                Consultar
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
