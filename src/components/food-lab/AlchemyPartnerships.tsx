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

type Partnership = (typeof partnerships)[number];

function PairingButton({
  partnership,
  index,
  selected,
  onSelect,
}: {
  partnership: Partnership;
  index: number;
  selected: boolean;
  onSelect: () => void;
}) {
  const Icon = partnership.icon;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      aria-controls="fusion-discovery"
      onClick={onSelect}
      className={`group grid w-full grid-cols-[auto_1fr_auto] items-center gap-3 rounded-2xl border p-3 text-left transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2d7d46] ${
        selected
          ? "border-[#2d7d46] bg-[#e7f2e9] text-[#2d7d46] shadow-[4px_5px_0_rgba(45,125,70,.16)]"
          : "border-[#a33a2b]/35 bg-[#fff8f0] text-[#a33a2b] hover:-translate-y-0.5 hover:border-[#a33a2b]/70"
      }`}
    >
      <span className="grid h-9 w-9 place-items-center rounded-full border border-current/30 bg-white/55 font-mono text-[9px]">
        0{index + 1}
      </span>
      <span className="min-w-0">
        <strong className="block truncate font-serif text-sm font-normal sm:text-[15px]">
          {partnership.left} × {partnership.right}
        </strong>
        <small className="mt-1 block truncate font-mono text-[7px] uppercase tracking-[0.11em] opacity-65">
          {partnership.interaction}
        </small>
      </span>
      <Icon className="h-4 w-4 shrink-0 stroke-[1.7]" aria-hidden="true" />
    </button>
  );
}

