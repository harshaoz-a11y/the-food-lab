import { useEffect, useRef, useState } from 'react';
import { EGGS } from './eggPlateData';
import './EggPlate.css';

/**
 * <EggPlate /> – raw vs cooked egg illustration with live lettering and a count-up.
 *  value / onChange  controlled mode, keys: 'raw' | 'cooked'  (wire to your "Raw egg / Cooked egg" pills)
 *  defaultValue      uncontrolled start (default 'raw')
 *  showTabs          render built-in pills (default: only when uncontrolled)
 *  caption           line under the number
 *  figures           { raw: 51, cooked: 91 }
 */
const TABS = [
  { key: 'raw', tab: 'Raw egg', label: 'RAW', tone: 'brick' },
  { key: 'cooked', tab: 'Cooked egg', label: 'COOKED', tone: 'green' },
];
const WASH = 'M96 392 C86 232 226 96 430 90 C640 84 800 198 790 372 C782 520 640 650 440 652 C250 654 104 546 96 392Z';

function useCount(active, from, to) {
  const [n, setN] = useState(active ? to : from);
  useEffect(() => {
    if (!active) return setN(from);
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return setN(to);
    let raf, t0;
    const delay = setTimeout(() => {
      const step = (t) => {
        t0 ??= t;
        const k = Math.min((t - t0) / 1100, 1);
        setN(from + (to - from) * (1 - Math.pow(1 - k, 3)));
        if (k < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, 350);
    return () => { clearTimeout(delay); cancelAnimationFrame(raf); };
  }, [active, from, to]);
  return Math.round(n);
}

function Plate({ t, active, from, to, caption }) {
  const n = useCount(active, from, to);
  const runs = EGGS[t.key].runs;
  const draw = (layer) => runs.filter((r) => r[0] === layer).map(([, b, d], i) => <path key={i} className={`fl-e-${b}`} d={d} />);
  return (
    <span className={`fl-egg__plate${active ? ' is-active' : ''}`} aria-hidden={!active}>
      <svg viewBox="0 0 1064 960" role="img" aria-label={`${t.label.toLowerCase()} egg: about ${to}% ${caption}`}>
        <path className={`fl-egg__wash fl-egg__wash--${t.tone}`} d={WASH} />
        <g>{draw('base')}</g>
        {t.key === 'raw' && (
          <>
            <g className="fl-egg__shards">{draw('shards')}</g>
            <g transform="translate(638 487)"><ellipse className="fl-egg__ring" rx="62" ry="9" /></g>
            <g transform="translate(638 487)"><ellipse className="fl-egg__ring fl-egg__ring--b" rx="62" ry="9" /></g>
          </>
        )}
        {t.key === 'cooked' && <g className="fl-egg__steam">{draw('steam')}</g>}
        <text className="fl-egg__label" x="826" y="132" fontSize="104" textAnchor="middle">{t.label}</text>
        <path className={`fl-egg__rule fl-egg__rule--${t.tone}`} pathLength="1" d="M672 166 C740 156 860 172 972 160" />
        <text className="fl-egg__num" x="532" y="822" fontSize="236" textAnchor="middle">~{n}%</text>
        <text className="fl-egg__cap" x="540" y="904" fontSize="60" textAnchor="middle" textLength="690" lengthAdjust="spacingAndGlyphs">{caption}</text>
      </svg>
    </span>
  );
}

export default function EggPlate({ value, defaultValue = 'raw', onChange, showTabs, caption = 'true ileal protein digestibility', figures = { raw: 51, cooked: 91 }, className = '' }) {
  const [inner, setInner] = useState(defaultValue);
  const controlled = value !== undefined;
  const active = controlled ? value : inner;
  const select = (k) => { if (!controlled) setInner(k); onChange?.(k); };
  const root = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return setSeen(true);
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setSeen(true), io.disconnect()), { threshold: 0.25 });
    io.observe(root.current);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={root} className={`fl-egg${seen ? ' is-in' : ''} ${className}`}>
      {(showTabs ?? !controlled) && (
        <div className="fl-egg__tabs" role="tablist">
          {TABS.map((t) => (
            <button key={t.key} role="tab" type="button" className="fl-egg__tab" aria-selected={active === t.key} onClick={() => select(t.key)}>{t.tab}</button>
          ))}
        </div>
      )}
      <div className="fl-egg__stage">
        {TABS.map((t, i) => (
          <Plate key={t.key} t={t} active={active === t.key} from={figures[TABS[1 - i].key]} to={figures[t.key]} caption={caption} />
        ))}
      </div>
    </div>
  );
}
