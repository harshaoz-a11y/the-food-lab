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
  { label: "the food", note: "what is there", icon: Salad, className: "factor-one" },
  { label: "preparation", note: "hot / cold / fresh / packaged / leftovers?", icon: CookingPot, className: "factor-two" },
  { label: "timing", note: "when life allows", icon: AlarmClock, className: "factor-three" },
  { label: "combination", note: "what arrives together", icon: Layers3, className: "factor-four" },
  { label: "preferences and mood", note: "what feels possible", icon: Smile, className: "factor-five" },
];

export function InteractionMap() {
  return (
    <figure className="interaction-map" aria-labelledby="map-caption">
      <img className="map-vitruvian" src={vitruvianClean} alt="" aria-hidden="true" />

      <div className="map-rule map-rule-one" />
      <div className="map-rule map-rule-two" />
      <div className="map-rule map-rule-three" />
      <div className="map-rule map-rule-four" />
      <div className="map-rule map-rule-five" />

      {factors.map(({ label, note, icon: Icon, className }) => (
        <div className={`factor ${className}`} key={label}>
          <Icon aria-hidden="true" />
          <strong>{label}</strong>
          <span>{note}</span>
        </div>
      ))}

      <div className="map-centre">
        <UtensilsCrossed aria-hidden="true" />
        <span>one meal</span>
        <small>many outcomes</small>
      </div>
      <figcaption id="map-caption">
        A meal is not a list. It is an event.
      </figcaption>
    </figure>
  );
}
