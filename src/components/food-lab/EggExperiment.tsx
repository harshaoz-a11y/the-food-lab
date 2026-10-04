import { useState } from "react";

const states = {
  raw: {
    label: "Raw egg",
    value: 51,
    note: "The ingredient is present. The body may receive less of it.",
  },
  cooked: {
    label: "Cooked egg",
    value: 91,
    note: "Heat changes the interaction — and what becomes available.",
  },
} as const;

type EggState = keyof typeof states;

function RawEggArtwork() {
  return (
    <svg className="egg-svg" viewBox="0 0 520 420" role="img" aria-labelledby="raw-egg-title raw-egg-desc">
      <title id="raw-egg-title">Raw egg</title>
      <desc id="raw-egg-desc">A loose raw egg with a bright yolk, cracked shell, and a few marks from a kitchen notebook.</desc>
      <defs>
        <linearGradient id="raw-paper" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f7efdf" />
          <stop offset="1" stopColor="#e8dac0" />
        </linearGradient>
        <radialGradient id="raw-yolk" cx="35%" cy="28%" r="78%">
          <stop offset="0" stopColor="#ffd96a" />
          <stop offset="0.55" stopColor="#f5ad25" />
          <stop offset="1" stopColor="#bd651d" />
        </radialGradient>
        <filter id="raw-shadow" x="-30%" y="-30%" width="160%" height="170%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>
      <rect width="520" height="420" rx="8" fill="url(#raw-paper)" />
      <path d="M32 355 C124 344 365 346 478 363" fill="none" stroke="#7d694f" strokeWidth="1.5" opacity=".22" />
      <path d="M54 86 C78 74 103 80 124 94 M402 72 C425 63 449 71 466 86" fill="none" stroke="#ad9673" strokeWidth="2" opacity=".28" strokeLinecap="round" />
      <ellipse cx="264" cy="303" rx="183" ry="44" fill="#504333" opacity=".2" filter="url(#raw-shadow)" />
      <ellipse cx="260" cy="284" rx="180" ry="52" fill="#c7b398" stroke="#473b30" strokeWidth="4" transform="rotate(-3 260 284)" />
      <ellipse cx="260" cy="279" rx="163" ry="43" fill="#f7f1e4" stroke="#aa9170" strokeWidth="3" transform="rotate(-3 260 279)" />
      <path d="M116 274 C128 254 151 252 170 263 C191 246 222 251 235 264 C256 245 288 249 303 265 C326 247 359 254 366 271 C388 263 414 275 415 292 C393 317 354 316 327 307 C299 320 265 315 242 306 C211 321 171 315 150 304 C130 305 113 293 116 274 Z" fill="#fffdf5" stroke="#635342" strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M149 278 C168 266 189 272 198 284 C210 300 229 303 249 295 C263 289 278 281 294 284 C310 287 322 301 342 302" fill="none" stroke="#d8cdbb" strokeWidth="3" strokeLinecap="round" opacity=".85" />
      <ellipse cx="265" cy="278" rx="58" ry="49" fill="#a9641b" opacity=".27" />
      <ellipse cx="260" cy="270" rx="56" ry="48" fill="url(#raw-yolk)" stroke="#8f4d1c" strokeWidth="4" transform="rotate(-7 260 270)" />
      <ellipse cx="242" cy="252" rx="16" ry="10" fill="#fff2ad" opacity=".85" transform="rotate(-18 242 252)" />
      <path d="M104 250 C84 235 76 215 87 193 L108 156 L139 179 L119 207 C112 218 115 231 128 240 Z" fill="#f6f0df" stroke="#4c3c2d" strokeWidth="4" strokeLinejoin="round" />
      <path d="M108 156 L139 179 L129 194 L97 173 Z" fill="#d9ccb2" stroke="#4c3c2d" strokeWidth="3" />
      <path d="M407 251 C427 237 436 217 426 194 L407 157 L376 179 L394 207 C402 220 398 233 384 242 Z" fill="#f8f1df" stroke="#4c3c2d" strokeWidth="4" strokeLinejoin="round" />
      <path d="M407 157 L376 179 L386 194 L418 173 Z" fill="#d9ccb2" stroke="#4c3c2d" strokeWidth="3" />
      <path d="M137 115 L147 132 M156 105 L161 126 M377 112 L369 130" stroke="#a33a2b" strokeWidth="3" strokeLinecap="round" />
      <path d="M355 88 C378 87 393 96 405 111" fill="none" stroke="#a33a2b" strokeWidth="2" strokeDasharray="3 6" strokeLinecap="round" />
      <text x="62" y="54" fill="#a33a2b" fontFamily="Caveat, cursive" fontSize="28" transform="rotate(-5 62 54)">cold / loose</text>
      <text x="403" y="350" fill="#5d6a60" fontFamily="Space Mono, monospace" fontSize="10" letterSpacing="2" transform="rotate(4 403 350)">01 — RAW</text>
    </svg>
  );
}

