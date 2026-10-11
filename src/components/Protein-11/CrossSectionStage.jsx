import { useId, useMemo } from 'react';
import './CrossSectionStage.css';

/**
 * <CrossSectionStage src selected ingredients />
 * One photo only: the Protein 11 cross-section. Choosing a partnership dims the photo
 * and opens soft spotlights on the parts of the bar that partnership is about, with
 * hand-drawn rings, leader lines and labelled chips. Ingredients you cannot see in the
 * cut (powders, liquids, salt) are pointed at in the bar's matrix and marked "in the mix".
 *
 *   src          URL of the cross-section photo (1536 × 1024, the coordinates below are in its pixels)
 *   selected     a partnership ({ ingredients: [ids] }) or null for the whole bar
 *   ingredients  [{ id, name, perBar }]
 *   alt          alt text for the photo
 *
 * To re-aim a spotlight, edit SPOTS: points are [x, y, radius] in photo pixels;
 * label is where the chip's centre sits.
 */
const W = 1536, H = 1024;

export const SPOTS = {
  almonds:          { label: [330, 84],   points: [[487, 331, 72], [953, 527, 76], [1480, 800, 70]] },
  walnuts:          { label: [1260, 84],  points: [[1233, 653, 62], [427, 513, 56], [1460, 200, 70]] },
  blueberries:      { label: [760, 84],   points: [[740, 207, 56], [267, 493, 50], [827, 513, 50], [1240, 567, 46]] },
  'raisins-black':  { label: [1190, 905], points: [[853, 933, 82], [507, 460, 44], [980, 640, 48]] },
  oats:             { label: [260, 880],  points: [[467, 816, 72], [247, 953, 62], [560, 167, 40], [1373, 560, 42]] },
  flax:             { label: [760, 900],  points: [[493, 893, 26], [487, 967, 26], [567, 1004, 26]] },
  orangezest:       { label: [300, 170],  points: [[387, 240, 36], [1180, 350, 36], [1067, 247, 34]] },
  // not visible in the cut: these point at the crumb they are mixed into
  whey:             { label: [700, 780],  points: [[933, 440, 58]], hidden: true },
  casein:           { label: [1230, 800], points: [[1093, 440, 58]], hidden: true },
  pbpowder:         { label: [380, 84],   points: [[173, 573, 58]], hidden: true },
  cocoa:            { label: [1230, 800], points: [[1040, 667, 54]], hidden: true },
  isabgol:          { label: [1180, 84],  points: [[1413, 627, 54]], hidden: true },
  almondmilk:       { label: [1220, 180], points: [[1347, 373, 54]], hidden: true },
  monkfruit:        { label: [760, 84],   points: [[880, 400, 50]], hidden: true },
  pinksalt:         { label: [700, 780],  points: [[720, 600, 46]], hidden: true },
  'raisins-ground': { label: [380, 84],   points: [[600, 387, 54]], hidden: true },
};

const VISIBLE = ['almonds', 'walnuts', 'blueberries', 'raisins-black', 'oats', 'orangezest'];

function ringPath(cx, cy, r, seed) {
  // a slightly wobbly, hand-drawn circle that overshoots its start
  const n = 18, pts = [];
  for (let i = 0; i <= n + 2; i++) {
    const a = (i / n) * Math.PI * 2 - 0.6, w = 1 + 0.05 * Math.sin(i * 1.7 + seed) + 0.03 * Math.cos(i * 2.9 + seed * 2);
    pts.push([cx + Math.cos(a) * r * w, cy + Math.sin(a) * r * w * 0.96]);
  }
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const mx = (pts[i][0] + pts[i + 1][0]) / 2, my = (pts[i][1] + pts[i + 1][1]) / 2;
    d += ` Q${pts[i][0].toFixed(1)} ${pts[i][1].toFixed(1)} ${mx.toFixed(1)} ${my.toFixed(1)}`;
  }
  return d;
}

function leader([px, py, pr], [lx, ly]) {
  const dx = lx - px, dy = ly - py, len = Math.hypot(dx, dy) || 1;
  const sx = px + (dx / len) * (pr + 6), sy = py + (dy / len) * (pr + 6);
  const ex = lx - (dx / len) * 26, ey = ly - (dy / len) * 22;
  const cx = (sx + ex) / 2 - dy * 0.12, cy = (sy + ey) / 2 + dx * 0.12;
  return `M${sx.toFixed(1)} ${sy.toFixed(1)} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`;
}

