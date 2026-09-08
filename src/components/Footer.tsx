import { AtSign, MapPin, MessageCircle } from "lucide-react";
import logo from "../assets/images/logo.webp";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, whatsappLink } from "../lib/contact";

export default function Footer() {
  return (
    <footer className="bg-char px-6 pb-10 pt-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-10 border-b border-char-line pb-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Bomba Asada" className="h-12 w-12 rounded-full" />
            <div>
              <p className="font-display text-lg uppercase tracking-wide text-paper">
                Bomba Asada
              </p>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-paper-dim">
                The Real Grilled Boom
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 font-mono text-sm uppercase tracking-[0.1em] text-paper-dim">
            <a
              href={whatsappLink("Hola! Quiero hacer un pedido en Bomba Asada 🔥")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-cheddar"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={2.25} />
              WhatsApp
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-cheddar"
            >
              <AtSign className="h-4 w-4" strokeWidth={2.25} />
              {INSTAGRAM_HANDLE}
            </a>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Juan+Bautista+Alberdi+Tucuman+Bomba+Asada"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-cheddar"
            >
              <MapPin className="h-4 w-4" strokeWidth={2.25} />
              J.B. Alberdi, Tucumán
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-6 text-xs text-paper-dim sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Bomba Asada. Hecho a las brasas, en Tucumán.</p>
          <p>Medios de pago y pedidos grandes: consultá por WhatsApp.</p>
        </div>
      </div>
    </footer>
  );
}
