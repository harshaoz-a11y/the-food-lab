import { memo, useEffect, useId, useRef, useState } from 'react';
import { PANELS } from './riceComicData';
import './RiceComic.css';

/**
 * <RiceComic />  – three-panel rice illustration whose lettering, colour and motion belong to the page.
 *  value / onChange  controlled mode, keys: 'fresh' | 'reheated' | 'oil'  (wire to your existing tabs)
 *  defaultValue      uncontrolled start panel (default 'fresh')
 *  showTabs          render built-in pills (default: only when uncontrolled)
 */
const TABS = [
  { key: 'fresh', tab: 'Fresh', label: 'Fresh cooked rice (hot)' },
  { key: 'reheated', tab: 'Refrigerated + reheated', label: 'Refrigerated & reheated rice' },
  { key: 'oil', tab: 'Coconut oil + chilled', label: 'Coconut oil + refrigerated rice' },
];
const TILT = { fresh: '-.35deg', reheated: '.25deg', oil: '-.2deg' };
const TIP = { fresh: [365, 372], reheated: [798, 366], oil: [1284, 326] };
const BUBBLE = {
  fresh: [[361, 214, 26, 163, 'Oh, the energy!'], [358, 245, 26, 79, 'So hot!']],
  reheated: [[850, 209, 27, 72, 'This is'], [850, 243, 27, 88, 'cooler...'], [850, 273, 27, 76, 'but the'], [850, 304, 27, 80, 'starch?']],
  oil: [[1252, 200, 29, 230, 'Ah! With Coconut Oil'], [1248, 233, 29, 214, '- Low GI and happy'], [1247, 263, 29, 157, 'happy tummy!']],
};
const CURVES = {
  fresh: { tone: 'brick', smooth: false, pts: [[0, .9], [.14, .9], [.26, .16], [.34, .55], [.46, .05], [.56, .6], [.68, .2], [.8, .3], [1, .3]] },
  reheated: { tone: 'soft', smooth: true, pts: [[0, .9], [.2, .85], [.4, .5], [.55, .38], [.75, .5], [1, .78]] },
  oil: { tone: 'green', smooth: true, pts: [[0, .9], [.25, .85], [.45, .68], [.6, .64], [.8, .74], [1, .86]] },
};

