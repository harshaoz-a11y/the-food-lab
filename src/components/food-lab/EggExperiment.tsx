import { Fragment, useState } from "react";
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
            <div className="egg-observation__rail">
                <span className="egg-observation__prompt">
                </span>
                <div
                    className="egg-observation__choices"
                    role="group"
                    aria-label="Change egg preparation">
                    {(Object.keys(states) as EggState[]).map(key => (<Fragment key={key}>
                        {key === "cooked" && <span
                            className="egg-observation__arrow bg-[#c6a687] text-[25px] font-[600] font-[Impact,_fantasy] my-[13px] [color:#b3b18b]"
                            aria-hidden="true">→</span>}
                        <button
                            type="button"
                            onClick={() => setEgg(key)}
                            className={`egg-observation__choice ${egg === key ? "is-active" : ""} ${egg === key && key === "cooked" ? "is-cooked" : ""}`}
                            aria-pressed={egg === key}
                            aria-label={`${states[key].label}, ${states[key].value}% digestible`}>
                            <span className="egg-observation__state">{key === "raw" ? "RAW" : "COOKED"}</span>
                            <span className="egg-observation__preview">{states[key].value}% <small>digestible</small></span>
                        </button>
                    </Fragment>))}
                </div>
            </div>
            <div className="egg-observation__body">
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