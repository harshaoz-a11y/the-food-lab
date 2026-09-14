import {
  Brain,
  Citrus,
  Grape,
  Leaf,
  Sparkles,
  Wheat,
  Zap,
} from "lucide-react";

const partnerships = [
  {
    left: "Whey isolate",
    right: "Casein isolate",
    nuance: "Fast × slow protein",
    payoff: "Instant synthesis with sustained, low-bloat repair.",
    icon: Zap,
  },
  {
    left: "Steel-cut oats",
    right: "Psyllium husk",
    nuance: "Low-glycemic anchor",
    payoff: "Steady extended energy without the mid-day crash.",
    icon: Wheat,
  },
  {
    left: "Peanut powder",
    right: "Orange zest",
    nuance: "Macro-light flavour",
    payoff: "Rich, bright flavour with 87% less fat.",
    icon: Citrus,
  },
  {
    left: "Raisins",
    right: "Black raisins",
    nuance: "Natural sweetness",
    payoff: "Clean energy and antioxidants without synthetic flavour.",
    icon: Grape,
  },
  {
    left: "Walnuts",
    right: "Almonds",
    nuance: "Texture matrix",
    payoff: "Longer chewing that helps satiety arrive earlier.",
    icon: Brain,
  },
  {
    left: "Monk fruit",
    right: "Pink salt",
    nuance: "Flavour stabiliser",
    payoff: "Clean sweetness, sharper flavour and electrolytes.",
    icon: Leaf,
  },
  {
    left: "You",
    right: "Alchemy",
    nuance: "Final equilibrium",
    payoff: "Adherence without sacrificing enjoyment or ambition.",
    icon: Sparkles,
  },
];

export function AlchemyPartnerships() {
  return (
    <section className="mt-14 overflow-hidden rounded-[2rem] border border-ink/15 bg-[#f4ecdc] shadow-[8px_10px_0_rgba(65,50,28,.06)]" aria-labelledby="alchemy-partnerships-heading">
      <header className="flex flex-col justify-between gap-5 border-b border-ink/15 bg-ink px-6 py-6 text-[#f8f2e5] sm:flex-row sm:items-end sm:px-8">
        <div>
          <span className="font-mono text-[9px] uppercase tracking-[0.17em] text-[#f8f2e5]/55">Precision dual-interaction layout</span>
          <h3 id="alchemy-partnerships-heading" className="mt-3 font-serif text-3xl font-normal tracking-[-0.03em] sm:text-4xl">The Alchemy partnerships</h3>
        </div>
        <span className="w-fit rounded-full border border-[#f8f2e5]/25 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.13em] text-[#f8f2e5]/75">7 pairings / one equilibrium</span>
      </header>

      <div className="relative px-4 py-6 sm:px-8 sm:py-8">
        <span className="absolute bottom-8 left-1/2 top-8 hidden w-px -translate-x-1/2 bg-ink/15 sm:block" aria-hidden="true" />
        <div className="space-y-4">
          {partnerships.map(({ left, right, nuance, payoff, icon: Icon }, index) => (
            <article key={nuance} className="relative rounded-[1.35rem] border border-ink/15 bg-[#fff8e9] p-4 sm:grid sm:grid-cols-[minmax(0,1fr)_54px_minmax(0,1fr)] sm:items-center sm:gap-x-4 sm:p-5">
              <div className="rounded-full border border-primary/20 bg-[#eadfca] px-4 py-3 text-center font-serif text-base text-ink">{left}</div>
              <div className="relative z-10 mx-auto my-3 grid h-12 w-12 place-items-center rounded-full bg-primary text-[#fff8e9] shadow-[3px_4px_0_rgba(76,34,27,.14)] sm:my-0">
                <Icon className="h-5 w-5 stroke-[1.6]" aria-hidden="true" />
                <span className="sr-only">Pair {index + 1}</span>
              </div>
              <div className="rounded-full border border-primary/20 bg-[#eadfca] px-4 py-3 text-center font-serif text-base text-ink">{right}</div>
              <div className="mt-4 border-t border-dashed border-ink/20 pt-4 text-center sm:col-span-3">
                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-primary">0{index + 1} / {nuance}</span>
                <p className="mx-auto mt-1 max-w-2xl text-sm leading-relaxed text-ink/65">{payoff}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
