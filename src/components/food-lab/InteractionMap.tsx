import {
  AlarmClock,
  CookingPot,
  Layers3,
  Salad,
  Smile,
  UtensilsCrossed,
} from "lucide-react";
import vitruvianClean from "@/assets/maestro/vitruvian-clean.svg";

const factors = [
  { label: "the food", note: "what is there", icon: Salad },
  { label: "preparation", note: "hot / cold / fresh / packaged / leftovers?", icon: CookingPot },
  { label: "timing", note: "when life allows", icon: AlarmClock },
  { label: "combination", note: "what arrives together", icon: Layers3 },
  { label: "preferences and mood", note: "what feels possible", icon: Smile },
];

export function InteractionMap() {
  return (
    <figure className="interaction-map" aria-labelledby="map-caption">
      <div className="map-stage" aria-hidden="true">
        <img className="map-vitruvian" src={vitruvianClean} alt="" />
        <div className="map-centre">
          <UtensilsCrossed />
          <span>one meal</span>
          <small>many outcomes</small>
        </div>
      </div>

      <div className="map-factors" aria-label="Factors interacting with a meal">
        {factors.map(({ label, note, icon: Icon }) => (
          <div className="factor" key={label}>
            <Icon aria-hidden="true" />
            <span className="factor-copy">
              <strong>{label}</strong>
              <small>{note}</small>
            </span>
          </div>
        ))}
      </div>

      <figcaption id="map-caption">A meal is not a list. It is an event.</figcaption>
    </figure>
  );
}
