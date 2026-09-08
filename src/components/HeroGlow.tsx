import { useEffect, useRef } from "react";

interface GlowLayerConfig {
  el: HTMLDivElement | null;
  maxShift: number; // px of mouse-parallax travel at full offset
  breathAmp: number; // fractional scale amplitude (e.g. 0.05 = ±5%)
  breathOpacityAmp: number; // fractional opacity amplitude
  period: number; // breathing cycle length, seconds
  phase: number; // radians, offsets each layer's breathing so they don't sync
  baseOpacity: number;
  centered: boolean; // true if the layer is anchored via left/top:50% + translate(-50%,-50%)
}

/**
 * Warm, ember-toned ambient lighting behind the hero content. Three soft
 * radial-gradient blobs, smoothed toward the cursor (desktop only) with a
 * slow lerp for an inertial feel, plus a near-imperceptible "breathing"
 * scale/opacity cycle so the glow never sits perfectly still. Pure
 * transform/opacity writes driven by one shared rAF loop — no React state,
 * no layout thrashing on mousemove.
 */
export default function HeroGlow({ reducedMotion }: { reducedMotion: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const primaryRef = useRef<HTMLDivElement>(null);
  const secondaryRef = useRef<HTMLDivElement>(null);
  const tertiaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let rect = container.getBoundingClientRect();

    // Re-checked on every resize (not just at mount) so rotating a tablet or
    // resizing a desktop window doesn't leave cursor-tracking stuck stale.
    const computeCanTrack = () =>
      !reducedMotion &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      window.innerWidth >= 1024;
    let canTrackCursor = computeCanTrack();

    const updateRect = () => {
      rect = container.getBoundingClientRect();
      canTrackCursor = computeCanTrack();
    };
    window.addEventListener("resize", updateRect);

    const handleMouseMove = (e: MouseEvent) => {
      if (!canTrackCursor) return;
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      if (!inside) {
        target.x = 0;
        target.y = 0;
        return;
      }
      target.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      target.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    if (!reducedMotion) window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const layers: GlowLayerConfig[] = [
      {
        el: primaryRef.current,
        maxShift: 28,
        breathAmp: 0.045,
        breathOpacityAmp: 0.14,
        period: 8.5,
        phase: 0,
        baseOpacity: 1,
        centered: true,
      },
      {
        el: secondaryRef.current,
        maxShift: 13,
        breathAmp: 0.035,
        breathOpacityAmp: 0.12,
        period: 7,
        phase: 1.9,
        baseOpacity: 1,
        centered: false,
      },
      {
        el: tertiaryRef.current,
        maxShift: 7,
        breathAmp: 0.03,
        breathOpacityAmp: 0.1,
        period: 10,
        phase: 3.4,
        baseOpacity: 1,
        centered: false,
      },
    ];

    if (reducedMotion) {
      // Static resting state: glows stay, all motion removed.
      for (const layer of layers) {
        if (!layer.el) continue;
        layer.el.style.transform = layer.centered ? "translate(-50%, -50%)" : "";
        layer.el.style.opacity = String(layer.baseOpacity);
      }
      return () => window.removeEventListener("resize", updateRect);
    }

    const start = performance.now();
    let rafId = requestAnimationFrame(tick);

    function tick(now: number) {
      const t = (now - start) / 1000;
      const lerp = 0.055;
      current.x += (target.x - current.x) * lerp;
      current.y += (target.y - current.y) * lerp;

      for (const layer of layers) {
        if (!layer.el) continue;
        const dx = current.x * layer.maxShift;
        const dy = current.y * layer.maxShift;
        const breathe = Math.sin((t * Math.PI * 2) / layer.period + layer.phase);
        const scale = 1 + breathe * layer.breathAmp;
        const opacity = layer.baseOpacity * (1 + breathe * layer.breathOpacityAmp * 0.5);

        layer.el.style.transform = layer.centered
          ? `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(${scale})`
          : `translate3d(${dx}px, ${dy}px, 0) scale(${scale})`;
        layer.el.style.opacity = String(Math.min(1, Math.max(0, opacity)));
      }

      rafId = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [reducedMotion]);

  return (
    <div ref={containerRef} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* umber ambient — broadest, softest, barely-there depth layer */}
      <div
        ref={tertiaryRef}
        className="absolute h-[1050px] w-[1050px] rounded-full blur-[150px]"
        style={{
          right: "-14%",
          bottom: "-24%",
          background: "radial-gradient(circle, rgba(120,45,25,0.10) 0%, transparent 70%)",
        }}
      />
      {/* amber halo — secondary, upper field */}
      <div
        ref={secondaryRef}
        className="absolute h-[620px] w-[620px] rounded-full blur-[125px]"
        style={{
          left: "-10%",
          top: "-12%",
          background: "radial-gradient(circle, rgba(255,158,40,0.10) 0%, transparent 65%)",
        }}
      />
      {/* ember core — primary glow, roughly behind the burger */}
      <div
        ref={primaryRef}
        className="absolute left-[58%] top-[46%] h-[980px] w-[980px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[145px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,91,30,0.19) 0%, rgba(178,32,18,0.11) 42%, transparent 72%)",
        }}
      />
    </div>
  );
}
