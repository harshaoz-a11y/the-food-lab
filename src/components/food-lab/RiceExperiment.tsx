import { useState } from "react";
import { Clock3, Snowflake, Sparkles, TrendingDown, TrendingUp, Utensils } from "lucide-react";
import riceEvolution from "@/assets/rice-evolution.jpg";

const preparations = {
  fresh: {
    label: "Fresh and hot",
    shortLabel: "Fresh",
    icon: Utensils,
    summary: "The reference plate: freshly cooked white rice, served hot.",
    curve: "M4 88 C22 86 31 16 49 20 C66 24 64 58 82 50 C96 44 104 68 116 65",
    glucosePeak: "Reference",
    facts: [
      ["Resistant starch", "Reference"],
      ["Effective GI", "Reference"],
      ["Eating pace", "Reference pace"],
    ],
  },
  reheated: {
    label: "Refrigerated 24h + reheated",
    shortLabel: "Refrigerated + reheated",
    icon: Snowflake,
    summary: "Cooling and reheating changes the starch structure—without changing the ingredient.",
    curve: "M4 88 C22 86 32 34 50 38 C67 42 69 62 84 56 C98 51 106 68 116 65",
    glucosePeak: "17.8% lower",
    facts: [
      ["Resistant starch", "+158%"],
      ["Effective GI", "20–30% lower"],
      ["Eating pace", "Slower"],
    ],
  },
  coconut: {
    label: "Coconut oil + chilled",
    shortLabel: "Coconut oil + chilled",
    icon: Sparkles,
    summary: "Cooking with coconut oil, then cooling, produces the largest shift in this comparison.",
    curve: "M4 88 C25 87 35 57 52 59 C69 61 74 68 89 65 C103 62 109 68 116 66",
    glucosePeak: "~47% lower peak",
    facts: [
      ["Resistant starch", "10–15×"],
      ["Effective GI", "17.8–35% lower"],
      ["Eating pace", "25% slower"],
    ],
  },
} as const;

type Preparation = keyof typeof preparations;

export function RiceExperiment() {
  const [active, setActive] = useState<Preparation>("fresh");
  const current = preparations[active];

  return (
    <div className={`experiment-card rice-experiment ${active !== "fresh" ? "is-green" : ""}`}>
      <div className="evidence-photo rice-evidence">
        <div className={`rice-plate-illustration is-${active}`}>
          <img
            src={riceEvolution}
            alt="Illustration comparing fresh hot rice, refrigerated and reheated rice, and rice prepared with coconut oil before cooling"
          />
          <span className="rice-now-showing">Now showing: {current.label}</span>
        </div>
      </div>

      <div className="rice-panel">
        <div className="grid gap-2 sm:grid-cols-3" role="group" aria-label="Choose a rice preparation">
          {(Object.keys(preparations) as Preparation[]).map((key) => {
            const option = preparations[key];
            const Icon = option.icon;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActive(key)}
                className={active === key ? "rice-choice is-active" : "rice-choice"}
                aria-pressed={active === key}
              >
                <Icon aria-hidden="true" />
                <span>{option.shortLabel}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-7" aria-live="polite">
          <p className="min-h-14 font-serif text-xl leading-snug text-ink/75">{current.summary}</p>

          <div className="rice-curve mt-5">
            <div className="rice-chart-wrap">
              <div className="rice-primary-metric">
                <span>Illustrative comparison · post-meal glucose peak</span>
                <strong>{current.glucosePeak}</strong>
              </div>
              <svg viewBox="0 0 120 100" role="img" aria-label="Conceptual illustration of the relative post-meal glucose curves shown in this comparison">
                <path className="rice-curve-inactive rice-curve-fresh" d={preparations.fresh.curve} />
                <path className="rice-curve-inactive rice-curve-reheated" d={preparations.reheated.curve} />
                <path className="rice-curve-inactive rice-curve-coconut" d={preparations.coconut.curve} />
                <path className={`rice-curve-active rice-curve-${active}`} d={current.curve} />
                <text className="rice-axis-label" x="108" y="97">time</text>
                <text className="rice-axis-label" x="5" y="9">glucose</text>
              </svg>
            </div>
          </div>

          <div className="rice-facts" aria-label="Secondary facts">
            {current.facts.map(([label, value]) => (
              <span className="rice-fact" key={label}>
                <strong>{label}</strong><em>{value}</em>
              </span>
            ))}
          </div>
        </div>

        <p className="mt-6 border-t border-dashed border-ink/25 pt-4 font-mono text-[11px] uppercase leading-relaxed tracking-[0.1em] text-ink/50">
          Figures summarise the supplied clinical comparison. The curves are illustrative rather than plotted study data; results depend on rice variety, method and study context. This is an observation, not personal dietary advice.
        </p>
      </div>
    </div>
  );
}
