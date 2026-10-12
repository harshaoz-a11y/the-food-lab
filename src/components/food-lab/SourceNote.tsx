import type { ReactNode } from "react";

/** A citation folded to one "Source" line; tapping it shows the full reference. */
export function SourceNote({ className, children }: { className: string; children: ReactNode }) {
    return (
        <details className={`source-note ${className}`}>
            <summary>Source</summary>
            <p>{children}</p>
        </details>
    );
}

export default SourceNote;
