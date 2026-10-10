import { useEffect, useMemo, useRef, useState } from 'react';
import './ParticleBar.css';

/**
 * <ParticleBar src selected ingredients />
 * The bar photo is rebuilt from thousands of glowing particles. Choosing a partnership shatters the bar into a 3D cloud,
 * swirls it, then magnetically re-forms it: a ghost of the bar in the middle plus one cluster per ingredient, coloured and
 * shaped like that ingredient. Raw WebGL, no dependencies. Falls back to the plain photo + chips without WebGL or with reduced motion.
 *   src          URL of the bar photo (same-origin)
 *   selected     a partnership ({ ingredients: [ids] }) or null for the whole bar
 *   ingredients  array of { id, name, perBar, shape, color }
 *   crop         [x0,y0,x1,y1] fractions of the photo to turn into particles (default whole photo)
 *   tolerance    colour distance from the photo's background that counts as 'bar' (default 34)
 *   count        particle count (default 38000 desktop, 14000 small screens)
 */
const VS = `
attribute vec2 aFrom; attribute vec2 aTo; attribute vec3 aCol0; attribute vec3 aCol1; attribute vec2 aA; attribute vec4 aSeed;
uniform float uT; uniform float uAspect; uniform float uPx; uniform float uTime;
varying vec3 vCol; varying float vA;
float eo(float x){ return 1.0-pow(1.0-x,3.0); }
float eio(float x){ return x<0.5 ? 4.0*x*x*x : 1.0-pow(-2.0*x+2.0,3.0)/2.0; }
void main(){
  float t=uT;
  float tb=clamp(t/0.32,0.0,1.0);
  float g=clamp((t-0.5-aSeed.x*0.24)/0.42,0.0,1.0);
  float ge=eio(g);
  float ang=aSeed.z*6.2831853;
  vec2 dir=vec2(cos(ang),sin(ang));
  float mag=0.35+aSeed.y*1.2;
  vec2 p=aFrom+dir*mag*eo(tb)*(1.0-ge);
  float z=(aSeed.w-0.5)*2.6*eo(tb)*(1.0-ge);
  float sw=smoothstep(0.16,0.55,t)*(1.0-ge)*(1.3+aSeed.x*2.6)*(0.6+aSeed.y);
  float c=cos(sw), s=sin(sw);
  p=vec2(c*p.x-s*p.y, s*p.x+c*p.y);
  p=mix(p,aTo,ge);
  p+=0.004*vec2(sin(uTime*1.3+aSeed.x*40.0),cos(uTime*1.1+aSeed.y*40.0));
  float persp=1.0/(1.0-z*0.28);
  p*=persp;
  gl_Position=vec4(p.x/uAspect,p.y,0.0,1.0);
  float mv=(1.0-ge)*smoothstep(0.0,0.08,t);
  gl_PointSize=uPx*(0.8+aSeed.w*0.7)*persp*(1.0+mv*0.8);
  float cm=smoothstep(0.55,0.95,t);
  vCol=mix(aCol0,aCol1,cm)*(1.0+mv*0.3)+vec3(mv*0.09);
  vA=mix(aA.x,aA.y,ge);
}`;
const FS = `precision mediump float; varying vec3 vCol; varying float vA;
void main(){ float r=length(gl_PointCoord-0.5); if(r>0.5) discard; float a=smoothstep(0.5,0.05,r); gl_FragColor=vec4(vCol,a*vA); }`;

const hex = (h) => { const n = parseInt(h.slice(1), 16); return [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255]; };
const gauss = () => Math.sqrt(-2 * Math.log(Math.random() || 1e-6)) * Math.cos(6.2831853 * Math.random());

