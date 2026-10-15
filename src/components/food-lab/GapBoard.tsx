import {
    Activity,
    Briefcase,
    Check,
    CalendarClock,
    CalendarDays,
    Flag,
    Footprints,
    Globe,
    Heart,
    HeartPulse,
    Hourglass,
    MessagesSquare,
    NotebookPen,
    Plane,
    FlaskConical,
    RefreshCcw,
    Repeat,
    Salad,
    Scale,
    Smile,
    Soup,
    Sparkles,
    Target,
    ThumbsDown,
    Timer,
    TrendingUp,
    ChefHat,
    CircleHelp,
    Sprout,
    Utensils,
    UsersRound,
    Wallet,
    X,
} from "lucide-react";
import { useState } from "react";
import "./GapBoard.css";

const methodFlow = [{
    label: "Understand",
    note: "What’s stopping you?",
    icon: NotebookPen,

    areas: [{
        title: "Your biology",
        icon: Activity,

        leaves: [{
            label: "What your body is telling us.",
            icon: HeartPulse
        }]
    }, {
        title: "Your goals",
        icon: Target,

        leaves: [{
            label: "What you actually want to change.",
            icon: Flag
        }, {
            label: "What’s stopping you?",
            icon: CircleHelp
        }]
    }]
}, {
    label: "Maximize Benefit and Taste",
    note: "Can diets be delicious?",
    icon: FlaskConical,

    areas: [{
        title: "Your food",
        icon: Salad,

        leaves: [{
            label: "What you eat",
            icon: Utensils
        }, {
            label: "How much",
            icon: Scale
        }, {
            label: "How often",
            icon: Repeat
        }, {
            label: "What you enjoy",
            icon: Smile
        }, {
            label: "What you don’t",
            icon: ThumbsDown
        }]
    }, {
        title: "Your preferences",
        icon: Heart,

        leaves: [{
            label: "Taste",
            icon: Sparkles
        }, {
            label: "Satiety",
            icon: Soup
        }, {
            label: "Habits",
            icon: Footprints
        }, {
            label: "Culture",
            icon: Globe
        }, {
            label: "Convenience",
            icon: Timer
        }, {
            label: "Affordability",
            icon: Wallet
        }, {
            label: "Can diets be delicious?",
            icon: ChefHat
        }]
    }]
}, {
    label: "Observe",
    note: "What changes when we change something?",
    icon: Activity,

    areas: [{
        title: "Your response",
        icon: RefreshCcw,

        leaves: [{
            label: "What changes when we change something.",
            icon: TrendingUp
        }]
    }]
}, {
    label: "Adapt",
    note: "Continue to improve.",
    icon: RefreshCcw,

    areas: [{
        title: "Your life",
        icon: CalendarDays,

        leaves: [{
            label: "Work",
            icon: Briefcase
        }, {
            label: "Routines",
            icon: CalendarClock
        }, {
            label: "Time",
            icon: Hourglass
        }, {
            label: "Travel",
            icon: Plane
        }, {
            label: "Family",
            icon: UsersRound
        }, {
            label: "Social life",
            icon: MessagesSquare
        }, {
            label: "Continue to improve",
            icon: Sprout
        }]
    }]
}];


// What a typical short consult gets round to asking. Everything else goes unasked.
const ASKED_BY_GENERIC = new Set([
    "What your body is telling us.",
    "What you actually want to change.",
    "What you eat",
    "How much",
]);

const TOTAL = methodFlow.reduce((n, s) => n + s.areas.reduce((m, a) => m + a.leaves.length, 0), 0);
const MISSED_LEAVES = methodFlow
    .flatMap((s) => s.areas.flatMap((a) => a.leaves))
    .filter((l) => !ASKED_BY_GENERIC.has(l.label));
const GENERIC_COUNT = methodFlow.reduce(
    (n, s) => n + s.areas.reduce((m, a) => m + a.leaves.filter((l) => ASKED_BY_GENERIC.has(l.label)).length, 0),
    0,
);

