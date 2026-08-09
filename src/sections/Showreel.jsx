import ShowreelPlayer from "../components/ShowreelPlayer";

const Showreel = () => {
  return (
    <section id="work" className="relative c-space mt-20 md:mt-30">
      <h2 className="text-heading">Showreel</h2>
      <div className="relative w-full mt-12 overflow-hidden border rounded-2xl aspect-video border-white/10 bg-gradient-to-b from-storm to-indigo">
        <ShowreelPlayer src="/assets/projects/Showcase26.1.mp4" poster="/assets/projects/showreel26.png" />
      </div>
    </section>
  );
};

export default Showreel;