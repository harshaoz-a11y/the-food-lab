/* Ruled-line accent at top of header */
/* Page number stamp */
/* ─── Page-number header strip ──────────────────────── */
/* ═══════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════ */
/* Ruled-page top margin annotation */
/* Margin annotation */
/* Handwritten margin gloss */
/* Ruled footer top line */
import { useState } from "react";

import {
    Activity,
    AlarmClock,
    ArrowRight,
    BatteryLow,
    CalendarDays,
    CarFront,
    Clock3,
    CookingPot,
    Files,
    FlaskConical,
    Heart,
    House,
    Mail,
    Menu,
    NotebookPen,
    Presentation,
    RefreshCcw,
    Salad,
    School,
    Smartphone,
    Target,
    UsersRound,
    UtensilsCrossed,
    X,
} from "lucide-react";

import { useSectionReveal } from "@/hooks/use-section-reveal";
import { AlchemyPartnerships } from "@/components/food-lab/AlchemyPartnerships";
import { EggExperiment } from "@/components/food-lab/EggExperiment";
import { FieldCharacter, type FieldScene } from "@/components/food-lab/FieldCharacter";
import { HypothesisExperiment } from "@/components/food-lab/HypothesisExperiment";
import { ProteinExperiment } from "@/components/food-lab/ProteinExperiment";
import { RiceExperiment } from "@/components/food-lab/RiceExperiment";
import RegionScene from "@/components/region-scenes/RegionScene";
import foodLabBrandLogo from "@/assets/the-food-lab-brand-logo.png";
import { maestroAssets } from "@/lib/maestro-assets";

const navigation = [{
    label: "The question",
    href: "#question"
}, {
    label: "The proof",
    href: "#demonstration"
}, {
    label: "Real life",
    href: "#real-life"
}, {
    label: "Work with us",
    href: "#how-we-help"
}];

const fieldStudies = [{
    time: "07:42 / weekday",
    scene: "morning" as FieldScene,
    selectorLabel: "Working mom",
    persona: "The Working Mom",
    personaNote: "Morning logistics / everyone needs her at once",
    title: "The morning moved first",
    copy: "Breakfast did not fail. It was interrupted by the next urgent thing, then the next.",
    note: "timing × appetite",

    steps: [{
        title: "The alarm is missed",
        detail: "She wakes up already behind the clock.",
        icons: [AlarmClock]
    }, {
        title: "Breakfast becomes a race",
        detail: "She rushes to get something on the table.",
        icons: [CookingPot]
    }, {
        title: "Her phone interrupts",
        detail: "The moment she sits, a meeting reminder flashes.",
        icons: [Smartphone, Presentation]
    }, {
        title: "School cannot wait",
        detail: "Before the first bite, the kids need to leave.",
        icons: [CarFront, School]
    }]
}, {
    time: "13:18 / desk",
    scene: "desk" as FieldScene,
    selectorLabel: "CEO",
    persona: "The “Too Busy for Lunch” CEO",
    personaNote: "Decisions, calls and an untouched meal",
    title: "Lunch got outnumbered",
    copy: "The meal arrived on time. Everything competing for his attention did too.",
    note: "attention × overload",

    steps: [{
        title: "The calendar closes in",
        detail: "Back-to-back calls swallow the morning.",
        icons: [Clock3]
    }, {
        title: "Lunch reaches the desk",
        detail: "A meal lands beside the laptop.",
        icons: [UtensilsCrossed]
    }, {
        title: "One more conference",
        detail: "A quick decision pulls everyone into another call.",
        icons: [Presentation, UsersRound]
    }, {
        title: "Work wins the foreground",
        detail: "The inbox climbs; lunch goes cold and unnoticed.",
        icons: [Mail, Files]
    }]
}, {
    time: "21:36 / home",
    scene: "evening" as FieldScene,
    selectorLabel: "Analyst",
    persona: "The 15-Hour Hot-Shot Analyst",
    personaNote: "Home hungry / too depleted to make dinner",
    title: "Hunger met an empty battery",
    copy: "He made it home ready to eat. The workday had spent the energy needed to make dinner.",
    note: "hunger × fatigue",

    steps: [{
        title: "Fifteen hours later",
        detail: "The final spreadsheet is finally closed.",
        icons: [Files, Clock3]
    }, {
        title: "He reaches home hungry",
        detail: "Hunger arrives before he has even put his bag down.",
        icons: [House, UtensilsCrossed]
    }, {
        title: "The kitchen asks again",
        detail: "Dinner still needs choices, chopping and time.",
        icons: [CookingPot]
    }, {
        title: "His battery is empty",
        detail: "Exhaustion makes even eating feel like work.",
        icons: [BatteryLow]
    }]
}];

