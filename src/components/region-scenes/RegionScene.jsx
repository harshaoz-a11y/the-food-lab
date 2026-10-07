import { useEffect, useId, useRef, useState } from 'react';
import { SCENES } from './regionSceneData';
import './RegionScene.css';

/**
 * <RegionScene region="us" />  /  <RegionScene region="india" />
 * Two distinct scenes from the same artwork. All lettering is live text and every prop below is optional.
 *  title / reason   caption text above and below the scene (set to null to hide)
 *  lines            the three speech-bubble lines
 */
const COPY = {
  us: { title: 'In the U.S.', reason: 'I have celiac disease.' },
  india: { title: 'In India', reason: "I heard it's not good." },
};
const BUBBLE = {
  us: [[253, 91, 28, 145, 'NO, THANKS.'], [252, 122, 28, 132, "I DON'T EAT"], [253, 154, 28, 92, 'GLUTEN.']],
  india: [[708, 91, 28, 125, 'NO, THANKS.'], [707, 124, 28, 131, "I DON'T EAT"], [707, 157, 28, 85, 'GLUTEN.']],
};
const SIGN = [[292, 330, 24, 63, 'GLUTEN'], [288, 356, 24, 53, 'BREAD'], [284, 382, 24, 53, 'PASTA']];
const WISPS = [836, 858, 880];

const Txt = ({ x, y, size, len, children, className = 'fl-reg__txt' }) => (
  <text x={x} y={y} fontSize={size} textLength={len} lengthAdjust="spacingAndGlyphs" textAnchor="middle" className={className}>{children}</text>
);

export default function RegionScene({ region = 'us', title, reason, lines, className = '' }) {
  const q = SCENES[region];
  const copy = COPY[region];
  const uid = useId().replace(/:/g, '') + region;
  const [x0, y0, w, h] = q.vb;
  const root = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return setSeen(true);
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setSeen(true), io.disconnect()), { threshold: 0.25 });
    io.observe(root.current);
    return () => io.disconnect();
  }, []);
  const T = title === undefined ? copy.title : title;
  const Rn = reason === undefined ? copy.reason : reason;
  const fills = (f, clip) => (
    <g clipPath={`url(#${uid}-${clip})`}>
      <g className="fl-r-fills" transform="translate(1.2 1.2)">
        {Object.entries(f).map(([k, d]) => <path key={k} className={`fl-r-${k}`} fillRule="evenodd" d={d} />)}
      </g>
    </g>
  );
  const ink = (clip) => <g clipPath={`url(#${uid}-${clip})`}><use href={`#${uid}-ink`} className="fl-r-ink" /></g>;
  const [tx, ty] = q.tip;
  const [px, py] = q.pivot;
  const words = lines
    ? lines.map((t, i) => [BUBBLE[region][i][0], BUBBLE[region][i][1], BUBBLE[region][i][2], BUBBLE[region][i][3], t])
    : BUBBLE[region];
  return (
    <figure ref={root} className={`fl-reg fl-reg--${region}${seen ? ' is-in' : ''} ${className}`}>
      {T && <figcaption className="fl-reg__title">{T}</figcaption>}
      <div className="fl-reg__art">
        <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={`${T || region}: "No, thanks. I don't eat gluten."`}>
          <defs>
            <g id={`${uid}-ink`}>{q.ink.map((d, i) => <path key={i} d={d} />)}</g>
            <clipPath id={`${uid}-base`}><path d={q.clip} /></clipPath>
            <clipPath id={`${uid}-hand`}><path d={q.handClip} /></clipPath>
            <clipPath id={`${uid}-all`}><path d={`M${x0} ${y0} H${x0 + w} V${y0 + h} H${x0} Z`} /></clipPath>
          </defs>
          <g transform={`translate(${-x0} ${-y0})`}>
            {fills(q.fills, 'base')}
            {ink('base')}
            {q.detail?.map((d, i) => <path key={i} className="fl-r-ink fl-r-detail" fillRule="evenodd" d={d} />)}
            <g transform={`translate(${px} ${py})`}>
              <g className="fl-hand"><g transform={`translate(${-px} ${-py})`}>{fills(q.handFills, 'hand')}{ink('hand')}</g></g>
            </g>
            {region === 'us' && <g className="fl-sign" transform="rotate(3 288 356)">{SIGN.map(([x, y, s, l, t]) => <Txt key={t} x={x} y={y} size={s} len={l}>{t}</Txt>)}</g>}
            {region === 'india' && WISPS.map((x, i) => (
              <path key={x} className="fl-wisp" style={{ '--i': i }} d={`M${x} 268 C${x - 9} 259 ${x + 9} 251 ${x} 240`} />
            ))}
            <g transform={`translate(${tx} ${ty})`}>
              <g className="fl-pop">
                <g transform={`translate(${-tx} ${-ty})`}>
                  {fills(q.bubbleFills, 'all')}
                  <path className="fl-r-ink" d={q.bubbleInk} />
                  {q.extra && <path className="fl-r-line" d={q.extra} />}
                  {words.map(([x, y, s, l, t]) => <Txt key={t} x={x} y={y} size={s} len={l}>{t}</Txt>)}
                </g>
              </g>
            </g>
          </g>
        </svg>
      </div>
      {Rn && (
        <div className="fl-reg__reason">
          <span className="fl-reg__rlabel">Reason:</span>
          <span className="fl-reg__rtext">{Rn}</span>
        </div>
      )}
    </figure>
  );
}

export const UsScene = (p) => <RegionScene region="us" {...p} />;
export const IndiaScene = (p) => <RegionScene region="india" {...p} />;
