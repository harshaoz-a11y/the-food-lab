import React, { useState } from "react";
import {
  Ambulance, Armchair, Baby, Bed, BedSingle, Blocks, Car, ClipboardList, ClipboardPen, Coffee,
  Dumbbell, Footprints, GlassWater, HardHat, HeartPulse, Hotel, House, Key, Laptop, ListChecks,
  Luggage, MapPin, MessagesSquare, Monitor, Moon, Phone, Plane, Presentation, Salad, Siren, Smile,
  Sofa, Soup, Stethoscope, Sun, Sunrise, Target, TrainFront, TreePine, Trees, Users, Utensils,
  Video, WashingMachine,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PERSONAS } from "./protein11Personas";
import { ChapterMore } from "./ChapterMore";
import { maestroAssets } from "@/lib/maestro-assets";

// Days from batch until we'd rather you finish it; null hides the line
export const FRESH_DAYS: number | null = null;

// Freshness chart (viewBox 0 0 600 220): x runs Day 0 → Day 7, lower y = better eating quality
const xForDay = (d: number) => 40 + (d / 7) * 520;
const FRESH_PATH = "M40 52 C170 53 300 56 430 60 C480 62 530 64 560 66";
const SHELF_PATH = "M40 150 L560 150";

// Each part of a day is a small scene: the main thing happening, plus a detail in the corner.
// "bar" is drawn with the Protein 11 photo instead.
const SCENES: Record<string, [LucideIcon, LucideIcon]> = {
  "commute-coffee": [TrainFront, Coffee],
  "deep-work": [Laptop, Users],
  "light-lunch": [Salad, Utensils],
  presentations: [Presentation, Users],
  "wrap-up": [ListChecks, Laptop],
  "evening-commute": [Car, Moon],
  handover: [ClipboardList, Users],
  triage: [Stethoscope, HeartPulse],
  rounds: [BedSingle, Stethoscope],
  charting: [ClipboardPen, Coffee],
  "peak-triage": [Ambulance, Siren],
  "night-briefing": [Moon, Users],
  flight: [Plane, Luggage],
  "site-visit": [HardHat, Phone],
  walkthrough: [Footprints, MapPin],
  remote: [Laptop, Video],
  "check-in": [Hotel, Key],
  workout: [Dumbbell, Sunrise],
  focus: [Monitor, Target],
  "warm-meal": [Soup, Utensils],
  meetings: [Users, MessagesSquare],
  walk: [Footprints, Trees],
  evening: [Sofa, Moon],
  "baby-morning": [Baby, Sunrise],
  stroll: [TreePine, Sun],
  household: [House, WashingMachine],
  hydration: [GlassWater, Armchair],
  play: [Blocks, Smile],
  bedtime: [Bed, Moon],
};

// "8:30 AM" → "8:30", "7:00 AM" → "7 AM": the strip's own clock, shown once along the top
const clock = (time: string) => {
  const [hm, period] = time.split(" ");
  const [h, m] = hm.split(":");
  return m === "00" ? `${h} ${period}` : `${h}:${m}`;
};

export function Chapter3YourDay() {
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>(PERSONAS[0].id);
  const [more, setMore] = useState(false);
  const currentPersona = PERSONAS.find((p) => p.id === selectedPersonaId) ?? PERSONAS[0];

  return (
    <section
      className={`p11-chapter p11-chapter--day ${more ? "is-more-open" : ""}`}
      aria-labelledby="ch3-heading"
    >
      <header className="p11-chapter__header">
        <h3 id="ch3-heading" className="p11-chapter__title">
          Where it fits in your day
        </h3>
      </header>

      {/* Whose day: five titles on one line; the chosen one opens into a card with what that day needs */}
      <div className="p11-personas" role="radiogroup" aria-label="Whose day?">
        {PERSONAS.map((p) => {
          const isSelected = currentPersona.id === p.id;
          return (
            <button
              key={p.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => setSelectedPersonaId(p.id)}
              className={`p11-persona ${isSelected ? "is-selected" : ""}`}
            >
              <span className="p11-persona__name">{p.chipLabel}</span>
              {isSelected && (
                <span className="p11-persona__need">
                  <small>What the day needs</small>
                  {p.whatDayNeeds}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* The day, as a strip of small scenes with the clock along the top */}
      <div key={currentPersona.id} className="p11-daystrip-card">
        <ol className="p11-daystrip" aria-label={`${currentPersona.title}: the day from 7 AM to 9 PM`}>
          {currentPersona.timeBlocks.map((block, idx) => {
            const isBar = block.scene === "bar";
            const [Main, Detail] = SCENES[block.scene] ?? [Sun, Sun];
            return (
              <li
                key={idx}
                className={`p11-scene p11-scene--${block.type}${isBar ? " is-bar" : ""}`}
                style={{ "--i": idx } as React.CSSProperties}
                title={`${block.label} (${block.start} – ${block.end})`}
              >
                <span className="p11-scene__time">{clock(block.start)}</span>
                <span className="p11-scene__art" aria-hidden="true">
                  {isBar ? (
                    <img src={maestroAssets.alchemyBar} alt="" />
                  ) : (
                    <>
                      <Main className="p11-scene__main" />
                      <span className="p11-scene__detail"><Detail /></span>
                    </>
                  )}
                </span>
                <span className="p11-scene__caption">{block.caption}</span>
                <span className="sr-only">{block.label}, {block.start} to {block.end}</span>
              </li>
            );
          })}
        </ol>

        <p className="p11-daystrip__marker">
          <span className="p11-marker-time">{currentPersona.barMarker.time}</span>
          <strong className="p11-marker-title">{currentPersona.barMarker.label}</strong>
          <span className="p11-marker-desc">{currentPersona.barMarker.context}</span>
        </p>
      </div>

      {/* Freshness across the week + the honest trade-off */}
      <div className="p11-fresh-layout p11-secondary">
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
      <ChapterMore open={more} onToggle={() => setMore((value) => !value)} />
    </section>
  );
}

export default Chapter3YourDay;
