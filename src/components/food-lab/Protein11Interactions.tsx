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

export function Protein11Interactions() {
  // Shared state for all chapters: defaults to none (null)
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);

  // Partnership state for the particle bar
  const [selected, setSelected] = useState<Partnership | null>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // List starts with Whole bar (selected = null), followed by PARTNERSHIPS
  const allItems = useMemo(() => [null, ...PARTNERSHIPS] as const, []);

  // Groups derived from PARTNERSHIPS
  const groups = useMemo(() => {
    const map = new Map<string, Partnership[]>();
    for (const item of PARTNERSHIPS) {
      if (!map.has(item.group)) {
        map.set(item.group, []);
      }
      map.get(item.group)!.push(item);
    }
    return Array.from(map.entries()).map(([name, items]) => ({ name, items }));
  }, []);

  const currentIndex = selected === null
    ? 0
    : allItems.findIndex((it) => it && it.id === selected.id);

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + allItems.length) % allItems.length;
    setSelected(allItems[prevIdx]);
    buttonRefs.current[prevIdx]?.focus();
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % allItems.length;
    setSelected(allItems[nextIdx]);
    buttonRefs.current[nextIdx]?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIdx = (index + 1) % allItems.length;
      setSelected(allItems[nextIdx]);
      buttonRefs.current[nextIdx]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevIdx = (index - 1 + allItems.length) % allItems.length;
      setSelected(allItems[prevIdx]);
      buttonRefs.current[prevIdx]?.focus();
    }
  };

  const handleSelectPartnershipById = (partnershipId: string) => {
    const found = PARTNERSHIPS.find((p) => p.id === partnershipId) || null;
    setSelected(found);
  };

  const currentTitle = selected ? selected.title : "Whole bar";
  const currentPlain = selected
    ? selected.plain
    : "Every ingredient chosen for what it does with the others. Select a partnership to explore how they interact.";
  const currentFine = selected
    ? selected.fine
    : "16 ingredients formulated to work together — balancing fast and slow digestion, viscous fibres, and natural sweetness without isolate chalkiness.";

  return (
    <div className="p11-experience-root" id="p11-experience">
      {/* Top Bar: "Who's eating?" Chips (Shared State, defaults to none) */}
      <header className="p11-whos-eating-bar" aria-label="Who's eating persona filter">
        <div className="p11-whos-eating-lead">
          <User className="h-4 w-4 text-brick" aria-hidden="true" />
          <span className="p11-whos-eating-title">Who’s eating?</span>
        </div>
        <div className="p11-whos-eating-chips" role="toolbar" aria-label="Who's eating schedules">
          {PERSONAS.map((persona) => {
            const isSelected = selectedPersona === persona.id;
            return (
              <button
                key={persona.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() =>
                  setSelectedPersona(isSelected ? null : persona.id)
                }
                className={`p11-whos-eating-chip ${isSelected ? "is-active" : ""}`}
              >
                {persona.chipLabel}
              </button>
            );
          })}
          {selectedPersona !== null && (
            <button
              type="button"
              onClick={() => setSelectedPersona(null)}
              className="p11-whos-eating-clear"
              aria-label="Clear persona selection"
            >
              Reset
            </button>
          )}
        </div>
      </header>

      {/* Chapter 1: The Particle Bar Explorer */}
      <section
        id="p11-particle-stage"
        className="p11-interactions"
        aria-labelledby="p11-interactions-heading"
      >
        <header className="p11-header">
          <div>
            <span className="p11-header__kicker">Chapter 1 · The Particle Bar</span>
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
                ref={(el) => {
                  buttonRefs.current[0] = el;
                }}
                aria-pressed={selected === null}
                onClick={() => setSelected(null)}
                onKeyDown={(e) => handleKeyDown(e, 0)}
                className={`p11-item-btn ${selected === null ? "is-selected" : ""}`}
              >
                <span className="p11-item-title">Whole bar</span>
                <span className="p11-item-badge">All 16</span>
              </button>
            </div>

            {/* Grouped partnerships */}
            {groups.map((group) => (
              <div key={group.name} className="p11-list-group">
                <span className="p11-group-heading">{group.name}</span>
                <div
                  className="p11-group-items"
                  role="group"
                  aria-label={group.name}
                >
                  {group.items.map((item) => {
                    const itemIndex = allItems.findIndex(
                      (it) => it && it.id === item.id,
                    );
                    const isSelected = selected?.id === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        ref={(el) => {
                          buttonRefs.current[itemIndex] = el;
                        }}
                        aria-pressed={isSelected}
                        onClick={() => setSelected(item)}
                        onKeyDown={(e) => handleKeyDown(e, itemIndex)}
                        className={`p11-item-btn ${isSelected ? "is-selected" : ""}`}
                      >
                        <span className="p11-item-title">{item.title}</span>
                        <span className="p11-item-badge">
                          {item.ingredients.length} parts
                        </span>
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
              <Suspense
                fallback={
                  <div className="pb" aria-hidden="true">
                    <img
                      className="pb__img"
                      src={barImage}
                      alt="Protein 11 bar"
                    />
                  </div>
                }
              >
                <ParticleBar
                  src={barImage}
                  crop={BAR_CROP}
                  selected={selected}
                  ingredients={INGREDIENTS}
                />
              </Suspense>
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
                    onClick={handlePrev}
                    className="p11-nav-btn"
                    aria-label="Previous partnership"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Prev</span>
                  </button>
                  <span className="p11-nav-counter" aria-hidden="true">
                    {currentIndex + 1} / {allItems.length}
                  </span>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="p11-nav-btn"
                    aria-label="Next partnership"
                  >
                    <span>Next</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div className="p11-understage__copy">
                <h4 className="p11-understage__title">{currentTitle}</h4>
                <p className="p11-understage__plain">{currentPlain}</p>
              </div>

              <details className="p11-fine-print">
                <summary>Fine print</summary>
                <p>{currentFine}</p>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 2: "After you eat it" */}
      <Chapter2Digestion />

      {/* Chapter 3: "Your day" */}
      <Chapter3YourDay
        selectedPersonaId={selectedPersona}
        onSelectPersona={setSelectedPersona}
        onSelectPartnership={handleSelectPartnershipById}
      />

      {/* Chapter 4: "Fresh" */}
      <Chapter4Fresh />
    </div>
  );
}

export default Protein11Interactions;