const bioNutritionProcess = [{
    label: "Understand",
    icon: NotebookPen
}, {
    label: "Maximize Benefit and Taste",
    icon: FlaskConical
}, {
    label: "Observe",
    icon: Activity
}, {
    label: "Adapt",
    icon: RefreshCcw
}];

const helpAreas = [{
    title: "Your biology",
    copy: "What your body is telling us.",
    icon: Activity,
    loopStep: 1
}, {
    title: "Your goals",
    copy: "What you actually want to change.",
    icon: Target,
    loopStep: 1
}, {
    title: "Your food",
    copy: "What you eat, how much, how often — what you enjoy and what you don’t.",
    icon: Salad,
    loopStep: 2
}, {
    title: "Your preferences",
    copy: "Taste, satiety, habits, culture, convenience, affordability.",
    icon: Heart,
    loopStep: 2
}, {
    title: "Your response",
    copy: "What changes when we change something.",
    icon: RefreshCcw,
    loopStep: 3
}, {
    title: "Your life",
    copy: "Work, routines, time, travel, family, social life.",
    icon: CalendarDays,
    loopStep: 4
}];

function Brand() {
    return (
        <a
            href="#top"
            className="relative block h-14 w-[200px] shrink-0 overflow-hidden sm:w-[230px]"
            aria-label="The Food Lab home">
            <img
                src={foodLabBrandLogo}
                alt="The Food Lab — Invisible diets. Visible results."
                className="absolute left-1/2 top-1/2 w-[210px] max-w-none -translate-x-1/2 -translate-y-1/2 object-contain sm:w-[240px] mix-blend-multiply" />
        </a>
    );
}

