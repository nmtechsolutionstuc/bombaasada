import { Menu as MenuIcon, X } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "../assets/images/logo.webp";
import { whatsappLink } from "../lib/contact";

const LINKS = [
  { href: "#menu", label: "Menú" },
  { href: "#historia", label: "Nosotros" },
  { href: "#resenas", label: "Reseñas" },
  { href: "#faq", label: "Preguntas" },
];

export default function Navbar() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "bg-char/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10 lg:px-16">
        <a href="#inicio" className="flex items-center gap-3">
          <img src={logo} alt="Bomba Asada" className="h-10 w-10 rounded-full" />
          <span className="font-display text-lg uppercase tracking-wide text-paper">
            Bomba Asada
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-xs uppercase tracking-[0.16em] text-paper-dim transition-colors hover:text-cheddar"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href={whatsappLink("Hola! Quiero hacer un pedido en Bomba Asada 🔥")}
          target="_blank"
          rel="noreferrer"
          className="hidden rounded-full bg-ember px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.14em] text-char transition-transform hover:scale-105 md:inline-flex"
        >
          Pedir ahora
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className="inline-flex items-center justify-center rounded-full border border-char-line p-2.5 text-paper md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-char-line bg-char px-6 pb-6 pt-2 md:hidden">
          <nav className="flex flex-col gap-1">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3 font-mono text-sm uppercase tracking-[0.14em] text-paper-dim hover:bg-char-soft hover:text-cheddar"
              >
                {link.label}
              </a>
            ))}
            <a
              href={whatsappLink("Hola! Quiero hacer un pedido en Bomba Asada 🔥")}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="mt-3 rounded-full bg-ember px-5 py-3 text-center font-mono text-xs font-bold uppercase tracking-[0.14em] text-char"
            >
              Pedir por WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
