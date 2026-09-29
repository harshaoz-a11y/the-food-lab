import { useState } from "react";
import { AlarmClock, BellRing, CookingPot, Salad, Smile } from "lucide-react";
import vitruvianClean from "@/assets/maestro/vitruvian-clean.svg";

const factors = [
  {
    label: "the food",
    note: "What do I have? What do I want?",
    outcome: "the list",
    sentence: "The ingredients are present. That is not the whole story.",
    icon: Salad,
  },
  {
    label: "preparation",
    note: "Hot, cold, leftover, packaged",
    outcome: "changed",
    sentence: "The same item behaves differently once you cook, cool or reheat it.",
    icon: CookingPot,
  },
  {
    label: "timing",
    note: "When life allows",
    outcome: "late / rushed",
    sentence: "Breakfast existed. Eating it did not.",
    icon: AlarmClock,
  },
  {
    label: "distractions",
    note: "Calls, screens, other people",
    outcome: "unfinished",
    sentence: "Attention left the plate before the meal did.",
    icon: BellRing,
  },
  {
    label: "mood",
    note: "Sleep, stress, joy, nostalgia",
    outcome: "wanted / avoided",
    sentence: "If it isn’t enjoyable, it will not be repeated.",
    icon: Smile,
  },
];

const defaultCaption = "Hover over a condition. Watch the meal change.";

export function InteractionMap() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeFactor = activeIndex === null ? null : factors[activeIndex];

  return (
    <figure className="interaction-map" aria-labelledby="map-caption">
      <div className="map-stage">
        <img className="map-vitruvian" src={vitruvianClean} alt="" aria-hidden="true" />
        <div className="map-centre" aria-live="polite">
          <small className="map-centre-text" key={activeIndex ?? "default"}>{activeFactor?.outcome ?? "Many Decisions"}</small>
        </div>

        <div className="map-factors">
          {factors.map(({ label, note, icon: Icon }, index) => (
            <button
              key={label}
              type="button"
              className={`factor ${activeIndex === index ? "is-expanded" : "is-collapsed"}`}
              aria-pressed={activeIndex === index}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              onFocus={() => setActiveIndex(index)}
              onBlur={() => setActiveIndex(null)}
            >
              <Icon aria-hidden="true" />
              <span className="factor-copy">
                <strong>{label}</strong>
                <span className="factor-note" aria-hidden={activeIndex !== index}>
                  <span className="factor-ticker">{note}&nbsp;&nbsp; · &nbsp;&nbsp;{note}</span>
                </span>
              </span>
            </button>
          ))}
        </div>
        <figcaption id="map-caption" aria-live="polite">
          {activeFactor?.sentence ?? defaultCaption}
        </figcaption>
      </div>
    </figure>
  );
}
