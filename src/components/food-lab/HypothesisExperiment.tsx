import { useState } from "react";
import { Check, Heart, Repeat, X } from "lucide-react";
import "./HypothesisExperiment.css";

const stages = [
    { title: "Ingredients" },
    { title: "Collaboration" },
    { title: "Optimization" },
] as const;

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

// Illustrative week: which days the plan was actually kept, with and without enjoyment.
// `counter` is how each outcome is described when shown as the quiet alternative.
const outcomes = {
    joy: {
        kicker: "Joy included",
        headline: "Built to repeat.",
        week: [1, 1, 1, 1, 1, 0, 1],
        counter: "With enjoyment: built to repeat.",
    },
    nojoy: {
        kicker: "Joy removed",
        headline: "Works on paper. Harder to choose again.",
        week: [1, 1, 0, 0, 0, 0, 0],
        counter: "Without enjoyment: works on paper.",
    },
} as const;

const kept = (week: readonly number[]) => week.filter(Boolean).length;

export function HypothesisExperiment() {
    const [generic, setGeneric] = useState(false);
    const outcome = generic ? outcomes.nojoy : outcomes.joy;
    const other = generic ? outcomes.joy : outcomes.nojoy;

    return (
        <div id="happiness-macro" className={`macro-card ${generic ? "is-nojoy" : "is-joy"}`}>
            <span className="macro-card__nickname">
                <Heart aria-hidden="true" /> Our secret
            </span>
            <h2 className="macro-card__question">The Happiness Macro</h2>
            <p className="macro-card__lede">
                Nutrition makes a plan work on paper. Enjoyment helps it survive real life.
            </p>

            {/* the equation: three stages + enjoyment = result */}
            <div className="macro-eq" aria-label="Ingredients, collaboration and optimization, plus enjoyment, make the outcome">
                <ol className="macro-eq__stages">
                    {stages.map(({ title }, i) => (
                        <li key={title} className={`macro-eq__stage macro-eq__stage--${i + 1}`} style={{ "--i": i } as React.CSSProperties}>
                            <Check aria-hidden="true" className="macro-eq__tick" />
                            {title}
                        </li>
                    ))}
                </ol>
                <div className="macro-eq__joyrow">
                    <span className="macro-eq__plus" aria-hidden="true">+</span>
                    <span className="macro-eq__joy">
                        <Heart aria-hidden="true" className="macro-eq__joy-heart" />
                        <span className="macro-eq__joy-label">{generic ? "Enjoyment?" : "Enjoyment"}</span>
                    </span>
                </div>
            </div>

            <span className="macro-eq__equals" aria-hidden="true">=</span>

            <div key={String(generic)} className="macro-result" aria-live="polite">
                <span className="macro-result__icon" aria-hidden="true">
                    {generic ? <X /> : <Repeat />}
                </span>
                <div className="macro-result__body">
                    <span className="macro-result__kicker">{outcome.kicker}</span>
                    <strong className="macro-result__headline">{outcome.headline}</strong>
                    <div className="macro-week" aria-label={`Kept ${kept(outcome.week)} of 7 days`}>
                        <ol className="macro-week__days" aria-hidden="true">
                            {outcome.week.map((d, i) => (
                                <li
                                    key={i}
                                    className={d ? "is-kept" : "is-missed"}
                                    style={{ "--i": i } as React.CSSProperties}
                                >
                                    <i>{d ? <Check /> : null}</i>
                                    <span>{DAYS[i]}</span>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>

            {/* the other outcome, always visible, so the contrast needs no click */}
            <p className="macro-counter">
                {other.counter}
            </p>

            <label className="macro-generic">
                <input type="checkbox" checked={generic} onChange={(e) => setGeneric(e.target.checked)} />
                <span className="macro-generic__box" aria-hidden="true"><Check /></span>
                See what most diets tend to do
            </label>
        </div>
    );
}