function curveD(pts, [x, y, w, h], smooth) {
  const ax = x + 20, ay = y + 14, aw = w - 38, ah = h - 36;
  const P = pts.map(([u, v]) => [ax + u * aw, ay + v * ah]);
  if (!smooth) return 'M' + P.map((p) => p.map((n) => n.toFixed(1)).join(' ')).join(' L');
  let d = `M${P[0][0].toFixed(1)} ${P[0][1].toFixed(1)}`;
  for (let i = 0; i < P.length - 1; i++) {
    const p0 = P[i - 1] || P[i], p1 = P[i], p2 = P[i + 1], p3 = P[i + 2] || p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1.map((n) => n.toFixed(1)).join(' ')} ${c2.map((n) => n.toFixed(1)).join(' ')} ${p2.map((n) => n.toFixed(1)).join(' ')}`;
  }
  return d;
}

const Txt = ({ x, y, size, len, className = 'fl-txt', children }) => (
  <text x={x} y={y} fontSize={size} textLength={len} lengthAdjust="spacingAndGlyphs" textAnchor="middle" className={className}>{children}</text>
);
const Spark = ({ x, y, i }) => (
  <g transform={`translate(${x} ${y})`}>
    <path className="fl-spark" style={{ '--i': i }} d="M0-9 L2.4-2.4 L9 0 L2.4 2.4 L0 9 L-2.4 2.4 L-9 0 L-2.4-2.4Z" />
  </g>
);

/* The traced art leaves the two men's faces blank. These pen strokes draw the features back in,
   placed in the same coordinates as the art and inked like the rest of the line work. */
const FACE_REHEATED = [
  'M693 397 q10 -6 22 -1', 'M735 394 q11 -5 21 1',               /* brows */
  'M697 409 q9 5 18 0', 'M737 408 q9 5 18 0',                    /* lowered lids: he is watching the spoon */
  'M706 413 l0 .1', 'M746 412 l0 .1',                            /* pupils */
  'M722 414 q-5 14 2 19 q5 1 8 -2',                              /* nose */
  'M703 450 q12 7 26 0',                                         /* mouth */
  'M708 467 q12 5 24 -1',                                        /* chin line */
];
const FACE_OIL = [
  'M1178 372 q9 -5 20 -1', 'M1221 371 q10 -4 20 2',            /* brows, lifted */
  'M1180 388 q9 -8 19 0', 'M1222 387 q9 -8 19 0',              /* happy closed eyes */
  'M1209 392 q-4 12 2 16 q4 1 8 -2',                           /* nose */
  'M1186 420 q23 17 47 -1', 'M1184 417 l-3 -3', 'M1235 418 l3 -3', /* wide smile */
  'M1176 404 q4 4 9 3', 'M1241 403 q-4 4 -9 3',                /* cheek creases */
];

function Face({ strokes }) {
  return (
    <g className="fl-face" fill="none" stroke="var(--fl-ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {strokes.map((d, i) => <path key={i} d={d} />)}
    </g>
  );
}

/* hand-placed live lettering and extras that sit on top of the traced art */
function Scene({ id }) {
  if (id === 'fresh')
    return (
      <g transform="translate(336 514)">
        <g className="fl-gi"><Txt x={0} y={9} size={25} len={84}>GI SPIKE!</Txt></g>
      </g>
    );
  if (id === 'reheated')
    return (
      <>
        <Face strokes={FACE_REHEATED} />
        <g className="fl-blink">
          <Txt x={611} y={258} size={48} len={38}>12</Txt>
          <g className="fl-axis" style={{ strokeWidth: 3 }}>
            <path d="M578 233 L588 238 M583 222 L590 230 M645 233 L635 238 M640 222 L633 230" />
          </g>
        </g>
        <Txt x={613} y={289} size={27} len={84}>HOURS</Txt>
        <Txt x={763} y={213} size={17} len={24} className="fl-txt fl-mono">12</Txt>
        <Txt x={760} y={233} size={11} len={42} className="fl-txt fl-mono">HOURS</Txt>
      </>
    );
  return (
    <>
      <Face strokes={FACE_OIL} />
      {['PURE|36|293', 'COCONUT|62|312', 'OIL|25|330', '- 1 TSP|46|347'].map((s) => {
        const [t, l, y] = s.split('|');
        return <Txt key={t} x={1022} y={+y} size={15} len={+l} className="fl-txt fl-mono">{t}</Txt>;
      })}
      <Spark x={1190} y={352} i={0} /><Spark x={1358} y={338} i={1} /><Spark x={1178} y={458} i={2} />
    </>
  );
}

const Panel = memo(function Panel({ p, tab, active, onSelect, uid, single }) {
  const [x0, y0, w, h] = p.vb;
  const id = (s) => `${uid}-${p.id}-${s}`;
  const cur = CURVES[p.id];
  const [cx, cy, cw, ch] = p.chart;
  const tip = TIP[p.id];
  const fills = (sc) => Object.entries(sc.fills).map(([k, d]) => <path key={k} className={`fl-f-${k}`} fillRule="evenodd" d={d} />);
  const ink = (cid) => (
    <g clipPath={`url(#${cid})`}><use href={`#${id('art')}`} className="fl-ink" transform="translate(0 768) scale(.1 -.1)" /></g>
  );
  const Wrap = single ? 'div' : 'button';
  const wrapProps = single
    ? { className: `fl-panel${active ? ' is-active' : ''}`, role: 'img', 'aria-label': tab.label, 'aria-hidden': !active }
    : { type: 'button', className: `fl-panel${active ? ' is-active' : ''}`, style: { '--tilt': TILT[p.id] }, 'aria-pressed': active, onClick: onSelect };
  return (
    <Wrap {...wrapProps}>
      <span className="fl-panel__label">
        {tab.label}
        <svg className="fl-mark" viewBox="0 0 100 8" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M2 5 C25 1 60 7 98 3" /></svg>
      </span>
      <span className="fl-art">
        <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={tab.label}>
          <defs>
            <path id={id('art')} d={p.art} />
            <clipPath id={id('base')}><path clipRule="evenodd" d={p.clip} /></clipPath>
            {p.layers.map((l) => <clipPath key={l.id} id={id(l.id)}><path clipRule="evenodd" d={l.clip} /></clipPath>)}
          </defs>
          <g transform={`translate(${-x0} ${-y0})`}>
            <g className="fl-fills" transform="translate(1.5 1.5)">{fills(p)}</g>
            {ink(id('base'))}
            {p.layers.map((l) => {
              const body = (
                <>
                  <g className="fl-fills" transform="translate(1.5 1.5)">{fills(l)}</g>
                  {ink(id(l.id))}
                  {l.id === 'bubble' && BUBBLE[p.id].map(([x, y, s, len, t]) => <Txt key={t} x={x} y={y} size={s} len={len}>{t}</Txt>)}
                </>
              );
              return l.id === 'bubble' ? (
                <g key={l.id} transform={`translate(${tip[0]} ${tip[1]})`}>
                  <g className="fl-pop"><g transform={`translate(${-tip[0]} ${-tip[1]})`}>{body}</g></g>
                </g>
              ) : <g key={l.id} className={`fl-${l.id}`}>{body}</g>;
            })}
            <Scene id={p.id} />
            <rect className="fl-plate" x={cx} y={cy} width={cw} height={ch} rx="3" />
            <path className="fl-axis" d={`M${cx + 12} ${cy + ch - 12} V${cy + 10} M${cx + 8} ${cy + 17} L${cx + 12} ${cy + 10} L${cx + 16} ${cy + 17} M${cx + 12} ${cy + ch - 12} H${cx + cw - 10} M${cx + cw - 17} ${cy + ch - 16} L${cx + cw - 10} ${cy + ch - 12} L${cx + cw - 17} ${cy + ch - 8}`} />
            <path className={`fl-curve fl-curve--${cur.tone}`} pathLength="1" d={curveD(cur.pts, p.chart, cur.smooth)} />
          </g>
        </svg>
      </span>
    </Wrap>
  );
});

export default function RiceComic({ value, defaultValue = 'fresh', onChange, showTabs, single = false, className = '' }) {
  const uid = useId().replace(/:/g, '');
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
    <div ref={root} className={`fl-rc${single ? ' fl-rc--single' : ''}${seen ? ' is-in' : ''} ${className}`}>
      {(showTabs ?? !controlled) && (
        <div className="fl-rc__tabs" role="tablist">
          {TABS.map((t) => (
            <button key={t.key} role="tab" type="button" className="fl-rc__tab" aria-selected={active === t.key} onClick={() => select(t.key)}>{t.tab}</button>
          ))}
        </div>
      )}
      <div className="fl-rc__panels">
        {PANELS.map((p, i) => <Panel key={p.id} p={p} tab={TABS[i]} active={active === p.id} onSelect={single ? undefined : () => select(p.id)} uid={uid} single={single} />)}
      </div>
    </div>
  );
}
