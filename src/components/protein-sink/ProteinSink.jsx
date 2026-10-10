import { useEffect, useRef, useState } from 'react';
import { SCENE } from './sinkSceneData';
import './ProteinSink.css';

/**
 * <ProteinSink />  – "all protein, not a scrap of fibre" kitchen scene with live lettering and motion.
 *  look        'laxman' (default: pen-and-ink hatching, light paper wash) | 'cream' (flat cream fills, no hatching)
 *  lines       the three speech-bubble lines
 *  signTitle   [line1, line2] on the notice board
 *  signItems   [[text, ticked], ...]
 */
const LINES = [[1044, 82, 30, 135, 'All protein...'], [1042, 112, 30, 165, 'and not a scrap'], [1035, 141, 30, 89, 'of fibre.']];
const JARS = [
  ['WHEY', 207.5, 384, 27, 50], ['CASEIN', 308, 360, 30, 56], ['PEA', 432.5, 320, 37, 32], ['EGG', 569, 352, 31, 32], ['YEAST', 672, 396, -17, 60],
];
const SIGN_TITLE = [['BALANCED', 837, 43, 20, 95], ['ROUTINE', 836, 62, 20, 73]];
const SIGN_ITEMS = [['EAT CLEAN', 801, 91, 78, true], ['TRAIN HARD', 801, 114, 85, true], ['HIT PROTEIN', 801, 137, 86, true], ['FIBER?', 802, 160, 60, false]];
const POURS = [[256, 395, 60], [357, 362, 70], [487, 338, 95], [527, 352, 85], [612, 396, 55]];
const BUBBLES = [[320, 452], [395, 462], [480, 455], [548, 448], [605, 462]];

const Txt = ({ x, y, size, len, className = 'fl-s-txt', anchor = 'middle', children }) => (
  <text x={x} y={y} fontSize={size} textLength={len} lengthAdjust="spacingAndGlyphs" textAnchor={anchor} className={className}>{children}</text>
);