export default function CrossSectionStage({ src, selected = null, ingredients, alt = 'Protein 11 bar, cut open', className = '' }) {
  const uid = useId().replace(/:/g, '');
  const byId = useMemo(() => Object.fromEntries(ingredients.map((i) => [i.id, i])), [ingredients]);
  const ids = (selected?.ingredients || []).filter((id) => SPOTS[id]);
  const active = ids.length > 0;

  // a gentle push-in when a partnership is chosen (scale only, so labels near the edges stay in frame)
  const zoom = { s: active ? 1.04 : 1 };

  return (
    <figure className={`css-stage${active ? ' is-active' : ''} ${className}`}>
      <div className="css-stage__frame">
        <div
          className="css-stage__zoom"
          style={{ transform: `scale(${zoom.s})` }}
        >
          <img className="css-stage__img" src={src} alt={alt} draggable="false" />

          <svg key={'svg-' + (selected?.id || 'whole')} className="css-stage__svg" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <defs>
              <radialGradient id={`${uid}-hole`}>
                <stop offset="0" stopColor="#000" />
                <stop offset="0.72" stopColor="#000" />
                <stop offset="1" stopColor="#fff" />
              </radialGradient>
              <mask id={`${uid}-mask`} maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
                <rect width={W} height={H} fill="#fff" />
                {ids.flatMap((id, i) =>
                  SPOTS[id].points.map(([x, y, r], j) => (
                    <circle key={`${id}${j}`} cx={x} cy={y} r={r * 1.5} fill={`url(#${uid}-hole)`} />
                  )),
                )}
              </mask>
            </defs>

            {/* dim everything except the spotlights */}
            <rect className="css-scrim" width={W} height={H} mask={`url(#${uid}-mask)`} />

            {/* whole-bar state: faint pulsing markers on what you can see in the cut */}
            {!active && VISIBLE.map((id, i) => {
              const [x, y] = SPOTS[id].points[0];
              return <circle key={id} className="css-pip" style={{ '--d': `${i * 0.35}s` }} cx={x} cy={y} r="9" />;
            })}

            {ids.map((id, i) => {
              const sp = SPOTS[id];
              return (
                <g key={id} style={{ '--d': `${0.25 + i * 0.18}s` }}>
                  {sp.points.map(([x, y, r], j) => (
                    <path key={j} className={`css-ring${sp.hidden ? ' css-ring--hidden' : ''}`} pathLength="1"
                      d={ringPath(x, y, r, i * 3 + j)} />
                  ))}
                  <path className="css-leader" pathLength="1" d={leader(sp.points[0], sp.label)} />
                  <g className="css-badge">
                    <circle cx={sp.points[0][0] + sp.points[0][2] * 0.72} cy={sp.points[0][1] - sp.points[0][2] * 0.72} r="19" />
                    <text x={sp.points[0][0] + sp.points[0][2] * 0.72} y={sp.points[0][1] - sp.points[0][2] * 0.72 + 7}>{i + 1}</text>
                  </g>
                </g>
              );
            })}
          </svg>

          <div key={'chips-' + (selected?.id || 'whole')} className="css-stage__chips">
            {ids.map((id, i) => {
              const sp = SPOTS[id], ing = byId[id];
              if (!ing) return null;
              return (
                <div key={id} className="css-chip" style={{ left: `${(sp.label[0] / W) * 100}%`, top: `${(sp.label[1] / H) * 100}%`, '--d': `${0.55 + i * 0.18}s` }}>
                  <i>{i + 1}</i>
                  <span>{ing.name}</span>
                  <b>{ing.perBar}</b>
                  {sp.hidden && <em>in the mix</em>}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* compact legend for small screens, where chips would crowd the photo */}
      {active && (
        <ol className="css-legend">
          {ids.map((id, i) => byId[id] && (
            <li key={id}><i>{i + 1}</i><span>{byId[id].name}</span><b>{byId[id].perBar}</b>{SPOTS[id].hidden && <em>in the mix</em>}</li>
          ))}
        </ol>
      )}
    </figure>
  );
}
