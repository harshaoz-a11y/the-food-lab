import { AlarmClock, BellRing, CookingPot, Salad, Smile, UtensilsCrossed } from "lucide-react";
import vitruvianClean from "@/assets/maestro/vitruvian-clean.svg";

const factors = [
  { label: "the food", notes: ["What do I have?", "What do I want?"], icon: Salad },
  { label: "preparation", notes: ["Hot, cold or fresh", "Packaged or leftovers"], icon: CookingPot },
  { label: "timing", notes: ["When life allows"], icon: AlarmClock },
  { label: "distractions", notes: ["Chewing", "Portion size"], icon: BellRing },
  { label: "preferences and mood", notes: ["Sleep and stress", "Joy and nostalgia"], icon: Smile },
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
          {factors.map(({ label, notes, icon: Icon }) => (
            <div
              key={label}
              className="factor"
            >
              <Icon />
              <span className="factor-copy">
                <strong>{label}</strong>
                <ul>
                  {notes.map((note) => <li key={note}>{note}</li>)}
                </ul>
              </span>
            </div>
          ))}
        </div>
      </div>
      <figcaption id="map-caption">Observation-002</figcaption>
    </figure>
  );
}