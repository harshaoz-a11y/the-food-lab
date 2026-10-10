import React from "react";
import { ArrowUpRight, Clock, Sparkles } from "lucide-react";
import { PERSONAS, PersonaProfile } from "./protein11Personas";
import { PARTNERSHIPS } from "@/components/Protein-11/protein11Data.js";

interface Chapter3YourDayProps {
  selectedPersonaId: string | null;
  onSelectPersona: (id: string | null) => void;
  onSelectPartnership: (partnershipId: string) => void;
}

export function Chapter3YourDay({
  selectedPersonaId,
  onSelectPersona,
  onSelectPartnership,
}: Chapter3YourDayProps) {
  const currentPersona = PERSONAS.find((p) => p.id === selectedPersonaId) || null;

  const handleChipClick = (partnershipId: string) => {
    onSelectPartnership(partnershipId);

    // Scroll to particle bar stage
    const stageElement = document.getElementById("p11-particle-stage");
    if (stageElement) {
      stageElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Convert hour string (e.g. 7.0 to 21.0) into a percentage across the 14-hour window (7 AM - 9 PM)
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
        <div className="p11-chapter__header-meta">
          <span className="p11-chapter__kicker">Chapter 3 · Your day</span>
          <span className="p11-draft-badge" title="Draft placeholder copy for review">
            Draft: true
          </span>
        </div>
        <h3 id="ch3-heading" className="p11-chapter__title">
          Where the bar fits in a 14-hour rhythm
        </h3>
        <p className="p11-chapter__subtitle">
          From 7 AM to 9 PM, hunger is not a clock error — it is a consequence of real work, transit, and unpredictable schedules.
        </p>
      </header>

      {/* Persona Selector Row inside Chapter 3 for convenience */}
      <div className="p11-day-persona-bar">
        <span className="p11-day-persona-label">Viewing day for:</span>
        <div className="p11-day-persona-chips" role="radiogroup" aria-label="Select persona schedule">
          {PERSONAS.map((p) => {
            const isSelected = selectedPersonaId === p.id;
            return (
              <button
                key={p.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => onSelectPersona(isSelected ? null : p.id)}
                className={`p11-day-chip ${isSelected ? "is-selected" : ""}`}
              >
                {p.chipLabel}
              </button>
            );
          })}
        </div>
      </div>

      {!currentPersona ? (
        /* Empty / default prompt state */
        <div className="p11-day-empty-card">
          <div className="p11-day-empty-inner">
            <Clock className="h-8 w-8 text-brick opacity-80" aria-hidden="true" />
            <h4 className="p11-day-empty-title">Pick who is eating</h4>
            <p className="p11-day-empty-text">
              Select one of the schedules above — such as <em>14-hour days</em>, <em>Shift work / ER</em>, or <em>Always on the move</em> — to inspect their 7 AM to 9 PM blocks and where Protein 11 fits into their day.
            </p>
            <div className="p11-day-quick-picks">
              {PERSONAS.slice(0, 3).map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => onSelectPersona(p.id)}
                  className="p11-day-quick-btn"
                >
                  <span>Explore {p.chipLabel}</span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Active Persona Schedule */
        <div className="p11-day-layout" aria-live="polite">
          {/* Persona Header Info */}
          <div className="p11-day-headline">
            <div>
              <span className="p11-day-kicker">Schedule Profile</span>
              <h4 className="p11-day-name">{currentPersona.title}</h4>
              <p className="p11-day-sub">{currentPersona.subtitle}</p>
            </div>
            <div className="p11-day-slot-badge">
              <Clock className="h-3.5 w-3.5 text-brick" aria-hidden="true" />
              <span>Bar fits at <strong>{currentPersona.barMarker.time}</strong></span>
            </div>
          </div>

          {/* Day Strip (7 AM to 9 PM) */}
          <div className="p11-timeline-card">
            <div className="p11-timeline-header">
              <span className="p11-timeline-title">The 7 AM – 9 PM Day Strip</span>
              <span className="p11-timeline-sub">Illustrative schedule</span>
            </div>

            {/* Hour ruler */}
            <div className="p11-timeline-ruler" aria-hidden="true">
              {["7 AM", "9 AM", "11 AM", "1 PM", "3 PM", "5 PM", "7 PM", "9 PM"].map((tick) => (
                <div key={tick} className="p11-timeline-ruler-tick">
                  <span className="p11-ruler-mark" />
                  <span className="p11-ruler-label">{tick}</span>
                </div>
              ))}
            </div>

            {/* Main Day Bar Strip with blocks */}
            <div className="p11-timeline-strip" role="region" aria-label="Schedule blocks from 7 AM to 9 PM">
              {currentPersona.timeBlocks.map((block, idx) => {
                return (
                  <div
                    key={idx}
                    className={`p11-time-block p11-time-block--${block.type}`}
                    title={`${block.label} (${block.start} – ${block.end})`}
                  >
                    <span className="p11-time-block-label">{block.label}</span>
                    <span className="p11-time-block-time">{block.start}</span>
                  </div>
                );
              })}

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

          {/* What this day needs & matching partnerships */}
          <div className="p11-day-grid">
            {/* What this day needs box */}
            <div className="p11-needs-box">
              <div className="p11-needs-box__header">
                <Sparkles className="h-4 w-4 text-brick" aria-hidden="true" />
                <h5 className="p11-needs-box__title">What this day needs</h5>
              </div>
              <p className="p11-needs-box__content">
                {currentPersona.whatDayNeeds}
              </p>
            </div>

            {/* Matching partnerships */}
            <div className="p11-matches-box">
              <span className="p11-matches-kicker">Formulated for this day</span>
              <h5 className="p11-matches-title">Matching partnerships in the bar</h5>
              <p className="p11-matches-hint">
                Click any partnership to view how these ingredients work together in the particle bar above:
              </p>
              <div className="p11-matches-chips" role="list">
                {currentPersona.matchingPartnershipIds.map((partId) => {
                  const part = PARTNERSHIPS.find((p) => p.id === partId);
                  if (!part) return null;
                  return (
                    <button
                      key={part.id}
                      type="button"
                      role="listitem"
                      onClick={() => handleChipClick(part.id)}
                      className="p11-partnership-jump-chip"
                      aria-label={`View partnership: ${part.title}. Scrolls to particle bar`}
                    >
                      <span className="p11-jump-title">{part.title}</span>
                      <span className="p11-jump-group">{part.group}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Chapter3YourDay;
