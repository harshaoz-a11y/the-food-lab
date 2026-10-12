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
// Every call to action goes to one of these two places.
// Per-bar macros, scaled to an actual 70 g bar
// Phones only: the two calls to action stay one thumb away once the hero has
// scrolled by, and step aside when the closing section shows the same two.
import { useEffect, useState } from "react";
import { ArrowRight, FlaskConical, Menu, X } from "lucide-react";
import { useSectionReveal } from "@/hooks/use-section-reveal";
import { useSnapCarousel } from "@/hooks/use-snap-carousel";
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
    label: "Our approach",
    href: "#question"
}, {
    label: "Real life",
    href: "#real-life"
}, {
    label: "The science",
    href: "#demonstration"
}, {
    label: "Nutrition consults",
    href: "#how-we-help"
}, {
    label: "Protein 11",
    href: "#fit-peasant"
}];

const ORDER_PROTEIN11 = "mailto:harsha@thefoodlab.in?subject=Order%20Protein%2011&body=Hi%20Food%20Lab%2C%20I%27d%20like%20to%20order%20Protein%2011.%0A%0ANumber%20of%20bars%3A%20%0AArea%20in%20Bengaluru%3A%20";
const BOOK_CONSULT = "mailto:harsha@thefoodlab.in?subject=Book%20my%20free%2030-min%20consult&body=Hi%20Food%20Lab%2C%20I%27d%20like%20to%20book%20my%20free%2030-minute%20consult.%0A%0AWhat%20I%27d%20like%20help%20with%3A%20";

const PROTEIN11_MACROS = [{
    label: "Bar weight",
    value: "70 g"
}, {
    label: "Calories",
    value: "~224 kcal"
}, {
    label: "Protein",
    value: "~19.5–20 g"
}, {
    label: "Carbs",
    value: "~20 g"
}, {
    label: "Fat",
    value: "~8.8 g"
}, {
    label: "Fibre",
    value: "~6.2 g"
}];

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

    return (
        <header
            className="fixed inset-x-0 top-0 z-50 border-b border-ink/15 bg-[#faedde]/95 backdrop-blur-sm">
            <div
                className="mx-auto flex h-[74px] max-w-[1400px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
                <Brand />
                <nav className="site-nav hidden xl:flex" aria-label="Primary navigation">
                    {navigation.map(item => (<a key={item.href} href={item.href} className="site-nav__link">
                        {item.label}
                    </a>))}
                </nav>
                <div className="flex items-center gap-2.5">
                    <a
                        href={BOOK_CONSULT}
                        className="header-cta header-cta--ghost hidden xl:inline-flex">Free 30-min consult</a>
                    <a
                        href={ORDER_PROTEIN11}
                        className="header-cta header-cta--gold hidden sm:inline-flex">Order Protein 11 <ArrowRight className="h-4 w-4" /></a>
                    <button
                        type="button"
                        onClick={() => setOpen(value => !value)}
                        className="grid h-11 w-11 place-items-center rounded-full border border-ink/25 text-ink xl:hidden"
                        aria-label={open ? "Close menu" : "Open menu"}
                        aria-expanded={open}>
                        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>
            {open && (<nav
                className="absolute left-0 right-0 top-full border-t border-ink/15 bg-[#faedde] px-5 py-4 shadow-[0_8px_18px_rgba(23,59,48,.08)] xl:hidden"
                aria-label="Mobile navigation">
                {navigation.map(item => (<a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between border-b border-ink/10 py-3 text-base text-ink">
                    {item.label}<ArrowRight className="h-4 w-4 text-primary" />
                </a>))}
                <div className="mt-4 grid gap-2.5">
                    <a
                        href={ORDER_PROTEIN11}
                        onClick={() => setOpen(false)}
                        className="header-cta header-cta--gold justify-center">Order Protein 11 <ArrowRight className="h-4 w-4" /></a>
                    <a
                        href={BOOK_CONSULT}
                        onClick={() => setOpen(false)}
                        className="header-cta header-cta--ghost justify-center">Book a free 30-min consult</a>
                </div>
            </nav>)}
        </header>
    );
}

