import { useState } from "react";
import { Brain, Citrus, Grape, Leaf, Sparkles, Wheat, Zap } from "lucide-react";

const interactions = [{
    region: "foundation",
    circleLabel: "Foundation",
    left: "Whey isolate",
    leftAmount: "10 g · unflavoured",
    right: "Micellar casein isolate",
    rightAmount: "10 g · pure",
    interaction: "Fast + sustained protein",
    benefit: "A more balanced protein profile",
    insight: "Whey brings a lighter, faster-digesting protein source; casein adds a creamier body and a slower-digesting counterpart. Together they make the serving feel more complete than either protein alone.",
    icon: Zap,
    x: 19,
    y: 21
}, {
    region: "texture",
    circleLabel: "Texture",
    left: "Steel-cut oats",
    leftAmount: "10 g · toasted + broken",
    right: "Psyllium husk",
    rightAmount: "2.5 g",
    interaction: "Layered soluble fibre",
    benefit: "Steadier texture and a slower carbohydrate release",
    insight: "The oats provide structure while psyllium binds water and thickens the mixture. Their combined fibre matrix creates a more substantial, spoonable texture and may slow digestion compared with oats alone.",
    icon: Wheat,
    x: 81,
    y: 21
}, {
    region: "flavour",
    circleLabel: "Flavour",
    left: "Peanut butter powder",
    leftAmount: "10 g · defatted",
    right: "Orange zest",
    rightAmount: "A negligible pinch",
    interaction: "Roasted depth + aromatic lift",
    benefit: "Fuller flavour without relying on extra fat",
    insight: "Defatted peanut powder supplies roasted richness and body. A tiny amount of orange zest adds volatile citrus oils that brighten the peanut notes and keep the flavour from feeling heavy.",
    icon: Citrus,
    x: 50,
    y: 82
}, {
    region: "foundation-texture",
    circleLabel: "Foundation × texture",
    left: "Almonds + walnut",
    leftAmount: "1.5 almonds + 1 walnut",
    right: "Flax seeds",
    rightAmount: "1.3 g · toasted + broken",
    interaction: "Layered crunch matrix",
    benefit: "More texture, roasted aroma and chewing satisfaction",
    insight: "The larger nut fragments create crunch while broken flax fills the spaces with a finer toasted texture. The contrast makes each bite last longer and adds fibre and naturally occurring fats.",
    icon: Brain,
    x: 50,
    y: 28
}, {
    region: "foundation-flavour",
    circleLabel: "Foundation × flavour",
    left: "Dark cocoa",
    leftAmount: "6 g · 100% cocoa",
    right: "Whole blueberries",
    rightAmount: "2 berries",
    interaction: "Dark intensity + bright fruit",
    benefit: "Cocoa depth balanced by fresh, juicy contrast",
    insight: "Unsweetened cocoa creates the dark base. Whole blueberries release brief pockets of acidity, aroma and moisture, cutting through cocoa bitterness without diluting its character.",
    icon: Sparkles,
    x: 31,
    y: 56
}, {
    region: "texture-flavour",
    circleLabel: "Texture × flavour",
    left: "Golden raisins",
    leftAmount: "3 pieces · dried",
    right: "Black raisins",
    rightAmount: "3 pieces · dried",
    interaction: "Two-note fruit sweetness",
    benefit: "Small, varied bursts of sweetness and chew",
    insight: "Golden and black raisins contribute slightly different caramel and fruit notes. Used whole and sparingly, they distribute sweetness as distinct bites rather than turning the entire base uniformly sweet.",
    icon: Grape,
    x: 69,
    y: 56
}, {
    region: "all-three",
    circleLabel: "All three roles",
    left: "Monk fruit extract",
    leftAmount: "2 tiny drops",
    right: "Himalayan pink salt",
    rightAmount: "A negligible pinch",
    interaction: "Sweetness + contrast",
    benefit: "A clearer sweetness and more defined cocoa flavour",
    insight: "Monk fruit provides concentrated sweetness without bulk. A minute amount of salt can soften bitterness and sharpen flavour contrast, helping the cocoa and fruit read more clearly across the whole formula.",
    icon: Leaf,
    x: 50,
    y: 48
}] as const;

