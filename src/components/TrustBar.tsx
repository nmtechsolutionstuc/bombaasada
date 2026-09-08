import { Beef, Flame, MapPin, Wheat } from "lucide-react";
import type { ComponentType } from "react";

const ITEMS: { icon: ComponentType<{ className?: string; strokeWidth?: number }>; label: string }[] = [
  { icon: Flame, label: "A las brasas, al momento" },
  { icon: Wheat, label: "Pan artesanal propio" },
  { icon: Beef, label: "Smash · Matambre · Choripán" },
  { icon: MapPin, label: "Solo J.B. Alberdi" },
];

function Track() {
  return (
    <div className="flex shrink-0 items-center gap-14 pr-14">
      {ITEMS.map(({ icon: Icon, label }) => (
        <div key={label} className="flex items-center gap-3">
          <Icon className="h-5 w-5 text-cheddar" strokeWidth={2.25} />
          <span className="whitespace-nowrap font-mono text-sm uppercase tracking-[0.12em] text-paper-dim">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function TrustBar() {
  return (
    <div className="relative overflow-hidden border-y border-char-line bg-char-soft py-5">
      <div className="flex w-max animate-marquee">
        <Track />
        <Track />
      </div>
    </div>
  );
}
