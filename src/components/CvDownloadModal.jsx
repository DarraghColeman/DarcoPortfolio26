import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const CvDownloadModal = ({ closeModal }) => {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full p-4 overflow-hidden backdrop-blur-sm">
        <motion.div
          className="relative flex flex-col items-center w-full max-w-sm gap-6 p-8 border shadow-sm rounded-2xl bg-gradient-to-l from-midnight to-navy border-white/10"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <button
            onClick={closeModal}
            className="absolute z-10 p-2 rounded-sm top-5 right-5 bg-midnight hover:bg-gray-500"
          >
            <img src="/assets/close.svg" className="w-6 h-6" loading="lazy" alt="Close Window" />
          </button>

          <h5 className="text-xl font-bold text-white">Choose CV Language</h5>

          <div className="flex gap-6">
            <a
              href="/assets/DarraghColemanCV26_Eng.pdf"
              download
              onClick={closeModal}
              className="flex flex-col items-center gap-2 hover-animation"
            >
              <img
                src="/assets/britFlag.webp"
                alt="English CV"
                className="rounded-full size-12 object-cover hover-animation"
                loading="lazy"
              />
              <span className="text-sm text-neutral-400">English</span>
            </a>

            <a
              href="/assets/DarraghColemanCV26_Por.pdf"
              download
              onClick={closeModal}
              className="flex flex-col items-center gap-2 hover-animation"
            >
              <img
                src="/assets/portFlag.webp"
                alt="Portuguese CV"
                className="rounded-full size-12 object-cover hover-animation"
                loading="lazy"
              />
              <span className="text-sm text-neutral-400">Português</span>
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CvDownloadModal;
