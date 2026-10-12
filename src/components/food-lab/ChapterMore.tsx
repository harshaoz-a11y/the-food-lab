import { ChevronDown } from "lucide-react";

/**
 * Phones only (hidden by CSS above 767px): each Protein 11 chapter keeps its
 * interactive core in one screen and folds the supporting blocks, marked
 * `.p11-secondary`, behind this button. The chapter root carries
 * `.is-more-open` while they are shown.
 */
export function ChapterMore({ open, onToggle }: { open: boolean; onToggle: () => void }) {
    return (
        <button type="button" className="p11-more-btn" aria-expanded={open} onClick={onToggle}>
            {open ? "Less detail" : "More detail"}
            <ChevronDown aria-hidden="true" />
        </button>
    );
}

export default ChapterMore;
