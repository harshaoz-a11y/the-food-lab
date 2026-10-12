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
/* Navigation controls */
/* 3D Coverflow stage holding all 4 full lens pages */
// Geometry shared with .method-flow in globals.css (px).
// Elbow from the hovered stage's centre to the tree's vertical centre.
import { useState } from "react";

import {
    ArrowRight,
    FlaskConical,
    Menu,
    X,
} from "lucide-react";

import { useSectionReveal } from "@/hooks/use-section-reveal";
import { ChaptersCoverflow } from "@/components/food-lab/ChaptersCoverflow";
import { PlanLedger } from "@/components/food-lab/PlanLedger";
import { GapBoard } from "@/components/food-lab/GapBoard";
import { EggExperiment } from "@/components/food-lab/EggExperiment";
import { HypothesisExperiment } from "@/components/food-lab/HypothesisExperiment";
import { ProteinExperiment } from "@/components/food-lab/ProteinExperiment";
import { RiceExperiment } from "@/components/food-lab/RiceExperiment";
import { GlutenExperiment } from "@/components/food-lab/GlutenExperiment";
import RegionScene from "@/components/region-scenes/RegionScene";
import { BrandLogo } from "@/components/food-lab/BrandLogo";
import { maestroAssets } from "@/lib/maestro-assets";

const navigation = [{
    label: "How we approach nutrition",
    href: "#question"
}, {
    label: "Real life",
    href: "#real-life"
}, {
    label: "The proof",
    href: "#demonstration"
}];

const offerings = [{
    label: "Nutritional Consulting",
    href: "#how-we-help"
}, {
    label: "Protein 11",
    href: "#fit-peasant"
}];

// Per-bar macros, scaled to an actual 70 g bar
const PROTEIN11_MACROS = [
    { label: "Calories", value: "~224 kcal" },
    { label: "Protein", value: "~19.5–20 g" },
    { label: "Carbs", value: "~20 g" },
    { label: "Fat", value: "~8.8 g" },
    { label: "Fibre", value: "~6.2 g" },
];

function Brand() {
    return (
        <a
            href="#top"
            className="flex items-center shrink-0"
            aria-label="The Food Lab home">
            <BrandLogo className="h-11 sm:h-12 w-auto object-contain" />
        </a>
    );
}