export default function ProteinSink({ look = 'laxman', lines, signTitle, signItems, className = '' }) {
  const q = SCENE;
  const root = useRef(null);
  const [seen, setSeen] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return setSeen(true);
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setSeen(true), io.disconnect()), { threshold: 0.2 });
    io.observe(root.current);
    return () => io.disconnect();
  }, []);

  const handleToggleReveal = () => {
    setRevealed((prev) => !prev);
  };

  const fills = (f) => (
    <g className="fl-s-fills" transform="translate(1.2 1.2)">
      {Object.entries(f).map(([k, d]) => <path key={k} className={`fl-s-${k}`} fillRule="evenodd" d={d} />)}
    </g>
  );
  const bub = lines ? LINES.map((l, i) => [l[0], l[1], l[2], l[3], lines[i] ?? l[4]]) : LINES;
  const title = signTitle ? SIGN_TITLE.map((l, i) => [...l.slice(0, 4), l[4], signTitle[i] ?? l[0]]) : SIGN_TITLE.map((l) => [...l, l[0]]);
  const items = signItems ? signItems.map((it, i) => [it[0], SIGN_ITEMS[i][1], SIGN_ITEMS[i][2], SIGN_ITEMS[i][3], it[1]]) : SIGN_ITEMS;
  const [tx, ty] = q.tip;

  return (
    <figure ref={root} className={`fl-sink fl-sink--${look}${seen ? ' is-in' : ''} ${className}`}>
      <div className="fl-sink__art">
        <svg viewBox="0 0 1168 784" role="img" aria-label="Five people pour protein powders into an overflowing sink while a man holding a plunger says: all protein and not a scrap of fibre.">
          <defs>
            {/* SVG blur filter fallback */}
            <filter id="fl-reveal-blur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="13" />
            </filter>

            {/* Clip path covering the 5 people, sink, jars, and notice board */}
            <clipPath id="fl-clip-scene-main">
              <rect x="0" y="0" width="715" height="784" />
              <rect x="715" y="0" width="230" height="210" />
            </clipPath>

            {/* Clip path covering the plumber, plunger, and toolbox */}
            <clipPath id="fl-clip-plumber">
              <path d="M 700 480 L 850 480 L 850 200 L 1168 200 L 1168 784 L 700 784 Z" />
            </clipPath>

            {/* Base scene vector art */}
            <g id="fl-scene-base">
              {fills(q.fills)}
              {q.hatch && <g className="fl-s-hatch"><path className="fl-h-light" d={q.hatch.light} /><path className="fl-h-dark" d={q.hatch.dark} /></g>}
              <g className="fl-s-ink" transform="translate(0 784) scale(.1 -.1)">{q.ink.map((d, i) => <path key={i} d={d} />)}</g>
            </g>
          </defs>

          {/* Main scene (5 people, sink, jars, counter, notice board background) - unblurred */}
          <g clipPath="url(#fl-clip-scene-main)">
            <use href="#fl-scene-base" xlinkHref="#fl-scene-base" />
          </g>

          {/* Plumber and toolbox artwork - blurred on first view, clear when revealed */}
          <g
            clipPath="url(#fl-clip-plumber)"
            className={`fl-reveal-target ${revealed ? 'is-revealed' : 'is-blurred'}`}
            filter={revealed ? undefined : 'url(#fl-reveal-blur)'}
            onClick={handleToggleReveal}
            role="button"
            tabIndex={0}
            aria-label={revealed ? "Plumber and toolbox revealed" : "Click to reveal plumber and toolbox"}
            style={{ cursor: revealed ? 'default' : 'pointer' }}
          >
            <use href="#fl-scene-base" xlinkHref="#fl-scene-base" />
          </g>

          {/* Invisible click hotspot over blurred plumber area for effortless interaction */}
          {!revealed && (
            <rect
              x="700"
              y="200"
              width="468"
              height="584"
              fill="transparent"
              onClick={handleToggleReveal}
              style={{ cursor: 'pointer' }}
              aria-hidden="true"
            />
          )}

          {/* Protein jars on shelves and counter */}
          {JARS.map(([t, x, y, a, l]) => (
            <g key={t} transform={`rotate(${a} ${x} ${y})`}><Txt x={x} y={y + 6} size={18} len={l}>{t}</Txt></g>
          ))}

          {/* Toolbox text & shirt badge - blurred on first view, clear when revealed */}
          <g
            className={`fl-reveal-target ${revealed ? 'is-revealed' : 'is-blurred'}`}
            filter={revealed ? undefined : 'url(#fl-reveal-blur)'}
            onClick={handleToggleReveal}
            style={{ cursor: revealed ? 'default' : 'pointer' }}
          >
            <g transform="rotate(16 895 574)"><Txt x={895} y={583} size={28} len={42} className="fl-s-txt fl-s-green-txt">GUT</Txt></g>
            <g transform="rotate(16 896 602)"><Txt x={896} y={611} size={26} len={115} className="fl-s-txt fl-s-green-txt">MICROBIOME</Txt></g>
            <Txt x={1058} y={325} size={12} len={30}>FIBER</Txt>
          </g>

          {/* Notice board title */}
          {title.map(([t, x, y, s, l, c]) => <Txt key={t} x={x} y={y} size={s} len={l}>{c}</Txt>)}

          {/* Notice board items - FIBER? is blurred on first view, clear when revealed */}
          {items.map(([t, x, y, l, ok], i) => (
            <g key={t}>
              {ok && <path className="fl-tick" style={{ '--i': i }} pathLength="1" d={`M782 ${y - 7} L787 ${y - 1} L795 ${y - 14}`} />}
              {ok ? (
                <Txt x={x} y={y} size={19} len={l} anchor="start">{t}</Txt>
              ) : (
                <g transform={`translate(${x + l / 2} ${y - 7})`}>
                  <g
                    className={`fl-fiber fl-reveal-target ${revealed ? 'is-revealed' : 'is-blurred'}`}
                    filter={revealed ? undefined : 'url(#fl-reveal-blur)'}
                    onClick={handleToggleReveal}
                    style={{ cursor: revealed ? 'default' : 'pointer' }}
                  >
                    <Txt x={0} y={7} size={19} len={l} className="fl-s-txt fl-s-brick-txt">{t}</Txt>
                  </g>
                </g>
              )}
            </g>
          ))}

          {/* Falling powder drops and sink foam bubbles */}
          {POURS.map(([x, y, dy], i) => [0, 1, 2].map((k) => (
            <g key={`${i}${k}`} transform={`translate(${x + k * 2} ${y})`}>
              <path className="fl-drop" style={{ '--dy': `${dy}px`, '--d': `${i * 0.23 + k * 0.5}s` }} d="M0-5 C3 0 4 3 0 5 C-4 3-3 0 0-5Z" />
            </g>
          )))}
          {BUBBLES.map(([x, y], i) => (
            <g key={i} transform={`translate(${x} ${y})`}><circle className="fl-bub" style={{ '--d': `${i * 0.5}s` }} r="6" /></g>
          ))}

          {/* Clickable callout bubble above the 5 people */}
          <g
            className="fl-callout-bubble"
            onClick={handleToggleReveal}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleToggleReveal(); }}
            role="button"
            tabIndex={0}
            aria-label={revealed ? "Why isn't it working! Click to re-blur scene" : "Why isn't it working! Click to see why"}
          >
            <path
              d="M 315 46 C 295 46 280 60 280 78 L 280 110 C 280 128 295 142 315 142 L 420 142 L 435 176 L 450 142 L 565 142 C 585 142 600 128 600 110 L 600 78 C 600 60 585 46 565 46 Z"
              className="fl-callout-bg"
            />
            <text x={440} y={84} textAnchor="middle" className="fl-callout-title">
              Why isn't it working!!!
            </text>
            {!revealed ? (
              <g className="fl-callout-action">
                <text x={440} y={116} textAnchor="middle" className="fl-callout-flash-text">
                  Click to see
                </text>
                <line x1={370} y1={126} x2={510} y2={126} className="fl-callout-flash-line" />
              </g>
            ) : (
              <g className="fl-callout-action">
                <text x={440} y={116} textAnchor="middle" className="fl-callout-revealed-text">
                  ✓ Missing fibre! (Click to hide)
                </text>
                <line x1={340} y1={126} x2={540} y2={126} className="fl-callout-revealed-line" />
              </g>
            )}
          </g>

          {/* Plumber's comment (speech bubble) - blurred on first view, clear when revealed */}
          <g transform={`translate(${tx} ${ty})`}>
            <g
              className={`fl-pop fl-reveal-target ${revealed ? 'is-revealed' : 'is-blurred'}`}
              filter={revealed ? undefined : 'url(#fl-reveal-blur)'}
              onClick={handleToggleReveal}
              style={{ cursor: revealed ? 'default' : 'pointer' }}
            >
              <g transform={`translate(${-tx} ${-ty})`}>
                {fills(q.bubbleFills)}
                <g className="fl-s-ink" transform="translate(0 784) scale(.1 -.1)"><path d={q.bubbleInk} /></g>
                {bub.map(([x, y, s, l, t]) => <Txt key={t} x={x} y={y} size={s} len={l}>{t}</Txt>)}
              </g>
            </g>
          </g>
        </svg>
      </div>
    </figure>
  );
}
