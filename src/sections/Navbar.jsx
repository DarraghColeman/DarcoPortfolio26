import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

function Navigation({ onNavigate }) {
  return (
    <ul className="nav-ul">
      <li className="nav-li">
        <a className="nav-link" href="#home" onClick={onNavigate}>
          Home
        </a>
      </li>
      <li className="nav-li">
        <a className="nav-link" href="#about" onClick={onNavigate}>
          About
        </a>
      </li>
      <li className="nav-li">
        <a className="nav-link" href="#work" onClick={onNavigate}>
          Work
        </a>
      </li>
      <li className="nav-li">
        <a className="nav-link" href="#contact" onClick={onNavigate}>
          Contact
        </a>
      </li>
    </ul>
  );
}
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      setIsOpen(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  return (
    <div className="fixed inset-x-0 z-20 w-full bg-primary">
      <div className="mx-auto c-space max-w-7xl">
        <div className="flex items-center justify-between py-2 sm:py-0">
          <a
            href="/"
            className="text-xl font-bold transition-colors text-neutral-400 hover:text-white"
          >
            <img src="assets/Darco_Viz.TypeWhite.webp" alt="Darco logo" className="w-24 h-auto" loading="lazy"/>
          </a>
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="relative flex h-8 w-8 items-center justify-center sm:hidden"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
          <motion.span
            className="absolute h-0.5 w-6 bg-current"
            animate={{
              rotate: isOpen ? 45 : 0,
              y: isOpen ? 0 : -6,
            }}
            transition={{ duration: 0.25 }}
          />

          <motion.span
            className="absolute h-0.5 w-6 bg-current"
            animate={{
              opacity: isOpen ? 0 : 1,
            }}
            transition={{ duration: 0.15 }}
          />

          <motion.span
            className="absolute h-0.5 w-6 bg-current"
            animate={{
              rotate: isOpen ? -45 : 0,
              y: isOpen ? 0 : 6,
            }}
            transition={{ duration: 0.25 }}
          />
          </motion.button>
          <nav className="hidden sm:flex">
            <Navigation />
          </nav>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
  className="block overflow-hidden text-center bg-gradient-to-b from-primary to-lavenderDark sm:hidden"
  initial={{ opacity: 0, height: 0, y: -10 }}
  animate={{ opacity: 1, height: "auto", y: 0 }}
  exit={{ opacity: 0, height: 0, y: -10 }}
  transition={{ duration: 0.3, ease: "easeInOut" }}
>
            <nav className="pb-5">
              <Navigation onNavigate={() => setIsOpen(false)} />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;