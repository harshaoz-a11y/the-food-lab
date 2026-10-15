import { useState } from "react";
import RegionScene from "@/components/region-scenes/RegionScene";
import { SourceNote } from "./SourceNote";
import "./GlutenExperiment.css";

type Signal = { value: number; short: string; only?: boolean };

// One list, one colour: what the survey found
const findings: Signal[] = [
    { value: 49.1, short: "could not say what gluten is" },
    { value: 38.6, short: "knew what “gluten-free” means", only: true },
    { value: 45.3, short: "knew who needs it medically", only: true },
    { value: 70.9, short: "don’t think it is healthier" },
    { value: 38.9, short: "think it helps weight loss" },
    { value: 49.5, short: "say the crowd drives it" }
];

const regions = [
    ["us", "In the U.S."],
    ["india", "In India"]
] as const;

type Region = (typeof regions)[number][0];

function Group({ title, items }: { title: string; items: Signal[] }) {
    return (
        <div className="gf-group">
            <h5 className="gf-group__title">{title}</h5>
            <ul className="gf-list">
                {items.map(({ value, short, only }, index) => (
                    <li key={short} className="gf-row" style={{ "--v": `${value}%`, "--i": index } as React.CSSProperties}>
                        <strong>{only && <small>Only </small>}{value}%</strong>
                        <span>{short}</span>
                        <i aria-hidden="true" />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export function GlutenExperiment() {
    // Phones show one scene at a time; wider screens show both side by side.
    const [region, setRegion] = useState<Region>("us");

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
            {/* phones: the India survey belongs to the India scene, so it shows only there */}
            <div className={`gf-survey ${region === "us" ? "is-us" : ""}`}>
                <div className="gf-survey__head">
                    <span className="gf-eyebrow">India / survey · 285 people</span>
                    <p className="gf-takeaway">Half couldn’t say what gluten is. Half say the crowd drives the trend.</p>
                </div>
                <div className="gf-groups">
                    <Group title="What we know" items={findings} />
                </div>
                <SourceNote className="gf-source">
                    <a href="https://www.researchsquare.com/article/rs-9052215/v1" target="_blank" rel="noreferrer">Moitra &amp; Qureshi, Research Square preprint, 2026</a>.
                    Share of respondents. An observation, not personal dietary advice.
                </SourceNote>
            </div>
        </div>
    );
}

export default GlutenExperiment;