export function AlchemyPartnerships() {
  const [selected, setSelected] = useState(0);
  const current = partnerships[selected];
  const CurrentIcon = current.icon;

  return (
    <section
      className="mt-10 overflow-hidden rounded-[2rem] border-2 border-dashed border-[#a33a2b] bg-[#fdf6ec] shadow-[8px_12px_0_rgba(163,58,43,.15)]"
      aria-labelledby="alchemy-partnerships-heading"
    >
      <header className="flex flex-col justify-between gap-3 border-b-2 border-dashed border-[#a33a2b] bg-[#fdf6ec] px-6 py-5 text-[#a33a2b] sm:flex-row sm:items-center sm:px-8">
        <div>
          <span className="font-mono text-[9px] uppercase tracking-[0.17em] text-[#a33a2b]/60">Interactive ingredient map</span>
          <h3
            id="alchemy-partnerships-heading"
            className="mt-1.5 text-2xl font-normal tracking-[-0.02em] sm:text-3xl"
            style={{ fontFamily: "\"Segoe Print\", \"Bradley Hand\", cursive" }}
          >
            The Fit Peasant partnerships
          </h3>
        </div>
        <span className="w-fit rounded-full border-2 border-dashed border-[#a33a2b] bg-[#fdf6ec] px-4 py-1.5 font-mono text-[9px] uppercase tracking-[0.13em] text-[#a33a2b]/75">
          7 pairings / click to discover
        </span>
      </header>

      <div className="alchemy-body bg-[#fdf6ec] px-4 py-5 sm:px-6 sm:py-7">
        <div className="alchemy-layout grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(300px,.8fr)] lg:gap-7">
          <div className="alchemy-visual min-w-0">
            <div
              id="fusion-discovery"
              role="tabpanel"
              aria-live="polite"
              className="relative h-[330px] overflow-hidden rounded-[1.75rem] border-2 border-[#2d7d46] bg-[#fffaf3] shadow-[6px_8px_0_rgba(45,125,70,.12)] sm:h-[400px]"
            >
              <div className="absolute left-5 top-5 z-20 sm:left-7 sm:top-6">
                <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-[#2d7d46]/65">
                  Selected fusion · 0{selected + 1}
                </span>
                <p className="mt-1 font-serif text-lg text-[#173b30] sm:text-xl">{current.interaction}</p>
              </div>

              <div key={selected} className="absolute left-1/2 top-[59%] aspect-[1.47] w-[calc(100%-1rem)] max-w-[280px] -translate-x-1/2 -translate-y-1/2 animate-in fade-in zoom-in-95 duration-300 sm:top-[57%] sm:h-[270px] sm:w-[430px] sm:max-w-none">
                <div className="absolute left-0 top-0 flex h-full aspect-square flex-col items-start justify-center rounded-full border-2 border-[#a33a2b]/65 bg-[#f3ddd5] px-4 text-center text-[#7f2f24] sm:px-7">
                  <strong className="relative z-20 w-[82px] break-words font-serif text-base font-normal leading-tight sm:w-[118px] sm:text-2xl">{current.left}</strong>
                  <span className="relative z-20 mt-2 w-[82px] break-words font-mono text-[6px] uppercase leading-relaxed tracking-[0.1em] opacity-65 sm:w-[118px] sm:text-[8px]">{current.leftAmount}</span>
                </div>
                <div className="absolute right-0 top-0 flex h-full aspect-square flex-col items-end justify-center rounded-full border-2 border-[#2d7d46]/70 bg-[#deeee2] px-4 text-center text-[#245f38] sm:px-7">
                  <strong className="relative z-20 w-[82px] break-words font-serif text-base font-normal leading-tight sm:w-[118px] sm:text-2xl">{current.right}</strong>
                  <span className="relative z-20 mt-2 w-[82px] break-words font-mono text-[6px] uppercase leading-relaxed tracking-[0.1em] opacity-65 sm:w-[118px] sm:text-[8px]">{current.rightAmount}</span>
                </div>
                <div className="absolute left-1/2 top-1/2 z-10 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border-4 border-[#fffaf3] bg-[#2d7d46] px-2 text-center text-[#fffaf3] shadow-[0_8px_24px_rgba(45,125,70,.28)] sm:h-28 sm:w-28">
                  <CurrentIcon className="h-4 w-4 stroke-[1.8] sm:h-5 sm:w-5" aria-hidden="true" />
                  <span className="mt-1 font-mono text-[6px] uppercase tracking-[0.12em] sm:text-[7px]">Fusion</span>
                </div>
              </div>
            </div>

            <div key={`benefit-${selected}`} className="mt-4 rounded-[1.5rem] border-2 border-dashed border-[#2d7d46]/45 bg-[#eaf4ec] p-5 text-[#245f38] animate-in fade-in slide-in-from-bottom-2 duration-300 sm:p-6">
              <span className="font-mono text-[8px] uppercase tracking-[0.15em] opacity-65">What the overlap contributes</span>
              <h4 className="mt-2 font-serif text-2xl font-normal leading-tight sm:text-3xl">{current.benefit}</h4>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#173b30]/75 sm:text-base">{current.insight}</p>
            </div>
          </div>

          <aside className="alchemy-formula rounded-[1.75rem] border border-[#a33a2b]/25 bg-[#f8ecdf] p-4 sm:p-5" aria-label="Ingredient fusion pairings">
            <div className="mb-4 flex items-end justify-between gap-3">
              <div>
                <span className="font-mono text-[8px] uppercase tracking-[0.15em] text-[#a33a2b]/55">Explore the formula</span>
                <p className="mt-1 font-serif text-xl text-[#173b30]">Choose a pairing</p>
              </div>
              <span className="font-mono text-[8px] text-[#a33a2b]/55">01—07</span>
            </div>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1" role="tablist" aria-label="Choose an ingredient fusion">
              {partnerships.map((partnership, index) => (
                <PairingButton
                  key={partnership.interaction}
                  partnership={partnership}
                  index={index}
                  selected={selected === index}
                  onSelect={() => setSelected(index)}
                />
              ))}
            </div>
          </aside>
        </div>

        <p className="mt-5 border-t border-dashed border-[#a33a2b]/25 pt-4 font-mono text-[8px] uppercase leading-relaxed tracking-[0.11em] text-[#a33a2b]/55">
          Amounts reflect the current formula. Benefits describe culinary and formulation roles, not personal medical advice.
        </p>
      </div>
    </section>
  );
}