export function GapBoard() {
    const missed = TOTAL - GENERIC_COUNT;
    // Phones show one card at a time behind a switch (The Food Lab first), and the Food Lab
    // list folded to its four steps.
    const [shown, setShown] = useState<"generic" | "lab">("lab");
    const [expanded, setExpanded] = useState(false);

    return (
        <div className={`gap-board is-showing-${shown} ${expanded ? "is-expanded" : ""}`}>
            <div className="gap-board__switch" role="group" aria-label="Compare consults">
                <button type="button" aria-pressed={shown === "lab"} onClick={() => setShown("lab")}>
                    The Food Lab <b>{TOTAL}</b>
                </button>
                <span className="gap-board__switch-vs" aria-hidden="true">vs</span>
                <button type="button" aria-pressed={shown === "generic"} onClick={() => setShown("generic")}>
                    Generic consult <b>{GENERIC_COUNT}</b>
                </button>
            </div>
            {/* The Food Lab: big, bright, full */}
            <section className="gap-card gap-card--lab" aria-label="The Food Lab">
                <span className="gap-card__kicker">The Food Lab</span>
                <p className="gap-card__big">
                    {TOTAL}
                    <small>things we look at</small>
                </p>
                <div className="gap-card__steps">
                    {methodFlow.map(({ label, note, areas }, stageIndex) => (
                        <div key={label} className="gap-card__step">
                            <span className="gap-card__step-name">
                                <i>{stageIndex + 1}</i>
                                {label}
                                <small className="gap-card__step-count">
                                    {areas.reduce((n, a) => n + a.leaves.length, 0)}
                                </small>
                            </span>
                            <em className="gap-card__step-note">{note}</em>
                            <ul className="gap-card__chips">
                                {areas.flatMap((a) => a.leaves).map(({ label: leaf, icon: Icon }) => (
                                    <li
                                        key={leaf}
                                        className={`gap-chip ${ASKED_BY_GENERIC.has(leaf) ? "gap-chip--shared" : "gap-chip--new"}`}
                                    >
                                        <Icon aria-hidden="true" />
                                        {leaf}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <button
                    type="button"
                    className="gap-card__more"
                    aria-expanded={expanded}
                    onClick={() => setExpanded(value => !value)}>
                    {expanded ? "Show the four steps only" : `See all ${TOTAL}`}
                </button>
                <p className="gap-card__key">
                    <i aria-hidden="true" /> {missed} things a generic consult never reaches
                </p>
                <ul className="gap-card__facts">
                    <li><Check aria-hidden="true" />An ongoing loop that adapts</li>
                    <li><Check aria-hidden="true" />Built around your actual day</li>
                    <li><Check aria-hidden="true" />Taste is designed in</li>
                </ul>
            </section>

            <span className="gap-board__vs" aria-hidden="true">vs</span>

            {/* the generic consult: small, grey, mostly empty */}
            <section className="gap-card gap-card--generic" aria-label="A generic consult">
                <span className="gap-card__kicker">A generic consult</span>
                <p className="gap-card__big">
                    {GENERIC_COUNT}
                    <small>things asked</small>
                </p>
                <ul className="gap-card__chips">
                    {methodFlow.flatMap((s) => s.areas.flatMap((a) => a.leaves))
                        .filter((l) => ASKED_BY_GENERIC.has(l.label))
                        .map(({ label, icon: Icon }) => (
                            <li key={label} className="gap-chip gap-chip--grey">
                                <Icon aria-hidden="true" />
                                {label}
                            </li>
                        ))}
                </ul>
                <div className="gap-card__empty">
                    <span>{missed} never asked</span>
                    <ul className="gap-card__slots">
                        {MISSED_LEAVES.map(({ label }) => <li key={label}>{label}</li>)}
                    </ul>
                </div>
                <ul className="gap-card__facts">
                    <li><X aria-hidden="true" />One sitting</li>
                    <li><X aria-hidden="true" />A chart, then you are on your own</li>
                    <li><X aria-hidden="true" />Taste and routine left out</li>
                </ul>
            </section>
        </div>
    );
}

export default GapBoard;
