import { useState } from "react";
import { Boxes, SlidersHorizontal, Sparkles, Workflow } from "lucide-react";

const stages = [
  {
    title: "Ingredients",
    label: "What is present",
    icon: Boxes,
    insight: "The list tells us what is present—not what happens next.",
  },
  {
    title: "Collaboration",
    label: "How things meet",
    icon: Workflow,
    insight: "Preparation, timing and combination change how the meal behaves.",
  },
  {
    title: "Optimization",
    label: "What works for you",
    icon: SlidersHorizontal,
    insight: "The useful answer is the interaction that fits the person and the day.",
  },
] as const;

export function HypothesisExperiment() {
  const [active, setActive] = useState(1);
  const current = stages[active];

  return (
    <div className="hypothesis-lab">
      <div className="hypothesis-controls">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/45">Explore the interaction</span>
          <p className="mt-1 font-serif text-lg text-ink/75">Hover or select a part of the whole.</p>
        </div>
        <span className="hypothesis-run">Three inputs · one useful outcome</span>
      </div>

      <div className="hypothesis-selector" role="tablist" aria-label="Choose an interaction">
        {stages.map((stage, index) => {
          const Icon = stage.icon;
          return (
            <button
              key={stage.title}
              type="button"
              role="tab"
              aria-selected={active === index}
              className={`hypothesis-selector-item ${active === index ? "is-active" : ""}`}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onClick={() => setActive(index)}
            >
              <Icon aria-hidden="true" />
              <span>{stage.title}</span>
            </button>
          );
        })}
      </div>

      <div className="hypothesis-interaction">
        <div className="hypothesis-venn" aria-label="Overlapping ingredients, context and preferences">
          {stages.map((stage, index) => (
            <button
              key={stage.title}
              type="button"
              className={`hypothesis-venn-circle venn-${index + 1} ${active === index ? "is-active" : ""}`}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onClick={() => setActive(index)}
              aria-label={stage.title}
            >
              {stage.title}
            </button>
          ))}
          <span className="hypothesis-venn-centre"><Sparkles aria-hidden="true" />Better fit</span>
        </div>

        <article className="hypothesis-detail" aria-live="polite">
          <span className="hypothesis-detail-number">0{active + 1}</span>
          <current.icon aria-hidden="true" />
          <span className="hypothesis-detail-label">{current.label}</span>
          <h3>{current.title}</h3>
          <p>{current.insight}</p>
          <span className="hypothesis-detail-note">The overlap is the point.</span>
        </article>
      </div>

      <p className="happiness-thesis">The ultimate secret ingredient to diet consistency isn’t a macro. It’s safeguarding the sheer joy of eating.</p>
    </div>
  );
}
