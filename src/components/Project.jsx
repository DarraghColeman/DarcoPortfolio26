import { useState, useRef, useEffect } from "react";
import ProjectDetails from "./ProjectDetails";

const supportsHover =
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

const Project = ({
  title,
  description,
  subDescription,
  href,
  image,
  gallery,
  tags,
  setPreview,
}) => {
  const [isHidden, setIsHidden] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasReadMore, setHasReadMore] = useState(false);
  const closeTimerRef = useRef(null);

  const toggleExpanded = () => setIsExpanded((prev) => !prev);

  useEffect(() => {
    if (isExpanded && !hasReadMore) {
      closeTimerRef.current = setTimeout(() => {
        setIsExpanded(false);
      }, 5000);
    }
    return () => clearTimeout(closeTimerRef.current);
  }, [isExpanded, hasReadMore]);

  const handleReadMore = () => {
    clearTimeout(closeTimerRef.current);
    setHasReadMore(true);
    setIsHidden(true);
  };

  const handleCloseModal = () => {
    setIsHidden(false);
    setIsExpanded(false);
  };

  const handlePreviewEnter = () => supportsHover && setPreview(image);
  const handlePreviewLeave = () => supportsHover && setPreview(null);

  const isHighlighted = hasReadMore || isExpanded;

  return (
    <>
      <div
        className="py-6 sm:py-10"
        onMouseEnter={handlePreviewEnter}
        onMouseLeave={handlePreviewLeave}
      >
        <button
          type="button"
          onClick={toggleExpanded}
          className="flex items-center justify-between w-full text-left cursor-pointer sm:cursor-default"
        >
          <p
            className={`text-xl sm:text-2xl transition-colors duration-700 ease-in-out ${
              isHighlighted ? "text-lavender2" : "text-white"
            }`}
          >
            {title}
          </p>
          <img
            loading="lazy"
            src="assets/arrow-right.svg"
            className={`w-5 transition-transform duration-500 sm:hidden ${
              isExpanded ? "rotate-90" : ""
            }`}
          />
        </button>

        <div
          className={`grid transition-all duration-500 ease-in-out sm:!grid-rows-[1fr] sm:!opacity-100 ${
            isExpanded ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0 mt-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="flex-wrap items-center justify-between space-y-6 sm:flex sm:space-y-0">
              <div className="flex gap-5 mt-3 md:mt-4 text-sand">
                  {tags.map((tag) => (
                  <img key={tag.id} src={tag.path} alt={tag.name} className="w-6 h-6" loading="lazy"/>
                ))}
              </div>
              <button
                onClick={handleReadMore}
                className="flex items-center gap-1 cursor-pointer hover-animation"
              >
                Read More
                <img src="assets/arrow-right.svg" className="w-5" loading="lazy"/>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent h-[1px] w-full" />

      {isHidden && (
        <ProjectDetails
          title={title}
          description={description}
          subDescription={subDescription}
          image={image}
          gallery={gallery}
          tags={tags}
          href={href}
          closeModal={handleCloseModal}
        />
      )}
    </>
  );
};

export default Project;