import React, { lazy, Suspense, useState } from "react";
import { useSnapCarousel } from "@/hooks/use-snap-carousel";
import { useDeferredPanels } from "@/hooks/use-deferred-panels";
import { PanelPlaceholder } from "./PanelPlaceholder";
import "./ChaptersCoverflow.css";

const loadInside = () => import("./Protein11Interactions");
const loadDigestion = () => import("./Chapter2Digestion");
const loadDay = () => import("./Chapter3YourDay");
const Protein11Interactions = lazy(() => loadInside().then((m) => ({ default: m.Protein11Interactions })));
const Chapter2Digestion = lazy(() => loadDigestion().then((m) => ({ default: m.Chapter2Digestion })));
const Chapter3YourDay = lazy(() => loadDay().then((m) => ({ default: m.Chapter3YourDay })));
const preloadChapters = () => Promise.all([loadInside(), loadDigestion(), loadDay()]);

interface Chapter {
  id: string;
  /** the question the tab asks */
  label: string;
  /** what is behind it */
  sub: string;
  Component: React.ComponentType;
}

const chapters: Chapter[] = [
  {
    id: "particle",
    label: "What’s inside?",
    sub: "16 ingredients",
    Component: Protein11Interactions,
  },
  {
    id: "digestion",
    label: "What happens next?",
    sub: "After you eat it",
    Component: Chapter2Digestion,
  },
  {
    id: "day",
    label: "Where does it fit?",
    sub: "Your day",
    Component: Chapter3YourDay,
  },
];

const chapterIds = chapters.map((chapter) => chapter.id);

export function ChaptersCoverflow() {
  const [activeIndex, setActiveIndex] = useState(0);
  const stageRef = useSnapCarousel(activeIndex, setActiveIndex);
  const { rootRef, built } = useDeferredPanels(chapters[activeIndex].id, chapterIds, preloadChapters);

  return (
    <div ref={rootRef} className="chapters-coverflow" role="region" aria-label="Protein 11 chapters carousel">
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
        {chapters.map(({ id, label, sub, Component }, index) => {
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
              key={id}
              className={`chapters-coverflow__item ${positionClass} ${isActive ? "is-active" : ""}`}
              onClick={() => !isActive && setActiveIndex(index)}
              tabIndex={isActive ? 0 : -1}
              role="tabpanel"
              id={`chapter-panel-${id}`}
              aria-hidden={!isActive}
              aria-label={`${sub}: ${label}`}
            >
              <div className="chapters-coverflow__item-content">
                {built.has(id) ? (
                  <Suspense fallback={<PanelPlaceholder />}>
                    <Component />
                  </Suspense>
                ) : (
                  <PanelPlaceholder />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ChaptersCoverflow;
