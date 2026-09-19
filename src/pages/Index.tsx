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

import { AlchemyPartnerships } from "@/components/food-lab/AlchemyPartnerships";
import { EggExperiment } from "@/components/food-lab/EggExperiment";
import { FieldCharacter, type FieldScene } from "@/components/food-lab/FieldCharacter";
import { HypothesisExperiment } from "@/components/food-lab/HypothesisExperiment";
import { InteractionMap } from "@/components/food-lab/InteractionMap";
import { RiceExperiment } from "@/components/food-lab/RiceExperiment";
import foodLabBrandLogo from "@/assets/the-food-lab-brand-logo.png";
import { maestroAssets } from "@/lib/maestro-assets";

const navigation = [{
    label: "The question",
    href: "#question"
}, {
    label: "The working hypothesis",
    href: "#working-hypothesis"
}, {
    label: "A demonstration",
    href: "#demonstration"
}, {
    label: "Real life",
    href: "#real-life"
}, {
    label: "Get Precision Bio-nutrition",
    href: "#how-we-help"
}, {
    label: "The Fit Peasant",
    href: "#fit-peasant"
}];

const fieldStudies = [{
    time: "07:42 / weekday",
    scene: "morning" as FieldScene,
    storyLabel: "Weekday",
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
    storyLabel: "Lunch",
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
    storyLabel: "Home",
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

const notes = [{
    id: "019",
    title: "Healthy.",
    copy: "Why does healthy often equal boring?",
    status: "question kept open"
}, {
    id: "031",
    title: "Food behaves.",
    copy: "…differently in real life than it does on paper",
    status: "observation"
}, {
    id: "036",
    title: "Protein.",
    copy: "The most important ingredient in a meal might not be an ingredient",
    status: "still testing"
}, {
    id: "041",
    title: "Enjoyment.",
    copy: "Rice isn’t your enemy – you just need to talk it out",
    status: "unresolved"
}];

const bioNutritionProcess = [{
    label: "Understand",
    note: "Your body, goals and real life",
    icon: NotebookPen
}, {
    label: "Maximize Benefit and Taste",
    note: "Build the most useful, enjoyable option",
    icon: FlaskConical
}, {
    label: "Observe",
    note: "Notice what actually changes",
    icon: Activity
}, {
    label: "Adapt",
    note: "Keep what works; revise what doesn’t",
    icon: RefreshCcw
}];

const helpAreas = [{
    title: "Your biology",
    copy: "What your body is telling us.",
    icon: Activity
}, {
    title: "Your goals",
    copy: "What you actually want to change.",
    icon: Target
}, {
    title: "Your food",
    copy: "What you eat, how much, how often — what you enjoy and what you don’t.",
    icon: Salad
}, {
    title: "Your life",
    copy: "Work, routines, time, travel, family, social life.",
    icon: CalendarDays
}, {
    title: "Your preferences",
    copy: "Taste, satiety, habits, culture, convenience, affordability.",
    icon: Heart
}, {
    title: "Your response",
    copy: "What changes when we change something.",
    icon: RefreshCcw
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
                className="absolute left-1/2 top-1/2 w-[210px] max-w-none -translate-x-1/2 -translate-y-1/2 object-contain mix-blend-darken sm:w-[240px]" />
        </a>
    );
}

function Header() {
    const [open, setOpen] = useState(false);

    return (
        <header
            className="fixed inset-x-0 top-0 z-50 border-b border-ink/15 bg-[#eee7d8]/95 backdrop-blur-sm">
            {/* Ruled-line accent at top of header */}
            <div className="h-[2px] w-full bg-[repeating-linear-gradient(90deg,rgba(163,58,43,0.22)_0px,rgba(163,58,43,0.22)_1px,transparent_1px,transparent_40px)]" />
            <div
                className="mx-auto flex h-[74px] max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:px-12">
                <Brand />
                {/* Page number stamp */}
                <span className="hidden font-mono text-[8px] uppercase tracking-[0.18em] text-ink/30 lg:block">
                    Vol. I / Field Notes
                </span>
                <nav
                    className="hidden items-center gap-4 xl:flex"
                    aria-label="Primary navigation">
                    {navigation.map(item => (<a
                        key={item.href}
                        href={item.href}
                        className="text-xs text-ink/65 transition-colors hover:text-primary">
                        {item.label}
                    </a>))}
                </nav>
                <a
                    href="#your-experiment"
                    className="hidden items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-xs text-[#f8f2e5] transition-transform hover:-translate-y-0.5 xl:flex">Bring us a question <ArrowRight className="h-4 w-4" />
                </a>
                <button
                    type="button"
                    onClick={() => setOpen(value => !value)}
                    className="grid h-11 w-11 place-items-center rounded-full border border-ink/25 text-ink xl:hidden"
                    aria-label={open ? "Close menu" : "Open menu"}
                    aria-expanded={open}>
                    {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
            </div>
            {open && (<nav
                className="absolute left-0 right-0 top-full border-t border-ink/15 bg-[#f5edde] px-5 py-4 shadow-[0_8px_18px_rgba(23,59,48,.08)] xl:hidden"
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
            <div className="field-personas" aria-label="Choose a real-life story">
                {fieldStudies.map((
                    {
                        scene,
                        storyLabel,
                        persona,
                        personaNote
                    },
                    index
                ) => {
                    const isActive = scene === activeScene;

                    return (
                        <button
                            key={scene}
                            type="button"
                            className={`field-persona field-persona-${scene}`}
                            aria-pressed={isActive}
                            onClick={() => setActiveScene(scene)}>
                            <span className="field-persona-art">
                                <FieldCharacter scene={scene} />
                            </span>
                            <span className="field-persona-copy">
                                <small>Subject 0{index + 1}</small>
                                <strong>{persona}</strong>
                                <span>{personaNote}</span>
                            </span>
                            <span className="field-persona-action">
                                {isActive ? `${storyLabel} loaded` : `Load ${storyLabel}`}
                                <ArrowRight aria-hidden="true" />
                            </span>
                        </button>
                    );
                })}
            </div>
            <article
                key={activeStudy.scene}
                className={`field-frame field-frame-${activeStudy.scene}`}
                aria-live="polite">
                <header className="field-panel-heading">
                    <span className="field-time">{activeStudy.time}</span>
                    <h3>{activeStudy.title}</h3>
                    <p>{activeStudy.copy}</p>
                    <span className="field-note">{activeStudy.note}</span>
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
                    className="font-mono text-[8px] uppercase tracking-[0.16em] text-[#d68b7f]">Personal nutrition</span>
                <strong
                    className="mt-3 block max-w-lg font-serif text-3xl font-normal leading-tight text-[#f8f2e5] sm:text-4xl">Looking for precise solutions to your nutritional goals?</strong>
                <span
                    className="mt-5 inline-flex items-center gap-2 text-sm text-[#f8f2e5]/70 transition group-hover:text-[#f8f2e5]">Talk to The Food Lab <ArrowRight className="h-4 w-4" /></span>
            </a>
            <div
                className="flex items-center gap-3 font-mono text-[8px] uppercase tracking-[0.18em] text-[#f8f2e5]/40">
                <span className="h-px flex-1 bg-[#f8f2e5]/15" />Or
                                                <span className="h-px flex-1 bg-[#f8f2e5]/15" />
            </div>
            <a
                href="mailto:harsha@thefoodlab.in?subject=The%20Fit%20Peasant%20protein%20bar"
                className="group rounded-[1.5rem] border border-[#d68b7f]/45 bg-[#d68b7f]/10 p-6 transition hover:-translate-y-1 hover:border-[#d68b7f] hover:bg-[#d68b7f]/15">
                <span
                    className="font-mono text-[8px] uppercase tracking-[0.16em] text-[#d68b7f]">The Fit Peasant</span>
                <strong
                    className="mt-3 block max-w-lg font-serif text-3xl font-normal leading-tight text-[#f8f2e5] sm:text-4xl">Want to try out our awesome protein bar?</strong>
                <span
                    className="mt-5 inline-flex items-center gap-2 text-sm text-[#f8f2e5]/70 transition group-hover:text-[#f8f2e5]">Ask about the bar <ArrowRight className="h-4 w-4" /></span>
            </a>
        </div>
    );
}

/* ─── Notebook margin strip used in several sections ─── */
function MarginRule({ label, className = "" }: { label: string; className?: string }) {
    return (
        <div className={`notebook-margin-strip ${className}`}>
            <span className="margin-label">{label}</span>
        </div>
    );
}

const Index = () => {
    return (
        <div id="top" className="min-h-screen overflow-hidden bg-paper text-ink">
            <Header />
            <main className="pt-[74px]">
                <section id="question" className="px-4 pb-4 pt-6 sm:px-6 lg:px-8 lg:pt-8">
                    <div
                        className="paper-sheet nb-ruled mx-auto max-w-[1400px] px-6 py-12 sm:px-12 sm:py-16 lg:px-20 lg:py-20">
                        {/* Ruled-page top margin annotation */}
                        <div className="nb-top-margin mb-8 flex items-center gap-4">
                            <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-ink/35">The Food Lab / Notebook</span>
                            <span className="h-px flex-1 border-t border-dashed border-ink/15" />
                            <span className="font-mono text-[8px] text-ink/30">Pg. 002</span>
                        </div>
                        <div
                            className="grid min-w-0 items-center gap-10 xl:grid-cols-[minmax(0,.92fr)_minmax(0,1.08fr)] xl:gap-14">
                            <div className="relative z-10 min-w-0 lg:pl-3">
                                <span className="lab-label">OBSERVATION 002</span>
                                <h1
                                    className="mt-7 max-w-[650px] font-serif text-[clamp(3rem,9vw,5.8rem)] font-normal leading-[0.88] tracking-[-0.055em] text-ink">Could <span className="red-underline">interactions</span> <span className="red-underline">matter</span> <span className="red-underline">more</span> than ingredients?</h1>
                                <p
                                    className="mt-10 max-w-lg font-serif text-xl leading-snug text-ink/75 sm:text-2xl">Most of us keep changing the list. We study what happens around it.</p>
                                {/* Margin annotation */}
                                <p className="mt-6 handwritten rotate-[-0.5deg] text-sm text-primary/70 max-w-xs">
                                    ← the real variable is rarely on the label
                                </p>
                            </div>
                            <InteractionMap />
                        </div>
                        <aside
                            className="press-note mx-auto mt-10 w-full max-w-4xl rotate-[-1deg] px-5 py-4 text-center sm:px-8">
                            <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-ink/50">Working note / not a verdict</span>
                            <p
                                className="handwritten mt-2 text-[clamp(.95rem,2vw,1.3rem)] leading-tight text-primary lg:whitespace-nowrap">The food does not arrive alone. The day and its demands come with it.</p>
                        </aside>
                    </div>
                </section>
                <section id="working-hypothesis" className="scroll-mt-24 px-4 sm:px-6 lg:px-8" aria-labelledby="map-heading">
                    <div
                        className="mx-auto max-w-[1400px] border-x border-b border-ink/15 bg-[#e4dac5] px-6 py-14 sm:px-12 lg:px-16 lg:py-20">
                        <div className="text-center">
                            <div className="nb-section-divider mb-3" />
                            <h2 id="map-heading" className="lab-label">The working hypothesis</h2>
                            <p
                                className="mx-auto mt-4 max-w-xl font-serif text-xl leading-snug text-ink/65">Don’t just read the formula. Put it to work.
                                                                                                                                                                                                                                              </p>
                            <div className="nb-section-divider mt-3" />
                        </div>
                        <HypothesisExperiment />
                    </div>
                </section>
                <section id="demonstration" className="px-4 sm:px-6 lg:px-8">
                    <div
                        className="paper-sheet nb-ruled mx-auto max-w-[1400px] px-6 py-12 sm:px-10 lg:px-10 lg:py-14">
                        <div className="nb-top-margin mb-8 flex items-center gap-4">
                            <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-ink/35">Experiment log</span>
                            <span className="h-px flex-1 border-t border-dashed border-ink/15" />
                            <span className="font-mono text-[8px] text-ink/30">Pg. 003</span>
                        </div>
                        <div className="experiment-spread grid gap-14 lg:grid-cols-2 lg:gap-0">
                            <div className="experiment-column lg:pr-8 xl:pr-10">
                                <div className="mb-7">
                                    <span className="lab-label">Observation 002A / change one condition</span>
                                    <h2
                                        className="mt-5 max-w-xl font-serif text-4xl font-normal leading-[0.94] tracking-[-0.04em] sm:text-5xl lg:text-[2.75rem] xl:text-[3.1rem]">Same food. Different <span className="red-underline">interaction.</span>
                                    </h2>
                                    <p
                                        className="handwritten mt-3 rotate-[-1deg] text-lg leading-tight text-primary">Try the preparation switch. Watch what changes.</p>
                                </div>
                                <EggExperiment />
                            </div>
                            <RiceExperiment />
                        </div>
                    </div>
                </section>
                <section id="real-life" className="px-4 sm:px-6 lg:px-8">
                    <div
                        className="mx-auto max-w-[1400px] bg-charcoal px-6 py-16 text-[#f8f2e5] sm:px-12 lg:px-20 lg:py-24">
                        <div className="mb-12">
                            <span className="lab-label !text-[#f8f2e5]/55">Field sheet 003 / real life</span>
                            <h2
                                className="mt-6 max-w-none font-serif text-4xl font-normal leading-[0.94] tracking-[-0.04em] sm:text-5xl lg:whitespace-nowrap lg:text-[clamp(2.65rem,4.05vw,3.5rem)]">When diets and discipline say "tomorrow!"</h2>
                            <p className="mt-6 max-w-lg text-lg leading-relaxed text-[#f8f2e5]/65">Because work, routine, family, stress, sleep and tolerance always get a vote</p>
                        </div>
                        <FieldStudies />
                        <aside className="press-note mt-10 max-w-lg rotate-[1deg] p-5 text-ink">
                            <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-ink/50">Margin note</span>
                            <p className="handwritten mt-2 text-xl leading-tight text-primary">Maybe consistency is designed along with a life, not imposed on one.</p>
                        </aside>
                    </div>
                </section>
                <section
                    id="how-we-help"
                    className="scroll-mt-24 px-4 sm:px-6 lg:px-8"
                    aria-labelledby="help-heading">
                    <div
                        className="paper-sheet nb-ruled mx-auto max-w-[1400px] px-6 py-16 sm:px-12 lg:px-20 lg:py-24">
                        <div className="nb-top-margin mb-8 flex items-center gap-4">
                            <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-ink/35">Method / approach</span>
                            <span className="h-px flex-1 border-t border-dashed border-ink/15" />
                            <span className="font-mono text-[8px] text-ink/30">Pg. 005</span>
                        </div>
                        <div
                            className="grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-20">
                            <div>
                                <span className="lab-label">The Food Lab approach</span>
                                <h2
                                    id="help-heading"
                                    className="mt-6 max-w-4xl font-serif text-5xl font-normal leading-[0.94] tracking-[-0.04em] sm:text-6xl lg:text-7xl">1. Precision Bio-Nutrition</h2>
                                <blockquote
                                    className="mt-7 max-w-2xl border-l-4 border-primary pl-5 font-serif text-2xl leading-snug text-ink/80 sm:text-3xl">The right nutritional solution isn’t the one that looks best on paper.
                                                                                                                                                                                                                                                            <span className="mt-3 block text-ink">It’s the one that works in your life.</span>
                                </blockquote>
                                {/* Handwritten margin gloss */}
                                <p className="handwritten mt-4 rotate-[0.5deg] text-sm text-primary/70">
                                    ↑ this is the only hypothesis that matters
                                </p>
                                <a
                                    href="#your-experiment"
                                    className="mt-8 inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3.5 text-sm text-[#f8f2e5] transition-transform hover:-translate-y-0.5">First 30min free consult — Get in touch <ArrowRight className="h-4 w-4" />
                                </a>
                            </div>
                            <div
                                className="relative overflow-hidden rounded-[2rem] border border-ink/20 bg-[#f8f2e5] p-6 text-ink shadow-[8px_10px_0_rgba(23,59,48,.12)] sm:p-9">
                                <div className="flex items-end justify-between gap-4">
                                    <div>
                                        <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink/55">Our working loop</span>
                                        <p className="mt-2 font-serif text-2xl leading-none text-ink">A plan that learns.</p>
                                    </div>
                                    <RefreshCcw className="h-8 w-8 stroke-[1.3] text-primary" aria-hidden="true" />
                                </div>
                                <div className="relative mt-8 grid gap-3 before:absolute before:bottom-5 before:left-1/2 before:top-5 before:w-px before:-translate-x-1/2 before:border-l before:border-dashed before:border-primary/35">
                                    {bioNutritionProcess.map(({ label, note, icon: StageIcon }, index) => {
                                        const alignLeft = index % 2 === 0;
                                        return (
                                            <div className={`relative z-10 flex w-full ${alignLeft ? "justify-start pr-7" : "justify-end pl-7"}`} key={label}>
                                                <div className={`flex w-[88%] items-center gap-3 rounded-[1.25rem] border border-ink/15 bg-[#e5dac3] p-3 shadow-[3px_4px_0_rgba(23,59,48,.08)] sm:w-[82%] ${alignLeft ? "text-left" : "flex-row-reverse text-right"}`}>
                                                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary text-[#f8f2e5]">
                                                        <StageIcon className="h-5 w-5 stroke-[1.6]" aria-hidden="true" />
                                                    </span>
                                                    <span className="min-w-0 flex-1">
                                                        <small className="font-mono text-[7px] uppercase tracking-[0.15em] text-ink/45">Step 0{index + 1}</small>
                                                        <strong className="mt-1 block break-words font-mono text-[10px] font-medium uppercase leading-snug tracking-[0.12em] text-ink sm:text-xs">{label}</strong>
                                                        <span className="mt-1 block text-[11px] leading-snug text-ink/55">{note}</span>
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="mt-16 border-t border-ink/15 pt-12 lg:mt-20 lg:pt-16">
                            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                                <div>
                                    <span className="lab-label">Six signals / one useful plan</span>
                                    <h3
                                        className="mt-5 font-serif text-4xl font-normal tracking-[-0.035em] sm:text-5xl">What we look at!</h3>
                                </div>
                                <p className="max-w-sm text-sm leading-relaxed text-ink/60">Not isolated data points. A connected picture of what your body, food and days are doing together.</p>
                            </div>
                            <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                {helpAreas.map((
                                    {
                                        title,
                                        copy,
                                        icon: Icon
                                    },
                                    index
                                ) => {
                                    const isInverted = index === 0 || index === 2 || index === 4;
                                    return (<article
                                        key={title}
                                        className={`rounded-[1.35rem] border p-5 shadow-[4px_5px_0_rgba(65,50,28,.05)] ${isInverted ? "border-charcoal bg-charcoal text-[#f8f2e5]" : "border-ink/15 bg-[#e7dcc5] text-ink"}`}>
                                        <div className="flex items-start justify-between gap-4">
                                            <Icon className={`h-8 w-8 stroke-[1.35] ${isInverted ? "text-[#d68b7f]" : "text-primary"}`} aria-hidden="true" />
                                            <span className={`font-mono text-[8px] uppercase tracking-[0.14em] ${isInverted ? "text-[#f8f2e5]/45" : "text-ink/40"}`}>Signal 0{index + 1}</span>
                                        </div>
                                        <h4
                                            className={`mt-6 font-mono text-[11px] font-medium uppercase tracking-[0.15em] ${isInverted ? "text-[#f8f2e5]" : "text-ink"}`}>{title}</h4>
                                        <p className={`mt-2 text-sm leading-relaxed ${isInverted ? "text-[#f8f2e5]/65" : "text-ink/65"}`}>{copy}</p>
                                    </article>);
                                })}
                            </div>
                        </div>
                        <p
                            className="handwritten mt-12 border-t border-dashed border-ink/25 pt-8 text-center text-xl text-primary sm:text-2xl">What if......DIETS could be DELICIOUS?</p>
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
                                    alt="The Fit Peasant protein bar cut open to reveal its whole-food texture"
                                    className="min-h-[280px] w-full object-cover sm:min-h-[380px]" />
                                <figcaption>The Fit Peasant / first practical experiment</figcaption>
                            </figure>
                            <div>
                                <span className="lab-label">An experiment that became food</span>
                                <h2
                                    className="mt-4 max-w-xl font-serif font-normal tracking-[-0.04em] text-ink">
                                    <span
                                        className="block text-lg font-normal leading-snug tracking-normal sm:text-xl">Introducing</span>
                                    <em
                                        className="mt-1 block text-5xl font-normal leading-[0.94] sm:text-6xl lg:text-7xl">The Fit Peasant</em>
                                    <span
                                        className="mt-3 block max-w-md text-lg font-normal leading-snug tracking-normal sm:text-xl">— because protein was never meant to work alone.</span>
                                </h2>
                                <p
                                    className="mt-5 max-w-lg font-serif text-xl italic leading-relaxed text-ink/68">..we will let you tell us just how tasty it is!
                                                                    </p>
                                <div className="mt-6 flex flex-wrap items-center gap-3">
                                    <a
                                        href="mailto:harsha@thefoodlab.in?subject=The%20Fit%20Peasant%20experiment"
                                        className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm text-[#f8f2e5] transition-transform hover:-translate-y-0.5">Ask about The Fit Peasant <ArrowRight className="h-4 w-4" />
                                    </a>
                                    <span className="font-mono text-[9px] uppercase tracking-[0.13em] text-ink/50">Precision interactions. One enjoyable result.</span>
                                </div>
                            </div>
                        </div>
                        <AlchemyPartnerships />
                    </div>
                </section>
                <section className="px-4 sm:px-6 lg:px-8" aria-labelledby="notes-heading">
                    <div
                        paper-sheet nb-ruled mx-auto max-w-[1400px] px-6 py-16 sm:px-12 lg:px-20 lg:py-24">
                        <div className="nb-top-margin mb-8 flex items-center gap-4">
                            <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-ink/35">Lab notebook / ongoing</span>
                            <span className="h-px flex-1 border-t border-dashed border-ink/15" />
                            <span className="font-mono text-[8px] text-ink/30">Pg. 007</span>
                        </div>
                        <div
                            className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                            <div>
                                <span className="lab-label">Lab notes / work in progress</span>
                                <h2
                                    id="notes-heading"
                                    className="mt-6 font-serif text-5xl font-normal leading-none tracking-[-0.04em] sm:text-6xl">Sharp observations. No sermons.</h2>
                            </div>
                            <NotebookPen className="h-12 w-12 stroke-[1] text-primary" />
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {notes.map((note, index) => (<article
                                key={note.id}
                                className={`note-card rounded-[1.25rem] p-6 ${index % 2 ? "rotate-[0.5deg]" : "rotate-[-0.5deg]"}`}>
                                <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-ink/45">Note {note.id}</span>
                                <h3 className="mt-5 text-3xl font-normal">{note.title}</h3>
                                <p className="mt-3 leading-relaxed text-ink/65">{note.copy}</p>
                                <span className="handwritten absolute bottom-5 left-6 text-primary">{note.status}→</span>
                            </article>))}
                        </div>
                    </div>
                </section>
                <section
                    id="your-experiment"
                    className="px-4 pb-4 sm:px-6 sm:pb-6 lg:px-8 lg:pb-8">
                    <div
                        className="mx-auto max-w-[1400px] bg-charcoal px-6 py-16 text-[#f8f2e5] sm:px-12 lg:px-20 lg:py-24">
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
                        className="font-mono text-[9px] uppercase leading-loose tracking-[0.12em] text-ink/50 sm:text-right">Bengaluru<br />harsha@thefoodlab.in</div>
                </div>
            </footer>
        </div>
    );
};

export default Index;