export function clusterCenters(k, A) {
  if (k <= 1) return [[0, 0]];
  if (k === 2) return [[-0.58 * A, 0.05], [0.58 * A, -0.05]];
  if (k === 3) return [[-0.6 * A, 0.28], [0.6 * A, 0.28], [0, -0.58]];
  return [[-0.6 * A, 0.4], [0.6 * A, 0.4], [-0.6 * A, -0.42], [0.6 * A, -0.42]];
}
function shapePoint(shape) {
  const a = Math.random() * 6.2831853, r = Math.sqrt(Math.random());
  switch (shape) {
    case 'flake': { const w = 0.6 + 0.4 * Math.sin(3 * a); return [Math.cos(a) * r * w, Math.sin(a) * r * w * 0.55]; }
    case 'lump': { const w = 0.8 + 0.22 * Math.sin(5 * a); return [Math.cos(a) * r * w, Math.sin(a) * r * w * 0.8]; }
    case 'dust': return [gauss() * 0.42, gauss() * 0.42];
    case 'speck': return [gauss() * 0.7, gauss() * 0.7];
    case 'droplet': { let x = Math.cos(a) * r, y = Math.sin(a) * r; if (y > 0) x *= 1 - 0.8 * y; return [x * 0.8, y * 1.2]; }
    default: return [Math.cos(a) * r, Math.sin(a) * r];
  }
}
function sampleImage(img, count, A, crop, tol) {
  const S = 260, [cx0, cy0, cx1, cy1] = crop || [0, 0, 1, 1];
  const sw = (cx1 - cx0) * img.naturalWidth, sh = (cy1 - cy0) * img.naturalHeight, ar = sw / sh;
  const w = ar >= 1 ? S : Math.round(S * ar), h = ar >= 1 ? Math.round(S / ar) : S;
  const cv = document.createElement('canvas'); cv.width = w; cv.height = h;
  const cx = cv.getContext('2d', { willReadFrequently: true });
  cx.drawImage(img, cx0 * img.naturalWidth, cy0 * img.naturalHeight, sw, sh, 0, 0, w, h);
  const d = cx.getImageData(0, 0, w, h).data;
  const R = [], G = [], B = [];
  const edge = (x, y) => { const i = (y * w + x) * 4; R.push(d[i]); G.push(d[i + 1]); B.push(d[i + 2]); };
  for (let x = 0; x < w; x++) { edge(x, 1); edge(x, h - 2); } for (let y = 0; y < h; y++) { edge(1, y); edge(w - 2, y); }
  const med = (a) => a.sort((p, q) => p - q)[a.length >> 1], br = med(R), bg = med(G), bb = med(B);
  const keep = [], lum = (i) => d[i * 4] * 0.3 + d[i * 4 + 1] * 0.59 + d[i * 4 + 2] * 0.11;
  for (let i = 0; i < w * h; i++) {
    const o = i * 4; if (Math.abs(d[o] - br) + Math.abs(d[o + 1] - bg) + Math.abs(d[o + 2] - bb) <= tol) continue;
    const x = i % w, y = (i / w) | 0, g = x > 0 && y > 0 ? Math.abs(lum(i) - lum(i - 1)) + Math.abs(lum(i) - lum(i - w)) : 0;
    keep.push(i); if (g > 14) keep.push(i, i, i); // favour edges and lettering so the label stays legible
  }
  const pool = keep.length > 500 ? keep : Array.from({ length: w * h }, (_, i) => i);
  const sc = Math.min((2 * A) / w, 2 / h) * 0.9, out = { pos: new Float32Array(count * 2), col: new Float32Array(count * 3) };
  for (let n = 0; n < count; n++) {
    const i = pool[(Math.random() * pool.length) | 0], x = i % w, y = (i / w) | 0, o = i * 4;
    out.pos[n * 2] = (x + Math.random() - w / 2) * sc; out.pos[n * 2 + 1] = -(y + Math.random() - h / 2) * sc;
    const lift = (v) => Math.min(1, Math.pow(v / 255, 0.72) * 1.18); // lift dark browns so the bar glows on the dark stage
    out.col.set([lift(d[o]), lift(d[o + 1]), lift(d[o + 2])], n * 3);
  }
  return out;
}

