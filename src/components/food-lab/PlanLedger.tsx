import { Check, X } from "lucide-react";
import workingMomArt from "@/assets/field-studies/working-mom.webp";
import ceoArt from "@/assets/field-studies/ceo.webp";
import analystArt from "@/assets/field-studies/analyst.webp";
import "./PlanLedger.css";

interface Meal {
    meal: string;
    time: string;
    held: boolean;
    /** what actually happened, in a few words */
    note: string;
}

interface Day {
    id: string;
    label: string;
    art: string;
    artAlt: string;
    meals: Meal[];
}

// Illustrative days: what a generic diet chart schedules vs what survives the day.
const days: Day[] = [
    {
        id: "mom",
        label: "Working mom",
        art: workingMomArt,
        artAlt: "Sketch of a working mom hurrying her child to school with a coffee in hand",
        meals: [
            { meal: "Breakfast", time: "7:30", held: false, note: "Alarm missed. Coffee, standing." },
            { meal: "Snack", time: "10:30", held: true, note: "Nuts, at 11:05." },
            { meal: "Lunch", time: "1:00", held: true, note: "Eaten between calls." },
            { meal: "Dinner", time: "8:00", held: false, note: "Cooked for everyone. Ate last." },
        ],
    },
    {
        id: "ceo",
        label: "CEO",
        art: ceoArt,
        artAlt: "Sketch of a CEO leaning back at a desk, lost in thought, with lunch untouched",
        meals: [
            { meal: "Breakfast", time: "8:00", held: false, note: "Black coffee in the car." },
            { meal: "Lunch", time: "1:00", held: false, note: "Went cold beside the laptop." },
            { meal: "Snack", time: "4:30", held: false, note: "Another call. Chai at six." },
            { meal: "Dinner", time: "8:30", held: true, note: "Late, but at the table." },
        ],
    },
    {
        id: "analyst",
        label: "Analyst",
        art: analystArt,
        artAlt: "Sketch of an analyst at a laptop late in the day, surrounded by papers and a coffee mug",
        meals: [
            { meal: "Breakfast", time: "8:00", held: true, note: "Cereal at the desk." },
            { meal: "Lunch", time: "1:00", held: false, note: "Whatever delivered fastest." },
            { meal: "Snack", time: "4:30", held: false, note: "Fifth coffee instead." },
            { meal: "Dinner", time: "8:00", held: false, note: "Home at 9:36. Too tired to cook." },
        ],
    },
];

// Two meals on top, two below: breakfast and lunch, then snack and dinner.
const ORDER = ["Breakfast", "Lunch", "Snack", "Dinner"];

export function PlanLedger() {
    return (
        <div className="plan-ledger">
            {/* all three days side by side; on narrow screens they slide sideways like a row of episodes */}
            <div className="plan-ledger__rail" role="list" aria-label="Three real-life days">
                {days.map((day) => {
                    const held = day.meals.filter((m) => m.held).length;
                    const meals = [...day.meals].sort((a, b) => ORDER.indexOf(a.meal) - ORDER.indexOf(b.meal));
                    return (
                        <article key={day.id} role="listitem" className="plan-ledger__card" aria-label={day.label}>
                            <div className="plan-ledger__art-wrap">
                                <img className="plan-ledger__art" src={day.art} alt={day.artAlt} loading="lazy" decoding="async" />
                            </div>
                            <div className="plan-ledger__head">
                                <span className="plan-ledger__who">{day.label}</span>
                                <p className="plan-ledger__verdict">
                                    The diet chart planned <b>{day.meals.length} meals</b>.
                                    <br />
                                    Real life <span className="whitespace-nowrap">allowed <strong>{held}</strong>.</span>
                                </p>
                            </div>
                            <ol className="plan-ledger__meals">
                                {meals.map((m, i) => (
                                    <li
                                        key={m.meal}
                                        className={`plan-ledger__meal ${m.held ? "is-held" : "is-missed"}`}
                                        style={{ "--i": i } as React.CSSProperties}
                                    >
                                        <span className="plan-ledger__badge" role="img" aria-label={m.held ? "Held" : "Missed"}>
                                            {m.held ? <Check aria-hidden="true" /> : <X aria-hidden="true" />}
                                        </span>
                                        <span className="plan-ledger__meal-name">{m.meal}</span>
                                        <span className="plan-ledger__meal-time">{m.time}</span>
                                        <span className="plan-ledger__meal-note">{m.note}</span>
                                    </li>
                                ))}
                            </ol>
                        </article>
                    );
                })}
            </div>
        </div>
    );
}

export default PlanLedger;