function MobileActionBar() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const closing = document.getElementById("your-experiment");
        let closingInView = false;
        const update = () => setVisible(window.scrollY > window.innerHeight * 0.9 && !closingInView);

        const observer = new IntersectionObserver(([entry]) => {
            closingInView = entry.isIntersecting;
            update();
        });

        if (closing)
            observer.observe(closing);

        window.addEventListener("scroll", update, {
            passive: true
        });

        update();

        return () => {
            observer.disconnect();
            window.removeEventListener("scroll", update);
        };
    }, []);

    return (
        <div
            className={`mobile-action-bar ${visible ? "is-visible" : ""}`}
            aria-hidden={!visible}>
            <a
                href={BOOK_CONSULT}
                tabIndex={visible ? 0 : -1}
                className="mobile-action-bar__ghost">Free consult</a>
            <a
                href={ORDER_PROTEIN11}
                tabIndex={visible ? 0 : -1}
                className="mobile-action-bar__gold">Order Protein 11 <ArrowRight className="h-4 w-4" /></a>
        </div>
    );
}

function ConsultationForm() {
    return (
        <div className="consult-cards grid gap-5">
            <a
                href={BOOK_CONSULT}
                className="group rounded-[1.5rem] border border-[#f8f2e5]/25 bg-[#f8f2e5]/5 p-6 transition hover:-translate-y-1 hover:border-[#d68b7f] hover:bg-[#f8f2e5]/10">
                <span
                    className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#d68b7f]">Nutrition consult · 1:1</span>
                <strong
                    className="mt-3 block max-w-lg font-serif text-3xl font-normal leading-tight text-[#f8f2e5] sm:text-4xl">Looking for precise solutions to your nutritional goals?</strong>
                <span className="card-cta">Book your free 30-min consult <ArrowRight className="h-4 w-4" /></span>
            </a>
            <div
                className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[#f8f2e5]/40">
                <span className="h-px flex-1 bg-[#f8f2e5]/15" />Or
                                                                                                                                                                                                                                                                                                                                                                                                                                <span className="h-px flex-1 bg-[#f8f2e5]/15" />
            </div>
            <a
                href={ORDER_PROTEIN11}
                className="group rounded-[1.5rem] border border-[#d68b7f]/45 bg-[#d68b7f]/10 p-6 transition hover:-translate-y-1 hover:border-[#d68b7f] hover:bg-[#d68b7f]/15">
                <span
                    className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#d68b7f]">Protein 11</span>
                <strong
                    className="mt-3 block max-w-lg font-serif text-3xl font-normal leading-tight text-[#f8f2e5] sm:text-4xl">Protein 11, made fresh this week.</strong>
                <span className="card-cta">Order Protein 11 <ArrowRight className="h-4 w-4" /></span>
            </a>
        </div>
    );
}

const experimentOptions = [
    ["egg", "Egg"],
    ["rice", "Rice"],
    ["gluten", "Gluten"],
    ["protein", "Protein (fiber!!)"]
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

    const lensStageRef = useSnapCarousel(
        experimentOptions.findIndex(([key]) => key === activeExperiment),
        index => setActiveExperiment(experimentOptions[index][0])
    );

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
                                <a href="#fit-peasant" className="hero-p11-strip">
                                    <img src={maestroAssets.alchemyBar} alt="" aria-hidden="true" />
                                    <span className="hero-p11-strip__sticker" aria-hidden="true">New</span>
                                    <span><b>Protein 11.</b>{" "}A 70 g bar with 20 g protein,{" "}<em>from 16 foods you can name.</em></span>
                                    <ArrowRight className="h-4 w-4 shrink-0" />
                                </a>
                                <div className="hero-p11">
                                    <img
                                        src={maestroAssets.alchemyBar}
                                        alt="Protein 11 bar in its wrapper"
                                        className="hero-p11__img" />
                                    <div className="hero-p11__body">
                                        <span className="hero-p11__kicker">New from our kitchen · made this week</span>
                                        <strong className="hero-p11__title">Protein 11</strong>
                                        <p className="hero-p11__line">A 70 g bar with 20 g protein, from 16 foods you can name.</p>
                                        <div className="hero-p11__actions">
                                            <a href={ORDER_PROTEIN11} className="cta-btn">Order Protein 11 <ArrowRight className="h-4 w-4" /></a>
                                            <a href="#fit-peasant" className="text-link">What’s inside? <ArrowRight className="h-3.5 w-3.5 rotate-90" /></a>
                                        </div>
                                    </div>
                                </div>
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
                        <div className="section-head">
                            <h2 className="section-head__title">The plan was perfect. <em>The day wasn’t in it.</em></h2>
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
                        <div
                            className="lens-bookmarks"
                            role="tablist"
                            aria-label="Choose an experiment">
                            {experimentOptions.map(([key, label], index) => (<button
                                key={key}
                                type="button"
                                role="tab"
                                aria-selected={activeExperiment === key}
                                aria-controls={`experiment-panel-${key}`}
                                onClick={() => setActiveExperiment(key)}
                                className={`lens-bookmark ${activeExperiment === key ? "is-active" : ""}`}>
                                <small>0{index + 1}</small>
                                <span>{label}</span>
                            </button>))}
                        </div>
                        <div className="lens-head">
                            <span className="section-head__kicker">The science · pick a bookmark</span>
                            <h2
                                key={activeExperiment}
                                className="lens-head__title animate-in fade-in slide-in-from-bottom-2 duration-300">
                                {lensEssence[activeExperiment]}
                            </h2>
                        </div>
                        <div className="lens-coverflow mt-6" role="region" aria-label="Experiments">
                            {}
                            <div ref={lensStageRef} className="lens-coverflow__stage">
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
                        <div className="section-head">
                            <div>
                                <span className="section-head__kicker">PRECISION BIO-NUTRITION CONSULTS</span>
                                <h2 id="help-heading" className="section-head__title">Customized plans that <em>won’t ask you to “diet”</em></h2>
                            </div>
                            <div className="service-offer">
                                <p className="service-offer__line">Work 1:1 with thefoodlab.in on a plan built around your biology, your taste and your actual needs.</p>
                                <p className="service-offer__free">Your first 30 minutes are free.</p>
                                <a href={BOOK_CONSULT} className="cta-btn cta-btn--gold service-offer__cta">Book your free consult <ArrowRight className="h-4 w-4" /></a>
                            </div>
                        </div>
                        <GapBoard />
                        <div className="mt-10">
                            <a href={BOOK_CONSULT} className="cta-btn cta-btn--gold">Book your free 30-min consult <ArrowRight className="h-4 w-4" /></a>
                        </div>
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
                                <div
                                    className="p11-hero-stamp"
                                    aria-label="Made this week, small batch, Bengaluru">
                                    <span className="p11-hero-stamp__lab">The Food Lab</span>
                                    <strong className="p11-hero-stamp__main">Made this week</strong>
                                    <span className="p11-hero-stamp__sub">Small batch · Bengaluru</span>
                                </div>
                                <figcaption className="p11-hero-caption">16 ingredients, every one a food you can name.</figcaption>
                                <dl className="p11-macros" aria-label="Macros per bar">
                                    {PROTEIN11_MACROS.map(m => (<div key={m.label} className="p11-macros__item">
                                        <dt>{m.label}</dt>
                                        <dd>{m.value}</dd>
                                    </div>))}
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
                                <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink/80">We’ll let you tell us how good it is.</p>
                                <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                                    <a href={ORDER_PROTEIN11} className="cta-btn">Order Protein 11 <ArrowRight className="h-4 w-4" /></a>
                                </div>
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
                                <div className="mt-8 flex items-center gap-4 text-[#d68b7f]">
                                    <FlaskConical className="h-8 w-8 stroke-[1.2]" />
                                    <span className="handwritten max-w-xs text-xl leading-tight">No judgement. No gold stars for an ideal food diary.</span>
                                </div>
                            </div>
                            <ConsultationForm />
                            <div className="closing-ctas">
                                <a href={BOOK_CONSULT} className="cta-btn cta-btn--gold">Book your free 30-min consult <ArrowRight className="h-4 w-4" /></a>
                                <a href={ORDER_PROTEIN11} className="cta-btn closing-ctas__secondary">Order Protein 11 <ArrowRight className="h-4 w-4" /></a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="paper-sheet site-footer">
                <div
                    className="mx-auto flex h-[74px] max-w-[1400px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
                    <Brand />
                    <p className="site-footer__tagline hidden font-serif text-lg italic md:block">We observe. We question. Then we build.</p>
                    <div
                        className="site-footer__contact text-right font-mono text-[11px] uppercase leading-relaxed tracking-[0.12em]">Bengaluru<br />harsha@thefoodlab.in</div>
                </div>
            </footer>
            <MobileActionBar />
        </div>
    );
};

export default Index;