function CookedEggArtwork() {
  return (
    <svg className="egg-svg" viewBox="0 0 520 420" role="img" aria-labelledby="cooked-egg-title cooked-egg-desc">
      <title id="cooked-egg-title">Cooked egg</title>
      <desc id="cooked-egg-desc">A fried egg with a set white and golden yolk sitting in a small cast-iron pan with rising heat.</desc>
      <defs>
        <linearGradient id="cooked-paper" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f7efdf" />
          <stop offset="1" stopColor="#e5d3b0" />
        </linearGradient>
        <radialGradient id="cooked-yolk" cx="35%" cy="26%" r="75%">
          <stop offset="0" stopColor="#ffe080" />
          <stop offset="0.52" stopColor="#e99a22" />
          <stop offset="1" stopColor="#a94d19" />
        </radialGradient>
        <linearGradient id="iron" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3d403c" />
          <stop offset="1" stopColor="#171c1b" />
        </linearGradient>
        <filter id="cooked-shadow" x="-30%" y="-30%" width="160%" height="180%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>
      <rect width="520" height="420" rx="8" fill="url(#cooked-paper)" />
      <path d="M40 352 C155 341 362 347 480 365" fill="none" stroke="#796248" strokeWidth="1.5" opacity=".24" />
      <ellipse cx="265" cy="315" rx="187" ry="45" fill="#3e3328" opacity=".25" filter="url(#cooked-shadow)" />
      <path d="M386 281 L467 315 C478 320 480 333 468 338 L450 346 L353 306 Z" fill="#242b28" stroke="#19201e" strokeWidth="5" strokeLinejoin="round" />
      <path d="M89 252 C98 209 151 177 248 171 C342 164 410 194 430 245 C447 291 407 329 278 337 C154 344 77 310 89 252 Z" fill="url(#iron)" stroke="#1a211f" strokeWidth="6" />
      <ellipse cx="259" cy="256" rx="148" ry="63" fill="#555b51" stroke="#222a26" strokeWidth="4" transform="rotate(-3 259 256)" />
      <path d="M123 247 C130 226 153 213 173 216 C192 194 223 198 239 211 C259 188 293 195 307 211 C330 196 362 208 366 226 C388 222 407 238 403 258 C394 282 366 287 341 280 C321 300 285 300 263 284 C238 302 204 295 190 279 C165 291 133 278 123 247 Z" fill="#f5f2e6" stroke="#d3c5a9" strokeWidth="4" strokeLinejoin="round" />
      <path d="M146 248 C166 228 183 239 198 249 M306 226 C325 219 343 231 352 247 M213 282 C233 272 248 278 263 286" fill="none" stroke="#c1b59e" strokeWidth="3" strokeLinecap="round" opacity=".9" />
      <ellipse cx="263" cy="246" rx="58" ry="46" fill="#6d3d1a" opacity=".3" />
      <ellipse cx="259" cy="238" rx="56" ry="45" fill="url(#cooked-yolk)" stroke="#843f18" strokeWidth="4" transform="rotate(-8 259 238)" />
      <path d="M221 227 C229 211 253 201 271 207" fill="none" stroke="#ffd984" strokeWidth="6" strokeLinecap="round" opacity=".7" />
      <path d="M177 158 C167 141 178 128 170 111 M256 151 C248 133 262 121 255 102 M336 158 C328 141 339 129 333 112" fill="none" stroke="#ad7352" strokeWidth="4" strokeLinecap="round" opacity=".55" />
      <path d="M150 107 L159 123 M365 97 L357 115" stroke="#2d7d46" strokeWidth="3" strokeLinecap="round" />
      <text x="62" y="54" fill="#2d7d46" fontFamily="Caveat, cursive" fontSize="28" transform="rotate(-4 62 54)">heat / set</text>
      <text x="393" y="350" fill="#2d7d46" fontFamily="Space Mono, monospace" fontSize="10" letterSpacing="2" transform="rotate(4 393 350)">02 — COOKED</text>
    </svg>
  );
}

function EggIllustration({ active }: { active: EggState }) {
  return active === "raw" ? <RawEggArtwork /> : <CookedEggArtwork />;
}

export function EggExperiment() {
  const [active, setActive] = useState<EggState>("raw");
  const current = states[active];

  return (
    <div className="experiment-card grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,.85fr)] lg:items-center">
      <div className="evidence-photo egg-evidence">
        <div className={`egg-state-illustration is-${active}`}>
          <div className="egg-art">
            <EggIllustration active={active} />
          </div>
          <span className="egg-now-showing">Now showing: {current.label}</span>
        </div>
      </div>

      <div className="experiment-panel">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Change egg preparation">
          {(Object.keys(states) as EggState[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setActive(key)}
              className={`experiment-choice ${active === key ? "is-active" : ""} ${active === key && key === "cooked" ? "is-green-active" : ""}`}
              aria-pressed={active === key}
            >
              {states[key].label}
            </button>
          ))}
        </div>

        <div className="mt-6" aria-live="polite">
          <span className="lab-label">true ileal protein digestibility</span>
          <div className="mt-3 flex items-end gap-3">
            <strong className={`font-serif text-6xl font-normal leading-none transition-colors duration-300 sm:text-7xl ${active === "cooked" ? "text-green-700" : "text-ink"}`}>
              {current.value}%
            </strong>
            <span className={`mb-2 handwritten transition-colors duration-300 ${active === "cooked" ? "text-green-700" : "text-primary"}`}>received?</span>
          </div>
          <div className="measure-track mt-4" aria-hidden="true">
            <span className={active === "cooked" ? "is-green" : ""} style={{ width: `${current.value}%` }} />
          </div>
          <p className="mt-4 max-w-md text-base leading-relaxed text-ink/75">{current.note}</p>
        </div>

        <p className="mt-6 border-t border-dashed border-ink/25 pt-4 font-mono text-[11px] uppercase leading-relaxed tracking-[0.1em] text-ink/55">
          Human data: Evenepoel et al., The Journal of Nutrition (1998); discussed in Fuchs et al., The Journal of Nutrition (2022). This is an observation, not personal dietary advice.
        </p>
      </div>
    </div>
  );
}
