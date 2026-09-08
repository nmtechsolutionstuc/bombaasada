import { Flame, Home, Wheat } from "lucide-react";
import panesVideo from "../assets/videos/panes-horneando.mp4";
import puestoImg from "../assets/images/puesto-feria-nocturna.webp";

const POINTS = [
  {
    icon: Wheat,
    title: "Pan propio, todos los días",
    desc: "Horneamos nuestro pan de sésamo antes de cada turno. Nada de bolsa de supermercado.",
  },
  {
    icon: Flame,
    title: "Brasas de verdad",
    desc: "Carne al punto justo sobre parrilla a las brasas, no plancha eléctrica.",
  },
  {
    icon: Home,
    title: "Un proyecto de familia",
    desc: "Arrancó en una cocina de casa, con las familias de una pareja metidas de lleno. Esa raíz casera sigue intacta.",
  },
];

export default function Craft() {
  return (
    <section id="historia" className="bg-char-soft px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
        <div className="relative overflow-hidden rounded-[28px] border border-char-line">
          <video
            src={panesVideo}
            autoPlay
            muted
            loop
            playsInline
            className="aspect-[4/5] w-full object-cover"
          />
        </div>

        <div>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-cheddar">
            Cómo laburamos
          </span>
          <h2 className="mt-3 font-display text-4xl uppercase leading-[0.95] text-paper sm:text-5xl">
            Nada de atajos.
            <br />
            Todo hecho acá.
          </h2>
          <p className="mt-6 max-w-lg text-paper-dim">
            Bomba Asada arrancó en una cocina de casa, como un emprendimiento
            familiar — las familias de una pareja, todas manos a la obra. Esa
            raíz casera se mantiene a propósito: pan casero, carne a las
            brasas y papas recién hechas, armado en el momento para cada
            pedido.
          </p>

          <ul className="mt-10 flex flex-col gap-6">
            {POINTS.map(({ icon: Icon, title, desc }) => (
              <li key={title} className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-char text-cheddar">
                  <Icon className="h-5 w-5" strokeWidth={2.25} />
                </span>
                <div>
                  <h3 className="font-display text-lg uppercase tracking-wide text-paper">
                    {title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-paper-dim">{desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-7xl overflow-hidden rounded-[28px] border border-char-line">
        <div className="relative">
          <img
            src={puestoImg}
            alt="El puesto de Bomba Asada de noche, en una feria de J.B. Alberdi"
            loading="lazy"
            className="h-72 w-full object-cover sm:h-96"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-char via-char/30 to-transparent" />
          <p className="absolute bottom-6 left-6 right-6 font-mono text-xs uppercase tracking-[0.14em] text-paper-dim sm:bottom-8 sm:left-10">
            De la cocina de casa a las ferias de J.B. Alberdi
          </p>
        </div>
      </div>
    </section>
  );
}
