import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useAnimationFrame } from "motion/react";
import { twMerge } from "tailwind-merge";

export default function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  draggable = false,
  duration = 20, // seconds for one full loop
  ...props
}) {
  const trackRef = useRef(null);
  const [trackSize, setTrackSize] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isPanning, setIsPanning] = useState(false);
  const pos = useMotionValue(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const measure = () => {
      const rect = el.getBoundingClientRect();
      setTrackSize(vertical ? rect.height : rect.width);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [vertical]);

  const wrap = (value) => {
    if (!trackSize) return value;
    let next = value;
    if (next <= -trackSize) next += trackSize;
    if (next > 0) next -= trackSize;
    return next;
  };

  const shouldPause = isPanning || (pauseOnHover && isHovering);

  useAnimationFrame((_, delta) => {
    if (shouldPause || !trackSize) return;
    const speedPxPerMs = trackSize / (duration * 3000);
    const dir = reverse ? 1 : -1;
    pos.set(wrap(pos.get() + dir * speedPxPerMs * delta));
  });

  const handlePan = (_, info) => {
    pos.set(wrap(pos.get() + (vertical ? info.delta.y : info.delta.x)));
  };

  return (
    <div
      {...props}
      className={twMerge(
        `flex overflow-hidden p-2 [gap:var(--gap,1rem)] ${
          vertical ? "flex-col" : "flex-row"
        }`,
        className
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <motion.div
        style={{
          [vertical ? "y" : "x"]: pos,
          cursor: draggable ? "grab" : undefined,
          touchAction: draggable ? (vertical ? "pan-x" : "pan-y") : undefined,
        }}
        onPanStart={draggable ? () => setIsPanning(true) : undefined}
        onPan={draggable ? handlePan : undefined}
        onPanEnd={draggable ? () => setIsPanning(false) : undefined}
        className={`flex shrink-0 [gap:var(--gap,1rem)] ${
          vertical ? "flex-col" : "flex-row"
        }`}
      >
        <div
          ref={trackRef}
          className={`flex shrink-0 [gap:var(--gap,1rem)] ${
            vertical ? "flex-col" : "flex-row"
          }`}
        >
          {children}
        </div>
        <div
          className={`flex shrink-0 [gap:var(--gap,1rem)] ${
            vertical ? "flex-col" : "flex-row"
          }`}
          aria-hidden="true"
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
}