import { useState } from "react";
import EggPlate from "@/components/egg-plate/EggPlate";

const states = {
    raw: {
        label: "Raw egg",
        value: 51,
        note: "The ingredient is present. The body may receive less of it."
    },

    cooked: {
        label: "Cooked egg",
        value: 91,
        note: "Heat changes the interaction — and what becomes available."
    }
} as const;

type EggState = keyof typeof states;

export function EggExperiment() {
    const [egg, setEgg] = useState<EggState>("raw");
    const current = states[egg];

    return (
        <article className="egg-observation">
            <div className="egg-observation__body">
                <div className="egg-observation__rail">
                    <button
                        type="button"
                        role="switch"
                        aria-checked={egg === "cooked"}
                        aria-label={`Change egg state to ${egg === "cooked" ? "raw" : "cooked"}`}
                        onClick={() => setEgg(egg === "raw" ? "cooked" : "raw")}
                        className={`egg-observation__toggle ${egg === "cooked" ? "is-cooked" : ""}`}>
                        <span className="egg-observation__toggle-label">RAW</span>
                        <span className="egg-observation__toggle-track" aria-hidden="true">
                            <span className="egg-observation__toggle-knob" />
                        </span>
                        <span className="egg-observation__toggle-label">COOKED</span>
                    </button>
                </div>
                <div className={`egg-observation__art egg-observation__art--${egg}`}>
                    <EggPlate
                        value={egg}
                        onChange={setEgg}
                        caption="true ileal protein digestibility"
                        className="egg-observation__plate" />
                    <p className="egg-observation__caption">FIG. 1 — {egg === "raw" ? "RAW EGG" : "COOKED EGG"}</p>
                </div>
                <div className="egg-observation__reading" aria-live="polite">
                    <span className="egg-observation__eyebrow">TRUE ILEAL · HUMAN DATA</span>
                    <h3>Protein<br />digestibility</h3>
                    <div className={`egg-observation__metric egg-observation__metric--${egg}`}>
                        <strong>{current.value}%</strong>
                    </div>
                    <p className="egg-observation__interpretation">{current.note}</p>
                </div>
            </div>
            <p className="egg-observation__source">Human data: Evenepoel et al., The Journal of Nutrition (1998); discussed in Fuchs et al., The Journal of Nutrition (2022). This is an observation, not personal dietary advice.
                                                                      </p>
        </article>
    );
}