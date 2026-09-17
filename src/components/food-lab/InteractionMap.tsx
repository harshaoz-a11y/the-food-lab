import { AlarmClock, BellRing, CookingPot, Salad, Smile, UtensilsCrossed } from "lucide-react";
import vitruvianClean from "@/assets/maestro/vitruvian-clean.svg";

const factors = [
  { label: "the food", note: "What do I have vs. what I want?", icon: Salad },
  { label: "preparation", note: "Hot / cold / fresh / packaged / leftovers?", icon: CookingPot },
  { label: "timing", note: "When life allows", icon: AlarmClock },
  { label: "distractions", note: "Does my chewing or portion size suffer?", icon: BellRing },
  { label: "preferences and mood", note: "Sleep, joy of eating, stress, nostalgia?", icon: Smile },
];

export function InteractionMap() {
  return (
    <figure className="interaction-map" aria-labelledby="map-caption">
      <div className="map-stage" aria-hidden="true">
        <img className="map-vitruvian" src={vitruvianClean} alt="" />
        <span className="map-axis" />
        <div className="map-centre">
          <UtensilsCrossed />
          <span>one meal</span>
          <small>many outcomes</small>
        </div>
        <div className="map-factors">
          {factors.map(({ label, note, icon: Icon }) => (
            <div
              key={label}
              className="factor"
            >
              <Icon />
              <span className="factor-copy">
                <strong>{label}</strong>
                <small>{note}</small>
              </span>
            </div>
          ))}
        </div>
      </div>
      <figcaption id="map-caption">Observation-002</figcaption>
    </figure>
  );
}