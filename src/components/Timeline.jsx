"use client";
import { useMotionValue, useSpring, useTransform, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

const TimelineItem = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex justify-start pt-10 md:pt-40 md:gap-10">
      <div className="sticky z-40 flex flex-col items-center self-start max-w-xs md:flex-row top-40 lg:max-w-sm md:w-full">
        <div className="flex-col hidden gap-2 text-xl font-bold md:flex md:pl-20 md:text-4xl text-neutral-300">
          <h3>{item.date}</h3>
          <h3 className="text-3xl text-neutral-400">{item.title}</h3>
          <h3 className="text-3xl text-neutral-500">{item.job}</h3>
        </div>
      </div>

      <div className="relative w-full pl-20 pr-4 md:pl-4">
        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          className="flex flex-col items-start w-full mb-2 text-left md:hidden"
        >
          <h3 className="text-xs text-neutral-500">{item.date}</h3>
          <h3 className="text-lg font-bold text-neutral-300">{item.title}</h3>
          <h3 className="text-sm text-neutral-500">{item.job}</h3>
        </button>

        <div className="md:hidden">
          <div
            className={`relative ${
              isExpanded ? "" : "max-h-16 overflow-hidden"
            }`}
          >
            {item.contents.map((content, index) => (
              <p
                className="mb-3 text-sm font-normal text-neutral-400"
                key={index}
              >
                {content}
              </p>
            ))}
            {!isExpanded && (
              <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-primary to-transparent" />
            )}
          </div>
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="mt-1 text-xs text-neutral-500 underline"
          >
            {isExpanded ? "Show less" : "Read more"}
          </button>
        </div>

        <div className="hidden md:block">
          {item.contents.map((content, index) => (
            <p className="mb-3 font-normal text-neutral-400" key={index}>
              {content}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Timeline = ({ data }) => {
  const ref = useRef(null);
  const [height, setHeight] = useState(0);
  const rawProgress = useMotionValue(0);
  const smoothProgress = useSpring(rawProgress, {
    stiffness: 300,
    damping: 40,
    mass: 0.5,
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setHeight(el.getBoundingClientRect().height);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const startPoint = vh * 0.85;
      const endPoint = vh * 0.5 - rect.height;
      const range = startPoint - endPoint;
      const pct = range > 0 ? (startPoint - rect.top) / range : 0;
      rawProgress.set(Math.min(Math.max(pct, 0), 1));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [height, rawProgress]);

  const heightTransform = useTransform(smoothProgress, [0, 1], [0, height]);

const sectionOpacity = useTransform(smoothProgress, [0, 0.15, 0.97, 1], [0, 1, 1, 0]);

  return (
    <div className="c-space section-spacing">
      <h2 className="text-heading">Experience</h2>
      <div ref={ref} className="relative pb-20">
        {data.map((item, index) => (
          <TimelineItem key={index} item={item} />
        ))}
        <motion.div style={{ opacity: sectionOpacity }}>
          <div
            style={{ height: height + "px" }}
            className="absolute left-1 top-0 overflow-hidden w-[2px]"
          >
            <motion.div
              style={{ height: heightTransform }}
              className="absolute inset-x-0 top-0 overflow-hidden w-[2px]"
            >
              <div
  style={{ height: height + "px" }}
  className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-b from-purple-900/30 via-lavender/70 to-lavender rounded-full"
/>
            </motion.div>
          </div>
          <motion.div
            style={{ top: heightTransform }}
            className="absolute z-10 w-[3px] h-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full left-1.25 bg-white shadow-[0_0_10px_4px_rgba(255,255,255,1)]"
          />
        </motion.div>
      </div>
    </div>
  );
};