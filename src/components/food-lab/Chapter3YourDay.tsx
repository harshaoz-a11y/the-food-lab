import React, { useState } from "react";
import { PERSONAS } from "./protein11Personas";

// Days from batch until we'd rather you finish it; null hides the line
export const FRESH_DAYS: number | null = null;

// Freshness chart (viewBox 0 0 600 220): x runs Day 0 → Day 7, lower y = better eating quality
const xForDay = (d: number) => 40 + (d / 7) * 520;
const FRESH_PATH = "M40 52 C170 53 300 56 430 60 C480 62 530 64 560 66";
const SHELF_PATH = "M40 150 L560 150";

export function Chapter3YourDay() {
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>(PERSONAS[0].id);
  const currentPersona = PERSONAS.find((p) => p.id === selectedPersonaId) ?? PERSONAS[0];

  // Convert an hour (7.0 to 21.0) into a percentage across the 14-hour window (7 AM - 9 PM)
  const getTimelinePercent = (hourDecimal: number) => {
    const minHour = 7.0;
    const maxHour = 21.0;
    const clamped = Math.max(minHour, Math.min(maxHour, hourDecimal));
    return ((clamped - minHour) / (maxHour - minHour)) * 100;
  };

  return (
    <section
      className="p11-chapter p11-chapter--day"
      aria-labelledby="ch3-heading"
    >
      <header className="p11-chapter__header">
        <span className="p11-chapter__kicker">Chapter 3 · Your day</span>
        <h3 id="ch3-heading" className="p11-chapter__title">
          Where it fits in your day
        </h3>
      </header>

      {/* Persona selector with the day's need in a bubble beside it */}
      <div className="p11-day-select">
        <div className="p11-day-persona-chips" role="radiogroup" aria-label="Whose day?">
          {PERSONAS.map((p) => {
            const isSelected = currentPersona.id === p.id;
            return (
              <button
                key={p.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => setSelectedPersonaId(p.id)}
                className={`p11-day-chip ${isSelected ? "is-selected" : ""}`}
              >
                {p.chipLabel}
              </button>
            );
          })}
        </div>

        <div key={currentPersona.id} className="p11-day-bubble" aria-live="polite">
          <span className="p11-day-bubble__kicker">What the day needs</span>
          <p className="p11-day-bubble__text">{currentPersona.whatDayNeeds}</p>
        </div>
      </div>

      {/* Day Strip (7 AM to 9 PM) */}
      <div className="p11-timeline-card">
        <div className="p11-timeline-ruler" aria-hidden="true">
          {["7 AM", "9 AM", "11 AM", "1 PM", "3 PM", "5 PM", "7 PM", "9 PM"].map((tick) => (
            <div key={tick} className="p11-timeline-ruler-tick">
              <span className="p11-ruler-mark" />
              <span className="p11-ruler-label">{tick}</span>
            </div>
          ))}
        </div>

        <div className="p11-timeline-strip" role="region" aria-label={`${currentPersona.title}: schedule from 7 AM to 9 PM`}>
          {currentPersona.timeBlocks.map((block, idx) => (
            <div
              key={idx}
              className={`p11-time-block p11-time-block--${block.type}`}
              title={`${block.label} (${block.start} – ${block.end})`}
            >
              <span className="p11-time-block-label">{block.label}</span>
              <span className="p11-time-block-time">{block.start}</span>
            </div>
          ))}

          {/* Marker where the bar fits */}
          <div
            className="p11-bar-marker"
            style={{
              left: `${getTimelinePercent(currentPersona.barMarker.hourFraction)}%`,
            }}
          >
            <div className="p11-marker-pin" aria-hidden="true">
              <span className="p11-marker-dot" />
              <span className="p11-marker-stem" />
            </div>
            <div className="p11-marker-card">
              <span className="p11-marker-time">{currentPersona.barMarker.time}</span>
              <strong className="p11-marker-title">{currentPersona.barMarker.label}</strong>
              <p className="p11-marker-desc">{currentPersona.barMarker.context}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Freshness across the week + the honest trade-off */}
      <div className="p11-fresh-layout">
        <div className="p11-fresh-chart-card">
          <span className="p11-chart-label">Eating quality across the week — illustrative</span>
          <div className="p11-fresh-svg-wrap">
            <svg
              viewBox="0 0 600 220"
              className="p11-fresh-svg"
              role="img"
              aria-label="Protein 11 stays close to its best from day 0 to day 7; a shelf-stable bar stays flat at a lower level"
            >
              <defs>
                <linearGradient id="p11-fresh-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--fl-green, #173b30)" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="var(--fl-green, #173b30)" stopOpacity="0.01" />
                </linearGradient>
              </defs>

              <line x1="40" y1="190" x2="560" y2="190" stroke="var(--fl-ink, #1f2924)" strokeOpacity="0.2" strokeWidth="1.2" />

              {[0, 1, 2, 3, 4, 5, 6, 7].map((d) => {
                const x = xForDay(d);
                return (
                  <g key={d}>
                    <line x1={x} y1="36" x2={x} y2="190" stroke="var(--fl-ink, #1f2924)" strokeOpacity="0.05" strokeDasharray="2 3" />
                    <text x={x} y="210" textAnchor="middle" className="p11-svg-tick-text">
                      Day {d}
                    </text>
                  </g>
                );
              })}

              <path d={`${FRESH_PATH} L560 190 L40 190 Z`} fill="url(#p11-fresh-fill)" />
              <path d={SHELF_PATH} fill="none" stroke="var(--brick, #a33a2b)" strokeWidth="2.5" strokeDasharray="5 5" strokeLinecap="round" />
              <path d={FRESH_PATH} fill="none" stroke="var(--fl-green, #173b30)" strokeWidth="3.5" strokeLinecap="round" />

              {/* direct labels instead of a legend */}
              <text x="44" y="38" className="p11-fresh-line-label p11-fresh-line-label--fresh">Protein 11, made this week</text>
              <text x="44" y="138" className="p11-fresh-line-label p11-fresh-line-label--shelf">Shelf-stable bar</text>
            </svg>
          </div>
        </div>

        <div className="p11-tradeoff-box">
          <span className="p11-panel-kicker">Honest kitchen</span>
          <h5 className="p11-tradeoff-title">The trade-off, said plainly</h5>
          <p className="p11-tradeoff-text">
            No glycerine, palm oil or stabilisers to keep it on a warehouse shelf for two years. It smells of real
            citrus, cocoa and toasted nuts — and it’s made to be eaten fresh, like food.
            {FRESH_DAYS !== null && <> Best within {FRESH_DAYS} days.</>}
          </p>
        </div>
      </div>
    </section>
  );
}

export default Chapter3YourDay;
