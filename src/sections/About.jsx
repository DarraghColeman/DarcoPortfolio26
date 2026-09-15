import { Globe } from "../components/globe";
import CopyEmailButton from "../components/CopyEmailButton";
import { Frameworks } from "../components/FrameWorks";
import { motion } from "motion/react";

const About = () => {
  return (
    <section className="relative c-space section-spacing" id="about">
      <h2 className="text-heading">About Me</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[18rem] mt-12">
        {/* Grid 1 */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-storm to-indigo grid-2">
          <motion.img
            src="assets/portfolioPhoto.JPG"
            loading="lazy"
            alt="Darragh Coleman profile photo"
            className="absolute inset-0 object-cover w-full h-full"
            initial={{ opacity: 1 }}
            whileInView={{ opacity: 0.15 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 1, duration: 1.2, ease: "easeInOut" }}
          />

          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center bg-black/10"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.8, duration: 1, ease: "easeInOut" }}
          >
            <p className="text-xl font-bold text-white sm:text-2xl">
              Darragh Coleman
            </p>
            <p className="max-w-xs text-sm sm:text-base text-left" color="white">
              Creative Technologist blending art, design, interactive media and code.
              <br />
              <br />
              I've always been very passionate about the arts and entertainment. I love visual art, music, film, literature and videogames.
              Not just as a consumer, but also as a creator.
            </p>
          </motion.div>
        </div>

        {/* Grid 2 */}
        <div className="flex items-end grid-default-color grid-1">
          <img
            src="assets/coding-pov.webp"
            alt="Image of a tablet with code"
            loading="lazy"
            className="absolute scale-[1.75] -right-[5rem] -top-[1rem] md:scale-[3] md:left-50 md:inset-y-10 lg:scale-[2.5]"
          />
          <div className="z-10">
            {/*<p className="headtext">Hi, I'm Darragh</p>*/}
            <p className="subtext" color="white">
              In 2020, after 10 years as an English teacher, I decided it was time to pursue something more creative and ambitious that 
              fit better with me and my personality.
              <br />
              <br />
              Since then I've been working on my creative skills and technical fundamentals by upskilling in diverse 
              areas so that I can bring my ideas and those of others to life.
            </p>
          </div>
          <div className="absolute inset-x-0 pointer-evets-none -bottom-4 h-1/2 sm:h-1/3 bg-gradient-to-t from-indigo" />
        </div>
        
        {/* Grid 3 */}
        <div className="grid-black-color grid-3">
          <figure className="absolute left-[42%] top-[10%]">
          <Globe />
        </figure>
          <div className="relative z-10 w-[50%]">
            <p className="headtext lg:text-2xl">Available</p>
            <br />
            <p className="subtext lg:text-lg">
              I'm currently based in Lisbon, but open to remote work or even relocation for the right project.
            </p>
          </div>
        </div>

        {/* Grid 4 */}
        <div className="grid-special-color grid-4">
          <div className="flex flex-col items-center justify-center gap-4 size-full">
            <p className="headtext !text-center">
              Let's work together!
            </p>
            <CopyEmailButton />
          </div>
        </div>
        
        {/* Grid 5 */}
        <div className="grid-default-color grid-5">
          <div className="z-10 w-[50%]">
            <p className="headtext">Tech Stack</p>
            <p className="subtext">
              I work with a variety of softwares, languages, frameworks and tools that
              help get what's needed and desired.
            </p>
          </div>
          <div className="absolute inset-y-0 md:inset-y-9 w-full h-full start-[50%] md:scale-125">
            <Frameworks />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

{/*
        {/* Grid 2 PREVIOUS VERSION 
        <div className="grid-default-color grid-2">
          <div
            ref={grid2Container}
            className="flex items-center justify-center w-full h-full"
          >
            <p className="flex items-end text-5xl text-gray-500">
              Skillset:
            </p>
            <Card
              style={{ rotate: "25deg", top: "20%", left: "5%" }}
              text="Video-Mapping"
              containerRef={grid2Container}
              floatDelay={0}
            />
            <Card
              style={{ rotate: "-30deg", top: "55%", left: "50%" }}
              text="3D"
              containerRef={grid2Container}
              floatDelay={0.3}
            />
            <Card
              style={{ rotate: "75deg", bottom: "50%", left: "70%" }}
              text="Design"
              containerRef={grid2Container}
              floatDelay={0.6}
            />
            <Card
              style={{ rotate: "-45deg", top: "55%", left: "0%" }}
              text="Motion"
              containerRef={grid2Container}
              floatDelay={0.9}
            />
            <Card
              style={{ rotate: "15deg", top: "10%", left: "30%" }}
              text="Game Engines"
              containerRef={grid2Container}
              floatDelay={1.2}
            />
            <Card
              style={{ rotate: "-20deg", top: "78%", left: "15%" }}
              text="Web Dev."
              containerRef={grid2Container}
              floatDelay={1.5}
            />
            <Card
              style={{ rotate: "-10deg", top: "70%", left: "65%" }}
              text="UI/UX"
              containerRef={grid2Container}
              floatDelay={1.8}
            />
            {/*<Card
              style={{ rotate: "30deg", top: "70%", left: "70%" }}
              image="assets/logos/csharp-pink.webp"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-45deg", top: "70%", left: "25%" }}
              image="assets/logos/dotnet-pink.webp"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-45deg", top: "5%", left: "10%" }}
              image="assets/logos/blazor-pink.webp"
              containerRef={grid2Container}
            />
          </div>
        </div>*/}