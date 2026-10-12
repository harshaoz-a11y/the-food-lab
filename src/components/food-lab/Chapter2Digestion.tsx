import React, { useCallback, useId, useRef, useState } from "react";
import { ChapterMore } from "./ChapterMore";

// Bezier mathematical solver for cubic segments
interface BezierSegment {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  x3: number;
  y3: number;
}

function evalBezier(p0: number, p1: number, p2: number, p3: number, t: number): number {
  const mt = 1 - t;
  return mt * mt * mt * p0 + 3 * mt * mt * t * p1 + 3 * mt * t * t * p2 + t * t * t * p3;
}

function getYForXInSegment(seg: BezierSegment, x: number): number {
  let low = 0;
  let high = 1;
  for (let i = 0; i < 18; i++) {
    const mid = (low + high) / 2;
    const curX = evalBezier(seg.x0, seg.x1, seg.x2, seg.x3, mid);
    if (curX < x) {
      low = mid;
    } else {
      high = mid;
    }
  }
  const t = (low + high) / 2;
  return evalBezier(seg.y0, seg.y1, seg.y2, seg.y3, t);
}

function getYForCurve(segments: BezierSegment[], x: number): number {
  if (x <= segments[0].x0) return segments[0].y0;
  if (x >= segments[segments.length - 1].x3) return segments[segments.length - 1].y3;
  for (const seg of segments) {
    if (x >= seg.x0 && x <= seg.x3) {
      return getYForXInSegment(seg, x);
    }
  }
  return 260;
}

// 4 lines exact Bézier segments
const WHEY_SEGMENTS: BezierSegment[] = [
  { x0: 40, y0: 260, x1: 80, y1: 250, x2: 110, y2: 96, x3: 150, y3: 96 },
  { x0: 150, y0: 96, x1: 200, y1: 96, x2: 240, y2: 200, x3: 300, y3: 245 },
  { x0: 300, y0: 245, x1: 340, y1: 258, x2: 380, y2: 260, x3: 690, y3: 260 },
];

const CASEIN_SEGMENTS: BezierSegment[] = [
  { x0: 40, y0: 260, x1: 120, y1: 255, x2: 200, y2: 200, x3: 300, y3: 154 },
  { x0: 300, y0: 154, x1: 400, y1: 114, x2: 450, y2: 150, x3: 520, y3: 195 },
  { x0: 520, y0: 195, x1: 580, y1: 230, x2: 640, y2: 250, x3: 690, y3: 258 },
];

const NO_FIBRE_SEGMENTS: BezierSegment[] = [
  { x0: 40, y0: 260, x1: 80, y1: 200, x2: 120, y2: 62, x3: 170, y3: 62 },
  { x0: 170, y0: 62, x1: 230, y1: 62, x2: 300, y2: 150, x3: 380, y3: 220 },
  { x0: 380, y0: 220, x1: 440, y1: 255, x2: 520, y2: 260, x3: 690, y3: 260 },
];

const BAR_SEGMENTS: BezierSegment[] = [
  { x0: 40, y0: 260, x1: 90, y1: 230, x2: 140, y2: 84, x3: 200, y3: 76 },
  { x0: 200, y0: 76, x1: 300, y1: 70, x2: 400, y2: 74, x3: 500, y3: 114 },
  { x0: 500, y0: 114, x1: 580, y1: 146, x2: 630, y2: 204, x3: 690, y3: 234 },
];

const PATH_WHEY = "M40 260 C80 250 110 96 150 96 C200 96 240 200 300 245 C340 258 380 260 690 260";
const PATH_CASEIN = "M40 260 C120 255 200 200 300 154 C400 114 450 150 520 195 C580 230 640 250 690 258";
const PATH_NO_FIBRE = "M40 260 C80 200 120 62 170 62 C230 62 300 150 380 220 C440 255 520 260 690 260";
const PATH_BAR = "M40 260 C90 230 140 84 200 76 C300 70 400 74 500 114 C580 146 630 204 690 234";

