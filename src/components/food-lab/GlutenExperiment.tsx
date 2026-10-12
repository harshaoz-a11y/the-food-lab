import { useState } from "react";
import RegionScene from "@/components/region-scenes/RegionScene";
import "./GlutenExperiment.css";

type Signal = { value: number; short: string; full: string };

const knowledge: Signal[] = [
    { value: 50.9, short: "could say what gluten is", full: "correctly identified what gluten is" },
    { value: 38.6, short: "knew what “gluten-free” means", full: "correctly identified what a gluten-free diet means" },
    { value: 45.3, short: "knew who needs it medically", full: "correctly identified the medical conditions for which a GFD is recommended" }
];

const belief: Signal[] = [
    { value: 29.1, short: "think it is healthier", full: "thought gluten-free foods were healthier than gluten-containing foods" },
    { value: 38.9, short: "think it helps weight loss", full: "believed gluten-free diets help with weight loss" },
    { value: 49.5, short: "say the crowd drives it", full: "perceived social influences as major drivers of GFD adoption" }
];

const regions = [
    ["us", "In the U.S."],
    ["india", "In India"]
] as const;

type Region = (typeof regions)[number][0];

function Group({ title, tone, items, open, onToggle }: {
    title: string;
    tone: "green" | "brick";
    items: Signal[];
    open: string | null;
    onToggle: (key: string) => void;
}) {
    return (
        <div className={`gf-group gf-group--${tone}`}>
            <h5 className="gf-group__title">{title}</h5>
            <ul className="gf-list">
                {items.map(({ value, short, full }, index) => {
                    const isOpen = open === short;
                    return (
                        <li key={short}>
                            <button
                                type="button"
                                className="gf-row"
                                aria-expanded={isOpen}
                                onClick={() => onToggle(short)}
                                style={{ "--v": `${value}%`, "--i": index } as React.CSSProperties}>
                                <strong>{value}%</strong>
                                <span>{short}</span>
                                <i aria-hidden="true" />
                            </button>
                            {isOpen && <p className="gf-row__full">{value}% {full}.</p>}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export function GlutenExperiment() {
    // Phones show one scene at a time; wider screens show both side by side.
    const [region, setRegion] = useState<Region>("us");
    const [open, setOpen] = useState<string | null>(null);
    const toggle = (key: string) => setOpen((current) => (current === key ? null : key));

    return (
        <div className="gluten-experiment">
            <div className="gf-region-switch" role="tablist" aria-label="Choose a country">
                {regions.map(([key, label]) => (
                    <button
                        key={key}
                        type="button"
                        role="tab"
                        aria-selected={region === key}
                        onClick={() => setRegion(key)}>
                        {label}
                    </button>
                ))}
            </div>
            <div className={`gf-scenes is-showing-${region} grid gap-12 lg:grid-cols-2 lg:gap-16`}>
                <div className="gf-scene gf-scene--us"><RegionScene region="us" /></div>
                <div className="gf-scene gf-scene--india"><RegionScene region="india" /></div>
            </div>
            <div className="gf-survey">
                <div className="gf-survey__head">
                    <span className="gf-eyebrow">India / survey signal · 285 people</span>
                    <p className="gf-takeaway">Half couldn’t say what gluten is. Half say the crowd drives the trend.</p>
                </div>
                <div className="gf-groups">
                    <Group title="What they know" tone="green" items={knowledge} open={open} onToggle={toggle} />
                    <Group title="What they believe" tone="brick" items={belief} open={open} onToggle={toggle} />
                </div>
                <p className="gf-source">
                    Source:{" "}
                    <a href="https://www.researchsquare.com/article/rs-9052215/v1" target="_blank" rel="noreferrer">Moitra &amp; Qureshi, Research Square preprint, 2026</a>.
                    Share of respondents; tap a line for the full question. An observation, not personal dietary advice.
                </p>
            </div>
        </div>
    );
}

export default GlutenExperiment;
