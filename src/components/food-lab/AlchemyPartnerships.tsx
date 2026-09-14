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
      className="mt-10 overflow-hidden rounded-[2rem] border-2 border-dashed border-[#a33a2b] bg-[#fdf6ec] shadow-[8px_12px_0_rgba(163,58,43,.15)]"
      aria-labelledby="alchemy-partnerships-heading"
    >
      <header className="flex flex-col justify-between gap-3 border-b-2 border-dashed border-[#a33a2b] bg-[#fdf6ec] px-6 py-5 text-[#a33a2b] sm:flex-row sm:items-center sm:px-8">
        <div>
          <span className="font-mono text-[9px] uppercase tracking-[0.17em] text-[#a33a2b]/60">Precision dual-interaction layout</span>
          <h3
            id="alchemy-partnerships-heading"
            className="mt-1.5 font-handwriting text-2xl font-normal tracking-[-0.02em] sm:text-3xl"
            style={{ fontFamily: "\"Segoe Print\", \"Bradley Hand\", cursive" }}
          >
            The Alchemy partnerships
          </h3>
        </div>
        <span className="w-fit rounded-full border-2 border-dashed border-[#a33a2b] bg-[#fdf6ec] px-4 py-1.5 font-mono text-[9px] uppercase tracking-[0.13em] text-[#a33a2b]/75">
          7 pairings / one equilibrium
        </span>
      </header>

      <div className="relative bg-[#fdf6ec] px-4 py-5 sm:px-6 sm:py-6">
        <span
          className="absolute bottom-6 left-1/2 top-6 hidden w-px -translate-x-1/2 bg-[#a33a2b]/20 sm:block"
          aria-hidden="true"
        />
        <div className="space-y-3">
          {partnerships.map(({ left, right, nuance, payoff, icon: Icon }, index) => (
            <article
              key={nuance}
              className="relative rounded-[1.5rem] border-2 border-dashed border-[#a33a2b]/30 bg-[#fff8f0] p-3 sm:grid sm:grid-cols-[minmax(0,1fr)_44px_minmax(0,1fr)] sm:items-center sm:gap-x-3 sm:p-4"
              style={{ boxShadow: "4px 5px 0 rgba(163,58,43,.08)" }}
            >
              <div className="rounded-full border-2 border-dashed border-[#a33a2b]/30 bg-[#fff8f0] px-3 py-2 text-center font-handwriting text-base text-[#a33a2b]" style={{ fontFamily: "\"Segoe Print\", \"Bradley Hand\", cursive" }}>
                {left}
              </div>
              <div className="relative z-10 mx-auto my-1.5 grid h-9 w-9 place-items-center rounded-full bg-[#a33a2b] text-[#fdf6ec] shadow-[3px_4px_0_rgba(76,34,27,.14)] sm:my-0">
                <Icon className="h-4 w-4 stroke-[1.8]" aria-hidden="true" />
                <span className="sr-only">Pair {index + 1}</span>
              </div>
              <div className="rounded-full border-2 border-dashed border-[#a33a2b]/30 bg-[#fff8f0] px-3 py-2 text-center font-handwriting text-base text-[#a33a2b]" style={{ fontFamily: "\"Segoe Print\", \"Bradley Hand\", cursive" }}>
                {right}
              </div>
              <div className="mt-2.5 border-t-2 border-dashed border-[#a33a2b]/20 pt-2.5 text-center sm:col-span-3">
                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#a33a2b]/60">
                  0{index + 1} / {nuance}
                </span>
                <p className="mx-auto mt-0.5 max-w-2xl text-sm leading-relaxed text-[#a33a2b]/80" style={{ fontFamily: "\"Segoe Print\", \"Bradley Hand\", cursive" }}>
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