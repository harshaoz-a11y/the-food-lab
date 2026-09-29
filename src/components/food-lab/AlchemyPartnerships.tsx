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
    leftAmount: "10 g · unflavoured",
    right: "Micellar casein isolate",
    rightAmount: "10 g · pure",
    interaction: "Fast + sustained protein",
    benefit: "A more balanced protein profile",
    insight:
      "Whey brings a lighter, faster-digesting protein source; casein adds a creamier body and a slower-digesting counterpart. Together they make the serving feel more complete than either protein alone.",
    icon: Zap,
  },
  {
    left: "Steel-cut oats",
    leftAmount: "10 g · toasted + broken",
    right: "Psyllium husk",
    rightAmount: "2.5 g",
    interaction: "Layered soluble fibre",
    benefit: "Steadier texture and a slower carbohydrate release",
    insight:
      "The oats provide structure while psyllium binds water and thickens the mixture. Their combined fibre matrix creates a more substantial, spoonable texture and may slow digestion compared with oats alone.",
    icon: Wheat,
  },
  {
    left: "Peanut butter powder",
    leftAmount: "10 g · defatted",
    right: "Orange zest",
    rightAmount: "A negligible pinch",
    interaction: "Roasted depth + aromatic lift",
    benefit: "Fuller flavour without relying on extra fat",
    insight:
      "Defatted peanut powder supplies roasted richness and body. A tiny amount of orange zest adds volatile citrus oils that brighten the peanut notes and keep the flavour from feeling heavy.",
    icon: Citrus,
  },
  {
    left: "Golden raisins",
    leftAmount: "3 pieces · dried",
    right: "Black raisins",
    rightAmount: "3 pieces · dried",
    interaction: "Two-note fruit sweetness",
    benefit: "Small, varied bursts of sweetness and chew",
    insight:
      "Golden and black raisins contribute slightly different caramel and fruit notes. Used whole and sparingly, they distribute sweetness as distinct bites rather than turning the entire base uniformly sweet.",
    icon: Grape,
  },
  {
    left: "Almonds + walnut",
    leftAmount: "1.5 almonds + 1 walnut",
    right: "Flax seeds",
    rightAmount: "1.3 g · toasted + broken",
    interaction: "Layered crunch matrix",
    benefit: "More texture, roasted aroma and chewing satisfaction",
    insight:
      "The larger nut fragments create crunch while broken flax fills the spaces with a finer toasted texture. The contrast makes each bite last longer and adds fibre and naturally occurring fats.",
    icon: Brain,
  },
  {
    left: "Monk fruit extract",
    leftAmount: "2 tiny drops",
    right: "Himalayan pink salt",
    rightAmount: "A negligible pinch",
    interaction: "Sweetness + contrast",
    benefit: "A clearer sweetness and more defined cocoa flavour",
    insight:
      "Monk fruit provides concentrated sweetness without bulk. A minute amount of salt can soften bitterness and sharpen flavour contrast, helping the cocoa and fruit read more clearly.",
    icon: Leaf,
  },
  {
    left: "Dark cocoa",
    leftAmount: "6 g · 100% cocoa",
    right: "Whole blueberries",
    rightAmount: "2 berries",
    interaction: "Dark intensity + bright fruit",
    benefit: "Cocoa depth balanced by fresh, juicy contrast",
    insight:
      "Unsweetened cocoa creates the dark base. Whole blueberries release brief pockets of acidity, aroma and moisture, cutting through cocoa bitterness without diluting its character.",
    icon: Sparkles,
  },
] as const;

