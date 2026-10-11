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

function Group({ title, tone, items }: { title: string; tone: "green" | "brick"; items: Signal[] }) {
    return (
        <div className={`gf-group gf-group--${tone}`}>
            <h5 className="gf-group__title">{title}</h5>
            <ul className="gf-list">
                {items.map(({ value, short, full }, index) => (
                    <li className="gf-row" key={short} title={`${value}% ${full}`} style={{ "--v": `${value}%`, "--i": index } as React.CSSProperties}>
                        <strong>{value}%</strong>
                        <span>{short}</span>
                        <i aria-hidden="true" />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export function GlutenExperiment() {
    return (
        <div className="gluten-experiment">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                <RegionScene region="us" />
                <RegionScene region="india" />
            </div>

            <div className="gf-survey">
                <div className="gf-survey__head">
                    <span className="gf-eyebrow">India / survey signal · 285 people</span>
                    <p className="gf-takeaway">Half couldn’t say what gluten is. Half say the crowd drives the trend.</p>
                </div>
                <div className="gf-groups">
                    <Group title="What they know" tone="green" items={knowledge} />
                    <Group title="What they believe" tone="brick" items={belief} />
                </div>
                <p className="gf-source">
                    Source:{" "}
                    <a href="https://www.researchsquare.com/article/rs-9052215/v1" target="_blank" rel="noreferrer">Moitra &amp; Qureshi, Research Square preprint, 2026</a>.
                    Share of respondents; hover a line for the full question. An observation, not personal dietary advice.
                </p>
            </div>
        </div>
    );
}

export default GlutenExperiment;
