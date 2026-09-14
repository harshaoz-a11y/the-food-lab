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
    <section
      className="mt-10 overflow-hidden rounded-[2rem] border border-[#f8f2e5]/20 bg-[#173b30] shadow-[8px_12px_0_rgba(0,0,0,.25)]"
      aria-labelledby="alchemy-partnerships-heading"
    >
      <header className="flex flex-col justify-between gap-3 border-b border-[#f8f2e5]/15 bg-[#29483e] px-6 py-4 text-[#f8f2e5] sm:flex-row sm:items-center sm:px-8">
        <div>
          <span className="font-mono text-[9px] uppercase tracking-[0.17em] text-[#f8f2e5]/55">Precision dual-interaction layout</span>
          <h3
            id="alchemy-partnerships-heading"
            className="mt-1.5 font-serif text-xl font-normal tracking-[-0.03em] sm:text-2xl"
          >
            The Alchemy partnerships
          </h3>
        </div>
        <span className="w-fit rounded-full border border-[#f8f2e5]/25 bg-[#29483e] px-4 py-1.5 font-mono text-[9px] uppercase tracking-[0.13em] text-[#f8f2e5]/75">
          7 pairings / one equilibrium
        </span>
      </header>

      <div className="relative bg-[#173b30] px-4 py-5 sm:px-6 sm:py-6">
        <span
          className="absolute bottom-5 left-1/2 top-5 hidden w-px -translate-x-1/2 bg-[#f8f2e5]/15 sm:block"
          aria-hidden="true"
        />
        <div className="space-y-2.5">
          {partnerships.map(({ left, right, nuance, payoff, icon: Icon }, index) => (
            <article
              key={nuance}
              className="relative rounded-[1.35rem] border border-[#f8f2e5]/15 bg-[#29483e] p-3 sm:grid sm:grid-cols-[minmax(0,1fr)_44px_minmax(0,1fr)] sm:items-center sm:gap-x-3 sm:p-4"
            >
              <div className="rounded-full border border-[#d68b7f]/25 bg-[#29483e] px-3 py-2 text-center font-serif text-sm text-[#f8f2e5]">
                {left}
              </div>
              <div className="relative z-10 mx-auto my-1.5 grid h-9 w-9 place-items-center rounded-full bg-[#d68b7f] text-[#173b30] shadow-[2px_3px_0_rgba(76,34,27,.14)] sm:my-0">
                <Icon className="h-4 w-4 stroke-[1.6]" aria-hidden="true" />
                <span className="sr-only">Pair {index + 1}</span>
              </div>
              <div className="rounded-full border border-[#d68b7f]/25 bg-[#29483e] px-3 py-2 text-center font-serif text-sm text-[#f8f2e5]">
                {right}
              </div>
              <div className="mt-2.5 border-t border-dashed border-[#f8f2e5]/15 pt-2.5 text-center sm:col-span-3">
                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#d68b7f]">
                  0{index + 1} / {nuance}
                </span>
                <p className="mx-auto mt-0.5 max-w-2xl text-xs leading-relaxed text-[#f8f2e5]/70">
                  {payoff}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}