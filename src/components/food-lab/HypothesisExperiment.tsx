import { useEffect, useState } from "react";
import { Boxes, Play, SlidersHorizontal, Sparkles, Workflow } from "lucide-react";

const stages = [
  {
    title: "Ingredients",
    label: "Raw material",
    icon: Boxes,
    insight: "The list tells us what is present—not what happens next.",
  },
  {
    title: "Collaboration",
    label: "The real magic",
    icon: Workflow,
    insight: "Preparation, timing and combination start changing how the meal behaves.",
  },
  {
    title: "Optimization",
    label: "Maximize synergy",
    icon: SlidersHorizontal,
    insight: "Tune those interactions around the person, the context and the outcome.",
  },
] as const;

export function HypothesisExperiment() {
  const [active, setActive] = useState(0);
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (!running) return;

    if (active === stages.length - 1) {
      const finish = window.setTimeout(() => {
        setCompleted(true);
        setRunning(false);
      }, 700);
      return () => window.clearTimeout(finish);
    }

    const advance = window.setTimeout(() => setActive((step) => step + 1), 700);
    return () => window.clearTimeout(advance);
  }, [active, running]);

  const runExperiment = () => {
    setCompleted(false);
    setActive(0);
    setRunning(true);
  };

  const inspectStage = (index: number) => {
    setRunning(false);
    setCompleted(index === stages.length - 1);
    setActive(index);
  };

  return (
    <div className={`hypothesis-lab ${running ? "is-running" : ""} ${completed ? "is-complete" : ""}`}>
      <div className="hypothesis-controls">
        <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink/45">Tap a stage to inspect it</span>
        <button type="button" className="hypothesis-run" onClick={runExperiment} disabled={running}>
          <Play aria-hidden="true" />
          {running ? "Reaction in progress…" : completed ? "Run it again" : "Run the interaction"}
        </button>
      </div>

      <div className="hypothesis-path" aria-label="Ingredients move through collaboration and optimization to create energy, outcome, and yumminess">
        {stages.map((stage, index) => {
          const Icon = stage.icon;
          const reached = index <= active;
          return (
            <div className="hypothesis-stage-wrap" key={stage.title}>
              <button
                type="button"
                className={`hypothesis-stage ${active === index ? "is-active" : ""} ${reached ? "is-reached" : ""}`}
                onClick={() => inspectStage(index)}
                aria-pressed={active === index}
              >
                <span className="hypothesis-stage-number">0{index + 1}</span>
                <Icon aria-hidden="true" />
                <strong>{stage.title}</strong>
                <small>{stage.label}</small>
              </button>
              {index < stages.length - 1 && (
                <span className={`hypothesis-connector ${index < active ? "is-reached" : ""}`} aria-hidden="true">
                  <i />
                </span>
              )}
            </div>
          );
        })}

        <span className={`hypothesis-equals ${completed ? "is-reached" : ""}`} aria-hidden="true">=</span>

        <div className="hypothesis-output" aria-live="polite">
          <Sparkles aria-hidden="true" />
          <span className="hypothesis-particle particle-one" />
          <span className="hypothesis-particle particle-two" />
          <span className="hypothesis-particle particle-three" />
          <strong>Energy<br />Outcome<br /><em>Yumminess!</em></strong>
          <small>What you deserve</small>
        </div>
      </div>

      <div key={active} className="hypothesis-observation" aria-live="polite">
        <span>Observation 0{active + 1}</span>
        <p>{stages[active].insight}</p>
      </div>
    </div>
  );
}
