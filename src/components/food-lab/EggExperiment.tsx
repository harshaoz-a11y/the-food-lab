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

function EggIllustration({ active }: { active: EggState }) {
  const isRaw = active === "raw";

  return (
    <svg
      className="egg-source-art"
      viewBox="0 0 520 420"
      role="img"
      aria-labelledby={`${active}-egg-title ${active}-egg-description`}
    >
      <title id={`${active}-egg-title`}>{isRaw ? "Raw egg sketch" : "Cooked egg sketch"}</title>
      <desc id={`${active}-egg-description`}>
        {isRaw ? "A loose ink sketch of an egg still in its shell." : "A loose ink sketch of a cooked egg with a set white and yolk."}
      </desc>

      <ellipse cx="260" cy="368" rx="150" ry="13" fill="rgba(66, 52, 32, .12)" />

      {isRaw ? (
        <g stroke="#173b30" strokeLinecap="round" strokeLinejoin="round">
          <path
            d="M261 65 C211 65 178 107 178 164 C178 226 210 299 260 333 C310 299 342 226 342 164 C342 107 309 65 261 65Z"
            fill="#f8f2e5"
            strokeWidth="4"
          />
          <path
            d="M261 70 C214 71 185 112 184 164 C184 220 214 286 260 322"
            fill="none"
            stroke="#6f8377"
            strokeWidth="2"
            opacity=".65"
          />
          <path
            d="M189 146 C210 141 222 151 236 143 C247 137 252 121 263 127 C274 133 278 150 291 151 C306 152 316 140 333 146"
            fill="none"
            stroke="#a33a2b"
            strokeWidth="4"
          />
          <path d="M214 101 C230 83 250 78 269 80" fill="none" stroke="#173b30" strokeWidth="2" opacity=".5" />
          <path d="M300 88 C319 105 330 127 332 151" fill="none" stroke="#173b30" strokeWidth="2" opacity=".5" />
          <path d="M203 183 C212 228 232 273 261 301" fill="none" stroke="#a33a2b" strokeWidth="2" opacity=".42" />
          <path d="M314 181 C306 228 285 274 260 301" fill="none" stroke="#173b30" strokeWidth="2" opacity=".3" />
          <path d="M155 339 C190 349 225 353 260 353 C298 353 333 348 365 338" fill="none" stroke="#173b30" strokeWidth="3" opacity=".35" />
        </g>
      ) : (
        <g stroke="#173b30" strokeLinecap="round" strokeLinejoin="round">
          <path
            d="M132 268 C138 236 165 221 194 226 C220 230 237 244 259 238 C286 231 304 218 335 225 C367 232 384 252 388 276 C372 314 332 337 260 338 C187 338 148 314 132 268Z"
            fill="#f8f2e5"
            strokeWidth="4"
          />
          <path
            d="M151 270 C166 249 187 243 208 249 C229 256 238 270 260 263 C285 255 306 239 331 246 C354 252 370 266 377 283 C350 313 312 325 260 327 C207 327 172 313 151 270Z"
            fill="#efe3c9"
            stroke="#6f8377"
            strokeWidth="2"
            opacity=".8"
          />
          <path
            d="M204 266 C211 242 232 229 258 234 C281 238 296 256 291 277 C286 298 266 308 243 302 C218 296 198 286 204 266Z"
            fill="#b85a39"
            stroke="#173b30"
            strokeWidth="4"
          />
          <path
            d="M220 263 C226 249 242 243 256 246 C270 249 279 259 276 273 C272 286 258 292 245 289 C229 285 216 277 220 263Z"
            fill="#d98b42"
            stroke="#a33a2b"
            strokeWidth="3"
          />
          <path d="M143 278 C161 302 195 322 246 331" fill="none" stroke="#173b30" strokeWidth="2" opacity=".42" />
          <path d="M377 278 C365 302 332 321 278 331" fill="none" stroke="#173b30" strokeWidth="2" opacity=".32" />
          <path d="M182 235 C201 218 218 216 235 222" fill="none" stroke="#a33a2b" strokeWidth="3" opacity=".75" />
          <path d="M307 221 C329 216 349 225 363 239" fill="none" stroke="#173b30" strokeWidth="3" opacity=".5" />
          <path d="M128 346 C174 355 219 359 260 359 C307 359 350 354 393 343" fill="none" stroke="#173b30" strokeWidth="3" opacity=".35" />
        </g>
      )}
    </svg>
  );
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
