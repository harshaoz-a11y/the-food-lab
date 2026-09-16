import { useState } from "react";
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
] as const;

type Partnership = typeof partnerships[number];

function FusionNode({
  partnership,
  selected,
  onSelect,
}: {
  partnership: Partnership;
  selected: boolean;
  onSelect: () => void;
}) {
  const { left, right, nuance, payoff, icon: Icon } = partnership;
  return (
    <button
      type="button"
      className={`fusion-node ${selected ? "is-selected" : ""}`}
      aria-pressed={selected}
      onClick={onSelect}
    >
      <span className="fusion-node-left">{left}</span>
      <span className="fusion-node-center" aria-hidden="true">
        <Icon className="h-4 w-4 stroke-[1.8]" />
        <span className="sr-only">{nuance}</span>
      </span>
      <span className="fusion-node-right">{right}</span>
      <span className="fusion-node-nuance">{nuance}</span>
      <span className="fusion-node-payoff">{payoff}</span>
    </button>
  );
}

export function AlchemyPartnerships() {
  const [selected, setSelected] = useState<number>(0);
  const current = partnerships[selected];

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
          {partnerships.map((partnership, index) => (
            <FusionNode
              key={partnership.nuance}
              partnership={partnership}
              selected={selected === index}
              onSelect={() => setSelected(index)}
            />
          ))}
        </div>

        <div className="fusion-focus mt-4 rounded-[1.5rem] border-2 border-dashed border-[#a33a2b]/30 bg-[#fff8f0] p-4 sm:p-5">
          <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#a33a2b]/60">
            Selected fusion
          </span>
          <p
            className="mt-1 font-handwriting text-base leading-snug text-[#a33a2b]/85 sm:text-lg"
            style={{ fontFamily: "\"Segoe Print\", \"Bradley Hand\", cursive" }}
          >
            <strong className="text-[#a33a2b]">{current.left}</strong>
            {" × "}
            <strong className="text-[#a33a2b]">{current.right}</strong>
            {" — "}
            {current.payoff}
          </p>
          <span className="mt-2 inline-block font-mono text-[8px] uppercase tracking-[0.12em] text-[#a33a2b]/55">
            {current.nuance}
          </span>
        </div>
      </div>
    </section>
  );
}
