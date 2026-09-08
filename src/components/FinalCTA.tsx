import { AtSign, MessageCircle } from "lucide-react";
import { INSTAGRAM_URL, whatsappLink } from "../lib/contact";
import detalleVideo from "../assets/videos/hamburguesa-detalle.mp4";
import LazyVideo from "./LazyVideo";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-char-soft px-6 py-24 sm:px-10 lg:px-16">
      <LazyVideo
        src={detalleVideo}
        ariaHidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.14]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-char-soft via-char-soft/95 to-char-soft" />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-cheddar">
          No te quedes con hambre
        </span>
        <h2 className="font-display text-5xl uppercase leading-[0.92] text-paper sm:text-7xl">
          Pedí tu bomba
          <br />
          <span className="text-ember">para hoy</span>
        </h2>
        <p className="max-w-md text-paper-dim">
          Escribinos por WhatsApp y coordinamos todo: qué pedís, cuánto tarda y
          cómo lo retirás.
        </p>

        <div className="mt-4 flex flex-col gap-4 sm:flex-row">
          <a
            href={whatsappLink("Hola! Quiero hacer un pedido en Bomba Asada 🔥")}
            target="_blank"
            rel="noreferrer"
            className="ember-glow inline-flex items-center justify-center gap-2 rounded-full bg-ember px-9 py-4 font-mono text-sm font-bold uppercase tracking-[0.14em] text-char transition-transform hover:scale-[1.03]"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={2.5} />
            Pedí por WhatsApp
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-char-line px-9 py-4 font-mono text-sm font-bold uppercase tracking-[0.14em] text-paper transition-colors hover:border-cheddar hover:text-cheddar"
          >
            <AtSign className="h-4 w-4" strokeWidth={2.25} />
            Seguinos en Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
