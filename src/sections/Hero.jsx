import { Canvas, useFrame } from "@react-three/fiber";
import HeroText from "../components/HeroText";
import ParallaxBackground from "../components/ParallaxBackground";
import { Astronaut } from "../components/Astronaut";
import { Float, OrbitControls } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { easing } from "maath";
import { Suspense, useEffect, useRef, useState } from "react";
import Loader from "../components/Loader";
import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  const heroRef = useRef(null);
  const [showArrow, setShowArrow] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowArrow(entry.isIntersecting);
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative flex items-start justify-center min-h-svh md:items-start md:justify-start c-space"
    >
      <HeroText />
      <ParallaxBackground />
      <figure
        className="absolute inset-0"
        style={{ width: "100vw", height: "100vh" }}
      >
        <Canvas
  camera={{ position: [0, 1, 3] }}
  dpr={isMobile ? 1 : [1, 1.5]}
  gl={{
    antialias: false,
    powerPreference: "high-performance",
  }}
  frameloop={isVisible ? "always" : "never"}
>
  <Suspense fallback={<Loader />}>
    <OrbitControls
      enableDamping
      dampingFactor={0.08}
      enablePan={false}
      minDistance={1.5}
      maxDistance={6}
    />

    <Astronaut
      scale={isMobile ? 0.23 : 0.3}
      position={isMobile ? [0, -1.5, 0] : [1.3, -1, 0]}
    />

    <Rig />
  </Suspense>
</Canvas>
      </figure>

      {showArrow && (
  <button
    onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
    className="fixed z-20 -translate-x-1/2 bottom-8 left-1/2"
    aria-label="Scroll to About section"
  >
    <motion.div
      className="relative flex items-center justify-center rounded-full size-14 bg-primary/60"
      animate={{
        boxShadow: [
          "0 0 6px 1px rgba(122,87,219,0.4)",
          "0 0 18px 6px rgba(122,87,219,0.9)",
          "0 0 6px 1px rgba(122,87,219,0.4)",
        ],
      }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <ChevronDown className="w-6 h-6 text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.9)]" />
    </motion.div>
  </button>
)}
    </section>
  );
};

function Rig({ enabled }) {
  useFrame((state, delta) => {
    if (!enabled) return;

    easing.damp3(
      state.camera.position,
      [state.mouse.x / 10, 1 + state.mouse.y / 10, 3],
      0.5,
      delta
    );
  });

  return null;
}

export default Hero;