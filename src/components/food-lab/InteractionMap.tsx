import {
  AlarmClock,
  CookingPot,
  HeartPulse,
  Layers3,
  Salad,
  UtensilsCrossed,
} from "lucide-react";

const factors = [
  { label: "ingredients", note: "what is there", icon: Salad, className: "factor-one" },
  { label: "preparation", note: "what heat changes", icon: CookingPot, className: "factor-two" },
  { label: "timing", note: "when life allows", icon: AlarmClock, className: "factor-three" },
  { label: "combination", note: "what arrives together", icon: Layers3, className: "factor-four" },
  { label: "your body", note: "what you receive", icon: HeartPulse, className: "factor-five" },
];

export function InteractionMap() {
  return (
    <figure className="interaction-map" aria-labelledby="map-caption">
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