function Header() {
    const [open, setOpen] = useState(false);
    const [offeringsOpen, setOfferingsOpen] = useState(false);

    return (
        <header
            className="fixed inset-x-0 top-0 z-50 border-b border-ink/15 bg-[#faedde]/95 backdrop-blur-sm">
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
                    <div className="relative mx-[44px]">
                        <button
                            type="button"
                            onClick={() => setOfferingsOpen(value => !value)}
                            className="flex items-center gap-2 text-sm text-ink/65 transition-colors hover:text-primary xl:text-base"
                            aria-expanded={offeringsOpen}>Our Offerings <span aria-hidden="true">⌄</span>
                        </button>
                        {offeringsOpen && (<div
                            className="absolute left-0 top-full mt-3 min-w-[210px] rounded-xl border border-ink/15 bg-[#faedde] p-2 shadow-lg">
                            {offerings.map(item => (<a
                                key={item.href}
                                href={item.href}
                                onClick={() => setOfferingsOpen(false)}
                                className="block rounded-lg px-3 py-2 text-sm text-ink/70 hover:bg-ink/5 hover:text-primary">
                                {item.label}
                            </a>))}
                        </div>)}
                    </div>
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
                className="absolute left-0 right-0 top-full border-t border-ink/15 bg-[#faedde] px-5 py-4 shadow-[0_8px_18px_rgba(23,59,48,.08)] lg:hidden"
                aria-label="Mobile navigation">
                {navigation.map(item => (<a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between border-b border-ink/10 py-3 text-sm text-ink">
                    {item.label}<ArrowRight className="h-4 w-4 text-primary" />
                </a>))}
                <button
                    type="button"
                    onClick={() => setOfferingsOpen(value => !value)}
                    className="flex w-full items-center justify-between border-b border-ink/10 py-3 text-left text-sm text-ink"
                    aria-expanded={offeringsOpen}>Our Offerings <span aria-hidden="true">⌄</span>
                </button>
                {offeringsOpen && (<div className="border-b border-ink/10 pl-4">
                    {offerings.map(item => (<a
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-between py-3 text-sm text-ink/75">
                        {item.label}<ArrowRight className="h-4 w-4 text-primary" />
                    </a>))}
                </div>)}
                <a
                    href="#your-experiment"
                    onClick={() => setOpen(false)}
                    className="mt-4 flex items-center justify-between rounded-full bg-ink px-5 py-3 text-sm text-[#f8f2e5]">Bring us a question <ArrowRight className="h-4 w-4" />
                </a>
            </nav>)}
        </header>
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
    useSectionReveal();

    return (
        <div id="top" className="min-h-screen overflow-hidden bg-paper text-ink">
            <Header />
            <main className="pt-[74px]">
                <section id="question" className="px-4 pb-4 pt-6 sm:px-6 lg:px-8 lg:pt-8">
                    <div
                        className="paper-sheet nb-ruled mx-auto max-w-[1400px] px-5 py-10 sm:px-10 sm:py-14 lg:px-20 lg:py-20">
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
                <section id="real-life" className="px-4 sm:px-6 lg:px-8">
                    <div
                        className="mx-auto max-w-[1400px] bg-charcoal px-5 py-14 text-[#f8f2e5] sm:px-10 lg:px-20 lg:py-24">
                        <div className="nb-dark-ruled-top" />
                        <div className="mb-10 max-w-3xl sm:mb-12">
                            <span
                                className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#e49a8d]">Field notes / three days that ignored the plan</span>
                            <h2
                                className="mt-5 font-serif text-4xl font-normal leading-[0.96] tracking-[-0.04em] sm:text-5xl lg:text-[clamp(2.6rem,4.4vw,4rem)]">The plan was perfect. <em>The day wasn’t in it.</em></h2>
                            <p
                                className="mt-5 max-w-xl text-base leading-relaxed text-[#f5f0e3] sm:text-lg">Pick a person. See which meals a generic diet chart actually survives.</p>
                        </div>
                        <PlanLedger />
                        <aside className="press-note mt-10 max-w-lg rotate-[1deg] p-5 text-ink">
                            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink/50">Margin note</span>
                            <p
                                className="handwritten mt-2 text-lg leading-tight text-primary sm:text-xl">Maybe consistency is designed along with a life, not imposed on one.</p>
                        </aside>
                    </div>
                </section>
                <section id="demonstration" className="px-4 sm:px-6 lg:px-8">
                    <div
                        className="paper-sheet nb-ruled mx-auto max-w-[1400px] px-5 py-10 sm:px-10 lg:px-16 lg:py-14">
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
                            {}
                            <div className="lens-coverflow__controls">
                                <div
                                    className="lens-coverflow__pills"
                                    role="tablist"
                                    aria-label="Experiment switcher">
                                    {experimentOptions.map(([key, label], index) => (<button
                                        key={key}
                                        type="button"
                                        role="tab"
                                        aria-selected={activeExperiment === key}
                                        onClick={() => setActiveExperiment(key)}
                                        className={`lens-coverflow__pill ${activeExperiment === key ? "is-active" : ""}`}>0{index + 1} {label}
                                    </button>))}
                                </div>
                            </div>
                            {}
                            <div className="lens-coverflow__stage">
                                {experimentOptions.map(([key, label], index) => {
                                    const isActive = activeExperiment === key;
                                    const activeIndex = experimentOptions.findIndex(([k]) => k === activeExperiment);
                                    const offset = (index - activeIndex + experimentOptions.length) % experimentOptions.length;
                                    const position = offset > experimentOptions.length / 2 ? offset - experimentOptions.length : offset;
                                    const positionClass = position === -1 ? "lens-coverflow__item--pos-prev" : position === 0 ? "lens-coverflow__item--pos-active" : position === 1 ? "lens-coverflow__item--pos-next" : "lens-coverflow__item--pos-far";

                                    return (
                                        <div
                                            key={key}
                                            className={`lens-coverflow__item ${positionClass} ${isActive ? "is-active" : ""}`}
                                            onClick={() => {
                                                if (!isActive)
                                                    setActiveExperiment(key);
                                            }}
                                            tabIndex={isActive ? 0 : -1}
                                            role="tabpanel"
                                            id={`experiment-panel-${key}`}
                                            aria-hidden={!isActive}>
                                            <div className="lens-coverflow__item-content">
                                                {key === "egg" && <EggExperiment />}
                                                {key === "rice" && <RiceExperiment />}
                                                {key === "gluten" && <GlutenExperiment />}
                                                {key === "protein" && <ProteinExperiment />}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>
                <section
                    id="how-we-help"
                    className="scroll-mt-24 px-4 sm:px-6 lg:px-8"
                    aria-labelledby="help-heading">
                    <div
                        className="mx-auto max-w-[1400px] bg-charcoal px-5 py-14 text-[#f8f2e5] sm:px-10 lg:px-20 lg:py-24">
                        <div className="mb-10 max-w-3xl sm:mb-12">
                            <span
                                className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#e49a8d]">Precision Bio-Nutrition / the part the PDF skips</span>
                            <h2
                                id="help-heading"
                                className="mt-5 font-serif text-4xl font-normal leading-[0.96] tracking-[-0.04em] sm:text-5xl lg:text-[clamp(2.6rem,4.4vw,4rem)]">What a generic plan <em>never asks.</em></h2>
                            <blockquote
                                className="mt-6 max-w-2xl border-l-4 border-primary pl-5 font-serif text-xl leading-snug text-ink/80 sm:text-2xl">The right nutritional solution isn’t the one that looks best on paper.
                                <span className="mt-3 block text-ink">It’s the one that works in your life.</span>
                            </blockquote>
                        </div>
                        <GapBoard />
                        <a
                            href="#your-experiment"
                            className="method-cta mt-10 inline-flex items-center gap-3 rounded-full bg-[#f8f2e5] px-6 py-3.5 text-sm text-ink transition-transform hover:-translate-y-0.5">First 30 min free consult — Get in touch <ArrowRight className="h-4 w-4" />
                        </a>
                    </div>
                </section>
                <section id="fit-peasant" className="px-4 sm:px-6 lg:px-8">
                    <div
                        className="paper-sheet nb-ruled mx-auto max-w-[1200px] px-4 py-12 sm:px-8 lg:px-16 lg:py-20">
                        <div className="grid gap-8 lg:grid-cols-[1fr_.8fr] lg:items-center">
                            <figure
                                className="relative flex flex-col items-center justify-center border-0 bg-transparent p-0 shadow-none">
                                <img
                                    src={maestroAssets.alchemyBar}
                                    alt="Protein 11 bar cut open to reveal its whole-food texture"
                                    className="h-auto max-h-[420px] w-full object-contain mix-blend-normal drop-shadow-[0_10px_18px_rgba(0,0,0,0.16)]" />
                                <div className="p11-hero-stamp" aria-label="Made this week, small batch, Bengaluru">
                                    <span className="p11-hero-stamp__lab">The Food Lab</span>
                                    <strong className="p11-hero-stamp__main">Made this week</strong>
                                    <span className="p11-hero-stamp__sub">Small batch · Bengaluru</span>
                                </div>
                                <figcaption className="p11-hero-caption">16 ingredients, every one a food you can name.</figcaption>
                                <dl className="p11-macros" aria-label="Macros per bar">
                                    {PROTEIN11_MACROS.map((m) => (
                                        <div key={m.label} className="p11-macros__item">
                                            <dt>{m.label}</dt>
                                            <dd>{m.value}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </figure>
                            <div>
                                <h2 className="max-w-xl font-serif font-normal tracking-[-0.04em] text-ink">
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
                            </div>
                        </div>
                        <ChaptersCoverflow />
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
            <footer className="paper-sheet nb-ruled site-footer px-5 py-12 sm:px-8">
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