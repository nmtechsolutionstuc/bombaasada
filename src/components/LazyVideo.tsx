import { useEffect, useRef, useState } from "react";

interface LazyVideoProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  ariaHidden?: boolean;
}

/**
 * Background/decorative video that doesn't fetch a single byte until it's
 * about to scroll into view. Mobile pages loading five autoplaying videos
 * up front is what "carga muy lento" was about — this defers everything
 * below the fold to an IntersectionObserver.
 */
export default function LazyVideo({ src, className, style, ariaHidden }: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;
    videoRef.current?.play().catch(() => {});
  }, [shouldLoad]);

  return (
    <video
      ref={videoRef}
      src={shouldLoad ? src : undefined}
      preload="none"
      muted
      loop
      playsInline
      aria-hidden={ariaHidden}
      className={className}
      style={style}
    />
  );
}
