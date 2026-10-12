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
    Utensils,
    UsersRound,
    Wallet,
    X,
} from "lucide-react";
import "./GapBoard.css";

const methodFlow = [{
    label: "Understand",
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
        }]
    }]
}, {
    label: "Maximize Benefit and Taste",
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
        }]
    }]
}, {
    label: "Observe",
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
const GENERIC_COUNT = methodFlow.reduce(
    (n, s) => n + s.areas.reduce((m, a) => m + a.leaves.filter((l) => ASKED_BY_GENERIC.has(l.label)).length, 0),
    0,
);

export function GapBoard() {
    const missed = TOTAL - GENERIC_COUNT;

    return (
        <div className="gap-board">
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
                <div className="gap-card__empty" aria-label={`${missed} things never asked`}>
                    <span className="gap-card__slots" aria-hidden="true">
                        {Array.from({ length: missed }, (_, i) => <i key={i} />)}
                    </span>
                    <span>{missed} never asked</span>
                </div>
                <ul className="gap-card__facts">
                    <li><X aria-hidden="true" />One sitting</li>
                    <li><X aria-hidden="true" />A chart, then you are on your own</li>
                    <li><X aria-hidden="true" />Taste and routine left out</li>
                </ul>
            </section>

            <span className="gap-board__vs" aria-hidden="true">vs</span>

            {/* The Food Lab: big, bright, full */}
            <section className="gap-card gap-card--lab" aria-label="The Food Lab">
                <span className="gap-card__kicker">The Food Lab</span>
                <p className="gap-card__big">
                    {TOTAL}
                    <small>things we look at</small>
                </p>
                <div className="gap-card__steps">
                    {methodFlow.map(({ label, areas }, stageIndex) => (
                        <div key={label} className="gap-card__step">
                            <span className="gap-card__step-name">
                                <i>{stageIndex + 1}</i>
                                {label}
                            </span>
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
                <p className="gap-card__key">
                    <i aria-hidden="true" /> {missed} things a generic consult never reaches
                </p>
                <ul className="gap-card__facts">
                    <li><Check aria-hidden="true" />An ongoing loop that adapts</li>
                    <li><Check aria-hidden="true" />Built around your actual day</li>
                    <li><Check aria-hidden="true" />Taste is designed in</li>
                </ul>
            </section>
        </div>
    );
}

export default GapBoard;
