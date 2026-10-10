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
    x: 24,
    y: 29
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
    x: 76,
    y: 29
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
    y: 83
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
    y: 23
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
    x: 34,
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
    x: 66,
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
            <header className="alchemy-heading">
                <div>
                    <h3 id="alchemy-partnerships-heading">Protein 11 partnerships</h3>
                </div>
                <span className="alchemy-count">7 interactions · hover an overlap</span>
            </header>
            <div className="alchemy-body">
                <div className="venn-reader">
                    <div className="venn-reader-intro" aria-hidden="true">
                    </div>
                    <div
                        className="venn-diagram"
                        aria-label="Seven ingredient interactions arranged as a three-set Venn diagram">
                        {roles.map(role => (<div
                            key={role.label}
                            className={`venn-circle ${role.className}`}
                            aria-hidden="true" />))}
                        <svg
                            className="venn-region-highlight"
                            viewBox="0 0 134 100"
                            preserveAspectRatio="none"
                            aria-hidden="true">
                            <defs>
                                <clipPath id="venn-foundation-clip">
                                    <ellipse cx="50.25" cy="47.19" rx="38.19" ry="38.19" />
                                </clipPath>
                                <clipPath id="venn-texture-clip">
                                    <ellipse cx="83.75" cy="47.19" rx="38.19" ry="38.19" />
                                </clipPath>
                                <clipPath id="venn-flavour-clip">
                                    <ellipse cx="67" cy="75.19" rx="38.19" ry="38.19" />
                                </clipPath>
                                <mask id="venn-region-foundation" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse">
                                    <rect width="134" height="100" fill="black" />
                                    <ellipse cx="50.25" cy="47.19" rx="38.19" ry="38.19" fill="white" />
                                    <ellipse cx="83.75" cy="47.19" rx="38.19" ry="38.19" fill="black" />
                                    <ellipse cx="67" cy="75.19" rx="38.19" ry="38.19" fill="black" />
                                </mask>
                                <mask id="venn-region-texture" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse">
                                    <rect width="134" height="100" fill="black" />
                                    <ellipse cx="83.75" cy="47.19" rx="38.19" ry="38.19" fill="white" />
                                    <ellipse cx="50.25" cy="47.19" rx="38.19" ry="38.19" fill="black" />
                                    <ellipse cx="67" cy="75.19" rx="38.19" ry="38.19" fill="black" />
                                </mask>
                                <mask id="venn-region-flavour" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse">
                                    <rect width="134" height="100" fill="black" />
                                    <ellipse cx="67" cy="75.19" rx="38.19" ry="38.19" fill="white" />
                                    <ellipse cx="50.25" cy="47.19" rx="38.19" ry="38.19" fill="black" />
                                    <ellipse cx="83.75" cy="47.19" rx="38.19" ry="38.19" fill="black" />
                                </mask>
                                <mask id="venn-region-foundation-texture" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse">
                                    <rect width="134" height="100" fill="black" />
                                    <g clipPath="url(#venn-foundation-clip)">
                                        <ellipse cx="83.75" cy="47.19" rx="38.19" ry="38.19" fill="white" />
                                    </g>
                                    <ellipse cx="67" cy="75.19" rx="38.19" ry="38.19" fill="black" />
                                </mask>
                                <mask id="venn-region-foundation-flavour" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse">
                                    <rect width="134" height="100" fill="black" />
                                    <g clipPath="url(#venn-foundation-clip)">
                                        <ellipse cx="67" cy="75.19" rx="38.19" ry="38.19" fill="white" />
                                    </g>
                                    <ellipse cx="83.75" cy="47.19" rx="38.19" ry="38.19" fill="black" />
                                </mask>
                                <mask id="venn-region-texture-flavour" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse">
                                    <rect width="134" height="100" fill="black" />
                                    <g clipPath="url(#venn-texture-clip)">
                                        <ellipse cx="67" cy="75.19" rx="38.19" ry="38.19" fill="white" />
                                    </g>
                                    <ellipse cx="50.25" cy="47.19" rx="38.19" ry="38.19" fill="black" />
                                </mask>
                                <mask id="venn-region-all-three" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse">
                                    <rect width="134" height="100" fill="black" />
                                    <g clipPath="url(#venn-foundation-clip)">
                                        <g clipPath="url(#venn-texture-clip)">
                                            <ellipse cx="67" cy="75.19" rx="38.19" ry="38.19" fill="white" />
                                        </g>
                                    </g>
                                </mask>
                            </defs>
                            {interactions.map((interaction, index) => (<rect
                                key={interaction.interaction}
                                className={`venn-region-fill ${activeIndex === index ? "is-active" : ""}`}
                                width="134"
                                height="100"
                                fill="#2d7d46"
                                mask={`url(#venn-region-${interaction.region})`} />))}
                        </svg>
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
                    <p className="venn-reader-hint text-[0px]">
                    </p>
                </div>
                <div className="alchemy-stats">
                    <div><span>Active region</span><strong>{current.interaction}</strong></div>
                    <div><span>Selected</span><strong>0{activeIndex + 1} of 07</strong></div>
                    <div><span>Ingredients</span><strong>14 shown</strong></div>
                </div>
                <div key={`benefit-${activeIndex}`} className="alchemy-benefit" aria-live="polite">
                    <div className="alchemy-benefit-head">
                        <span>What this overlap contributes</span>
                        <span>Region 0{activeIndex + 1} of 07</span>
                    </div>
                    <h4>{current.benefit}</h4>
                    <p>{current.insight}</p>
                    <span className="alchemy-ingredients"><CurrentIcon aria-hidden="true" /> {current.left} <b>×</b> {current.right}</span>
                </div>
            </div>
        </section>
    );
}