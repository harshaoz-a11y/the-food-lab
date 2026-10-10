import React, { Suspense, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, User } from "lucide-react";
import { INGREDIENTS, PARTNERSHIPS } from "@/components/Protein-11/protein11Data.js";
import { PERSONAS } from "./protein11Personas";
import Chapter2Digestion from "./Chapter2Digestion";
import Chapter3YourDay from "./Chapter3YourDay";
import Chapter4Fresh from "./Chapter4Fresh";
import barImage from "@/assets/maestro/alchemy-bar.jpg";
import "@/components/Protein-11/ParticleBar.css";
import "./Protein11Interactions.css";

// Lazy-load ParticleBar with React.lazy and Suspense
const ParticleBar = React.lazy(() => import("@/components/Protein-11/ParticleBar"));

export type Partnership = (typeof PARTNERSHIPS)[number];

const BAR_CROP = [0.2, 0.03, 0.98, 0.87] as const;

// Chapter definitions for the Coverflow Carousel
const chapters = [
  {
    id: "chapter-1",
    title: "The Particle Bar Explorer",
    subtitle: "Explore how ingredients interact in the bar",
    component: "particle-bar",
  },
  {
    id: "chapter-2",
    title: "After You Eat It",
    subtitle: "Digestion timeline and nutrient flow",
    component: "digestion",
  },
  {
    id: "chapter-3",
    title: "Your Day",
    subtitle: "How the bar fits into your daily routine",
    component: "day",
  },
  {
    id: "chapter-4",
    title: "Fresh",
    subtitle: "Made this week - peak freshness",
    component: "fresh",
  },
] as const;

