import { Bike, MessageCircle, Salad, UtensilsCrossed } from "lucide-react";
import Reveal from "./Reveal";

const STEPS = [
  {
    icon: MessageCircle,
    title: "1. Escribinos",
    desc: "Contanos qué querés pedir por WhatsApp. Te confirmamos precio y tiempo de espera al toque.",
  },
  {
    icon: Salad,
    title: "2. A tu gusto",
    desc: "¿Sin cebolla? ¿Doble carne? ¿Bien picante? Avisanos al pedir y lo armamos como te gusta.",
  },
  {
    icon: UtensilsCrossed,
    title: "3. Se arma",
    desc: "Nada de precocido: arrancamos a las brasas recién cuando confirmás el pedido.",
  },
  {
    icon: Bike,
    title: "4. Se envía o lo retirás",
    desc: "Vos elegís: te lo acercamos dentro de J.B. Alberdi o lo pasás a buscar. El pago se coordina por WhatsApp.",
  },
];

export default function OrderGuide() {
  return (
    <section className="bg-char-soft px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 max-w-xl">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-cheddar">
            Cómo pedir
          </span>
          <h2 className="mt-3 font-display text-4xl uppercase leading-[0.95] text-paper sm:text-5xl">
            Del mensaje a la mesa
          </h2>
        </div>

        <div className="grid gap-px overflow-hidden rounded-[28px] border border-char-line bg-char-line sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ icon: Icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 90}>
              <div className="group flex h-full flex-col gap-4 bg-char-soft p-8 transition-colors duration-300 hover:bg-char">
                <Icon
                  className="h-6 w-6 text-cheddar transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5"
                  strokeWidth={2}
                />
                <h3 className="font-display text-lg uppercase tracking-wide text-paper">{title}</h3>
                <p className="text-sm leading-relaxed text-paper-dim">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
