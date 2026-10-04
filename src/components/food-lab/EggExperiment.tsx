import { useState } from "react";

const states = {
  raw: {
    label: "Raw egg",
    value: 51,
    note: "The ingredient is present. The body may receive less of it.",
  },
  cooked: {
    label: "Cooked egg",
    value: 91,
    note: "Heat changes the interaction — and what becomes available.",
  },
} as const;

type EggState = keyof typeof states;

function EggIllustration({ active }: { active: EggState }) {
  const isCooked = active === "cooked";

  return (
    <svg
      className="egg-object"
      viewBox="0 0 560 480"
      role="img"
      aria-label={isCooked ? "A cooked egg on a ceramic plate" : "A raw egg in a ceramic bowl"}
    >
      <ellipse className="egg-shadow" cx="280" cy="422" rx="196" ry="25" />
      {isCooked ? (
        <>
          <ellipse className="cooked-plate" cx="280" cy="350" rx="194" ry="68" />
          <ellipse className="cooked-plate-inner" cx="280" cy="340" rx="164" ry="52" />
          <path className="cooked-white" d="M142 311c12-37 53-51 91-34 27-31 83-29 107 4 38-14 78 9 80 45 4 44-39 65-77 53-28 30-83 27-103-5-38 14-91-8-98-42Z" />
          <ellipse className="cooked-yolk" cx="284" cy="332" rx="47" ry="38" />
          <ellipse className="cooked-yolk-light" cx="270" cy="321" rx="13" ry="9" />
          <path className="cooked-edge" d="M157 364c35 18 73 17 105 3 35 17 78 13 113-6" />
          <path className="steam steam-one" d="M226 266c-16-19 15-28 0-49" />
          <path className="steam steam-two" d="M280 254c-15-20 14-29 0-50" />
          <path className="steam steam-three" d="M334 266c-15-20 15-30 1-50" />
        </>
      ) : (
        <>
          <ellipse className="egg-bowl" cx="280" cy="313" rx="184" ry="88" />
          <path className="egg-bowl-rim" d="M96 290c0 48 82 86 184 86s184-38 184-86c0-28-82-52-184-52S96 262 96 290Z" />
          <path className="egg-white" d="M143 285c18-31 56-39 87-23 32-27 81-20 102 12 40-12 77 10 78 37 1 37-42 53-78 39-27 27-75 24-98-4-36 11-80-6-91-33Z" />
          <ellipse className="egg-yolk" cx="283" cy="298" rx="50" ry="43" />
          <ellipse className="egg-yolk-shine" cx="267" cy="285" rx="15" ry="11" />
          <path className="egg-crack" d="M101 290c30 36 91 57 179 57s149-21 179-57" />
        </>
      )}
    </svg>
  );
}

export function EggExperiment() {
  const [active, setActive] = useState<EggState>("raw");
  const current = states[active];

  return (
    <div className="experiment-card grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,.85fr)] lg:items-center">
      <div className="evidence-photo egg-evidence">
        <div className={`egg-state-illustration is-${active}`}>
          <div className="egg-art">
            <EggIllustration active={active} />
          </div>
          <span className="egg-now-showing">Now showing: {current.label}</span>
        </div>
      </div>

      <div className="experiment-panel">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Change egg preparation">
          {(Object.keys(states) as EggState[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setActive(key)}
              className={`experiment-choice ${active === key ? "is-active" : ""} ${active === key && key === "cooked" ? "is-green-active" : ""}`}
              aria-pressed={active === key}
            >
              {states[key].label}
            </button>
          ))}
        </div>

        <div className="mt-6" aria-live="polite">
          <span className="lab-label">true ileal protein digestibility</span>
          <div className="mt-3 flex items-end gap-3">
            <strong className={`font-serif text-6xl font-normal leading-none transition-colors duration-300 sm:text-7xl ${active === "cooked" ? "text-green-700" : "text-ink"}`}>
              {current.value}%
            </strong>
            <span className={`mb-2 handwritten transition-colors duration-300 ${active === "cooked" ? "text-green-700" : "text-primary"}`}>received?</span>
          </div>
          <div className="measure-track mt-4" aria-hidden="true">
            <span className={active === "cooked" ? "is-green" : ""} style={{ width: `${current.value}%` }} />
          </div>
          <p className="mt-4 max-w-md text-base leading-relaxed text-ink/75">{current.note}</p>
        </div>

        <p className="mt-6 border-t border-dashed border-ink/25 pt-4 font-mono text-[11px] uppercase leading-relaxed tracking-[0.1em] text-ink/55">
          Human data: Evenepoel et al., The Journal of Nutrition (1998); discussed in Fuchs et al., The Journal of Nutrition (2022). This is an observation, not personal dietary advice.
        </p>
      </div>
    </div>
  );
}