const roles = [{
    label: "Foundation",
    note: "protein + body",
    className: "venn-circle-foundation"
}, {
    label: "Texture",
    note: "fibre + bite",
    className: "venn-circle-texture"
}, {
    label: "Flavour",
    note: "aroma + contrast",
    className: "venn-circle-flavour"
}] as const;

export function AlchemyPartnerships() {
    const [activeIndex, setActiveIndex] = useState(6);
    const current = interactions[activeIndex];
    const CurrentIcon = current.icon;

    return (
        <section
            className="alchemy-partnerships mt-10 overflow-hidden rounded-[2rem] border border-[#173b30]/20 bg-[#f8f2e5] shadow-[7px_8px_0_rgba(70,54,30,.05)]"
            aria-labelledby="alchemy-partnerships-heading">
            <header
                className="flex flex-col justify-between gap-3 border-b-2 border-dashed border-[#a33a2b] bg-[#fdf6ec] px-6 py-5 text-[#a33a2b] sm:flex-row sm:items-center sm:px-8">
                <div>
                    <span
                        className="font-mono text-[9px] uppercase tracking-[0.17em] text-[#a33a2b]/60">Interaction reader</span>
                    <h3
                        id="alchemy-partnerships-heading"
                        className="mt-1.5 text-2xl font-normal tracking-[-0.02em] sm:text-3xl">The Fit Peasant partnerships
                                  </h3>
                </div>
                <span
                    className="w-fit rounded-full border-2 border-dashed border-[#a33a2b] bg-[#fdf6ec] px-4 py-1.5 font-mono text-[9px] uppercase tracking-[0.13em] text-[#a33a2b]/75">7 interactions / hover an overlap
                            </span>
            </header>
            <div className="alchemy-body bg-[#fdf6ec] px-4 py-5 sm:px-6 sm:py-7">
                <div
                    className="venn-reader relative overflow-hidden rounded-[1.75rem] border-2 border-[#2d7d46]/50 bg-[#122019] shadow-[6px_8px_0_rgba(45,125,70,.14)]"
                    style={{
                        backgroundImage: "radial-gradient(rgba(248,242,229,0.05) 1px, transparent 1px)",
                        backgroundSize: "18px 18px"
                    }}>
                    <div className="venn-reader-intro">
                        <span
                            className="font-mono text-[7px] uppercase tracking-[0.15em] text-[#f8f2e5]/45"></span>
                        <p className="text-[0px]">
                        </p>
                    </div>
                    <div
                        className="venn-diagram"
                        aria-label="Seven ingredient interactions arranged as a three-set Venn diagram">
                        {roles.map(role => (<div
                            key={role.label}
                            className={`venn-circle ${role.className}`}
                            aria-hidden="true">
                            <span>{role.label}</span>
                            <small>{role.note}</small>
                        </div>))}
                        <div className="venn-centre-mark" aria-hidden="true">
                            <span>Fit</span>
                            <strong>Peasant</strong>
                            <small>formula</small>
                        </div>
                        {interactions.map((interaction, index) => {
                            const Icon = interaction.icon;
                            const isActive = activeIndex === index;

                            return (
                                <button
                                    key={interaction.interaction}
                                    type="button"
                                    className={`venn-zone venn-zone-${interaction.region} ${isActive ? "is-active" : ""}`}
                                    style={{
                                        left: `${interaction.x}%`,
                                        top: `${interaction.y}%`
                                    }}
                                    aria-label={`Interaction ${index + 1}: ${interaction.left} and ${interaction.right}`}
                                    aria-pressed={isActive}
                                    onMouseEnter={() => setActiveIndex(index)}
                                    onFocus={() => setActiveIndex(index)}
                                    onClick={() => setActiveIndex(index)}>
                                    <span className="venn-zone-number">0{index + 1}</span>
                                    <Icon aria-hidden="true" />
                                    <strong>{interaction.interaction}</strong>
                                    <small>{interaction.left} <b>×</b> {interaction.right}</small>
                                </button>
                            );
                        })}
                    </div>
                    <div
                        className="venn-role-key"
                        aria-label="Ingredient roles in the Venn diagram">
                        {roles.map(role => (<div key={role.label}>
                            <span
                                className={`venn-key-swatch ${role.className.replace("venn-circle-", "venn-key-")}`}
                                aria-hidden="true" />
                            <strong>{role.label}</strong>
                            <small>{role.note}</small>
                        </div>))}
                    </div>
                    <p className="venn-reader-hint">Hover or tab to a numbered overlap to read its benefit</p>
                </div>
                <div
                    className="mt-4 grid grid-cols-3 gap-2 rounded-[1.25rem] border border-[#173b30]/15 bg-[#f3ead8] p-3 sm:gap-3 sm:p-5">
                    <div className="min-w-0 text-center sm:text-left">
                        <span
                            className="block font-mono text-[6.5px] uppercase tracking-[0.13em] text-[#173b30]/45 sm:text-[7px]">Active region</span>
                        <strong
                            className="mt-1 block truncate font-serif text-xs text-[#173b30] sm:text-base">{current.interaction}</strong>
                    </div>
                    <div
                        className="min-w-0 border-x border-[#173b30]/10 px-1.5 text-center sm:px-4 sm:text-left">
                        <span
                            className="block font-mono text-[6.5px] uppercase tracking-[0.13em] text-[#173b30]/45 sm:text-[7px]">Selected</span>
                        <strong className="mt-1 block font-serif text-xs text-[#173b30] sm:text-base">0{activeIndex + 1}of 07</strong>
                    </div>
                    <div className="min-w-0 text-center sm:text-left">
                        <span
                            className="block font-mono text-[6.5px] uppercase tracking-[0.13em] text-[#173b30]/45 sm:text-[7px]">Ingredients</span>
                        <strong className="mt-1 block font-serif text-xs text-[#173b30] sm:text-base">14 shown</strong>
                    </div>
                </div>
                <div
                    key={`benefit-${activeIndex}`}
                    className="mt-4 rounded-[1.5rem] border-2 border-dashed border-[#2d7d46]/45 bg-[#eaf4ec] p-5 text-[#245f38] animate-in fade-in slide-in-from-bottom-2 duration-300 sm:p-6"
                    aria-live="polite">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-mono text-[8px] uppercase tracking-[0.15em] opacity-65">What this overlap contributes</span>
                        <span
                            className="rounded-full border border-[#2d7d46]/40 bg-[#2d7d46]/10 px-3 py-1 font-mono text-[8px] uppercase tracking-[0.13em] text-[#2d7d46]">Region 0{activeIndex + 1}of 07</span>
                    </div>
                    <h4
                        className="mt-3 font-serif text-2xl font-normal leading-tight sm:text-3xl">{current.benefit}</h4>
                    <p
                        className="mt-3 max-w-2xl text-sm leading-relaxed text-[#173b30]/75 sm:text-base">{current.insight}</p>
                    <span
                        className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-[#173b30]/15 bg-white/60 px-3 py-1 font-mono text-[8px] uppercase tracking-[0.11em] text-[#173b30]/60">
                        <CurrentIcon className="h-3 w-3" aria-hidden="true" /> {current.left} <b>×</b> {current.right}
                    </span>
                </div>
                <p
                    className="mt-4 border-t border-dashed border-[#a33a2b]/25 pt-4 font-mono text-[8px] uppercase leading-relaxed tracking-[0.11em] text-[#a33a2b]/55">Amounts reflect the current formula. Benefits describe culinary and formulation roles, not personal medical advice.
                            </p>
            </div>
        </section>
    );
}