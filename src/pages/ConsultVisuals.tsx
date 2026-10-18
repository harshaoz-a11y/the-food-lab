import { useEffect, useId, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Flag } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import "./ConsultVisuals.css";

/**
 * One visual metaphor per consult stage, so each step looks like what it does:
 * a fit check that gets stamped, a map of your current eating, a blueprint,
 * a review board of sticky notes, and a loop of reviews.
 */

export type Tile = [LucideIcon, string, string];
export type VisualKind = "fit" | "map" | "blueprint" | "review" | "loop";

interface VisualProps {
    tiles: Tile[];
    deliverable: string;
}

// Animations start once the visual scrolls into view.
function useInView<T extends Element>() {
    const ref = useRef<T>(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el || !("IntersectionObserver" in window)) {
            setInView(true);
            return;
        }
        const io = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setInView(true);
                io.disconnect();
            }
        }, { threshold: 0.25 });
        io.observe(el);
        return () => io.disconnect();
    }, []);
    return [ref, inView] as const;
}

const order = (i: number) => ({ "--i": i }) as CSSProperties;

function Deliverable({ text, className = "" }: { text: string; className?: string }) {
    return (
        <p className={`cv-deliver ${className}`}>
            <span>You walk away with</span>
            {text}
        </p>
    );
}

