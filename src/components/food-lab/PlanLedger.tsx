import { useRef, useState } from "react";
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
    fix: string;
    fixNote: string;
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
        fix: "A 3-minute, one-handed breakfast.",
        fixNote: "Eaten before the school gate, not skipped for it.",
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
        fix: "Lunch that needs no fork and no decision.",
        fixNote: "So it still gets eaten between calls.",
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
        fix: "Dinner that takes zero energy at 9:36 PM.",
        fixNote: "Protein already made. Nothing to chop.",
    },
];

export function PlanLedger() {
    const [activeId, setActiveId] = useState(days[0].id);
    const day = days.find((d) => d.id === activeId) ?? days[0];
    const held = day.meals.filter((m) => m.held).length;

    // Phones: a sideways swipe on the card moves to the next or previous person.
    const touchStart = useRef<{ x: number; y: number } | null>(null);
    const step = (by: number) => {
        const index = days.findIndex((d) => d.id === activeId);
        setActiveId(days[(index + by + days.length) % days.length].id);
    };
    const onTouchEnd = (e: React.TouchEvent) => {
        const start = touchStart.current;
        touchStart.current = null;
        if (!start) return;
        const dx = e.changedTouches[0].clientX - start.x;
        const dy = e.changedTouches[0].clientY - start.y;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) step(dx < 0 ? 1 : -1);
    };

    return (
        <div className="plan-ledger">
            <div className="plan-ledger__selector" role="tablist" aria-label="Choose a real-life day">
                {days.map((d) => (
                    <button
                        key={d.id}
                        type="button"
                        role="tab"
                        id={`ledger-tab-${d.id}`}
                        aria-selected={d.id === activeId}
                        aria-controls="ledger-panel"
                        className={`plan-ledger__tab ${d.id === activeId ? "is-active" : ""}`}
                        onClick={() => setActiveId(d.id)}
                    >
                        {d.label}
                    </button>
                ))}
            </div>

            <article
                id="ledger-panel"
                key={day.id}
                role="tabpanel"
                aria-labelledby={`ledger-tab-${day.id}`}
                className="plan-ledger__panel"
                aria-live="polite"
                onTouchStart={(e) => (touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY })}
                onTouchEnd={onTouchEnd}
            >
                <img className="plan-ledger__art" src={day.art} alt={day.artAlt} loading="lazy" decoding="async" />

                <div className="plan-ledger__main">
                    <p className="plan-ledger__verdict">
                        The diet chart planned <b>{day.meals.length} meals</b>.
                        <br />
                        Real life kept <strong>{held}</strong>.
                    </p>

                    <ol className="plan-ledger__meals">
                        {day.meals.map((m, i) => (
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
                </div>

                <p className="plan-ledger__fix">
                    <span className="plan-ledger__fix-kicker">The Food Lab fix</span>
                    <strong>{day.fix}</strong>
                    <span className="plan-ledger__fix-note">{day.fixNote}</span>
                </p>
            </article>
        </div>
    );
}

export default PlanLedger;
