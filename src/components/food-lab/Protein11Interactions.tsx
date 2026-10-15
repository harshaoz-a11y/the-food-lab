import React, { useMemo, useRef, useState } from "react";
import { Candy, Cherry, Droplet, Gauge, Grape, Milk, Nut, Package, Wheat, Citrus } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { INGREDIENTS, PARTNERSHIPS } from "@/components/Protein-11/protein11Data.js";
import CrossSectionStage from "@/components/Protein-11/CrossSectionStage";
import crossSection from "@/components/Protein-11/protein11-cross-section.webp";
import "./Protein11Interactions.css";

// Each partnership: a literal icon, its own colour, and a short label for the phone keypad
const PARTNERSHIP_LOOK: Record<string, { Icon: LucideIcon; color: string; short: string }> = {
  whole: { Icon: Package, color: "#173b30", short: "All 16" },
  "fast-slow": { Icon: Gauge, color: "#b5473a", short: "Fast / slow" },
  "dairy-plant": { Icon: Milk, color: "#2f6fa5", short: "Dairy + plant" },
  "fibre-layers": { Icon: Wheat, color: "#9a7a1c", short: "3 fibres" },
  binder: { Icon: Droplet, color: "#2f8c8c", short: "Binder" },
  "fibre-fruit": { Icon: Cherry, color: "#c2416b", short: "Fibre + fruit" },
  "fruit-two-forms": { Icon: Grape, color: "#6b3fa0", short: "Raisins" },
  "cocoa-orange": { Icon: Citrus, color: "#d9731f", short: "Cocoa + orange" },
  "salt-monk": { Icon: Candy, color: "#c48a12", short: "Salt + sweet" },
  "two-nuts": { Icon: Nut, color: "#7a4a2a", short: "2 nuts" },
};

function PartnershipMark({ id }: { id: string }) {
  const { Icon, color, short } = PARTNERSHIP_LOOK[id] ?? PARTNERSHIP_LOOK.whole;
  return (
    <span className="p11-item-num" aria-hidden="true" style={{ "--mark": color } as React.CSSProperties}>
      <Icon />
      <small>{short}</small>
    </span>
  );
}


export type Partnership = (typeof PARTNERSHIPS)[number];

export function Protein11Interactions() {
  // Partnership state for the particle bar
  const [selected, setSelected] = useState<Partnership | null>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // List starts with Whole bar (selected = null), followed by PARTNERSHIPS
  const allItems = useMemo(() => [null, ...PARTNERSHIPS] as const, []);

  // Groups derived from PARTNERSHIPS
  const groups = useMemo(() => {
    const map = new Map<string, Partnership[]>();
    for (const item of PARTNERSHIPS) {
      if (!map.has(item.group)) {
        map.set(item.group, []);
      }
      map.get(item.group)!.push(item);
    }
    return Array.from(map.entries()).map(([name, items]) => ({ name, items }));
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIdx = (index + 1) % allItems.length;
      setSelected(allItems[nextIdx]);
      buttonRefs.current[nextIdx]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevIdx = (index - 1 + allItems.length) % allItems.length;
      setSelected(allItems[prevIdx]);
      buttonRefs.current[prevIdx]?.focus();
    }
  };

  // On phones the partnerships are a sideways strip: bring the chosen one fully into view.
  const choose = (item: Partnership | null, button: HTMLButtonElement) => {
    setSelected(item);
    button.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
  };

  const currentTitle = selected ? selected.title : "Whole bar";
  const currentPlain = selected
    ? selected.plain
    : "Every ingredient is chosen for what it does with the others. Pick a partnership to see who works with whom.";
  const currentFine = selected
    ? selected.fine
    : "16 ingredients formulated to work together: fast and slow proteins, three fibres, and sweetness from fruit and monk fruit.";

  return (
    <div className="p11-experience-root" id="p11-experience">
      {/* Chapter 1: The Particle Bar Explorer */}
      <section
        id="p11-particle-stage"
        className="p11-interactions"
        aria-labelledby="p11-interactions-heading"
      >
        <header className="p11-header">
          <h3 id="p11-interactions-heading" className="p11-header__title">
            How this bar delivers more for less
          </h3>
        </header>

        <div className="p11-container">
          {/* Left column on desktop, stacked below stage on mobile */}
          <div
            className="p11-list-section"
            role="region"
            aria-label="Partnerships list"
          >
            {/* First item: Whole bar (selected = null) */}
            <div className="p11-list-group">
              <button
                type="button"
                ref={(el) => {
                  buttonRefs.current[0] = el;
                }}
                aria-pressed={selected === null}
                onClick={(e) => choose(null, e.currentTarget)}
                onKeyDown={(e) => handleKeyDown(e, 0)}
                className={`p11-item-btn ${selected === null ? "is-selected" : ""}`}
              >
                <PartnershipMark id="whole" />
                <span className="p11-item-title">Whole bar</span>
                <span className="p11-item-badge">All 16</span>
              </button>
            </div>

            {/* Grouped partnerships */}
            {groups.map((group) => (
              <div key={group.name} className="p11-list-group">
                <span className="p11-group-heading">{group.name}</span>
                <div
                  className="p11-group-items"
                  role="group"
                  aria-label={group.name}
                >
                  {group.items.map((item) => {
                    const itemIndex = allItems.findIndex(
                      (it) => it && it.id === item.id,
                    );
                    const isSelected = selected?.id === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        ref={(el) => {
                          buttonRefs.current[itemIndex] = el;
                        }}
                        aria-pressed={isSelected}
                        onClick={(e) => choose(item, e.currentTarget)}
                        onKeyDown={(e) => handleKeyDown(e, itemIndex)}
                        className={`p11-item-btn ${isSelected ? "is-selected" : ""}`}
                      >
                        <PartnershipMark id={item.id} />
                        <span className="p11-item-title">{item.title}</span>
                        <span className="p11-item-badge">
                          {item.ingredients.length} parts
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Right column on desktop, stacked above list on mobile */}
          <div className="p11-stage-section">
            <CrossSectionStage src={crossSection} selected={selected} ingredients={INGREDIENTS} />

            {/* Under-stage info & navigation */}
            <div
              className="p11-understage"
              aria-live="polite"
              aria-atomic="true"
            >
              <div className="p11-understage__copy">
                <h4 className="p11-understage__title">{currentTitle}</h4>
                <p className="p11-understage__plain">{currentPlain}</p>
              </div>

              <details className="p11-fine-print">
                <summary>Fine print</summary>
                <p>{currentFine}</p>
              </details>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Protein11Interactions;
