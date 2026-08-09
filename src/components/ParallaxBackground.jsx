import { motion, useScroll, useSpring, useTransform } from "motion/react";

const ParallaxBackground = () => {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { damping: 50 });
  const mountain3Y = useTransform(x, [0, 0.5], ["0%", "70%"]);
  const planetsX = useTransform(x, [0, 0.5], ["0%", "-20%"]);
  const mountain2Y = useTransform(x, [0, 0.5], ["0%", "30%"]);
  const mountain1Y = useTransform(x, [0, 0.5], ["0%", "0%"]);

  return (
    <section className="absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 -z-50 bg-black/40">
      <div className="absolute inset-x-0 bottom-0 z-10 h-40 pointer-events-none bg-gradient-to-t from-primary to-transparent" />
      <div className="relative h-screen overflow-y-hidden">
        {/* Background Sky */}
        <motion.div
          className="absolute inset-0 w-full h-screen -z-50"
          style={{
            backgroundImage: "url(/assets/sky.jpg)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{
            duration: 10,
            times: [0, 0.5, 1],
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
        {/* Mountain Layer 3 */}
        <motion.div
          className="absolute inset-0 -z-40"
          style={{
            backgroundImage: "url(/assets/alienIreland.png)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            y: mountain3Y,
          }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{
            duration: 10,
            times: [0, 0.5, 1],
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
        {/* Planets */}
        <motion.div
          className="absolute inset-0 -z-30"
          style={{
            backgroundImage: "url(/assets/planets.png)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            x: planetsX,
          }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{
            duration: 10,
            times: [0, 0.5, 1],
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
        {/* Mountain Layer 2 */}
        <motion.div
          className="absolute inset-0 -z-20"
          style={{
            backgroundImage: "url(/assets/mountain-2.png)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            y: mountain2Y,
          }}
        />
        {/* Mountaine Layer 1 */}
        <motion.div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: "url(/assets/alienIreland2.png)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            y: mountain1Y,
          }}
          animate={{ scale: [1, 1.02, 1] }}
          transition={{
            duration: 10,
            times: [0, 0.5, 1],
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
      </div>
    </section>
  );
};

export default ParallaxBackground;