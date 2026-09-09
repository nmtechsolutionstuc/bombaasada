import { ArrowUpRight, Flame } from "lucide-react";
import { whatsappLink } from "../lib/contact";
import Reveal from "./Reveal";
import LazyVideo from "./LazyVideo";
import dobleImg from "../assets/images/hamburguesa-doble-cheddar-bacon.webp";
import parrillaVideo from "../assets/videos/parrilla-viva.mp4";

const BURGER_PRICE = "$10.000";

const BURGERS = [
  {
    name: "Clásica",
    ingredients: "Doble carne · Jamón · Queso tybo · Lechuga · Tomate · Mayonesa · Mostaza · Kétchup",
  },
  {
    name: "Americana",
    ingredients: "Doble carne · Cheddar · Bacon · Cebolla caramelizada · Mayonesa · Barbacoa",
  },
  {
    name: "Cuatro Quesos",
    ingredients:
      "Doble carne · Quesos cheddar, tybo, cremoso y azul · Cebolla caramelizada · Mayonesa · Kétchup",
  },
  {
    name: "Deluxe",
    ingredients: "Doble carne · Jamón · Cheddar · Lechuga · Tomate · Mayonesa · Mostaza · Kétchup",
  },
  {
    name: "Argenta",
    ingredients:
      "Doble carne · Queso tybo · Papas fritas · Salteñita · Chimichurri · Tomate · Mayonesa · Mostaza · Barbacoa",
  },
  {
    name: "Sweet Bacon",
    ingredients:
      "Doble carne · Cheddar · Mermelada de bacon · Jamón · Tomate · Salsa especial · Mayonesa",
  },
];

const SANDWICHES = [
  {
    name: "Matambre de Cerdo",
    price: "$9.000",
    ingredients: "Mayonesa · Mostaza · Kétchup · Lechuga · Tomate · Salteñita · Chimichurri · Ají",
  },
  {
    name: "Choripán",
    note: "Parrillero / Criollo",
    price: "$8.000",
    ingredients: "Mayonesa · Mostaza · Kétchup · Lechuga · Tomate · Salteñita · Chimichurri · Ají",
  },
];

const EXTRAS = [
  { name: "Baño de cheddar y bacon", price: "$2.000" },
  { name: "Extra carne con queso", price: "$2.000" },
  { name: "Extra bacon", price: "$1.000" },
  { name: "Pan apto celíacos", price: "$2.000" },
  { name: "Extra cheddar", price: "$1.000" },
  { name: "Extra cebolla caramelizada", price: "$500" },
  { name: "Dip de cheddar", price: "$1.000" },
  { name: "Dip de aderezo", price: "$500" },
  { name: "Extra jamón y queso", price: "$1.000" },
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
            La carta completa, con precios. Todo se arma a pedido y sale con papas.
          </p>
        </div>

        <Reveal>
          <div className="overflow-hidden rounded-[28px] border border-char-line bg-char-soft">
            <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/7]">
              <img
                src={dobleImg}
                alt="Hamburguesa Bomba Asada recién armada"
                loading="lazy"
                className="h-full w-full object-cover object-[center_68%]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-char-soft via-char-soft/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 p-6 sm:p-8">
                <Flame className="h-5 w-5 text-cheddar" strokeWidth={2.25} />
                <span className="font-display text-xl uppercase tracking-wide text-paper sm:text-2xl">
                  Nuestro menú
                </span>
                <Flame className="h-5 w-5 text-cheddar" strokeWidth={2.25} />
              </div>
            </div>

            <div className="p-6 sm:p-10 lg:p-12">
              {/* Hamburguesas */}
              <div className="flex items-center gap-4">
                <h3 className="font-display text-2xl uppercase tracking-wide text-cheddar sm:text-3xl">
                  Hamburguesas
                </h3>
                <div className="h-px flex-1 bg-char-line" />
              </div>

              <div className="mt-8 grid gap-x-10 gap-y-7 sm:grid-cols-2">
                {BURGERS.map((b) => (
                  <div key={b.name}>
                    <h4 className="font-display text-lg uppercase text-paper sm:text-xl">
                      {b.name}
                    </h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-paper-dim">
                      {b.ingredients}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-9 flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-cheddar/30 bg-char px-6 py-4 text-center sm:justify-between">
                <span className="font-display text-3xl text-cheddar sm:text-4xl">
                  {BURGER_PRICE}
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-paper-dim">
                  Cualquier variedad
                </span>
              </div>

              {/* Sándwiches */}
              <div className="mt-12 flex items-center gap-4">
                <h3 className="font-display text-2xl uppercase tracking-wide text-cheddar sm:text-3xl">
                  Sándwiches
                </h3>
                <div className="h-px flex-1 bg-char-line" />
              </div>

              <div className="mt-8 grid gap-x-10 gap-y-7 sm:grid-cols-2">
                {SANDWICHES.map((s) => (
                  <div key={s.name}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h4 className="font-display text-lg uppercase text-paper sm:text-xl">
                        {s.name}
                        {s.note && (
                          <span className="ml-2 font-mono text-[11px] normal-case tracking-normal text-paper-dim">
                            ({s.note})
                          </span>
                        )}
                      </h4>
                      <span className="font-display text-lg text-cheddar">{s.price}</span>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-paper-dim">
                      {s.ingredients}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-9 text-center">
                <span className="inline-block rounded-full border border-char-line px-5 py-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-cheddar-soft">
                  Todo sale con papas
                </span>
              </div>

              {/* Agregados */}
              <div className="mt-12 flex items-center gap-4">
                <h3 className="font-display text-2xl uppercase tracking-wide text-cheddar sm:text-3xl">
                  Agregados
                </h3>
                <div className="h-px flex-1 bg-char-line" />
              </div>

              <div className="mt-6 grid gap-x-10 gap-y-3 sm:grid-cols-2">
                {EXTRAS.map((e) => (
                  <div
                    key={e.name}
                    className="flex items-baseline justify-between gap-4 border-b border-char-line/60 py-2 text-sm"
                  >
                    <span className="text-paper">{e.name}</span>
                    <span className="whitespace-nowrap font-mono text-xs text-paper-dim">
                      {e.price}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-col items-center gap-4 border-t border-char-line pt-8 text-center sm:flex-row sm:justify-between sm:text-left">
                <div className="font-mono text-xs uppercase tracking-[0.16em] text-paper-dim">
                  <p>
                    Alias para transferencia: <span className="text-paper">bomba.asada</span>
                  </p>
                  <p className="mt-1 text-cheddar-soft">Delivery sin cargo</p>
                </div>
                <a
                  href={whatsappLink("Hola! Quiero hacer un pedido en Bomba Asada 🔥")}
                  target="_blank"
                  rel="noreferrer"
                  className="ember-glow inline-flex items-center gap-2 rounded-full bg-ember px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.14em] text-char transition-transform hover:scale-105"
                >
                  Pedí por WhatsApp
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={110}>
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
                También a las brasas, todo con papas. Mismo cuidado, mismo fuego.
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
