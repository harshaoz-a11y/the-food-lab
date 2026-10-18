import { useEffect, useState } from "react";
import {
    AlarmClock, AlertTriangle, ArrowRight, CalendarClock, CalendarDays, Check, ChevronDown, CircleHelp, Compass,
    Crosshair, FlaskConical, Gauge, Handshake, Heart, History, LineChart, ListChecks, Minus, NotebookPen, Plus, RefreshCcw,
    Repeat, ShoppingBasket, SlidersHorizontal, Stethoscope, Target, TestTube, ThumbsUp, UserCheck, Utensils,
    UtensilsCrossed,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { BOOK_FIT_CALL, Header, MobileActionBar, SiteFooter } from "@/components/site/SiteChrome";
import { StageVisual } from "./ConsultVisuals";
import type { VisualKind } from "./ConsultVisuals";
import "./Consults.css";

interface Stage {
    id: string;
    name: string;
    /** the stage in a few words, for the journey strip */
    outcome: string;
    /** the main thing the client walks away with */
    keep: string;
    /** the stage at a glance: tiles read left to right, top to bottom (title, one line) */
    tiles: [LucideIcon, string, string][];
    /** which visual metaphor shows the tiles, and the stage's own colour */
    visual: VisualKind;
    accent: string;
    duration: string;
    price: string;
    timing: string;
    goal: string;
    cover: string[];
    get: string[];
    notIncluded?: string[];
    note?: string;
}

// The client journey, in order. Prices and durations are the published offer.
const stages: Stage[] = [{
    id: "fit-call",
    visual: "fit",
    accent: "#a33a2b",
    name: "Free Fit Call",
    outcome: "Is this right for you?",
    keep: "An honest recommendation on whether to continue",
    tiles: [
        [Target, "Your goal", "What you actually want to change."],
        [History, "Past attempts", "What you tried, and how long it lasted."],
        [CircleHelp, "Why the gap?", "Where earlier plans broke down."],
        [Stethoscope, "Your constraints", "Clinical, medication and lifestyle limits."],
        [UserCheck, "What fits you", "Your body, your routine, the food you love."],
        [Handshake, "Our approach fit", "Whether we are the right partner, or not."],
    ],
    duration: "20 minutes",
    price: "Free",
    timing: "Whenever you are ready",
    goal: "To decide together whether Precision Bio-Nutrition is the right fit for you. It is a conversation, not a plan.",
    cover: [
        "What you have tried before, and why it did not last",
        "Your main goal",
        "Foods you enjoy and will not give up",
        "Your typical day: cooking capacity, work schedule, family meals",
        "Any recent bloodwork, medications, allergies or clinical conditions",
        "Whether our approach fits what you need",
    ],
    get: ["A short, honest recommendation: continue to Baseline Mapping, or a referral elsewhere if another route suits you better"],
    notIncluded: ["A meal plan", "Supplement recommendations", "Detailed food substitutions", "A diagnosis"],
}, {
    id: "baseline-mapping",
    visual: "map",
    accent: "#2f7d52",
    name: "Baseline Mapping",
    outcome: "Where you are today",
    keep: "Your Baseline Map",
    tiles: [
        [TestTube, "Your biology", "Bloodwork, medication and supplements, read together."],
        [CalendarClock, "Your day", "Work, sleep, stress, travel and cooking time."],
        [Utensils, "How you eat", "Weekdays, weekends and eating out, as they really are."],
        [Heart, "Non-negotiables", "The foods and rituals that stay."],
        [AlarmClock, "Pressure points", "Where decision fatigue hits."],
        [Crosshair, "First levers", "The 2–3 areas to redesign first."],
    ],
    duration: "45–60 minute call, plus short forms beforehand",
    price: "₹2,999",
    timing: "Within a few days of the Fit Call",
    goal: "To map how you eat and live today, before anything is changed. This is the diagnostic foundation.",
    cover: [
        "Recent bloodwork, where relevant: glucose/HbA1c, lipids, thyroid, iron, B12, vitamin D, kidney and liver markers",
        "Medications and supplements",
        "Your typical weekday and weekend eating",
        "Activity, sleep, stress, travel and work pattern",
        "Cooking capacity, household food habits, budget and access",
        "Allergies, intolerances, dislikes and cultural or religious preferences",
        "The foods you love and the rituals you want to keep",
        "Past sticking points, and where decision fatigue hits: mornings, office lunches, late nights, social meals, travel",
    ],
    get: [
        "Your Baseline Map: your current food system, your goal and constraints, and your non-negotiables",
        "5–10 interaction opportunities in how you already eat",
        "The 2–3 highest-leverage areas to redesign first",
        "What to observe and track before the Blueprint",
    ],
    note: "Required before an Interaction Blueprint.",
}, {
    id: "interaction-blueprint",
    visual: "blueprint",
    accent: "#1f4f7a",
    name: "Interaction Blueprint",
    outcome: "Your plan, on one page",
    keep: "A one-page weekly operating system",
    tiles: [
        [Utensils, "Meals, redesigned", "Familiar food, better prep, pairing and timing."],
        [ListChecks, "3–5 key changes", "High-leverage changes, not a rulebook."],
        [CalendarDays, "One-page week", "A structure that cuts daily decisions."],
        [ShoppingBasket, "Shop & prep", "What to buy and prepare ahead."],
        [UtensilsCrossed, "Eating out", "Defaults for restaurants, social meals and travel."],
        [LineChart, "What to track", "Enjoyment, energy, digestion and goal markers."],
    ],
    duration: "60–75 minute walkthrough",
    price: "₹5,999",
    timing: "About 5–10 days after Baseline Mapping, once your plan is designed",
    goal: "To turn your Baseline Map into a practical food system: the food does more of the work, and you make fewer decisions.",
    cover: [
        "Keeping the meals and rituals you already enjoy",
        "Changing preparation, pairing, timing, texture, portion or order, where the evidence and your life support it",
        "A weekly structure that cuts down daily choices",
        "3–5 high-leverage changes, not 30 rules",
        "“Same meal, better system” versions of familiar foods",
        "What should not change yet",
    ],
    get: [
        "Your Interaction Blueprint: a one-page weekly operating system",
        "Your core meals, redesigned where useful",
        "Shopping and prep guidance",
        "Defaults for eating out and social meals",
        "A short list of optional experiments",
        "What to track: enjoyment, ease, fullness, energy, digestion, consistency and goal-specific markers",
    ],
}, {
    id: "first-review",
    visual: "review",
    accent: "#b0601c",
    name: "First Adaptation Review",
    outcome: "Adjust to real life",
    keep: "Keep · Adjust · Remove · Test next",
    tiles: [
        [ThumbsUp, "What worked", "Easy, enjoyable, sustainable."],
        [AlertTriangle, "What caused friction", "Where effort crept in."],
        [NotebookPen, "What you ate", "Reality, not the plan."],
        [Gauge, "How you felt", "Taste, fullness, energy, digestion, sleep."],
        [SlidersHorizontal, "Keep · Adjust · Remove", "Each change refined or replaced."],
        [FlaskConical, "Test next", "The next small experiment."],
    ],
    duration: "30–45 minutes",
    price: "Included in the Starter",
    timing: "2–3 weeks after the Blueprint",
    goal: "To adjust the plan to reality. The method depends on how you actually respond, not on how well you follow a document.",
    cover: [
        "What was easy, enjoyable and sustainable",
        "What created friction",
        "What you actually ate, not what the plan said",
        "Taste, fullness, digestion, energy, cravings, sleep and consistency",
        "Any goal-specific observations",
        "Whether each change needs simplifying, strengthening or replacing",
    ],
    get: ["A revised short-list: Keep · Adjust · Remove · Test next"],
}, {
    id: "adaptation-cycle",
    visual: "loop",
    accent: "#2f8c8c",
    name: "Adaptation Continuation",
    outcome: "Keep refining (optional)",
    keep: "An updated short-list after each review",
    tiles: [
        [Repeat, "Three more reviews", "Spaced over 6–8 weeks."],
        [RefreshCcw, "The plan adapts", "To new routines, travel and seasons."],
        [Compass, "You run it yourself", "Knowing how to adjust without us."],
    ],
    duration: "Reviews 2, 3 and 4 (30–45 minutes each)",
    price: "₹3,999",
    timing: "Over the 6–8 weeks after your first review",
    goal: "To keep refining as life changes: new routines, travel, seasons, results.",
    cover: ["The same review process as Review 1, three more times, spaced across 6–8 weeks"],
    get: ["An updated Keep · Adjust · Remove · Test next list after each review"],
    note: "Optional. For clients who have completed the Starter.",
}];

const priceRows = [
    ["Fit Call", "20-minute fit call", "Free"],
    ["Baseline Mapping", "45–60 min diagnostic call + Baseline Map", "₹2,999"],
    ["Interaction Blueprint", "60–75 min plan walkthrough + written Blueprint", "₹5,999"],
    ["Starter Bundle", "Baseline Mapping + Interaction Blueprint + Review 1", "₹7,999"],
    ["Adaptation Continuation", "Reviews 2, 3 and 4 over the following 6–8 weeks", "₹3,999"],
    ["Single Adaptation Review", "One 30–45 min review, existing clients only", "₹1,499"],
] as const;

const faqs = [
    ["Do I have to buy the Starter?", "No. You can book Baseline Mapping and the Interaction Blueprint separately (₹2,999 + ₹5,999). The Starter adds your first Adaptation Review and costs less than the three sessions bought one by one. Baseline Mapping always comes before the Blueprint."],
    ["Do I need bloodwork before the Fit Call?", "No. If you have recent reports, bring them to Baseline Mapping. We will tell you if anything else would be useful."],
    ["Is this a medical consultation?", "No. Precision Bio-Nutrition is nutrition guidance, not a diagnosis or treatment. If you have a clinical condition, we work alongside your doctor, not instead of them."],
    ["What support do I get between sessions?", "A defined support window on WhatsApp or email for practical clarifications, such as a swap that is not working or a menu question. It is not unlimited coaching."],
    ["Can I book a single review later?", "Yes, existing clients can book a single Adaptation Review at any time for ₹1,499."],
] as const;

const track = (name: string, params: Record<string, string>) => window.gtag?.("event", name, params);

const Consults = () => {
    // Stage cards open one at a time; the first is open so visitors see what a stage looks like.
    const [expanded, setExpanded] = useState<string | null>(stages[0].id);
    // inside an open card, the full lists fold behind "See what we cover"
    const [detail, setDetail] = useState<string | null>(null);
    // that button pulses until someone has used it once
    const [usedDetail, setUsedDetail] = useState(false);

    const scrollToCard = (id: string, always: boolean) => requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el && (always || el.getBoundingClientRect().top < 80)) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    const openCard = (id: string, from: string, scroll: boolean) => {
        setExpanded(id);
        setDetail(null);
        track("consult_stage_open", { stage: id, from });
        scrollToCard(id, scroll);
    };
    const toggleCard = (id: string) => {
        if (expanded === id) {
            setExpanded(null);
            setDetail(null);
            return;
        }
        openCard(id, "header", false);
    };
    const jumpToStage = (id: string) => openCard(id, "journey", true);
    const toggleDetail = (id: string) => {
        setUsedDetail(true);
        const next = detail === id ? null : id;
        if (next) track("consult_detail_open", { stage: id });
        setDetail(next);
    };

    useEffect(() => {
        document.title = "Precision Bio-Nutrition consults — The Food Lab, Bengaluru";
    }, []);

    return (
        <div id="top" className="min-h-screen overflow-hidden bg-paper text-ink">
            <Header />
            <main className="pt-[74px]">
                {/* intro */}
                <section className="px-4 pt-6 sm:px-6 lg:px-8 lg:pt-8">
                    <div className="paper-sheet nb-ruled mx-auto max-w-[1200px] px-5 py-10 sm:px-10 sm:py-14 lg:px-16">
                        <span className="section-head__kicker">Precision Bio-Nutrition</span>
                        <h1 className="cx-title">A food system built around your life, <em>not a diet you have to survive.</em></h1>
                        <p className="cx-lede cx-intro-hide">
                            Four stages, three paid conversations and one plan that keeps the food you love and changes how it works.
                            Start with a free 20-minute Fit Call; we will only continue if it is the right fit.
                        </p>
                        <div className="cx-actions cx-intro-hide">
                            <a href={BOOK_FIT_CALL} className="cta-btn">Book your free Fit Call <ArrowRight className="h-4 w-4" /></a>
                            <a href="#pricing" className="text-link">See pricing <ArrowRight className="h-3.5 w-3.5 rotate-90" /></a>
                        </div>

                        {/* the journey at a glance */}
                        <ol className="cx-journey" aria-label="The client journey">
                            {stages.map((stage, i) => (
                                <li key={stage.id} className={stage.id === "adaptation-cycle" ? "is-optional" : ""} style={{ "--accent": stage.accent } as React.CSSProperties}>
                                    <a
                                        href={`#${stage.id}`}
                                        onClick={(e) => { e.preventDefault(); jumpToStage(stage.id); }}>
                                        <i>{i + 1}</i>
                                        <strong>{stage.name}</strong>
                                        <em>{stage.outcome}</em>
                                        <span>{stage.price === "Included in the Starter" ? <>In<span className="hidden md:inline">cluded in the</span> Starter</> : stage.price}</span>
                                    </a>
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

                {/* the Starter: the main offer */}
                <section className="px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-[1200px] bg-charcoal px-5 py-12 text-[#f8f2e5] sm:px-10 lg:px-16 lg:py-16">
                        <div className="cx-starter">
                            <div>
                                <span className="section-head__kicker">Most clients start here</span>
                                <h2 className="cx-starter__title">Precision Bio-Nutrition Starter</h2>
                                <p className="cx-starter__price">₹7,999 <s>₹10,497 booked separately</s></p>
                                <p className="cx-starter__sub">Baseline Mapping + Interaction Blueprint + Adaptation Review 1</p>
                            </div>
                            <ol className="cx-starter__list">
                                <li><Check aria-hidden="true" />Free 20-minute Fit Call</li>
                                <li><Check aria-hidden="true" />Baseline Mapping: 45–60 min</li>
                                <li><Check aria-hidden="true" />Interaction Blueprint: 60–75 min</li>
                                <li><Check aria-hidden="true" />First Adaptation Review: 30–45 min</li>
                                <li><Check aria-hidden="true" />Your Baseline Map and Interaction Blueprint, in writing</li>
                                <li><Check aria-hidden="true" />A defined support window between sessions for practical questions</li>
                            </ol>
                        </div>
                        <div className="cx-after">
                            <strong>Then, if you want to keep going: Adaptation Continuation, ₹3,999</strong>
                            <span>Reviews 2–4 over the next 6–8 weeks, for clients who have completed the Starter. Three reviews would be ₹4,497 one by one. The full four-review journey comes to ₹11,998.</span>
                        </div>
                    </div>
                </section>

                {/* each stage in detail */}
                <section className="px-4 sm:px-6 lg:px-8">
                    <div className="paper-sheet nb-ruled mx-auto max-w-[1200px] px-5 py-10 sm:px-10 sm:py-14 lg:px-16">
                        <span className="section-head__kicker">Stage by stage</span>
                        <h2 className="cx-h2">What happens at each step</h2>
                        <p className="cx-stages__hint">Tap a stage to open it.</p>
                        <div className="cx-stages">
                            {stages.map((stage, i) => {
                                const isOpen = expanded === stage.id;
                                const next = stages[i + 1];
                                return (
                                <article
                                    key={stage.id}
                                    id={stage.id}
                                    className={`cx-stage ${isOpen ? "is-open" : ""}`}
                                    style={{ "--accent": stage.accent } as React.CSSProperties}>
                                    <h3 className="cx-stage__heading">
                                        <button
                                            type="button"
                                            className="cx-stage__head"
                                            aria-expanded={isOpen}
                                            aria-controls={`${stage.id}-body`}
                                            onClick={() => toggleCard(stage.id)}>
                                            <span className="cx-stage__num">{i + 1}</span>
                                            <span className="cx-stage__titles">
                                                <span className="cx-stage__name">{stage.name}</span>
                                                <span className="cx-stage__outcome">{stage.outcome}</span>
                                            </span>
                                            <span className="cx-stage__price">{stage.price === "Included in the Starter" ? <>In<span className="hidden md:inline">cluded in the</span> Starter</> : stage.price}</span>
                                            <span className="cx-stage__chev"><ChevronDown aria-hidden="true" /></span>
                                        </button>
                                    </h3>
                                    <div id={`${stage.id}-body`} className="cx-stage__body" hidden={!isOpen}>
                                        <p className="cx-stage__when">
                                            <span>{stage.duration}</span>
                                            <span>{stage.timing}</span>
                                        </p>
                                        <p className="cx-stage__goal">{stage.goal}</p>
                                        <StageVisual kind={stage.visual} tiles={stage.tiles} deliverable={stage.keep} />
                                        <div className="cx-stage__actions">
                                            <button
                                                type="button"
                                                className={`cx-stage__toggle ${usedDetail ? "" : "is-pulsing"}`}
                                                aria-expanded={detail === stage.id}
                                                aria-controls={`${stage.id}-detail`}
                                                onClick={() => toggleDetail(stage.id)}>
                                                <Plus aria-hidden="true" />
                                                {detail === stage.id ? "Hide the detail" : "See what we cover"}
                                            </button>
                                            {next
                                                ? <button type="button" className="cx-stage__next" onClick={() => openCard(next.id, "next", true)}>Next: {next.name} <ArrowRight aria-hidden="true" /></button>
                                                : <a href="#pricing" className="cx-stage__next">See pricing <ArrowRight aria-hidden="true" className="rotate-90" /></a>}
                                        </div>
                                        <div id={`${stage.id}-detail`} className="cx-stage__detail" hidden={detail !== stage.id}>
                                            <div className="cx-stage__cols">
                                                <div>
                                                    <h4>We cover</h4>
                                                    <ul>{stage.cover.map(item => <li key={item}>{item}</li>)}</ul>
                                                </div>
                                                <div>
                                                    <h4>You leave with</h4>
                                                    <ul className="is-get">{stage.get.map(item => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul>
                                                    {stage.notIncluded && (
                                                        <>
                                                            <h4>Not part of this call</h4>
                                                            <ul className="is-not">{stage.notIncluded.map(item => <li key={item}><Minus aria-hidden="true" />{item}</li>)}</ul>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        {stage.note && <p className="cx-stage__note">{stage.note}</p>}
                                    </div>
                                </article>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* pricing */}
                <section id="pricing" className="scroll-mt-24 px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-[1200px] bg-charcoal px-5 py-12 text-[#f8f2e5] sm:px-10 lg:px-16 lg:py-16">
                        <span className="section-head__kicker">Pricing and questions</span>
                        <h2 className="cx-h2">Everything else you might want to know</h2>
                        <details className="cx-pricelist" onToggle={(e) => { if (e.currentTarget.open) track("consult_pricelist_open", {}); }}>
                            <summary>Full price list <ChevronDown aria-hidden="true" /></summary>
                            <table className="cx-prices">
                            <thead>
                                <tr><th>Stage</th><th>What it includes</th><th>Price</th></tr>
                            </thead>
                            <tbody>
                                {priceRows.map(([stage, what, price]) => (
                                    <tr key={stage} className={stage === "Starter Bundle" ? "is-featured" : ""}>
                                        <th scope="row">{stage}</th>
                                        <td>{what}</td>
                                        <td>{price}</td>
                                    </tr>
                                ))}
                            </tbody>
                            </table>
                        </details>
                        <div className="cx-faq">
                            {faqs.map(([q, a]) => (
                                <details key={q}>
                                    <summary>{q}</summary>
                                    <p>{a}</p>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                {/* close: the same call to action, so the phone action bar steps aside here */}
                <section id="your-experiment" className="px-4 pb-4 sm:px-6 sm:pb-6 lg:px-8 lg:pb-8">
                    <div className="paper-sheet nb-ruled mx-auto max-w-[1200px] px-5 py-12 text-center sm:px-10 lg:py-16">
                        <h2 className="cx-h2">Start with 20 minutes.</h2>
                        <p className="cx-lede mx-auto">No plan, no pressure: just an honest answer on whether this is right for you.</p>
                        <div className="cx-actions justify-center">
                            <a href={BOOK_FIT_CALL} className="cta-btn">Book your free Fit Call <ArrowRight className="h-4 w-4" /></a>
                            <a href="/" className="text-link">Back to The Food Lab</a>
                        </div>
                    </div>
                </section>
            </main>
            <SiteFooter />
            <MobileActionBar />
        </div>
    );
};

export default Consults;
