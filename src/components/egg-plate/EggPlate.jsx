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

function Plate({ t, active, to, caption }) {
  const runs = EGGS[t.key].runs;
  const draw = (layer) => runs.filter((r) => r[0] === layer).map(([, b, d], i) => <path key={i} className={`fl-e-${b}`} d={d} />);
  return (
    <span className={`fl-egg__plate${active ? ' is-active' : ''}`} aria-hidden={!active}>
      <svg viewBox="-100 -30 1010 700" role="img" aria-label={`${t.label.toLowerCase()} egg: about ${to}% ${caption}`}>
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
          <Plate key={t.key} t={t} active={active === t.key} to={figures[t.key]} caption={caption} />
        ))}
      </div>
    </div>
  );
}