export function AlchemyPartnerships() {
  const [selected, setSelected] = useState(0);
  const current = partnerships[selected];
  const CurrentIcon = current.icon;


  return (
    <section
      className="alchemy-partnerships mt-10 overflow-hidden rounded-[2rem] border border-[#173b30]/20 bg-[#f8f2e5] shadow-[7px_8px_0_rgba(70,54,30,.05)]"
      aria-labelledby="alchemy-partnerships-heading"
    >
      <header className="flex flex-col justify-between gap-3 border-b-2 border-dashed border-[#a33a2b] bg-[#fdf6ec] px-6 py-5 text-[#a33a2b] sm:flex-row sm:items-center sm:px-8">
        <div>
          <span className="font-mono text-[9px] uppercase tracking-[0.17em] text-[#a33a2b]/60">Interaction reader</span>
          <h3
            id="alchemy-partnerships-heading"
            className="mt-1.5 text-2xl font-normal tracking-[-0.02em] sm:text-3xl"
            
          >
            The Fit Peasant partnerships
          </h3>
        </div>
        <span className="w-fit rounded-full border-2 border-dashed border-[#a33a2b] bg-[#fdf6ec] px-4 py-1.5 font-mono text-[9px] uppercase tracking-[0.13em] text-[#a33a2b]/75">
          7 pairings / tap a chip to switch
        </span>
      </header>

      <div className="alchemy-body bg-[#fdf6ec] px-4 py-5 sm:px-6 sm:py-7">

        {/* ── Instrument display ─────────────────────────────── */}
        <div
          className="venn-reader relative overflow-hidden rounded-[1.75rem] border-2 border-[#2d7d46]/50 bg-[#122019] shadow-[6px_8px_0_rgba(45,125,70,.14)]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(248,242,229,0.05) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        >
          {/* Blueprint legend — top left */}
          <div className="absolute left-3 top-3 z-30 max-w-[46%] rounded-xl border border-[#f8f2e5]/15 bg-[#0f1d17]/85 px-3 py-2 backdrop-blur-sm sm:left-5 sm:top-5 sm:max-w-none">
            <span className="block font-mono text-[6.5px] uppercase tracking-[0.14em] text-[#f8f2e5]/40 sm:text-[7px]">
              Pairing blueprint
            </span>
            <p className="mt-1 truncate font-mono text-[7.5px] text-[#e5a69c] sm:text-[9px]">
              A · {current.left}
            </p>
            <p className="truncate font-mono text-[7.5px] text-[#8fd4a6] sm:text-[9px]">
              B · {current.right}
            </p>
          </div>

          {/* Pairing chips — top right, horizontal scroll */}
          <div
            className="absolute right-3 top-3 z-30 flex max-w-[48%] gap-1 overflow-x-auto rounded-full bg-[#0f1d17]/75 p-1 backdrop-blur-sm sm:right-5 sm:top-5 sm:max-w-none"
            role="tablist"
            aria-label="Choose an ingredient fusion"
          >
            {partnerships.map((partnership, index) => (
              <button
                key={partnership.interaction}
                type="button"
                role="tab"
                aria-selected={selected === index}
                aria-controls="fusion-reader-panel"
                onClick={() => setSelected(index)}
                className={`shrink-0 rounded-full min-h-8 px-3 py-1.5 font-mono text-[8px] transition sm:min-h-8 sm:px-3 sm:text-[8px] ${
                  selected === index
                    ? "bg-[#2d7d46] text-[#f8f2e5]"
                    : "text-[#f8f2e5]/45 hover:text-[#f8f2e5]/75"
                }`}
              >
                0{index + 1}
              </button>
            ))}
          </div>

          <div
            id="fusion-reader-panel"
            role="tabpanel"
            aria-live="polite"
            className="relative flex min-h-[260px] items-center justify-center pb-12 pt-16 sm:min-h-[320px] sm:pb-14 sm:pt-20"
          >
            <div key={selected} className="flex animate-in fade-in zoom-in-95 duration-300">
              <div
                className="flex h-[140px] w-[140px] flex-col items-start justify-center rounded-full border border-[#a33a2b]/60 bg-[#a33a2b]/[0.14] px-4 text-left sm:h-[180px] sm:w-[180px] sm:px-6"
                
              >
                <strong className="w-[74px] break-words font-serif text-sm font-normal leading-tight text-[#f3ddd5] sm:w-[100px] sm:text-lg">
                  {current.left}
                </strong>
                <span className="mt-1.5 w-[74px] break-words font-mono text-[6px] uppercase leading-relaxed tracking-[0.08em] text-[#f3ddd5]/55 sm:w-[100px] sm:text-[7px]">
                  {current.leftAmount}
                </span>
              </div>

              <div
                className="-ml-10 flex h-[140px] w-[140px] flex-col items-end justify-center rounded-full border border-[#2d7d46]/60 bg-[#2d7d46]/[0.14] px-4 text-right sm:-ml-14 sm:h-[180px] sm:w-[180px] sm:px-6"
                
              >
                <strong className="w-[74px] break-words font-serif text-sm font-normal leading-tight text-[#deeee2] sm:w-[100px] sm:text-lg">
                  {current.right}
                </strong>
                <span className="mt-1.5 w-[74px] break-words font-mono text-[6px] uppercase leading-relaxed tracking-[0.08em] text-[#deeee2]/55 sm:w-[100px] sm:text-[7px]">
                  {current.rightAmount}
                </span>
              </div>
            </div>

            <div className="pointer-events-none absolute inset-0 flex items-center justify-center pb-12 pt-16 sm:pb-14 sm:pt-20">
              <div
                key={`core-${selected}`}
                className="flex h-16 w-16 flex-col items-center justify-center rounded-full border-4 border-[#122019] bg-[#f8f2e5] text-center text-[#173b30] animate-in fade-in zoom-in-95 duration-300 sm:h-20 sm:w-20"
                
              >
                <CurrentIcon className="h-3.5 w-3.5 stroke-[1.8] sm:h-4 sm:w-4" aria-hidden="true" />
                <span className="mt-0.5 font-mono text-[5.5px] uppercase tracking-[0.1em] sm:text-[6px]">Fusion</span>
              </div>
            </div>
          </div>

          <p className="absolute bottom-3 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap font-mono text-[6.5px] uppercase tracking-[0.13em] text-[#f8f2e5]/30 sm:text-[7px]">
            Tap a chip above to read a different overlap
          </p>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 rounded-[1.25rem] border border-[#173b30]/15 bg-[#f3ead8] p-3 sm:gap-3 sm:p-5">
          <div className="min-w-0 text-center sm:text-left">
            <span className="block font-mono text-[6.5px] uppercase tracking-[0.13em] text-[#173b30]/45 sm:text-[7px]">Active pairing</span>
            <strong className="mt-1 block truncate font-serif text-xs text-[#173b30] sm:text-base">{current.interaction}</strong>
          </div>
          <div className="min-w-0 border-x border-[#173b30]/10 px-1.5 text-center sm:px-4 sm:text-left">
            <span className="block font-mono text-[6.5px] uppercase tracking-[0.13em] text-[#173b30]/45 sm:text-[7px]">Selected</span>
            <strong className="mt-1 block font-serif text-xs text-[#173b30] sm:text-base">0{selected + 1} of 07</strong>
          </div>
          <div className="min-w-0 text-center sm:text-left">
            <span className="block font-mono text-[6.5px] uppercase tracking-[0.13em] text-[#173b30]/45 sm:text-[7px]">Components</span>
            <strong className="mt-1 block font-serif text-xs text-[#173b30] sm:text-base">2 ingredients</strong>
          </div>
        </div>

        <div key={`benefit-${selected}`} className="mt-4 rounded-[1.5rem] border-2 border-dashed border-[#2d7d46]/45 bg-[#eaf4ec] p-5 text-[#245f38] animate-in fade-in slide-in-from-bottom-2 duration-300 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-mono text-[8px] uppercase tracking-[0.15em] opacity-65">What the overlap contributes</span>
            <span className="rounded-full border border-[#2d7d46]/40 bg-[#2d7d46]/10 px-3 py-1 font-mono text-[8px] uppercase tracking-[0.13em] text-[#2d7d46]">Pairing 0{selected + 1} of 07</span>
          </div>
          <h4 className="mt-3 font-serif text-2xl font-normal leading-tight sm:text-3xl">{current.benefit}</h4>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#173b30]/75 sm:text-base">{current.insight}</p>
          <span className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-[#173b30]/15 bg-white/60 px-3 py-1 font-mono text-[8px] uppercase tracking-[0.11em] text-[#173b30]/60">
            <CurrentIcon className="h-3 w-3" aria-hidden="true" /> {current.interaction}
          </span>
        </div>


        <p className="mt-4 border-t border-dashed border-[#a33a2b]/25 pt-4 font-mono text-[8px] uppercase leading-relaxed tracking-[0.11em] text-[#a33a2b]/55">
          Amounts reflect the current formula. Benefits describe culinary and formulation roles, not personal medical advice.
        </p>
      </div>
    </section>
  );
}