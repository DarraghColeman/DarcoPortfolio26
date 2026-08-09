import { FlipWords } from "./FlipWords";
import { motion } from "motion/react";

const HeroText = () => {
    const words = ["Art", "Design", "Interactivity", "Immersive Experiences", "Storytelling", "Web Solutions", "Extended Reality", "Light & Sound"];
    const variants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 },
    };
    return (
        <div className="z-10 mt-20 text-center md:mt-40 md:text-left rounded-3xl bg-clip-text pointer-events-none select-none">
            {/*Desktop View*/}
            <div className="flex-col hidden md:flex c-space">
                <motion.h1 
                    className="text-4xl font-medium hero-text-shadow"
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 1.5 }}>
                        Hi, I'm Darragh
                </motion.h1>
                <div className="flex flex-col items-start">
                    <motion.p className="text-5xl font-medium text-neutral-300 hero-text-shadow"
                            variants={variants}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 2 }}>
                        A Creative Technologist <br />dedicated to Crafting
                    </motion.p>
                    <motion.div className="font-bold text-white text-7xl hero-text-shadow w-full min-w-0"
                            variants={variants}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 3 }}>
                        <FlipWords words={words} />
                    </motion.div>
                </div>
            </div>
            {/*Mobile View*/}
            <div className="flex- felx-col space-y-6 md:hidden">
                <motion.p className="text-2xl font-medium hero-text-shadow"
                            variants={variants}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 1.5 }}
                >Hi, I'm Darragh.</motion.p>
                <div>
                    <motion.p className="text-3xl font-medium text-white-300 hero-text-shadow"
                            variants={variants}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 2 }}
                    >A Creative <br />Technologist building:</motion.p>
                    <br />
                    <motion.div
                            className="font-bold text-center text-white text-5xl hero-text-shadow w-full min-w-0"
                            variants={variants}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 3 }}
                    >
                        <FlipWords words={words} className="flex justify-center"/>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default HeroText;