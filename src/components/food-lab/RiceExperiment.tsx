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
    metrics: [
      { label: "Resistant starch", value: "Reference", detail: "Fresh-cooked baseline", direction: "up" },
      { label: "Effective GI", value: "Reference", detail: "Fresh-cooked baseline", direction: "down" },
      { label: "Post-meal glucose", value: "Reference peak", detail: "The comparison starts here", direction: "down" },
      { label: "Eating pace", value: "Reference pace", detail: "Fresh texture", direction: "time" },
    ],
  },
  reheated: {
    label: "Chilled 24h + reheated",
    shortLabel: "Reheated",
    icon: Snowflake,
    summary: "Cooling and reheating changes the starch structure—without changing the ingredient.",
    curve: "M4 88 C22 86 32 34 50 38 C67 42 69 62 84 56 C98 51 106 68 116 65",
    metrics: [
      { label: "Resistant starch", value: "+158%", detail: "Increase in prebiotic fibre structure", direction: "up" },
      { label: "Effective GI", value: "20–30% lower", detail: "Estimated reduction", direction: "down" },
      { label: "Post-meal glucose", value: "17.8% lower", detail: "Observed in healthy participants", direction: "down" },
      { label: "Eating pace", value: "Slower", detail: "Texture changes can slow ingestion", direction: "time" },
    ],
  },
  coconut: {
    label: "Coconut oil + chilled",
    shortLabel: "Coconut oil",
    icon: Sparkles,
    summary: "Cooking with coconut oil, then cooling, produces the largest shift in this comparison.",
    curve: "M4 88 C25 87 35 57 52 59 C69 61 74 68 89 65 C103 62 109 68 116 66",
    metrics: [
      { label: "Resistant starch", value: "10–15×", detail: "Reported concentration increase", direction: "up" },
      { label: "Glycaemic response", value: "17.8–35% lower", detail: "Compared with fresh rice", direction: "down" },
      { label: "Immediate glucose peak", value: "~47% lower", detail: "Post-meal peak reduction", direction: "down" },
      { label: "Eating pace", value: "25% slower", detail: "Compared with fresh rice", direction: "time" },
    ],
  },
} as const;

type Preparation = keyof typeof preparations;

const directionIcons = {
  up: TrendingUp,
  down: TrendingDown,
  time: Clock3,
};

export function RiceExperiment() {
  const [active, setActive] = useState<Preparation>("fresh");
  const current = preparations[active];

  return (
    <div className="mt-16 border-t border-dashed border-ink/25 pt-14">
      <div className="mb-9 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <span className="lab-label">Experiment 002B / one grain, three preparations</span>
          <h3 className="mt-5 max-w-3xl font-serif text-4xl font-normal leading-[0.96] tracking-[-0.035em] text-ink sm:text-5xl">
            Rice, after the fridge.
          </h3>
        </div>
        <p className="handwritten max-w-xs rotate-[1deg] text-lg leading-tight text-primary lg:text-right">
          Switch the method. Follow the curve.
        </p>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1.08fr_.92fr] xl:items-start">
        <figure className="evidence-photo rotate-[0.35deg]">
          <span className="tape tape-left" />
          <img
            src={riceEvolution}
            alt="Illustration comparing fresh hot rice, refrigerated and reheated rice, and rice prepared with coconut oil before cooling"
            className="w-full"
          />
          <figcaption>Field comparison / fresh, cooled + reheated, coconut oil + cooled</figcaption>
        </figure>

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
                  <small>{option.label}</small>
                </button>
              );
            })}
          </div>

          <div className="mt-7" aria-live="polite">
            <p className="min-h-14 font-serif text-xl leading-snug text-ink/75">{current.summary}</p>

            <div className="rice-curve mt-5">
              <div>
                <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-ink/45">Illustrative post-meal curve</span>
                <strong className="mt-1 block font-serif text-lg font-normal text-ink">{current.label}</strong>
              </div>
              <svg viewBox="0 0 120 100" role="img" aria-label={`Illustrative glucose curve for ${current.label}`}>
                <path className="rice-curve-reference" d={preparations.fresh.curve} />
                <path key={active} className="rice-curve-current" d={current.curve} />
              </svg>
            </div>

            <div key={active} className="rice-metrics mt-4 grid gap-3 sm:grid-cols-2">
              {current.metrics.map((metric) => {
                const Icon = directionIcons[metric.direction];
                return (
                  <article className="rice-metric" key={metric.label}>
                    <div className="flex items-start justify-between gap-3">
                      <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-ink/45">{metric.label}</span>
                      <Icon className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    </div>
                    <strong className="mt-3 block font-serif text-2xl font-normal leading-none text-ink">{metric.value}</strong>
                    <p className="mt-2 text-xs leading-relaxed text-ink/55">{metric.detail}</p>
                  </article>
                );
              })}
            </div>
          </div>

          <p className="mt-6 border-t border-dashed border-ink/25 pt-4 font-mono text-[9px] uppercase leading-relaxed tracking-[0.1em] text-ink/50">
            Figures summarise the supplied clinical comparison. Results depend on rice variety, method and study context; this is an observation, not personal dietary advice.
          </p>
        </div>
      </div>
    </div>
  );
}