/* 1 · Fit Call: an intake card, ticked line by line, then stamped */
function FitCheck({ tiles, deliverable }: VisualProps) {
    const [ref, inView] = useInView<HTMLDivElement>();
    const ringId = `cv-ring-${useId().replace(/:/g, "")}`;
    return (
        <div ref={ref} className={`cv-fit ${inView ? "is-in" : ""}`}>
            <div className="cv-fit__card">
                <span className="cv-fit__head">Fit check <em>· 20 min</em></span>
                <ol>
                    {tiles.map(([, title, line], i) => (
                        <li key={title} style={order(i)}>
                            <svg className="cv-fit__box" viewBox="0 0 24 24" aria-hidden="true">
                                <rect x="2.5" y="2.5" width="19" height="19" rx="4" />
                                <path className="cv-fit__tick" pathLength={1} d="M6.5 12.5l3.8 3.8L18 7.5" />
                            </svg>
                            <div>
                                <strong>{title}</strong>
                                <small>{line}</small>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
            <div className="cv-fit__verdict">
                <svg className="cv-stamp" viewBox="0 0 200 200" aria-hidden="true">
                    <defs>
                        <path id={ringId} d="M100,100 m-70,0 a70,70 0 1,1 140,0 a70,70 0 1,1 -140,0" />
                    </defs>
                    <circle cx="100" cy="100" r="93" className="cv-stamp__outer" />
                    <circle cx="100" cy="100" r="56" className="cv-stamp__inner" />
                    <text className="cv-stamp__ring">
                        <textPath href={`#${ringId}`} textLength="432">HONEST ANSWER · NO SALES PITCH · FREE ·</textPath>
                    </text>
                    <text x="100" y="96" textAnchor="middle" className="cv-stamp__big">RIGHT</text>
                    <text x="100" y="128" textAnchor="middle" className="cv-stamp__big">FIT?</text>
                </svg>
                <Deliverable text={deliverable} />
            </div>
        </div>
    );
}

/* 2 · Baseline Mapping: six stops on a route through your current day */
function smoothPath(points: number[][]) {
    if (points.length < 2) return "";
    let d = `M${points[0][0].toFixed(1)} ${points[0][1].toFixed(1)}`;
    for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i - 1] ?? points[i];
        const p1 = points[i];
        const p2 = points[i + 1];
        const p3 = points[i + 2] ?? p2;
        const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
        const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
        d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
    }
    return d;
}

function RouteMap({ tiles, deliverable }: VisualProps) {
    const [ref, inView] = useInView<HTMLDivElement>();
    const stopsRef = useRef<HTMLDivElement>(null);
    const anchors = useRef<(HTMLSpanElement | null)[]>([]);
    const [route, setRoute] = useState("");

    // the route is drawn through the pins wherever the layout puts them
    useEffect(() => {
        const stops = stopsRef.current;
        if (!stops) return;
        const draw = () => {
            const box = stops.getBoundingClientRect();
            const points = anchors.current
                .filter((el): el is HTMLSpanElement => el !== null)
                .map((el) => {
                    const r = el.getBoundingClientRect();
                    return [r.left - box.left + r.width / 2, r.top - box.top + r.height / 2];
                });
            setRoute(smoothPath(points));
        };
        draw();
        const ro = new ResizeObserver(draw);
        ro.observe(stops);
        return () => ro.disconnect();
    }, []);

    return (
        <div ref={ref} className={`cv-map ${inView ? "is-in" : ""}`}>
            <svg className="cv-map__terrain" viewBox="0 0 600 300" preserveAspectRatio="none" aria-hidden="true">
                <path d="M-20 60 C120 20 220 110 360 70 S560 30 640 80" />
                <path d="M-20 90 C110 55 230 140 370 100 S560 65 640 110" />
                <path d="M-20 220 C140 260 260 180 400 230 S560 270 640 210" />
                <path d="M-20 250 C150 290 270 210 410 260 S570 300 640 240" />
                <circle cx="480" cy="170" r="34" />
                <circle cx="480" cy="170" r="20" />
            </svg>
            <svg className="cv-map__compass" viewBox="0 0 40 40" aria-hidden="true">
                <circle cx="20" cy="20" r="17" />
                <path d="M20 5 L24 20 L20 35 L16 20 Z" />
                <path className="is-north" d="M20 5 L24 20 L16 20 Z" />
                <text x="20" y="3.5" textAnchor="middle">N</text>
            </svg>
            <span className="cv-map__label">Where you are today</span>
            <div ref={stopsRef} className="cv-map__body">
                <svg className="cv-map__route" aria-hidden="true">
                    <path d={route} />
                </svg>
                <ol className="cv-map__stops">
                {tiles.map(([, title, line], i) => (
                    <li key={title} style={order(i)}>
                        <span className="cv-map__pin" aria-hidden="true">
                            <svg viewBox="0 0 24 30">
                                <path d="M12 1.5C6.2 1.5 1.5 6 1.5 11.6 1.5 19.2 12 28.5 12 28.5s10.5-9.3 10.5-16.9C22.5 6 17.8 1.5 12 1.5z" />
                                <text x="12" y="15.5" textAnchor="middle">{i + 1}</text>
                            </svg>
                            <span ref={(el) => { anchors.current[i] = el; }} className="cv-map__anchor" />
                        </span>
                        <div>
                            <strong>{title}</strong>
                            <small>{line}</small>
                        </div>
                    </li>
                ))}
                </ol>
            </div>
            <div className="cv-map__key">
                <Flag aria-hidden="true" />
                <span>Map key</span>
                <Deliverable text={deliverable} className="is-inline" />
            </div>
        </div>
    );
}

/* 3 · Interaction Blueprint: a drawing sheet with detail callouts and a title block */
function Blueprint({ tiles, deliverable }: VisualProps) {
    const [ref, inView] = useInView<HTMLDivElement>();
    return (
        <div ref={ref} className={`cv-bp ${inView ? "is-in" : ""}`}>
            <span className="cv-bp__mark is-tl" aria-hidden="true" />
            <span className="cv-bp__mark is-tr" aria-hidden="true" />
            <span className="cv-bp__mark is-bl" aria-hidden="true" />
            <span className="cv-bp__mark is-br" aria-hidden="true" />
            <ol className="cv-bp__grid">
                {tiles.map(([Icon, title, line], i) => (
                    <li key={title} style={order(i)}>
                        <span className="cv-bp__detail">Detail {String.fromCharCode(65 + i)}</span>
                        <span className="cv-bp__icon"><Icon aria-hidden="true" /></span>
                        <strong>{title}</strong>
                        <small>{line}</small>
                    </li>
                ))}
            </ol>
            <div className="cv-bp__block">
                <span className="cv-bp__cell is-wide"><i>Drawing</i>Interaction Blueprint</span>
                <span className="cv-bp__cell"><i>Scale</i>1 week : 1 page</span>
                <span className="cv-bp__cell is-out"><i>You walk away with</i>{deliverable}</span>
            </div>
        </div>
    );
}

/* 4 · First Adaptation Review: a board of taped, handwritten notes */
const tilt = [-2.5, 1.8, -1.2, 2.4, -1.8, 1.4];

function ReviewBoard({ tiles, deliverable }: VisualProps) {
    const [ref, inView] = useInView<HTMLDivElement>();
    return (
        <div ref={ref} className={`cv-board ${inView ? "is-in" : ""}`}>
            <ol className="cv-board__notes">
                {tiles.map(([, title, line], i) => (
                    <li key={title} className={`cv-note cv-note--${i + 1}`} style={{ "--i": i, "--tilt": `${tilt[i % tilt.length]}deg` } as CSSProperties}>
                        <span className="cv-note__tape" aria-hidden="true" />
                        <strong>{title}</strong>
                        <small>{line}</small>
                    </li>
                ))}
            </ol>
            <Deliverable text={deliverable} className="is-marker" />
        </div>
    );
}

/* 5 · Adaptation Continuation: reviews 2, 3 and 4 as a loop */
function ReviewLoop({ tiles, deliverable }: VisualProps) {
    const [ref, inView] = useInView<HTMLDivElement>();
    const c = 110;
    const r = 82;
    const at = (deg: number) => [c + r * Math.cos((deg * Math.PI) / 180), c + r * Math.sin((deg * Math.PI) / 180)];
    const nodes: [number, string][] = [[-90, "R2"], [30, "R3"], [150, "R4"]];
    const arrows = [-30, 90, 210];
    return (
        <div ref={ref} className={`cv-loop ${inView ? "is-in" : ""}`}>
            <svg className="cv-loop__ring" viewBox="0 0 220 220" aria-hidden="true">
                <circle cx={c} cy={c} r={r} className="cv-loop__track" />
                <g className="cv-loop__arrows">
                    {arrows.map((deg) => {
                        const [x, y] = at(deg);
                        return <path key={deg} d="M-6 -6 L6 0 L-6 6" transform={`translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${deg + 90})`} />;
                    })}
                </g>
                {nodes.map(([deg, label]) => {
                    const [x, y] = at(deg);
                    return (
                        <g key={label} className="cv-loop__node" transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}>
                            <circle r="19" />
                            <text y="5" textAnchor="middle">{label}</text>
                        </g>
                    );
                })}
                <text x={c} y={c - 2} textAnchor="middle" className="cv-loop__weeks">6–8</text>
                <text x={c} y={c + 20} textAnchor="middle" className="cv-loop__unit">WEEKS</text>
            </svg>
            <div className="cv-loop__side">
                <ol className="cv-loop__list">
                    {tiles.map(([Icon, title, line], i) => (
                        <li key={title} style={order(i)}>
                            <span className="cv-loop__icon"><Icon aria-hidden="true" /></span>
                            <div>
                                <strong>{title}</strong>
                                <small>{line}</small>
                            </div>
                        </li>
                    ))}
                </ol>
                <Deliverable text={deliverable} />
            </div>
        </div>
    );
}

export function StageVisual({ kind, ...props }: VisualProps & { kind: VisualKind }) {
    if (kind === "fit") return <FitCheck {...props} />;
    if (kind === "map") return <RouteMap {...props} />;
    if (kind === "blueprint") return <Blueprint {...props} />;
    if (kind === "review") return <ReviewBoard {...props} />;
    return <ReviewLoop {...props} />;
}

export default StageVisual;
