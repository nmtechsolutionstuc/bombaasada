import { AtSign, Star } from "lucide-react";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "../lib/contact";
import postImg from "../assets/images/hamburguesa-cheddar-papas-post.webp";
import Reveal from "./Reveal";

const REVIEWS = [
  "Las mejores hamburguesas de Alberdi.",
  "La verdad que con las hamburguesas ya estaba para sacarse el sombrero, pero con esas papas arrasaron. Un 10.000/10.",
  "Las mejores del condado.",
];

function Stars() {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-cheddar text-cheddar" strokeWidth={0} />
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section id="resenas" className="bg-char px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-cheddar">
            Lo dice el barrio
          </span>
          <h2 className="mt-3 font-display text-4xl uppercase leading-[0.95] text-paper sm:text-5xl">
            Reseñas reales, de Instagram
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {REVIEWS.map((quote, i) => (
            <Reveal key={quote} delay={i * 110}>
              <figure className="flex h-full flex-col justify-between rounded-[28px] border border-char-line bg-char-soft p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-cheddar/50">
                <div>
                  <Stars />
                  <blockquote className="mt-5 font-display text-xl uppercase leading-tight text-paper sm:text-2xl">
                    “{quote}”
                  </blockquote>
                </div>
                <figcaption className="mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-paper-dim">
                  Reseña real · Instagram
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={REVIEWS.length * 110}>
          <div className="mt-6 grid gap-6 overflow-hidden rounded-[28px] border border-char-line bg-char-soft sm:grid-cols-[0.85fr_1.15fr]">
            <img
              src={postImg}
              alt="Publicación de Bomba Asada en Instagram"
              loading="lazy"
              className="h-64 w-full object-cover sm:h-full"
            />
            <div className="flex flex-col justify-center gap-4 p-8 sm:p-10">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-char px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-cheddar-soft">
                <AtSign className="h-3.5 w-3.5" strokeWidth={2.25} />
                {INSTAGRAM_HANDLE}
              </span>
              <h3 className="font-display text-2xl uppercase leading-[0.95] text-paper sm:text-3xl">
                Seguinos para promos, sorteos y lo que sale nuevo de la brasa
              </h3>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex w-fit items-center gap-2 rounded-full border border-char-line px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.14em] text-paper transition-colors hover:border-cheddar hover:text-cheddar"
              >
                Ver Instagram
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
