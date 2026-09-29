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

function RawEggIllustration() {
  return (
    <svg className="egg-object egg-object-raw" viewBox="0 0 520 360" role="img" aria-label="A raw egg cracked into a small bowl">
      <ellipse className="egg-shadow" cx="260" cy="306" rx="170" ry="20" />
      <path className="egg-bowl" d="M123 174c8 91 55 132 137 132s129-41 137-132Z" />
      <path className="egg-bowl-rim" d="M119 172c0-18 63-31 141-31s141 13 141 31-63 31-141 31-141-13-141-31Z" />
      <path className="egg-white" d="M160 173c13-24 42-30 68-17 18 9 36 11 56 2 31-15 70-6 82 17 14 28-19 52-70 56-44 4-75-2-105-13-29-11-41-27-31-45Z" />
      <ellipse className="egg-yolk" cx="270" cy="178" rx="42" ry="36" />
      <ellipse className="egg-yolk-shine" cx="257" cy="164" rx="12" ry="8" />
      <path className="egg-shell-left" d="M164 128c-21-24-29-52-4-73 17-14 37-5 47 13 9 16 7 35-1 53" />
      <path className="egg-shell-right" d="M355 127c21-24 29-52 4-73-17-14-37-5-47 13-9 16-7 35 1 53" />
      <path className="egg-crack" d="m205 68 16 18-10 17 17 16m91-51-16 18 10 17-17 16" />
      <path className="egg-spark" d="m104 111 7 14 14 7-14 7-7 14-7-14-14-7 14-7Z" />
    </svg>
  );
}

function CookedEggIllustration() {
  return (
    <svg className="egg-object egg-object-cooked" viewBox="0 0 520 360" role="img" aria-label="A cooked egg on a plate with a golden yolk">
      <ellipse className="egg-shadow" cx="260" cy="306" rx="178" ry="20" />
      <ellipse className="cooked-plate" cx="260" cy="235" rx="174" ry="57" />
      <ellipse className="cooked-plate-inner" cx="260" cy="228" rx="137" ry="39" />
      <path className="cooked-white" d="M137 216c-8-35 22-61 61-60 27 1 41 14 63 7 29-9 51-23 84-10 37 15 51 53 26 76-23 21-55 20-82 15-30-6-49 8-80 3-37-5-66-12-72-31Z" />
      <ellipse className="cooked-yolk" cx="277" cy="204" rx="51" ry="43" />
      <ellipse className="cooked-yolk-light" cx="262" cy="188" rx="15" ry="10" />
      <path className="cooked-edge" d="M149 177c26-26 55-14 77-16m95 7c23-3 42 9 55 26M161 251c29 13 54 10 76 5m83 2c19 4 35 0 47-10" />
      <path className="steam steam-one" d="M205 131c-17-20 15-30-2-50-14-16 10-26 4-43" />
      <path className="steam steam-two" d="M274 128c-16-21 14-29-2-49-13-17 10-28 4-45" />
      <path className="steam steam-three" d="M337 137c-14-17 12-27-2-43-11-14 8-24 4-38" />
      <path className="egg-spark" d="m126 112 7 14 14 7-14 7-7 14-7-14-14-7 14-7Z" />
    </svg>
  );
}

function EggIllustration({ active }: { active: EggState }) {
  return active === "raw" ? <RawEggIllustration /> : <CookedEggIllustration />;
}

export function EggExperiment() {
  const [active, setActive] = useState<EggState>("raw");
  const current = states[active];

  return (
    <div className="experiment-card grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,.85fr)] lg:items-center">
      <div className="evidence-photo egg-evidence">
        <div className={`egg-state-illustration is-${active}`}>
          <EggIllustration active={active} />
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