export default function ParticleBar({ src, selected = null, ingredients, alt = 'Protein 11 bar', count, accent = '#ff9a7a', ghost = 0.4, crop = null, tolerance = 34, className = '' }) {
  const wrap = useRef(null), cvs = useRef(null), api = useRef({});
  const [gl, setGl] = useState(false);
  const byId = useMemo(() => Object.fromEntries(ingredients.map((i) => [i.id, i])), [ingredients]);
  const [A, setA] = useState(1.6);
  const chips = useMemo(() => {
    const ids = selected ? selected.ingredients : [];
    return clusterCenters(ids.length, A).map((c, i) => ({ ing: byId[ids[i]], x: 50 + (c[0] / A) * 50, y: 50 - c[1] * 50 })).filter((c) => c.ing);
  }, [selected, byId, A]);

  useEffect(() => {
    const canvas = cvs.current, box = wrap.current;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const ctx = canvas.getContext('webgl', { antialias: false, alpha: true, premultipliedAlpha: false });
    if (!ctx || reduce) return;
    const small = window.innerWidth < 700, N = count || (small ? 14000 : 38000);
    const dpr = Math.min(window.devicePixelRatio || 1, small ? 1.5 : 2);
    const prog = ctx.createProgram();
    for (const [t, s] of [[ctx.VERTEX_SHADER, VS], [ctx.FRAGMENT_SHADER, FS]]) { const sh = ctx.createShader(t); ctx.shaderSource(sh, s); ctx.compileShader(sh); if (!ctx.getShaderParameter(sh, ctx.COMPILE_STATUS)) return; ctx.attachShader(prog, sh); }
    ctx.linkProgram(prog); ctx.useProgram(prog);
    const L = (n) => ctx.getAttribLocation(prog, n), U = (n) => ctx.getUniformLocation(prog, n);
    const buf = {}, size = { aFrom: 2, aTo: 2, aCol0: 3, aCol1: 3, aA: 2, aSeed: 4 };
    for (const k of Object.keys(size)) { buf[k] = ctx.createBuffer(); ctx.bindBuffer(ctx.ARRAY_BUFFER, buf[k]); ctx.enableVertexAttribArray(L(k)); ctx.vertexAttribPointer(L(k), size[k], ctx.FLOAT, false, 0, 0); }
    const up = (k, arr) => { ctx.bindBuffer(ctx.ARRAY_BUFFER, buf[k]); ctx.bufferData(ctx.ARRAY_BUFFER, arr, ctx.DYNAMIC_DRAW); };
    const seed = new Float32Array(N * 4).map(() => Math.random()); up('aSeed', seed);
    ctx.enable(ctx.BLEND); ctx.blendFunc(ctx.SRC_ALPHA, ctx.ONE_MINUS_SRC_ALPHA);
    const st = { N, A: 1.6, home: null, homeCol: null, to: null, col1: null, a1: null, t: 1, t0: 0, started: false, visible: false, raf: 0, px: 2 };
    const resize = () => {
      const r = box.getBoundingClientRect(), w = Math.max(2, Math.round(r.width * dpr)), h = Math.max(2, Math.round(r.height * dpr));
      canvas.width = w; canvas.height = h; ctx.viewport(0, 0, w, h); st.A = w / h; setA(st.A);
      st.px = Math.max(1.6, Math.min(4.2, (w / Math.sqrt(N)) * 1.05));
    };
    const form = (sel) => {
      const A = st.A, pos = new Float32Array(N * 2), col = new Float32Array(N * 3), al = new Float32Array(N);
      if (!sel || !sel.ingredients.length) { pos.set(st.home); col.set(st.homeCol); al.fill(1); return { pos, col, al }; }
      const ids = sel.ingredients, cs = clusterCenters(ids.length, A), R = ids.length >= 3 ? 0.2 : 0.26;
      const nGhost = Math.floor(N * 0.5), nThread = Math.floor(N * 0.06), per = Math.floor((N - nGhost - nThread) / ids.length);
      const sc = 0.4;
      let n = 0;
      for (; n < nGhost; n++) { pos[n * 2] = st.home[n * 2] * sc; pos[n * 2 + 1] = st.home[n * 2 + 1] * sc; col.set([st.homeCol[n * 3], st.homeCol[n * 3 + 1], st.homeCol[n * 3 + 2]], n * 3); al[n] = ghost; }
      ids.forEach((id, ci) => {
        const ing = byId[id], base = hex(ing?.color || '#ffffff');
        for (let j = 0; j < per; j++, n++) {
          const [dx, dy] = shapePoint(ing?.shape), l = 0.88 + Math.random() * 0.24;
          pos[n * 2] = cs[ci][0] + dx * R; pos[n * 2 + 1] = cs[ci][1] + dy * R;
          col.set([Math.min(1, base[0] * l), Math.min(1, base[1] * l), Math.min(1, base[2] * l)], n * 3); al[n] = 1;
        }
      });
      const ac = hex(accent);
      for (; n < N; n++) {
        const seg = Math.min(cs.length - 2, (Math.random() * (cs.length - 1)) | 0), u = Math.random();
        const a = cs[seg] || cs[0], b = cs[seg + 1] || cs[0], mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2 + 0.18, k = 1 - u;
        pos[n * 2] = k * k * a[0] + 2 * k * u * mx + u * u * b[0] + gauss() * 0.012; pos[n * 2 + 1] = k * k * a[1] + 2 * k * u * my + u * u * b[1] + gauss() * 0.012;
        col.set(ac, n * 3); al[n] = 0.9;
      }
      return { pos, col, al };
    };
    const go = (sel, instant) => {
      const f = form(sel);
      if (st.to) { up('aFrom', st.to); up('aCol0', st.col1); const a = new Float32Array(N * 2); for (let i = 0; i < N; i++) { a[i * 2] = st.a1[i]; a[i * 2 + 1] = f.al[i]; } up('aA', a); }
      up('aTo', f.pos); up('aCol1', f.col);
      st.to = f.pos; st.col1 = f.col; st.a1 = f.al; st.t = instant ? 1 : 0; st.t0 = performance.now();
    };
    const init = (img) => {
      resize(); const s = sampleImage(img, N, st.A, crop, tolerance); st.home = s.pos; st.homeCol = s.col;
      const scatter = new Float32Array(N * 2).map(() => (Math.random() - 0.5) * 6); st.to = scatter; st.col1 = new Float32Array(N * 3).fill(0.1); st.a1 = new Float32Array(N).fill(0);
      go(null, false); st.ready = true; setGl(true);
    };
    const loop = (now) => {
      st.raf = requestAnimationFrame(loop);
      if (!st.visible || !st.ready) return;
      st.t = typeof window.__pbT === 'number' ? window.__pbT : Math.min(1, (now - st.t0) / 2400); // __pbT: test hook to freeze progress
      ctx.clearRect?.(0, 0, 0, 0); ctx.clearColor(0, 0, 0, 0); ctx.clear(ctx.COLOR_BUFFER_BIT);
      ctx.uniform1f(U('uT'), st.t); ctx.uniform1f(U('uAspect'), st.A); ctx.uniform1f(U('uPx'), st.px); ctx.uniform1f(U('uTime'), now / 1000);
      ctx.drawArrays(ctx.POINTS, 0, N);
    };
    const img = new Image(); img.crossOrigin = 'anonymous'; img.onload = () => init(img); img.src = src;
    const io = new IntersectionObserver(([e]) => { st.visible = e.isIntersecting; if (e.isIntersecting && !st.started && st.ready) { st.started = true; st.t0 = performance.now(); } }, { threshold: 0.2 });
    io.observe(box);
    const ro = new ResizeObserver(() => { if (st.ready) resize(); }); ro.observe(box);
    st.raf = requestAnimationFrame(loop);
    api.current = { go, st };
    return () => { cancelAnimationFrame(st.raf); io.disconnect(); ro.disconnect(); ctx.getExtension('WEBGL_lose_context')?.loseContext(); api.current = {}; };
  }, [src, count, accent, ghost, byId, tolerance]);

  const first = useRef(true);
  useEffect(() => { if (first.current) { first.current = false; return; } api.current.go?.(selected, false); }, [selected]);

  return (
    <div ref={wrap} className={`pb${gl ? ' is-gl' : ''} ${className}`}>
      <img className="pb__img" src={src} alt={alt} />
      <canvas ref={cvs} className="pb__cv" aria-hidden="true" />
      <div className="pb__chips">
        {chips.map((c) => (
          <div key={c.ing.id} className="pb__chip" style={{ left: `${c.x}%`, top: `${Math.min(88, c.y + 17)}%` }}>
            <span>{c.ing.name}</span><b>{c.ing.perBar}</b>
          </div>
        ))}
      </div>
    </div>
  );
}