// Qualitative share of each essential amino acid from the plant side; dairy tops up the rest
const AMINO_ACIDS = [
  { name: "Leucine", short: "Leu", plant: 45 },
  { name: "Isoleucine", short: "Ile", plant: 45 },
  { name: "Valine", short: "Val", plant: 50 },
  { name: "Lysine", short: "Lys", plant: 20 },
  { name: "Methionine", short: "Met", plant: 40 },
  { name: "Threonine", short: "Thr", plant: 45 },
  { name: "Tryptophan", short: "Trp", plant: 50 },
  { name: "Phenylalanine", short: "Phe", plant: 55 },
  { name: "Histidine", short: "His", plant: 50 },
];

const X_MIN = 40;
const X_MAX = 690;
const X_SPAN = X_MAX - X_MIN; // 650

export function Chapter2Digestion() {
  const [hour, setHour] = useState<number>(2.2);
  const [more, setMore] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const scrubberId = useId();

  // Convert hour (0..6) to SVG x coordinate
  const currentX = X_MIN + (Math.max(0, Math.min(6, hour)) / 6) * X_SPAN;

  // Compute crossing dots for each line
  const dotWheyY = getYForCurve(WHEY_SEGMENTS, currentX);
  const dotCaseinY = getYForCurve(CASEIN_SEGMENTS, currentX);
  const dotNoFibreY = getYForCurve(NO_FIBRE_SEGMENTS, currentX);
  const dotBarY = getYForCurve(BAR_SEGMENTS, currentX);

  const updateHourFromClientX = useCallback((clientX: number) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    if (rect.width <= 0) return;
    const svgX = ((clientX - rect.left) / rect.width) * 700;
    const clampedSvgX = Math.max(X_MIN, Math.min(X_MAX, svgX));
    const nextHour = ((clampedSvgX - X_MIN) / X_SPAN) * 6;
    setHour(Math.round(nextHour * 10) / 10);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    setIsDragging(true);
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
    updateHourFromClientX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!isDragging) return;
    updateHourFromClientX(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<SVGSVGElement>) => {
    setIsDragging(false);
    try {
      (e.currentTarget as Element).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore if not captured
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      setHour((prev) => Math.max(0, Math.round((prev - 0.2) * 10) / 10));
    } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      setHour((prev) => Math.min(6, Math.round((prev + 0.2) * 10) / 10));
    } else if (e.key === "Home") {
      e.preventDefault();
      setHour(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setHour(6);
    } else if (e.key === "PageDown") {
      e.preventDefault();
      setHour((prev) => Math.max(0, Math.round((prev - 1) * 10) / 10));
    } else if (e.key === "PageUp") {
      e.preventDefault();
      setHour((prev) => Math.min(6, Math.round((prev + 1) * 10) / 10));
    }
  };

  return (
    <section
      className={`p11-chapter p11-chapter--digestion ${more ? "is-more-open" : ""}`}
      aria-labelledby="ch2-heading"
    >
      <header className="p11-chapter__header">
        <h3 id="ch2-heading" className="p11-chapter__title">
          Fast, then slow, then steady
        </h3>
        <p className="p11-chapter__subtitle">
          One protein is quick, one is slow, and the fibre stretches both — so the bar keeps feeding you for hours, not minutes.
        </p>
      </header>

      <div className="p11-digestion-layout">
        {/* Main Chart Column: graph, then the plain-words explanation */}
        <div className="p11-digestion-main">
        <div className="p11-chart-card">
          <div className="p11-chart-top">
            <span className="p11-chart-label" id={`${scrubberId}-label`}>
              Protein reaching your blood — an illustration, not study data
            </span>
            <div className="p11-scrubber-readout" aria-live="polite">
              <span className="p11-readout-time">{hour.toFixed(1)} h</span>
              <span className="p11-readout-note">after eating</span>
            </div>
          </div>

          {/* Interactive SVG Chart */}
          <div className="p11-svg-container">
            <svg
              ref={svgRef}
              viewBox="0 0 700 300"
              className="p11-digestion-svg"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              role="slider"
              tabIndex={0}
              aria-labelledby={`${scrubberId}-label`}
              aria-valuemin={0}
              aria-valuemax={6}
              aria-valuenow={hour}
              aria-valuetext={`${hour.toFixed(1)} hours after eating`}
              onKeyDown={handleKeyDown}
            >
              <defs>
                <linearGradient id="p11-grid-fade" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--fl-ink, #1f2924)" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="var(--fl-ink, #1f2924)" stopOpacity="0.02" />
                </linearGradient>
                <linearGradient id="barGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--fl-ink, #1f2924)" stopOpacity="0.14" />
                  <stop offset="100%" stopColor="var(--fl-ink, #1f2924)" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Grid guidelines & baseline */}
              <line x1="40" y1="260" x2="690" y2="260" stroke="var(--fl-ink, #1f2924)" strokeOpacity="0.25" strokeWidth="1.2" />
              <line x1="40" y1="180" x2="690" y2="180" stroke="var(--fl-ink, #1f2924)" strokeOpacity="0.08" strokeDasharray="3 4" strokeWidth="1" />
              <line x1="40" y1="100" x2="690" y2="100" stroke="var(--fl-ink, #1f2924)" strokeOpacity="0.08" strokeDasharray="3 4" strokeWidth="1" />

              {/* Hour vertical tick marks & labels (0h to 6h) */}
              {[0, 1, 2, 3, 4, 5, 6].map((h) => {
                const tickX = X_MIN + (h / 6) * X_SPAN;
                return (
                  <g key={h}>
                    <line
                      x1={tickX}
                      y1="40"
                      x2={tickX}
                      y2="260"
                      stroke="var(--fl-ink, #1f2924)"
                      strokeOpacity="0.06"
                      strokeDasharray="2 3"
                    />
                    <line
                      x1={tickX}
                      y1="260"
                      x2={tickX}
                      y2="266"
                      stroke="var(--fl-ink, #1f2924)"
                      strokeOpacity="0.4"
                      strokeWidth="1.2"
                    />
                    <text
                      x={tickX}
                      y="282"
                      textAnchor="middle"
                      className="p11-svg-tick-text"
                    >
                      {h} h
                    </text>
                  </g>
                );
              })}

              {/* Area fill under the bar curve */}
              <path
                d={`${PATH_BAR} L690 260 L40 260 Z`}
                fill="url(#barGlow)"
              />

              {/* 1. Same protein with no fibre (dashed grey) */}
              <path
                d={PATH_NO_FIBRE}
                fill="none"
                stroke="var(--fl-ink-soft, #7a6c58)"
                strokeWidth="2.2"
                strokeDasharray="5 5"
                strokeLinecap="round"
              />

              {/* 2. Whey alone */}
              <path
                d={PATH_WHEY}
                fill="none"
                stroke="var(--brick, #a33a2b)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* 3. Casein alone */}
              <path
                d={PATH_CASEIN}
                fill="none"
                stroke="var(--fl-green, #173b30)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* 4. Protein 11 */}
              <path
                d={PATH_BAR}
                fill="none"
                stroke="var(--ink, #1f2924)"
                strokeWidth="4"
                strokeLinecap="round"
              />

              {/* Vertical Scrubber Line */}
              <line
                x1={currentX}
                y1="32"
                x2={currentX}
                y2="264"
                stroke="var(--ink, #1f2924)"
                strokeWidth="1.75"
                strokeDasharray="3 3"
                className="p11-scrubber-line"
              />

              {/* Scrubber Top Handle Pill */}
              <g className="p11-scrubber-handle" transform={`translate(${currentX}, 28)`}>
                <rect
                  x="-20"
                  y="-14"
                  width="40"
                  height="18"
                  rx="9"
                  fill="var(--ink, #1f2924)"
                />
                <text
                  x="0"
                  y="-2"
                  textAnchor="middle"
                  fill="var(--fl-cream, #f8f2e5)"
                  className="p11-svg-handle-text"
                >
                  {hour.toFixed(1)}h
                </text>
              </g>

              {/* Crossing dots */}
              {/* Dot on same protein no fibre */}
              <circle
                cx={currentX}
                cy={dotNoFibreY}
                r="4.5"
                fill="var(--paper, #f8f2e5)"
                stroke="var(--fl-ink-soft, #7a6c58)"
                strokeWidth="2.2"
              />

              {/* Dot on whey */}
              <circle
                cx={currentX}
                cy={dotWheyY}
                r="4.5"
                fill="var(--paper, #f8f2e5)"
                stroke="var(--brick, #a33a2b)"
                strokeWidth="2.5"
              />

              {/* Dot on casein */}
              <circle
                cx={currentX}
                cy={dotCaseinY}
                r="4.5"
                fill="var(--paper, #f8f2e5)"
                stroke="var(--fl-green, #173b30)"
                strokeWidth="2.5"
              />

              {/* Dot on the bar */}
              <circle
                cx={currentX}
                cy={dotBarY}
                r="6"
                fill="var(--ink, #1f2924)"
                stroke="var(--fl-cream, #f8f2e5)"
                strokeWidth="2"
              />
            </svg>
          </div>

          {/* Legend */}
          <div className="p11-chart-legend">
            <div className="p11-legend-item">
              <span className="p11-legend-swatch p11-legend-swatch--bar" />
              <span className="p11-legend-label">Protein 11</span>
            </div>
            <div className="p11-legend-item">
              <span className="p11-legend-swatch p11-legend-swatch--whey" />
              <span className="p11-legend-label">Whey alone</span>
            </div>
            <div className="p11-legend-item">
              <span className="p11-legend-swatch p11-legend-swatch--casein" />
              <span className="p11-legend-label">Casein alone</span>
            </div>
            <div className="p11-legend-item">
              <span className="p11-legend-swatch p11-legend-swatch--nofibre" />
              <span className="p11-legend-label">Same protein, no fibre</span>
            </div>
          </div>
        </div>

        </div>

        {/* Side Panel Column */}
        <aside className="p11-side-panel p11-secondary">
          {/* Amino acid balance: one bar, nine essential slots */}
          <div className="p11-panel-box">
            <div className="p11-panel-box__head">
              <span className="p11-panel-kicker">Amino acid balance</span>
              <span className="p11-aa-complete-tag">Complete · 9/9</span>
            </div>
            <p className="p11-panel-microcopy">
              Your body needs nine building blocks it can’t make itself. Oats and peanut run short on one of them
              (lysine); milk proteins fill the gap.
            </p>

            <div className="p11-aa-bar" role="img" aria-label="All nine essential amino acids covered, lysine mostly from dairy">
              {AMINO_ACIDS.map((aa) => (
                <div key={aa.name} className={`p11-aa-slot${aa.name === "Lysine" ? " is-gap" : ""}`} title={aa.name}>
                  <div className="p11-aa-slot__fill">
                    <span className="p11-aa-slot__plant" style={{ flexBasis: `${aa.plant}%` }} />
                    <span className="p11-aa-slot__dairy" />
                  </div>
                  <span className="p11-aa-slot__name">{aa.short}</span>
                </div>
              ))}
            </div>

            <div className="p11-aa-key">
              <span><i className="p11-aa-key__dot p11-aa-key__dot--plant" /> Oats &amp; peanut</span>
              <span><i className="p11-aa-key__dot p11-aa-key__dot--dairy" /> Whey &amp; casein</span>
            </div>
          </div>

          {/* Fine print */}
          <details className="p11-fine-print">
            <summary>Fine print</summary>
            <p>
              Curves represent illustrative gastric emptying and amino acid appearance profiles adapted from established nutritional physiology literature comparing whey, casein, and viscous dietary fibres. This chart is a conceptual illustration of multi-protein digestive kinetics, not plotted clinical trial data from this specific batch. Individual absorption rates vary with physical exertion, hydration, and personal digestive transit.
            </p>
          </details>
        </aside>
      </div>
      {/* In plain words: full width under the chart and the side panel */}
      <div className="p11-panel-box p11-plain-words p11-secondary">
        <span className="p11-panel-kicker">In plain words</span>
        <p className="p11-panel-plain">
          A protein shake hits fast and is gone in about an hour and a half. This bar works in relay: whey
          shows up first, casein takes over later, and the fibre from isabgol and oats slows everything down
          a little. No spike, no slump — just steady fuel through the afternoon.
        </p>
      </div>
      <ChapterMore open={more} onToggle={() => setMore((value) => !value)} />
    </section>
  );
}

export default Chapter2Digestion;
