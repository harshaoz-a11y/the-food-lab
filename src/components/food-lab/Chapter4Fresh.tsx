import React, { useId, useState } from "react";

// Required constants with specified defaults
export const FRESH_DAYS: number | null = null;
export const NOT_IN_IT: string[] = [];

export function Chapter4Fresh() {
  const [activeDay, setActiveDay] = useState<number>(2);
  const sliderId = useId();

  // SVG dimensions for freshness chart (viewBox: 0 0 600 240)
  // X range: 50 (Day 0) to 550 (Day 7)
  const xForDay = (d: number) => 50 + (d / 7) * 500;

  // Day 0 to 7 coordinates for:
  // 1. Fresh soft aromatic bar (solid line): starts high (y=50 at Day 0), gently slopes to y=110 at Day 7
  // 2. Shelf-stable commercial bar (dashed brick line): flat baseline around y=165
  const freshPath = "M50 50 C140 54 220 66 300 80 C380 94 460 102 550 110";
  const shelfStablePath = "M50 165 C150 165 250 165 350 165 C450 165 520 165 550 165";

  // Y position for fresh line at activeDay
  // Quadratic/cubic interpolation
  const t = activeDay / 7;
  const currentFreshY = 50 + t * 45 + t * t * 15;
  const currentShelfY = 165;
  const currentX = xForDay(activeDay);

  const dayDescriptions: Record<number, { title: string; note: string }> = {
    0: {
      title: "Batch day",
      note: "Pressed fresh. Orange zest and dark cocoa aroma at their brightest; delicate soft chew.",
    },
    1: {
      title: "Day 1",
      note: "Fibres from isabgol and ground flax hydrate fully; bar reaches its ideal cohesive texture.",
    },
    2: {
      title: "Day 2",
      note: "Flavours marry. Walnut and almond fats soften slightly, creating a rich, mellow bite.",
    },
    3: {
      title: "Day 3",
      note: "Steady moisture retention from ground raisins and rolled oats without any synthetic humectants.",
    },
    4: {
      title: "Day 4",
      note: "Clean bite continues. No surface oil separation or isolate hardening.",
    },
    5: {
      title: "Day 5",
      note: "Natural fruit sweetness remains bright and aromatic.",
    },
    6: {
      title: "Day 6",
      note: "Firm, satisfying structure held purely by whole-food binding.",
    },
    7: {
      title: "Day 7",
      note: "Wholesome real-food freshness. Made to be eaten as food, not stored for seasons.",
    },
  };

  return (
    <section
      className="p11-chapter p11-chapter--fresh"
      aria-labelledby="ch4-heading"
    >
      <header className="p11-chapter__header">
        <span className="p11-chapter__kicker">Chapter 4 · Fresh</span>
        <div className="p11-fresh-header-wrap">
          <div>
            <h3 id="ch4-heading" className="p11-chapter__title">
              Made this week
            </h3>
            <p className="p11-chapter__subtitle">
              Commercial protein bars use chemical humectants to survive 18 months in warehouses. We formulate for this week.
            </p>
          </div>

          {/* "Made this week" Stamp */}
          <div className="p11-fresh-stamp" aria-label="Made this week stamp">
            <div className="p11-stamp-border">
              <span className="p11-stamp-lab">The Food Lab</span>
              <strong className="p11-stamp-main">MADE THIS WEEK</strong>
              <span className="p11-stamp-sub">Small Batch · Bengaluru</span>
              <span className="p11-stamp-tag">No Stabilisers</span>
            </div>
          </div>
        </div>
      </header>

      <div className="p11-fresh-layout">
        {/* Freshness Comparison Chart Card */}
        <div className="p11-fresh-chart-card">
          <div className="p11-fresh-chart-top">
            <span className="p11-chart-label">
              Sensory quality over time — illustrative
            </span>
            <div className="p11-day-pill" aria-live="polite">
              Day {activeDay} of 7
            </div>
          </div>

          {/* SVG Chart */}
          <div className="p11-fresh-svg-wrap">
            <svg
              viewBox="0 0 600 220"
              className="p11-fresh-svg"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="freshFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--fl-green, #173b30)" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="var(--fl-green, #173b30)" stopOpacity="0.01" />
                </linearGradient>
              </defs>

              {/* Axis grid */}
              <line x1="50" y1="195" x2="550" y2="195" stroke="var(--fl-ink, #1f2924)" strokeOpacity="0.2" strokeWidth="1.2" />

              {/* Day ticks */}
              {[0, 1, 2, 3, 4, 5, 6, 7].map((d) => {
                const x = xForDay(d);
                return (
                  <g key={d}>
                    <line
                      x1={x}
                      y1="40"
                      x2={x}
                      y2="195"
                      stroke="var(--fl-ink, #1f2924)"
                      strokeOpacity="0.05"
                      strokeDasharray="2 3"
                    />
                    <line
                      x1={x}
                      y1="195"
                      x2={x}
                      y2="201"
                      stroke="var(--fl-ink, #1f2924)"
                      strokeOpacity="0.3"
                    />
                    <text
                      x={x}
                      y="214"
                      textAnchor="middle"
                      className="p11-svg-tick-text"
                    >
                      Day {d}
                    </text>
                  </g>
                );
              })}

              {/* Shaded area under fresh curve */}
              <path
                d={`${freshPath} L550 195 L50 195 Z`}
                fill="url(#freshFill)"
              />

              {/* Dashed brick line: Shelf-stable bar */}
              <path
                d={shelfStablePath}
                fill="none"
                stroke="var(--brick, #a33a2b)"
                strokeWidth="2.5"
                strokeDasharray="5 5"
                strokeLinecap="round"
              />

              {/* Solid line: Fresh soft aromatic bar */}
              <path
                d={freshPath}
                fill="none"
                stroke="var(--fl-green, #173b30)"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Scrubber vertical guide */}
              <line
                x1={currentX}
                y1="35"
                x2={currentX}
                y2="195"
                stroke="var(--ink, #1f2924)"
                strokeWidth="1.5"
                strokeDasharray="3 3"
                strokeOpacity="0.7"
              />

              {/* Dot on fresh line */}
              <circle
                cx={currentX}
                cy={currentFreshY}
                r="6"
                fill="var(--fl-green, #173b30)"
                stroke="var(--fl-cream, #f8f2e5)"
                strokeWidth="2"
              />

              {/* Dot on shelf-stable line */}
              <circle
                cx={currentX}
                cy={currentShelfY}
                r="4.5"
                fill="var(--paper, #f8f2e5)"
                stroke="var(--brick, #a33a2b)"
                strokeWidth="2"
              />
            </svg>
          </div>

          {/* Interactive Range Slider */}
          <div className="p11-range-control">
            <label htmlFor={sliderId} className="p11-range-label">
              <span>Scrub day of freshness:</span>
              <strong>Day {activeDay}</strong>
            </label>
            <input
              id={sliderId}
              type="range"
              min="0"
              max="7"
              step="1"
              value={activeDay}
              onChange={(e) => setActiveDay(Number(e.target.value))}
              className="p11-range-slider"
              aria-label="Freshness day timeline slider (day 0 to day 7)"
            />
            <div className="p11-range-ticks" aria-hidden="true">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setActiveDay(d)}
                  className={`p11-range-tick-btn ${activeDay === d ? "is-active" : ""}`}
                >
                  {d}d
                </button>
              ))}
            </div>
          </div>

          {/* Active Day Description */}
          <div className="p11-day-status-card">
            <strong className="p11-status-title">
              {dayDescriptions[activeDay]?.title || `Day ${activeDay}`}
            </strong>
            <p className="p11-status-note">
              {dayDescriptions[activeDay]?.note}
            </p>
          </div>

          {/* Legend */}
          <div className="p11-chart-legend">
            <div className="p11-legend-item">
              <span className="p11-legend-swatch p11-legend-swatch--green" />
              <span className="p11-legend-label">Fresh soft aromatic bar (solid line)</span>
            </div>
            <div className="p11-legend-item">
              <span className="p11-legend-swatch p11-legend-swatch--shelf" />
              <span className="p11-legend-label">Shelf-stable commercial bar (dashed brick)</span>
            </div>
          </div>
        </div>

        {/* Side Info Column */}
        <aside className="p11-fresh-side">
          {/* "16 ingredients, every one a food you can name" */}
          <div className="p11-named-food-box">
            <span className="p11-named-kicker">Formulation rule</span>
            <p className="p11-named-title">
              16 ingredients, every one a food you can name.
            </p>
            <p className="p11-named-desc">
              Whey, micellar casein, peanut butter powder, steel-cut oats, walnuts, almonds, ground flaxseed, almond milk, blueberries, raisins, psyllium husk, dark cocoa, monk fruit, orange zest, and pink salt.
            </p>
          </div>

          {/* "The trade-off, said plainly" */}
          <div className="p11-tradeoff-box">
            <span className="p11-panel-kicker">Honest kitchen</span>
            <h5 className="p11-tradeoff-title">The trade-off, said plainly</h5>
            <p className="p11-tradeoff-text">
              We chose not to add artificial binders, palm oils, glycerine, or chemical stabilisers to keep a bar sitting on a warehouse pallet for two years. That means our bar smells of real citrus, dark cocoa, and toasted nuts — but it is made to be enjoyed fresh as honest food.
              {FRESH_DAYS !== null && (
                <> Best within {FRESH_DAYS} days.</>
              )}
            </p>
          </div>

          {/* "Not in it" list read from NOT_IN_IT constant (default empty: hide if empty) */}
          {NOT_IN_IT.length > 0 && (
            <div className="p11-notin-box">
              <span className="p11-panel-kicker">Excluded</span>
              <h5 className="p11-notin-title">Not in it</h5>
              <ul className="p11-notin-list">
                {NOT_IN_IT.map((item, i) => (
                  <li key={i} className="p11-notin-item">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}

export default Chapter4Fresh;
