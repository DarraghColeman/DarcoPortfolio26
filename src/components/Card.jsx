import { motion } from "motion/react";

const Card = ({ style, text, image, containerRef, floatDelay = 0 }) => {
  const floatAnimation = {
    y: [0, -10, 0],
  };
  const floatTransition = {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut",
    delay: floatDelay,
  };

  return image && !text ? (
    <motion.img 
        className="absolute w-15 cursor-grab" 
        src={image} 
        style={style} 
        whileHover={{ scale: 1.05 }}
        animate={floatAnimation}
        transition={floatTransition}
        drag
        dragConstraints={containerRef}
        dragElastic={1}
    />
  ) : (
    <motion.div 
        className="absolute px-8 py-4 text-xl text-center rounded-full ring 
        ring-gray-700/50 font-extralight bg-storm/40 backdrop-blur-sm w-fit cursor-grab"
        style={style}
        whileHover={{ scale: 1.05 }}
        animate={floatAnimation}
        transition={floatTransition}
        drag
        dragConstraints={containerRef}
        dragElastic={1}
    >
        {text}
    </motion.div>
  );
};

export default Card;