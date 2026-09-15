import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";

const ProjectDetails = ({
  title,
  description,
  subDescription,
  image,
  gallery,
  tags,
  closeModal,
}) => {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const videoRef = useRef(null);

  const slides = gallery && gallery.length > 0
    ? gallery
    : [{ type: "image", src: image }];

  const [index, setIndex] = useState(0);
  const current = slides[index];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0.5;
    }
  }, [index]);

  const goPrev = () => setIndex((i) => (i === 0 ? slides.length - 1 : i - 1));
  const goNext = () => setIndex((i) => (i === slides.length - 1 ? 0 : i + 1));

  // ...rest of component unchanged, except the <video> tag below

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full p-4 overflow-hidden backdrop-blur-sm">
      <motion.div
        className="relative flex flex-col w-full max-w-2xl overflow-hidden border shadow-sm rounded-2xl bg-gradient-to-l from-midnight to-navy border-white/10 max-h-[90vh]"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <button
          onClick={closeModal}
          className="absolute z-10 p-2 rounded-sm top-5 right-5 bg-midnight hover:bg-gray-500"
        >
          <img src="assets/close.svg" className="w-6 h-6" loading="lazy" alt="Close Window"/>
        </button>

        <div className="relative flex-shrink-0 overflow-hidden aspect-video bg-black">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              {current.type === "video" ? (
  <video
    ref={videoRef}
    src={current.src}
    className={`absolute inset-0 w-full h-full ${current.fit === "contain" ? "object-contain" : "object-cover"}`}
    controls
    loop
    onLoadedMetadata={(e) => {
      e.target.volume = 0.3;
    }}
  />
) : (
  <img
    loading="lazy"
    src={current.src}
    alt="Gallery Image"
    className={`absolute inset-0 w-full h-full ${current.fit === "contain" ? "object-contain" : "object-cover"}`}
  />
)}
            </motion.div>
          </AnimatePresence>

          {slides.length > 1 && (
            <>
              <button
                onClick={goPrev}
                className="absolute p-2 -translate-y-1/2 rounded-full left-3 top-[42%] bg-black/50 hover:bg-black/70"
                aria-label="Previous"
              >
                <img src="assets/arrow-right.svg" className="w-4 h-4 rotate-180" loading="lazy" alt="Previous slide" />
              </button>
              <button
                onClick={goNext}
                className="absolute p-2 -translate-y-1/2 rounded-full right-3 top-[42%] bg-black/50 hover:bg-black/70"
                aria-label="Next"
              >
                <img src="assets/arrow-right.svg" className="w-4 h-4" loading="lazy" alt="Next slide" />
              </button>

              <div className="absolute flex gap-2 -translate-x-1/2 bottom-3 left-1/2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i === index ? "bg-white" : "bg-white/40"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="p-5 overflow-y-auto details-scroll">
            <h5 className="mb-2 text-2xl font-bold text-white">{title}</h5>
          <p className="mb-3 font-normal text-neutral-400">{description}</p>
          {subDescription.map((subDesc, index) => (
            <p className="mb-3 font-normal text-neutral-400" key={index}>{subDesc}</p>
          ))}
        </div>

        <div className="flex gap-3 p-5 pt-0">
          {tags.map((tag) => (
            <img
              key={tag.id}
              src={tag.path}
              alt={tag.name}
              className="rounded-lg size-6 hover-animation"
              loading="lazy"
              alt="Preview Image of Project"
            />
          ))}
          {/* 
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 ml-auto font-medium cursor-pointer hover-animation"
          >
            View Project <img src="assets/arrow-up.svg" className="size-4" />
          </a> */}
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetails;