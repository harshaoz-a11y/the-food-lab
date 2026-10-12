import React, { useState, useCallback } from "react";
import { Protein11Interactions } from "./Protein11Interactions";
import { Chapter2Digestion } from "./Chapter2Digestion";
import { Chapter3YourDay } from "./Chapter3YourDay";
import { useSnapCarousel } from "@/hooks/use-snap-carousel";
import "./ChaptersCoverflow.css";

interface Chapter {
  id: string;
  /** the question the tab asks */
  label: string;
  /** what is behind it */
  sub: string;
  component: React.ReactNode;
}

const chapters: Chapter[] = [
  {
    id: "particle",
    label: "What’s inside?",
    sub: "The particle bar",
    component: <Protein11Interactions />,
  },
  {
    id: "digestion",
    label: "What happens next?",
    sub: "After you eat it",
    component: <Chapter2Digestion />,
  },
  {
    id: "day",
    label: "Where does it fit?",
    sub: "Your day",
    component: <Chapter3YourDay />,
  },
];

export function ChaptersCoverflow() {
  const [activeIndex, setActiveIndex] = useState(0);
  const stageRef = useSnapCarousel(activeIndex, setActiveIndex);

  const goTo = useCallback((index: number) => {
    setActiveIndex((prev) => (index + chapters.length) % chapters.length);
  }, []);

  return (
    <div className="chapters-coverflow" role="region" aria-label="Protein 11 chapters carousel">
      {/* Chapter selector */}
      <div className="chapters-coverflow__controls">
        <div className="chapters-coverflow__pills" role="tablist" aria-label="Chapter selector">
          {chapters.map((chapter, index) => (
            <button
              key={chapter.id}
              type="button"
              role="tab"
              aria-selected={activeIndex === index}
              aria-controls={`chapter-panel-${chapter.id}`}
              onClick={() => setActiveIndex(index)}
              className={`chapters-coverflow__pill ${activeIndex === index ? "is-active" : ""}`}
            >
              <span className="chapters-coverflow__pill-number" aria-hidden="true">{index + 1}</span>
              <span className="chapters-coverflow__pill-text">
                <span className="chapters-coverflow__pill-label">{chapter.label}</span>
                <span className="chapters-coverflow__pill-sub">{chapter.sub}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 3D Coverflow Stage */}
      <div ref={stageRef} className="chapters-coverflow__stage">
        {chapters.map((chapter, index) => {
          const offset = (index - activeIndex + chapters.length) % chapters.length;
          const position = offset > chapters.length / 2 ? offset - chapters.length : offset;

          const positionClass =
            position === -1
              ? "chapters-coverflow__item--pos-prev"
              : position === 0
              ? "chapters-coverflow__item--pos-active"
              : position === 1
              ? "chapters-coverflow__item--pos-next"
              : "chapters-coverflow__item--pos-far";

          const isActive = activeIndex === index;

          return (
            <div
              key={chapter.id}
              className={`chapters-coverflow__item ${positionClass} ${isActive ? "is-active" : ""}`}
              onClick={() => !isActive && setActiveIndex(index)}
              tabIndex={isActive ? 0 : -1}
              role="tabpanel"
              id={`chapter-panel-${chapter.id}`}
              aria-hidden={!isActive}
              aria-label={`${chapter.sub}: ${chapter.label}`}
            >
              <div className="chapters-coverflow__item-content">
                {chapter.component}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ChaptersCoverflow;