export function Protein11Interactions() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selected, setSelected] = useState<Partnership | null>(null);
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Handle keyboard navigation
  const goToPrev = () => {
    setActiveIndex((prev) => (prev - 1 + chapters.length) % chapters.length);
  };
  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % chapters.length);
  };
  const goToChapter = (index: number) => {
    setActiveIndex(index);
  };

  // Handle partnership selection from Chapter 3
  const handleSelectPartnership = (partnershipId: string) => {
    const partnership = PARTNERSHIPS.find((p) => p.id === partnershipId);
    if (partnership) {
      setSelected(partnership);
      setActiveIndex(0); // Go to Chapter 1 (Particle Bar)
    }
  };

  // Handle persona selection
  const handleSelectPersona = (personaId: string | null) => {
    setSelectedPersona(personaId);
  };

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goToNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex]);

  // Handle touch swipe
  const startX = useRef<number | null>(null);
  const handleTouchStart = (e: TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: TouchEvent) => {
    if (startX.current === null) return;
    const diff = e.changedTouches[0].clientX - startX.current;
    const threshold = 50;
    if (diff > threshold) goToPrev();
    else if (diff < -threshold) goToNext();
    startX.current = null;
  };

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener("touchstart", handleTouchStart as any);
    container.addEventListener("touchend", handleTouchEnd as any);
    return () => {
      container.removeEventListener("touchstart", handleTouchStart as any);
      container.removeEventListener("touchend", handleTouchEnd as any);
    };
  }, []);

  // Get current chapter data
  const currentChapter = chapters[activeIndex];

  return (
    <div className="p11-coverflow-root">
      {/* Top Bar: "Who's eating?" Chips (Shared State, defaults to none) */}
      <header className="p11-whos-eating-bar" aria-label="Who's eating persona filter">
        <div className="p11-whos-eating-lead">
          <User className="h-4 w-4 text-brick" aria-hidden="true" />
          <span className="p11-whos-eating-title">Who's eating?</span>
        </div>
        <div className="p11-whos-eating-chips">
          <button
            type="button"
            onClick={() => handleSelectPersona(null)}
            className={`p11-whos-eating-chip ${selectedPersona === null ? "is-active" : ""}`}
          >
            All personas
          </button>
          {PERSONAS.map((persona) => (
            <button
              key={persona.id}
              type="button"
              onClick={() => handleSelectPersona(persona.id)}
              className={`p11-whos-eating-chip ${selectedPersona === persona.id ? "is-active" : ""}`}
            >
              {persona.chipLabel}
            </button>
          ))}
          <button
            type="button"
            onClick={() => handleSelectPersona(null)}
            className="p11-whos-eating-clear"
          >
            Clear
          </button>
        </div>
      </header>

      {/* Chapter Tabs */}
      <nav className="p11-coverflow-tabs" aria-label="Chapters">
        {chapters.map((chapter, index) => (
          <button
            key={chapter.id}
            type="button"
            onClick={() => goToChapter(index)}
            className={`p11-tab ${activeIndex === index ? "is-active" : ""}`}
            aria-current={activeIndex === index ? "page" : undefined}
          >
            <span className="p11-tab-number">0{index + 1}</span>
            <span className="p11-tab-title">{chapter.title}</span>
          </button>
        ))}
      </nav>

      {/* 3D Coverflow Viewport */}
      <div
        className="p11-coverflow-viewport"
        ref={containerRef}
        style={{
          perspective: "1200px",
          perspectiveOrigin: "center center",
        }}
      >
        <div className="p11-coverflow-track">
          {chapters.map((chapter, index) => {
            const distance = index - activeIndex;
            const absDistance = Math.abs(distance);

            // Calculate 3D transform for each slide
            const isCenter = absDistance === 0;
            const isAdjacent = absDistance === 1;
            const isFar = absDistance >= 2;

            // Transform values for 3D effect
            const rotateY = isCenter ? 0 : distance * -12;
            const translateZ = isCenter ? 0 : distance * 120;
            const scale = isCenter ? 1 : isAdjacent ? 0.85 : 0.7;
            const opacity = isCenter ? 1 : isAdjacent ? 0.9 : 0.6;

            // Z-index for proper layering
            const zIndex = 10 - absDistance;

            return (
              <div
                              key={chapter.id}
                              ref={(el) => {
                                slideRefs.current[index] = el;
                              }}
                              className={`p11-coverflow-slide ${isCenter ? "p11-coverflow-slide--active" : ""} ${
                                isAdjacent ? "p11-coverflow-slide--adjacent" : ""
                              } ${isFar ? "p11-coverflow-slide--far" : ""}`}
                              style={{
                                transform: `rotateY(${rotateY}deg) translateZ(${translateZ}px) scale(${scale})`,
                                opacity,
                                zIndex,
                              }}
                              role="group"
                              aria-roledescription="slide"
                              aria-label={`${chapter.title}, slide ${index + 1} of ${chapters.length}`}
                            >
                              {renderChapter(chapter, selected, selectedPersona, handleSelectPartnership, handleSelectPersona)}
                            </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="p11-coverflow-controls">
        <button
          type="button"
          onClick={goToPrev}
          className="p11-nav-btn"
          aria-label="Previous chapter"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Prev</span>
        </button>
        <span className="p11-nav-counter" aria-hidden="true">
          {activeIndex + 1} / {chapters.length}
        </span>
        <button
          type="button"
          onClick={goToNext}
          className="p11-nav-btn"
          aria-label="Next chapter"
        >
          <span>Next</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

// Render each chapter's content
function renderChapter(
  chapter: (typeof chapters)[number],
  selected: Partnership | null,
  selectedPersona: string | null,
  onSelectPartnership: (id: string) => void,
  onSelectPersona: (id: string | null) => void
) {
  switch (chapter.component) {
    case "particle-bar":
      return (
        <section
          id="p11-particle-stage"
          className="p11-interactions"
          aria-labelledby="p11-interactions-heading"
        >
          <header className="p11-header">
            <div>
              <span className="p11-header__kicker">Interaction explorer</span>
              <h3 id="p11-interactions-heading" className="p11-header__title">
                Protein 11 partnerships
              </h3>
            </div>
            <span className="p11-header__count">
              {PARTNERSHIPS.length} partnerships · select to inspect
            </span>
          </header>

          <div className="p11-container">
            {/* Left column on desktop, stacked below stage on mobile */}
            <div
              className="p11-list-section"
              role="region"
              aria-label="Partnerships list"
            >
              {/* First item: Whole bar (selected = null) */}
              <div className="p11-list-group">
                <button
                  type="button"
                  aria-pressed={selected === null}
                  onClick={() => setSelected(null)}
                  className={`p11-item-btn ${selected === null ? "is-selected" : ""}`}
                >
                  <span className="p11-item-title">Whole bar</span>
                  <span className="p11-item-badge">All 16</span>
                </button>
              </div>

              {/* Grouped partnerships */}
              {Object.entries(
                PARTNERSHIPS.reduce((groups, item) => {
                  if (!groups[item.group]) groups[item.group] = [];
                  groups[item.group].push(item);
                  return groups;
                }, {} as Record<string, typeof PARTNERSHIPS>)
              ).map(([group, items]) => (
                <div key={group} className="p11-list-group">
                  <span className="p11-group-heading">{group}</span>
                  <div className="p11-group-items" role="group" aria-label={group}>
                    {items.map((item) => {
                      const isSelected = selected?.id === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          aria-pressed={isSelected}
                          onClick={() => setSelected(item)}
                          className={`p11-item-btn ${isSelected ? "is-selected" : ""}`}
                        >
                          <span className="p11-item-title">{item.title}</span>
                          <span className="p11-item-badge">{item.ingredients.length} parts</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Right column on desktop, stacked above list on mobile */}
            <div className="p11-stage-section">
              {/* Particle stage with Suspense fallback (static bar image) */}
              <div className="p11-stage-wrapper">
                <React.Suspense
                  fallback={
                    <div className="pb" aria-hidden="true">
                      <img className="pb__img" src={barImage} alt="Protein 11 bar" />
                    </div>
                  }
                >
                  <ParticleBar
                    src={barImage}
                    crop={BAR_CROP}
                    selected={selected}
                    ingredients={INGREDIENTS}
                  />
                </React.Suspense>
              </div>

              {/* Under-stage info & navigation */}
              <div
                className="p11-understage"
                aria-live="polite"
                aria-atomic="true"
              >
                <div className="p11-understage__header">
                  <span className="p11-understage__kicker">
                    {selected ? `${selected.group} partnership` : "Formula overview"}
                  </span>
                  <div className="p11-nav">
                    <button
                      type="button"
                      onClick={() => {
                        const idx = PARTNERSHIPS.findIndex((p) => p.id === selected?.id);
                        if (idx > 0) {
                          setSelected(PARTNERSHIPS[idx - 1]);
                        } else {
                          setSelected(null);
                        }
                      }}
                      className="p11-nav-btn"
                      aria-label="Previous partnership"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Prev</span>
                    </button>
                    <span className="p11-nav-counter" aria-hidden="true">
                      {selected ? PARTNERSHIPS.findIndex((p) => p.id === selected.id) + 1 : 0} /{" "}
                      {PARTNERSHIPS.length}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const idx = PARTNERSHIPS.findIndex((p) => p.id === selected?.id);
                        if (idx < PARTNERSHIPS.length - 1) {
                          setSelected(PARTNERSHIPS[idx + 1]);
                        }
                      }}
                      className="p11-nav-btn"
                      aria-label="Next partnership"
                    >
                      <span>Next</span>
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <div className="p11-understage__copy">
                  <h4 className="p11-understage__title">
                    {selected ? selected.title : "Whole bar"}
                  </h4>
                  <p className="p11-understage__plain">
                    {selected
                      ? selected.plain
                      : "Every ingredient chosen for what it does with the others. Select a partnership to explore how they interact."}
                  </p>
                </div>

                <details className="p11-fine-print">
                  <summary>Fine print</summary>
                  <p>
                    {selected
                      ? selected.fine
                      : "16 ingredients formulated to work together — balancing fast and slow digestion, viscous fibres, and natural sweetness without isolate chalkiness."}
                  </p>
                </details>
              </div>
            </div>
          </div>
        </section>
      );

    case "digestion":
      return (
        <section
          className="p11-chapter p11-chapter--digestion"
          aria-labelledby="ch2-heading"
        >
          <header className="p11-chapter__header">
            <div>
              <span className="p11-chapter__kicker">After you eat it</span>
              <h2 id="ch2-heading" className="p11-chapter__title">
                Digestion timeline
              </h2>
              <p className="p11-chapter__subtitle">
                From mouth to bloodstream, nutrients follow different paths
              </p>
            </div>
          </header>
          <Chapter2Digestion />
          <div className="p11-chapter-footer">
            <button type="button" onClick={() => onSelectPartnership("fast-slow")} className="p11-footer-btn">
              <span>Explore partnerships</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>
      );

    case "day":
      return (
        <section
          className="p11-chapter p11-chapter--day"
          aria-labelledby="ch3-heading"
        >
          <header className="p11-chapter__header">
            <div>
              <span className="p11-chapter__kicker">Your day</span>
              <h2 id="ch3-heading" className="p11-chapter__title">
                Your day with Protein 11
              </h2>
              <p className="p11-chapter__subtitle">
                How the bar fits into your daily routine
              </p>
            </div>
          </header>
          <Chapter3YourDay
            selectedPersona={selectedPersona}
            onSelectPersona={onSelectPersona}
            onSelectPartnership={onSelectPartnership}
          />
          <div className="p11-chapter-footer">
            <button type="button" onClick={() => onSelectPartnership("fast-slow")} className="p11-footer-btn">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to digestion</span>
            </button>
            <button type="button" onClick={() => onSelectPartnership("two-nuts")} className="p11-footer-btn">
              <span>Explore partnerships</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>
      );

    case "fresh":
      return (
        <section
          className="p11-chapter p11-chapter--fresh"
          aria-labelledby="ch4-heading"
        >
          <header className="p11-chapter__header">
            <div className="p11-fresh-header-wrap">
              <div>
                <span className="p11-chapter__kicker">Fresh</span>
                <h2 id="ch4-heading" className="p11-chapter__title">
                  Made this week
                </h2>
                <p className="p11-chapter__subtitle">
                  Peak freshness, maximum nutrition
                </p>
              </div>
              <div className="p11-fresh-stamp">
                <div className="p11-stamp-border">
                  <span className="p11-stamp-lab">Protein 11</span>
                  <span className="p11-stamp-main">Lab</span>
                  <span className="p11-stamp-sub">Freshness verified</span>
                  <span className="p11-stamp-tag">16 days</span>
                </div>
              </div>
            </div>
          </header>
          <Chapter4Fresh />
          <div className="p11-chapter-footer">
            <button type="button" onClick={() => onSelectPartnership("two-nuts")} className="p11-footer-btn">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to your day</span>
            </button>
          </div>
        </section>
      );

    default:
      return null;
  }
}

export default Protein11Interactions;