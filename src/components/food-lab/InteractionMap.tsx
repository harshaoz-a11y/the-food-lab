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
      <div className="map-stage" style={{ background: "linear-gradient(135deg, #d4a8a8 0%, #8b5a5a 100%)" }}>
        <img className="map-vitruvian" src={vitruvianClean} alt="" aria-hidden="true" />
        <span className="map-axis" style={{ color: "white", borderColor: "rgba(255,255,255,0.5)" }} aria-hidden="true" />
        <div className="map-centre" aria-label="One meal, many outcomes" style={{ left: "25%", color: "white" }}>
          <UtensilsCrossed aria-hidden="true" />
          <span>one meal</span>
          <small>many outcomes</small>
        </div>
        <div className="map-factors" aria-label="Factors interacting with a meal" style={{ '--stack-step': '55px' } as React.CSSProperties}>
          {factors.map(({ label, note, icon: Icon }, index) => (
            <div
              key={label}
              className="factor"
              style={{
                left: "85%",
                top: index * 20 + "%",
                color: "white",
                borderColor: "rgba(255,255,255,0.3)",
              }}
            >
              <Icon aria-hidden="true" style={{ color: "white" }} />
              <span className="factor-copy" style={{ color: "white" }}>
                <strong>{label}</strong>
                <small>{note}</small>
              </span>
            </div>
          ))}
        </div>
      </div>
      <figcaption id="map-caption" style={{ color: "#d68b7f", fontFamily: "\"Segoe Print\", cursive" }}>
        A meal is not a list. It is an event.
      </figcaption>
    </figure>
  );
}