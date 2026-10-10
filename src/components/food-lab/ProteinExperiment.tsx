import ProteinSink from "@/components/protein-sink/ProteinSink";
import "./ProteinExperiment.css";

export function ProteinExperiment() {
    return (
        <article className="protein-panel">
            <ProteinSink look="laxman" />
            <div className="protein-panel__stats">
                <article className="protein-panel__stat">
                    <strong className="protein-panel__number">~70%</strong>
                    <span className="protein-panel__label">OF RESPONDENTS</span>
                    <p>do not meet the recommended daily fibre intake.</p>
                </article>
                <article className="protein-panel__stat protein-panel__stat--paired">
                    <div className="protein-panel__pair">
                        <div>
                            <strong className="protein-panel__number">73%+</strong>
                            <span className="protein-panel__label">WOMEN</span>
                        </div>
                        <span className="protein-panel__bar protein-panel__bar--women" aria-hidden="true"><i /></span>
                    </div>
                    <div className="protein-panel__pair">
                        <div>
                            <strong className="protein-panel__number">63%+</strong>
                            <span className="protein-panel__label">MEN</span>
                        </div>
                        <span className="protein-panel__bar protein-panel__bar--men" aria-hidden="true"><i /></span>
                    </div>
                    <p>fall short of the recommended intake.</p>
                </article>
                <article className="protein-panel__stat">
                    <strong className="protein-panel__number protein-panel__number--recommendation">25 g / 30 g</strong>
                    <span className="protein-panel__label">ICMR-NIN RECOMMENDATION</span>
                    <p>per day for adult women / adult men.</p>
                </article>
            </div>
            <p className="protein-panel__source">
                SOURCE: <a href="https://nuffoodsspectrum.asia/2026/05/29/nearly-7-in-10-indians-fall-short-of-daily-fibre-intake-aashirvaad-happy-tummy-findings.html" target="_blank" rel="noopener noreferrer">AASHIRVAAD HAPPY TUMMY (ITC)</a>, FINDINGS RELEASED FOR WORLD DIGESTIVE HEALTH DAY 2026. SELF-REPORTED RESPONSES FROM 6.5 LAKH+ PARTICIPANTS AGED 18–60, COLLECTED 2021–2025 ON AN ONLINE PLATFORM; NOT A NATIONALLY REPRESENTATIVE SAMPLE. RECOMMENDED INTAKE AS QUOTED IN THE SAME RELEASE (ICMR-NIN). AN OBSERVATION, NOT PERSONAL DIETARY ADVICE.
            </p>
        </article>
    );
}
