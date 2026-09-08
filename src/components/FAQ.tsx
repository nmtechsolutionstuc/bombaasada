import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { whatsappLink } from "../lib/contact";

const QUESTIONS = [
  {
    q: "¿Dónde están ubicados?",
    a: "Estamos en Juan Bautista Alberdi, Tucumán. La dirección exacta del puesto te la confirmamos por WhatsApp al coordinar tu pedido.",
  },
  {
    q: "¿Hacen envíos?",
    a: "Sí, enviamos dentro de J.B. Alberdi. También podés retirar directo en el puesto — vos elegís al confirmar el pedido por WhatsApp.",
  },
  {
    q: "¿Cuánto tardan en preparar el pedido?",
    a: "Todo se arma a las brasas al momento, así que puede llevar unos minutos. Te avisamos el tiempo estimado apenas confirmás por WhatsApp.",
  },
  {
    q: "¿Qué medios de pago aceptan?",
    a: "Efectivo y transferencia. Lo coordinás directo por WhatsApp al hacer el pedido.",
  },
  {
    q: "¿Puedo pedir para un evento o cantidad grande?",
    a: "¡Sí! Escribinos por WhatsApp contándonos cuántas porciones necesitás y coordinamos todo.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-char px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-cheddar">
            Preguntas frecuentes
          </span>
          <h2 className="mt-3 font-display text-4xl uppercase leading-[0.95] text-paper sm:text-5xl">
            Antes de pedir
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {QUESTIONS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className="overflow-hidden rounded-2xl border border-char-line bg-char-soft"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-display text-base uppercase tracking-wide text-paper sm:text-lg">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-cheddar transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    strokeWidth={2.25}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm leading-relaxed text-paper-dim">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-sm text-paper-dim">
          ¿Otra pregunta?{" "}
          <a
            href={whatsappLink("Hola! Tengo una pregunta sobre Bomba Asada")}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-cheddar underline underline-offset-4"
          >
            Escribinos por WhatsApp
          </a>
        </p>
      </div>
    </section>
  );
}
