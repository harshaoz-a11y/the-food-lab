import { useState } from "react";
import ProteinSink from "@/components/protein-sink/ProteinSink";
import { SourceNote } from "./SourceNote";
import "./ProteinExperiment.css";

export function ProteinExperiment() {
    const [revealed, setRevealed] = useState(false);
    const toggle = () => setRevealed(value => !value);

    return (
        <article className="protein-panel">
            <div className="protein-stage">
                <ProteinSink look="laxman" revealed={revealed} onToggle={toggle} />

                <aside className={`protein-diagnosis ${revealed ? "is-revealed" : ""}`} aria-label="The diagnosis">
                    <div className="protein-diagnosis__top">
                        <span className="protein-diagnosis__eyebrow">The diagnosis</span>
                        <span className="protein-diagnosis__state" aria-live="polite">{revealed ? "Opened" : "Sealed"}</span>
                    </div>

                    <div className="protein-diagnosis__body">
                        <h4>Protein: ticked. Fibre: forgotten.</h4>
                        <div className="protein-panel__stats">
                            <div className="protein-panel__stat">
                                <strong className="protein-panel__number">~70%</strong>
                                <p>of respondents do not meet the recommended daily fibre intake.</p>
                            </div>
                            <div className="protein-panel__stat">
                                <div className="protein-panel__pair">
                                    <div>
                                        <strong className="protein-panel__number">73%+</strong>
                                        <span className="protein-panel__label">Women</span>
                                    </div>
                                    <span className="protein-panel__bar protein-panel__bar--women" aria-hidden="true"><i /></span>
                                </div>
                                <div className="protein-panel__pair">
                                    <div>
                                        <strong className="protein-panel__number">63%+</strong>
                                        <span className="protein-panel__label">Men</span>
                                    </div>
                                    <span className="protein-panel__bar protein-panel__bar--men" aria-hidden="true"><i /></span>
                                </div>
                                <p>fall short of the recommended intake.</p>
                            </div>
                        </div>
                    </div>

                    {!revealed && (
                        <button type="button" className="protein-diagnosis__cta" onClick={toggle}>
                            Open the case
                        </button>
                    )}
                </aside>
            </div>

            <SourceNote className="protein-panel__source">
                <a href="https://nuffoodsspectrum.asia/2026/05/29/nearly-7-in-10-indians-fall-short-of-daily-fibre-intake-aashirvaad-happy-tummy-findings.html" target="_blank" rel="noopener noreferrer">AASHIRVAAD HAPPY TUMMY (ITC)</a>, FINDINGS RELEASED FOR WORLD DIGESTIVE HEALTH DAY 2026. SELF-REPORTED RESPONSES FROM 6.5 LAKH+ PARTICIPANTS AGED 18–60, COLLECTED 2021–2025 ON AN ONLINE PLATFORM; NOT A NATIONALLY REPRESENTATIVE SAMPLE. RECOMMENDED INTAKE AS QUOTED IN THE SAME RELEASE (ICMR-NIN). AN OBSERVATION, NOT PERSONAL DIETARY ADVICE.
            </SourceNote>
        </article>
    );
}
