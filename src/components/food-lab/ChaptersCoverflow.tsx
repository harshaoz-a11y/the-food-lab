import React, { useState, useCallback } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Protein11Interactions } from "./Protein11Interactions";
import { Chapter2Digestion } from "./Chapter2Digestion";
import { Chapter3YourDay } from "./Chapter3YourDay";
import { Chapter4Fresh } from "./Chapter4Fresh";
import "./ChaptersCoverflow.css";

interface Chapter {
  id: string;
  label: string;
  component: React.ReactNode;
}

const chapters: Chapter[] = [
  {
    id: "particle",
    label: "The Particle Bar",
    component: <Protein11Interactions />,
  },
  {
    id: "digestion",
    label: "After You Eat It",
    component: <Chapter2Digestion />,
  },
  {
    id: "day",
    label: "Your Day",
    component: <Chapter3YourDay selectedPersonaId={null} onSelectPersona={() => {}} onSelectPartnership={() => {}} />,
  },
  {
    id: "fresh",
    label: "Fresh",
    component: <Chapter4Fresh />,
  },
];

export function ChaptersCoverflow() {
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = useCallback((index: number) => {
    setActiveIndex((prev) => (index + chapters.length) % chapters.length);
  }, []);

  const handlePrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const handleNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  return (
    <div className="chapters-coverflow" role="region" aria-label="Protein 11 chapters carousel">
      {/* Navigation Controls */}
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
              <span className="chapters-coverflow__pill-number">0{index + 1}</span>
              <span className="chapters-coverflow__pill-label">{chapter.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3D Coverflow Stage */}
      <div className="chapters-coverflow__stage">
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
              aria-label={`Chapter ${index + 1}: ${chapter.label}`}
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