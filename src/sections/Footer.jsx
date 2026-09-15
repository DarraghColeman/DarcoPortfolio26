const Footer = () => {
  return (
    <section className="flex flex-col w-full items-center justify-center pt-2 md:pt-4 pb-10 sm:pb-6 text-sm text-neutral-400 c-space">
        <div className="socialsGlow">
            <ul>
                <li>
                    <a href="https://github.com/DarraghColeman" aria-label="GitHub">
                        <i className="fab fa-github"></i>
                    </a>
                </li>
                <li>
                    <a href="" aria-label="Art Station">
                        <i className="fab fa-artstation"></i>
                    </a>
                </li>
                <li>
                    <a href="https://www.instagram.com/darco_viz" aria-label="Instagram">
                        <i className="fab fa-instagram"></i>
                    </a>
                </li>
                <li>
                    <a href="https://www.linkedin.com/in/darragh-coleman-749966219/" aria-label="LinkedIn">
                        <i className="fab fa-linkedin-in"></i>
                    </a>
                </li>
                <li><i className="fab fa-youtube" aria-label="YouTube"></i></li>
            </ul>
        </div>
        <div className="flex flex-col items-center justify-between w-full gap-4 mt-4 text-center c-space sm:flex-row sm:text-left">
          <p>Location: <span className="location-glow">Lisbon</span></p>
          <p>Status: <span className="status-glow">Open for work</span></p>
          <a
            href="/assets/DarraghColeman-CV.pdf"
            download
            className="underline hover-animation location-glow"
          >
            Download CV
          </a>
        </div>
    </section>
  );
};

export default Footer;