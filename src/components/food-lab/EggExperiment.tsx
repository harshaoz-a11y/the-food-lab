import { useState } from "react";
import { maestroAssets } from "@/lib/maestro-assets";

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

export function EggExperiment() {
  const [active, setActive] = useState<EggState>("raw");
  const current = states[active];

  return (
    <div className="experiment-card grid gap-6">
      <figure className="evidence-photo rotate-[-0.5deg]">
        <span className="tape tape-left" />
        <img
          src={maestroAssets.eggReference}
          alt="Illustrated comparison of raw and cooked egg protein digestibility"
          className="w-full"
        />
        <figcaption>Experiment sheet / cooking changes availability</figcaption>
      </figure>

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
          <span className="lab-label">estimated protein digestibility</span>
          <div className="mt-3 flex items-end gap-3">
            <strong className={`font-serif text-6xl font-normal leading-none transition-colors duration-300 sm:text-7xl ${active === "cooked" ? "text-green-700" : "text-ink"}`}>
              {current.value}%
            </strong>
            <span className={`mb-2 handwritten transition-colors duration-300 ${active === "cooked" ? "text-green-700" : "text-primary"}`}>received?</span>
          </div>
          <div className="measure-track mt-4" aria-hidden="true">
            <span
              className={active === "cooked" ? "is-green" : ""}
              style={{ width: `${current.value}%` }}
            />
          </div>
          <p className="mt-4 max-w-md text-base leading-relaxed text-ink/75">{current.note}</p>
        </div>

        <p className="mt-6 border-t border-dashed border-ink/25 pt-4 font-mono text-[9px] uppercase leading-relaxed tracking-[0.1em] text-ink/55">
          Human data discussed in Fuchs et al., The Journal of Nutrition (2022). This is an observation, not personal dietary advice.
        </p>
      </div>
    </div>
  );
}
