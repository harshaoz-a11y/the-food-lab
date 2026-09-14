import { AlarmClock, BellRing, CookingPot, Salad, Smile, UtensilsCrossed } from "lucide-react";
import vitruvianClean from "@/assets/maestro/vitruvian-clean.svg";

const factors = [{
    label: "the food",
    note: "What do I have vs. what I want?",
    icon: Salad
}, {
    label: "preparation",
    note: "Hot / cold / fresh / packaged / leftovers?",
    icon: CookingPot
}, {
    label: "timing",
    note: "When life allows",
    icon: AlarmClock
}, {
    label: "distractions",
    note: "Does my chewing or portion size suffer?",
    icon: BellRing
}, {
    label: "preferences and mood",
    note: "Sleep, joy of eating, stress, nostalgia?",
    icon: Smile
}];

export function InteractionMap() {
    return (
        <figure className="interaction-map" aria-labelledby="map-caption">
            <div className="map-stage">
                <img className="map-vitruvian" src={vitruvianClean} alt="" aria-hidden="true" />
                <span className="map-axis" aria-hidden="true" />
                <div className="map-centre" aria-label="One meal, many outcomes">
                    <UtensilsCrossed aria-hidden="true" />
                    <span>one meal</span>
                    <small>many outcomes</small>
                </div>
                <div className="map-factors" aria-label="Factors interacting with a meal">
                    {factors.map((
                        {
                            label,
                            note,
                            icon: Icon
                        }
                    ) => (<div className="factor" key={label}>
                        <Icon aria-hidden="true" />
                        <span className="factor-copy">
                            <strong>{label}</strong>
                            <small>{note}</small>
                        </span>
                    </div>))}
                </div>
            </div>
            <figcaption id="map-caption">A meal is not a list. It is an event.</figcaption>
        </figure>
    );
}