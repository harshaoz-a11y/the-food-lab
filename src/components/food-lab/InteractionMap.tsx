import {
  AlarmClock,
  CookingPot,
  Layers3,
  Salad,
  Smile,
  UtensilsCrossed,
} from "lucide-react";

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
      <svg className="map-vitruvian" viewBox="0 0 360 360" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="180" cy="75" r="18" fill="currentColor" stroke="none" />
          <path d="M180 94 C164 113 162 149 166 190 C168 220 160 253 145 298" strokeWidth="18" />
          <path d="M180 94 C196 113 198 149 194 190 C192 220 200 253 215 298" strokeWidth="18" />
          <path d="M169 123 L94 184 M191 123 L266 184" strokeWidth="15" />
          <path d="M168 132 L68 132 M192 132 L292 132" strokeWidth="11" opacity=".75" />
          <path d="M168 190 L105 275 M192 190 L255 275" strokeWidth="12" opacity=".72" />
          <path d="M174 99 C177 142 177 180 180 218 C183 180 183 142 186 99" strokeWidth="3" opacity=".7" />
        </g>
      </svg>

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