function Header() {
    const [open, setOpen] = useState(false);

    return (
        <header
            className="fixed inset-x-0 top-0 z-50 border-b border-ink/15 bg-[#eee7d8]/95 backdrop-blur-sm">
            <div
                className="mx-auto flex h-[74px] max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:px-12">
                <Brand />
                {}
                <span
                    className="hidden font-mono text-[11px] uppercase tracking-[0.18em] text-ink/30 lg:block">
                </span>
                <nav
                    className="hidden items-center gap-8 lg:flex xl:gap-12 mx-[0px]"
                    aria-label="Primary navigation">
                    {navigation.map(item => (<a
                        key={item.href}
                        href={item.href}
                        className="text-sm text-ink/65 transition-colors hover:text-primary xl:text-base mx-[44px]">
                        {item.label}
                    </a>))}
                </nav>
                <a
                    href="#your-experiment"
                    className="hidden items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-xs text-[#f8f2e5] transition-transform hover:-translate-y-0.5 lg:flex">Bring us a question <ArrowRight className="h-4 w-4" />
                </a>
                <button
                    type="button"
                    onClick={() => setOpen(value => !value)}
                    className="grid h-11 w-11 place-items-center rounded-full border border-ink/25 text-ink lg:hidden"
                    aria-label={open ? "Close menu" : "Open menu"}
                    aria-expanded={open}>
                    {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
            </div>
            {open && (<nav
                className="absolute left-0 right-0 top-full border-t border-ink/15 bg-[#f5edde] px-5 py-4 shadow-[0_8px_18px_rgba(23,59,48,.08)] lg:hidden"
                aria-label="Mobile navigation">
                {navigation.map(item => (<a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between border-b border-ink/10 py-3 text-sm text-ink">
                    {item.label}<ArrowRight className="h-4 w-4 text-primary" />
                </a>))}
                <a
                    href="#your-experiment"
                    onClick={() => setOpen(false)}
                    className="mt-4 flex items-center justify-between rounded-full bg-ink px-5 py-3 text-sm text-[#f8f2e5]">Bring us a question <ArrowRight className="h-4 w-4" />
                </a>
            </nav>)}
        </header>
    );
}

function FieldStudies() {
    const [activeScene, setActiveScene] = useState<FieldScene>("morning");

    const activeStudy = fieldStudies.find((
        {
            scene
        }
    ) => scene === activeScene) ?? fieldStudies[0];

    return (
        <div className="field-studies">
            <div
                className="field-selector"
                role="tablist"
                aria-label="Choose a real-life story">
                {fieldStudies.map((
                    {
                        scene,
                        selectorLabel
                    },
                    index
                ) => {
                    const isActive = scene === activeScene;

                    return (
                        <button
                            key={scene}
                            type="button"
                            role="tab"
                            id={`field-tab-${scene}`}
                            aria-selected={isActive}
                            aria-controls="field-story-panel"
                            className={`field-selector-option ${isActive ? "is-active" : ""}`}
                            onClick={() => setActiveScene(scene)}>
                            <small>0{index + 1}</small>
                            <strong>{selectorLabel}</strong>
                        </button>
                    );
                })}
            </div>
            <article
                id="field-story-panel"
                key={activeStudy.scene}
                role="tabpanel"
                aria-labelledby={`field-tab-${activeStudy.scene}`}
                className={`field-frame field-frame-${activeStudy.scene}`}
                aria-live="polite">
                <header className="field-panel-heading">
                    <div className="field-panel-art" aria-hidden="true">
                        <FieldCharacter scene={activeStudy.scene} />
                    </div>
                    <div className="field-panel-copy">
                        <span className="field-time">{activeStudy.time}</span>
                        <h3>{activeStudy.title}</h3>
                        <p>{activeStudy.copy}</p>
                        <span className="field-note">{activeStudy.persona}· {activeStudy.note}</span>
                    </div>
                </header>
                <div
                    className="field-story"
                    role="list"
                    aria-label={`${activeStudy.title} visual sequence`}>
                    {activeStudy.steps.map((
                        {
                            title,
                            detail,
                            icons
                        },
                        stepIndex
                    ) => (<div
                        className="field-story-step"
                        role="listitem"
                        data-step={stepIndex + 1}
                        key={title}>
                        <span className="field-story-icons" aria-hidden="true">
                            {icons.map((StoryIcon, iconIndex) => <StoryIcon key={iconIndex} />)}
                        </span>
                        <span className="field-story-copy">
                            <small>Step 0{stepIndex + 1}</small>
                            <strong>{title}</strong>
                            <p>{detail}</p>
                        </span>
                    </div>))}
                </div>
            </article>
        </div>
    );
}

function ConsultationForm() {
    return (
        <div className="grid gap-5">
            <a
                href="mailto:harsha@thefoodlab.in?subject=Precise%20nutrition%20solutions"
                className="group rounded-[1.5rem] border border-[#f8f2e5]/25 bg-[#f8f2e5]/5 p-6 transition hover:-translate-y-1 hover:border-[#d68b7f] hover:bg-[#f8f2e5]/10">
                <span
                    className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#d68b7f]">Personal nutrition</span>
                <strong
                    className="mt-3 block max-w-lg font-serif text-3xl font-normal leading-tight text-[#f8f2e5] sm:text-4xl">Looking for precise solutions to your nutritional goals?</strong>
                <span
                    className="mt-5 inline-flex items-center gap-2 text-sm text-[#f8f2e5]/70 transition group-hover:text-[#f8f2e5]">Talk to The Food Lab <ArrowRight className="h-4 w-4" /></span>
            </a>
            <div
                className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[#f8f2e5]/40">
                <span className="h-px flex-1 bg-[#f8f2e5]/15" />Or
                                                                                                                                                                                                                                                <span className="h-px flex-1 bg-[#f8f2e5]/15" />
            </div>
            <a
                href="mailto:harsha@thefoodlab.in?subject=Protein%2011%20protein%20bar"
                className="group rounded-[1.5rem] border border-[#d68b7f]/45 bg-[#d68b7f]/10 p-6 transition hover:-translate-y-1 hover:border-[#d68b7f] hover:bg-[#d68b7f]/15">
                <span
                    className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#d68b7f]">Protein 11</span>
                <strong
                    className="mt-3 block max-w-lg font-serif text-3xl font-normal leading-tight text-[#f8f2e5] sm:text-4xl">Try Protein 11 now!</strong>
                <span
                    className="mt-5 inline-flex items-center gap-2 text-sm text-[#f8f2e5]/70 transition group-hover:text-[#f8f2e5]">Try Protein 11 now <ArrowRight className="h-4 w-4" /></span>
            </a>
        </div>
    );
}

function NbHeader(
    {
        label,
        page
    }: {
        label: string;
        page: string;
    }
) {
    return (
        <div className="nb-top-margin flex items-center gap-3 sm:gap-4">
            <span
                className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink/35 sm:text-[11px] sm:tracking-[0.18em]">
                {label}
            </span>
            <span className="h-px flex-1 border-t border-dashed border-ink/15" />
            <span className="font-mono text-[11px] text-ink/30 sm:text-[11px]">{page}</span>
        </div>
    );
}

const experimentOptions = [
    ["egg", "Egg"],
    ["rice", "Rice"],
    ["gluten", "Gluten"],
    ["protein", "Protein (fiber?)"]
] as const;

const lensEssence: Record<"egg" | "rice" | "gluten" | "protein", string> = {
    egg: "Cooking changes everything. 51% vs 91% protein digested.",
    rice: "Reheating cool rice turns fast carbs into resistant fibre.",
    gluten: "Perception vs reality. The regional gluten paradox.",
    protein: "Protein needs fibre. 70% of people miss the mark."
};

const Index = () => {
    const [activeExperiment, setActiveExperiment] = useState<"egg" | "rice" | "gluten" | "protein">("egg");
    const [activeMethodStep, setActiveMethodStep] = useState(0);
    useSectionReveal();

    return (
        <div id="top" className="min-h-screen overflow-hidden bg-paper text-ink">
            <Header />
            <main className="pt-[74px]">
                <section id="question" className="px-4 pb-4 pt-6 sm:px-6 lg:px-8 lg:pt-8">
                    <div
                        className="paper-sheet nb-ruled mx-auto max-w-[1400px] px-5 py-10 sm:px-10 sm:py-14 lg:px-20 lg:py-20">
                        <div className="nb-top-margin mb-8 flex items-center justify-between gap-4">
                            <span className="lab-label">Observation 002</span>
                        </div>
                        <div
                            className="hero-hypothesis-grid grid min-w-0 items-stretch gap-8 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] lg:gap-10">
                            <div
                                className="hero-question-copy relative z-10 flex min-w-0 flex-col justify-center">
                                <h1
                                    className="max-w-[700px] font-serif text-[clamp(2.6rem,5.2vw,5.8rem)] font-normal leading-[0.9] tracking-[-0.05em] text-ink">Could <span className="red-underline">interactions</span>{" "}<span className="red-underline">matter</span>{" "}<span className="red-underline">more</span>{" "}than ingredients?</h1>
                                <p
                                    className="mt-6 max-w-lg font-serif text-[clamp(1.05rem,1.65vw,1.5rem)] leading-snug text-ink/75">Most of us keep changing the list. We study what happens around it.</p>
                                {}
                                <p
                                    className="handwritten mt-5 max-w-xs rotate-[-0.5deg] text-sm text-primary/70">
                                </p>
                            </div>
                            <HypothesisExperiment />
                        </div>
                        <aside
                            className="press-note mx-auto mt-10 w-full max-w-4xl rotate-[-1deg] px-5 py-4 text-center sm:px-8">
                            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink/50">Working note / not a verdict</span>
                            <p
                                className="handwritten mt-2 text-[clamp(.95rem,2vw,1.3rem)] leading-tight text-primary lg:whitespace-nowrap">The ultimate secret ingredient to diet consistency isn’t a macro. It’s safeguarding the sheer joy of eating.</p>
                        </aside>
                    </div>
                </section>
                <section id="demonstration" className="px-4 sm:px-6 lg:px-8">
                    <div
                        className="paper-sheet nb-ruled mx-auto max-w-[1400px] px-5 py-10 sm:px-10 lg:px-16 lg:py-14">
                        <NbHeader label="Experiment log" page="Pg. 003" />
                        <div className="max-w-4xl">
                            <h2
                                key={activeExperiment}
                                className="mt-5 font-serif text-[clamp(1.75rem,4.2vw,3.6rem)] font-normal leading-[1.05] tracking-[-0.03em] animate-in fade-in slide-in-from-bottom-2 duration-300">
                                {lensEssence[activeExperiment]}
                            </h2>
                        </div>
                        <div
                            className="lens-coverflow mt-8"
                            role="region"
                            aria-label="Interactive 4-lens coverflow carousel">
                            {/* Navigation controls */}
                            <div className="lens-coverflow__controls">
                                <button
                                    type="button"
                                    onClick={() => {
                                        const currentIndex = experimentOptions.findIndex(([k]) => k === activeExperiment);
                                        const prevIndex = (currentIndex - 1 + experimentOptions.length) % experimentOptions.length;
                                        setActiveExperiment(experimentOptions[prevIndex][0]);
                                    }}
                                    className="lens-coverflow__nav-btn"
                                    aria-label="Previous experiment">
                                    ← Prev
                                </button>
                                <div className="lens-coverflow__pills" role="tablist" aria-label="Experiment switcher">
                                    {experimentOptions.map(([key, label], index) => (
                                        <button
                                            key={key}
                                            type="button"
                                            role="tab"
                                            aria-selected={activeExperiment === key}
                                            onClick={() => setActiveExperiment(key)}
                                            className={`lens-coverflow__pill ${activeExperiment === key ? "is-active" : ""}`}>
                                            0{index + 1} {label}
                                        </button>
                                    ))}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        const currentIndex = experimentOptions.findIndex(([k]) => k === activeExperiment);
                                        const nextIndex = (currentIndex + 1) % experimentOptions.length;
                                        setActiveExperiment(experimentOptions[nextIndex][0]);
                                    }}
                                    className="lens-coverflow__nav-btn"
                                    aria-label="Next experiment">
                                    Next →
                                </button>
                            </div>

                            {/* 3D Coverflow stage holding all 4 full lens pages */}
                            <div className="lens-coverflow__stage">
                                {experimentOptions.map(([key, label], index) => {
                                    const isActive = activeExperiment === key;
                                    const activeIndex = experimentOptions.findIndex(([k]) => k === activeExperiment);
                                    const offset = (index - activeIndex + experimentOptions.length) % experimentOptions.length;
                                    const position = offset > experimentOptions.length / 2 ? offset - experimentOptions.length : offset;
                                    const positionClass =
                                        position === -1
                                            ? "lens-coverflow__item--pos-prev"
                                            : position === 0
                                            ? "lens-coverflow__item--pos-active"
                                            : position === 1
                                            ? "lens-coverflow__item--pos-next"
                                            : "lens-coverflow__item--pos-far";

                                    return (
                                        <div
                                            key={key}
                                            className={`lens-coverflow__item ${positionClass} ${isActive ? "is-active" : ""}`}
                                            onClick={() => {
                                                if (!isActive) setActiveExperiment(key);
                                            }}
                                            tabIndex={isActive ? 0 : -1}
                                            role="tabpanel"
                                            id={`experiment-panel-${key}`}
                                            aria-hidden={!isActive}>
                                            <div className="lens-coverflow__item-content">
                                                {key === "egg" && <EggExperiment />}
                                                {key === "rice" && <RiceExperiment />}
                                                {key === "gluten" && (
                                                    <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                                                        <RegionScene region="us" />
                                                        <div>
                                                            <RegionScene region="india" />
                                                            <div className="mt-8 border-t border-dashed border-ink/25 pt-5">
                                                                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/50">India / survey signal</span>
                                                                <p className="mt-3 max-w-xl font-serif text-xl leading-snug text-ink/75">Among 285 people surveyed:</p>
                                                                <ul className="mt-4 grid gap-3 text-sm leading-relaxed text-ink/70 sm:grid-cols-2">
                                                                    <li><strong className="font-mono text-ink">50.9%</strong> correctly identified what gluten is.</li>
                                                                    <li><strong className="font-mono text-ink">38.6%</strong> correctly identified what a gluten-free diet means.</li>
                                                                    <li><strong className="font-mono text-ink">45.3%</strong> correctly identified the medical conditions for which a GFD is recommended.</li>
                                                                    <li><strong className="font-mono text-ink">29.1%</strong> thought gluten-free foods were healthier than gluten-containing foods.</li>
                                                                    <li><strong className="font-mono text-ink">38.9%</strong> believed gluten-free diets help with weight loss.</li>
                                                                    <li><strong className="font-mono text-ink">49.5%</strong> perceived social influences as major drivers of GFD adoption.</li>
                                                                </ul>
                                                                <p className="mt-5 font-mono text-[10px] uppercase leading-relaxed tracking-[0.1em] text-ink/45">
                                                                    Source:{" "}
                                                                    <a
                                                                        className="underline decoration-ink/25 underline-offset-2 hover:text-primary"
                                                                        href="https://www.researchsquare.com/article/rs-9052215/v1"
                                                                        target="_blank"
                                                                        rel="noreferrer">
                                                                        Moitra &amp; Qureshi, Research Square preprint, 2026
                                                                    </a>
                                                                    .
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                                {key === "protein" && <ProteinExperiment />}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>
                <section id="real-life" className="px-4 sm:px-6 lg:px-8">
                    <div
                        className="mx-auto max-w-[1400px] bg-charcoal px-5 py-14 text-[#f8f2e5] sm:px-10 lg:px-20 lg:py-24">
                        <div className="nb-dark-ruled-top" />
                        <div className="mb-10 sm:mb-12">
                            <span className="lab-label !text-[#f8f2e5]/55">Field sheet 003 / real life</span>
                            <h2
                                className="mt-5 font-serif text-3xl font-normal leading-[0.94] tracking-[-0.04em] sm:text-4xl lg:whitespace-nowrap lg:text-[clamp(2.4rem,4.05vw,3.5rem)]">When diets and discipline say "tomorrow!"</h2>
                            <p
                                className="mt-5 max-w-lg text-base leading-relaxed text-[#f8f2e5]/65 sm:text-lg [color:#f5f0e3]">Which one resonates with you? </p>
                        </div>
                        <FieldStudies />
                        <aside className="press-note mt-10 max-w-lg rotate-[1deg] p-5 text-ink">
                            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink/50">Margin note</span>
                            <p
                                className="handwritten mt-2 text-lg leading-tight text-primary sm:text-xl">Maybe consistency is designed along with a life, not imposed on one.</p>
                        </aside>
                    </div>
                </section>
                <section
                    id="how-we-help"
                    className="scroll-mt-24 px-4 sm:px-6 lg:px-8"
                    aria-labelledby="help-heading">
                    <div
                        className="paper-sheet nb-ruled mx-auto max-w-[1400px] px-5 py-14 sm:px-10 lg:px-20 lg:py-24">
                        <NbHeader label="Method / approach" page="Pg. 005" />
                        <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-12">
                            <div>
                                <h2
                                    id="help-heading"
                                    className="mt-5 max-w-none whitespace-nowrap font-serif text-[clamp(1.35rem,4.2vw,4rem)] font-normal leading-[0.94] tracking-[-0.04em]">1. Precision Bio-Nutrition</h2>
                                <blockquote
                                    className="mt-6 max-w-2xl border-l-4 border-primary pl-5 font-serif text-xl leading-snug text-ink/80 sm:text-2xl lg:text-3xl">The right nutritional solution isn’t the one that looks best on paper.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            <span className="mt-3 block text-ink">It’s the one that works in your life.</span>
                                </blockquote>
                                {}
                                <p className="handwritten mt-4 rotate-[0.5deg] text-sm text-primary/70">↑ this is the only hypothesis that matters
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                </p>
                                <a
                                    href="#your-experiment"
                                    className="method-cta mt-7 inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3.5 text-sm text-[#f8f2e5] transition-transform hover:-translate-y-0.5">First 30 min free consult — Get in touch <ArrowRight className="h-4 w-4" />
                                </a>
                            </div>
                            <div className="method-coverflow" aria-label="Working loop stages">
                                <div className="method-coverflow__track" role="tablist" aria-label="Choose a working-loop stage">
                                    {bioNutritionProcess.map(({ label, icon: StageIcon }, index) => {
                                        const offset = (index - activeMethodStep + bioNutritionProcess.length) % bioNutritionProcess.length;
                                        const position = offset > bioNutritionProcess.length / 2 ? offset - bioNutritionProcess.length : offset;
                                        const positionClass = position === -1 ? "is-previous" : position === 0 ? "is-active" : position === 1 ? "is-next" : "is-far";

                                        return (<button
                                            key={label}
                                            type="button"
                                            role="tab"
                                            aria-selected={index === activeMethodStep}
                                            aria-controls="method-coverflow-panel"
                                            onClick={() => setActiveMethodStep(index)}
                                            onKeyDown={event => {
                                                if (event.key === "ArrowRight") {
                                                    event.preventDefault();
                                                    setActiveMethodStep((activeMethodStep + 1) % bioNutritionProcess.length);
                                                }
                                                if (event.key === "ArrowLeft") {
                                                    event.preventDefault();
                                                    setActiveMethodStep((activeMethodStep - 1 + bioNutritionProcess.length) % bioNutritionProcess.length);
                                                }
                                            }}
                                            className={`method-coverflow__card method-coverflow__card--step-${index + 1} ${positionClass}`}>
                                            <span className="method-coverflow__index">STEP 0{index + 1}</span>
                                            <StageIcon aria-hidden="true" />
                                            <strong>{label}</strong>
                                            <span className="method-coverflow__hint">{position === 0 ? "SELECTED" : "VIEW STEP"}</span>
                                        </button>);
                                    })}
                                </div>
                                {(() => {
                                    const activeStage = bioNutritionProcess[activeMethodStep];
                                    const signals = helpAreas.filter(signal => signal.loopStep === activeMethodStep + 1);
                                    return (<div className={`method-coverflow__panel method-coverflow__panel--step-${activeMethodStep + 1}`} id="method-coverflow-panel" role="tabpanel" aria-label={`Signals for ${activeStage.label}`}>
                                        <div className="method-coverflow__panel-heading">
                                            <span>STEP 0{activeMethodStep + 1} / {activeStage.label}</span>
                                            <span>{signals.length} RELATED SIGNAL{signals.length === 1 ? "" : "S"}</span>
                                        </div>
                                        <div className={`method-coverflow__signals ${signals.length === 1 ? "is-single" : ""}`}>
                                            {signals.map(({ title, copy, icon: SignalIcon }, index) => (<article className="method-coverflow__signal" key={title}>
                                                <SignalIcon aria-hidden="true" />
                                                <div>
                                                    <strong>{title}</strong>
                                                    <p>{copy}</p>
                                                </div>
                                                <small>0{helpAreas.indexOf(signals[0]) + index + 1}</small>
                                            </article>))}
                                        </div>
                                    </div>);
                                })()}
                            </div>
                        </div>
                        <p
                            className="handwritten mt-10 border-t border-dashed border-ink/25 pt-7 text-center text-xl text-primary sm:text-2xl">What if… diets could be delicious?</p>
                    </div>
                </section>
                <section id="fit-peasant" className="px-4 sm:px-6 lg:px-8">
                    <div
                        className="mx-auto max-w-[1200px] border-x border-ink/15 bg-[#dfd4be] px-4 py-12 sm:px-8 lg:px-16 lg:py-20">
                        <div className="grid gap-8 lg:grid-cols-[1fr_.8fr] lg:items-center">
                            <figure className="evidence-photo rotate-[-1deg]">
                                <span className="tape tape-left" />
                                <img
                                    src={maestroAssets.alchemyBar}
                                    alt="Protein 11 bar cut open to reveal its whole-food texture"
                                    className="min-h-[280px] w-full object-cover sm:min-h-[380px]" />
                                <figcaption>Protein 11 / first practical experiment</figcaption>
                            </figure>
                            <div>
                                <span className="lab-label">An experiment that became food</span>
                                <h2
                                    className="mt-4 max-w-xl font-serif font-normal tracking-[-0.04em] text-ink">
                                    <span
                                        className="block text-lg font-normal leading-snug tracking-normal sm:text-xl">Introducing</span>
                                    <em
                                        className="mt-1 block text-5xl font-normal leading-[0.94] sm:text-6xl lg:text-7xl">Protein 11</em>
                                    <span
                                        className="mt-3 block max-w-md text-lg font-normal leading-snug tracking-normal sm:text-xl">— because protein was never meant to work alone.</span>
                                </h2>
                                <p
                                    className="mt-5 max-w-lg font-serif text-xl italic leading-relaxed text-ink/70">We’ll let you tell us how good it is.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    </p>
                                <div className="mt-6 flex flex-wrap items-center gap-3">
                                    <a
                                        href="mailto:harsha@thefoodlab.in?subject=Protein%2011%20experiment"
                                        className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm text-[#f8f2e5] transition-transform hover:-translate-y-0.5">Ask about Protein 11 <ArrowRight className="h-4 w-4" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <AlchemyPartnerships />
                    </div>
                </section>
                <section
                    id="your-experiment"
                    className="px-4 pb-4 sm:px-6 sm:pb-6 lg:px-8 lg:pb-8">
                    <div
                        className="mx-auto max-w-[1400px] bg-charcoal px-5 py-14 text-[#f8f2e5] sm:px-10 lg:px-20 lg:py-24">
                        <div className="nb-dark-ruled-top" />
                        <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
                            <div>
                                <span className="lab-label !text-[#f8f2e5]/55">Your experiment</span>
                                <h2
                                    className="mt-6 max-w-2xl font-serif text-5xl font-normal leading-[0.94] tracking-[-0.04em] sm:text-6xl lg:text-7xl">Bring us the part that never quite works.</h2>
                                <p className="mt-7 max-w-lg text-lg leading-relaxed text-[#f8f2e5]/65">Tell us what you have tried and where real life keeps entering the picture. We begin with questions, not a perfect plan.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            </p>
                                <div className="mt-10 flex items-center gap-4 text-[#d68b7f]">
                                    <FlaskConical className="h-8 w-8 stroke-[1.2]" />
                                    <span className="handwritten max-w-xs text-xl leading-tight">No judgement. No gold stars for an ideal food diary.</span>
                                </div>
                            </div>
                            <ConsultationForm />
                        </div>
                    </div>
                </section>
            </main>
            <footer className="border-t border-ink/15 bg-[#e4dac5] px-5 py-12 sm:px-8">
                <div
                    className="mx-auto grid max-w-[1320px] gap-8 sm:grid-cols-[auto_1fr_auto] sm:items-center">
                    <Brand />
                    <p className="font-serif text-xl italic text-ink/75 sm:text-center">We observe. We question. Then we build.</p>
                    <div
                        className="font-mono text-[11px] uppercase leading-loose tracking-[0.12em] text-ink/50 sm:text-right">Bengaluru<br />harsha@thefoodlab.in</div>
                </div>
            </footer>
        </div>
    );
};

export default Index;