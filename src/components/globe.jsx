"use client";

import createGlobe from "cobe";
import { useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { twMerge } from "tailwind-merge";

const MOVEMENT_DAMPING = 100;
const TOUCH_MOVEMENT_DAMPING = 10;

const GLOBE_CONFIG = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: -0.6,
  theta: 0,
  dark: 1,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [1, 1, 1],
  glowColor: [1, 1, 1],
  markers: [
    { location: [14.5995, 120.9842], size: 0.05 },
    { location: [19.076, 72.8777], size: 0.05 },
    { location: [39.9042, 116.4074], size: 0.05 },
    { location: [-23.5505, -46.6333], size: 0.05 },
    { location: [19.4326, -99.1332], size: 0.05 },
    { location: [40.7128, -74.006], size: 0.05 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 },
    { location: [53.3498, -6.2603], size: 0.05 },
    { location: [38.7223, -9.1393], size: 0.1, color: [0.6, 0.2, 0.8] },
    { location: [43.263, -2.935], size: 0.05 },
    { location: [31.6295, -7.9811], size: 0.05 },
    { location: [52.52, 13.405], size: 0.05 },
    { location: [-22.9068, -43.1729], size: 0.05 },
    { location: [4.711, -74.0721], size: 0.05 },
    { location: [-34.6037, -58.3816], size: 0.05 },
    { location: [34.0522, -118.2437], size: 0.05 },
    { location: [30.2672, -97.7431], size: 0.05 },
    { location: [49.2827, -123.1207], size: 0.05 },
    { location: [25.2048, 55.2708], size: 0.05 },
    { location: [31.5017, 34.4668], size: 0.05 },
    { location: [10.8231, 106.6297], size: 0.05 },
    { location: [-3.7319, -38.5267], size: 0.05 },
    { location: [6.5244, 3.3792], size: 0.05 },
    { location: [-1.2921, 36.8219], size: 0.05 },
  ],
};

export function Globe({ className, config = GLOBE_CONFIG }) {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);
  const pointerInteracting = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const r = useMotionValue(0);
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  });

  const updatePointerInteraction = (value) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX, isTouch = false) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      const damping = isTouch ? TOUCH_MOVEMENT_DAMPING : MOVEMENT_DAMPING;
      r.set(r.get() + delta / damping);
      pointerInteracting.current = clientX;
    }
  };

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let phi = config.phi ?? 0;
    let width = 0;
    let globe;
    let rafId;
    let cancelled = false;

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };

    window.addEventListener("resize", onResize);
    onResize();

    const createTheGlobe = () => {
      if (cancelled) return;
      if (width === 0) {
        rafId = requestAnimationFrame(createTheGlobe);
        return;
      }

      globe = createGlobe(canvasRef.current, {
        ...config,
        width: width * 2,
        height: width * 2,
        onRender: (state) => {
          if (!pointerInteracting.current) phi += 0.005;
          state.phi = phi + rs.get();
          state.width = width * 2;
          state.height = width * 2;
        },
      });

      setTimeout(() => {
        if (canvasRef.current) canvasRef.current.style.opacity = "1";
      }, 0);
    };

    const timeoutId = setTimeout(createTheGlobe, 0);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      if (globe) globe.destroy();
    };
  }, [rs, config, isVisible]);

  return (
    <div
      ref={wrapperRef}
      className={twMerge(
        "mx-auto aspect-[1/1] w-full max-w-[600px]",
        className
      )}
    >
      <canvas
        className={twMerge(
          "size-[30rem] opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
        )}
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX;
          updatePointerInteraction(e.clientX);
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX, false)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX, true)
        }
      />
    </div>
  );
}