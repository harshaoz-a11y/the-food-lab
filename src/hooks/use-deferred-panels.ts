import { useEffect, useRef, useState } from "react";

const SHOWS_NEIGHBOURS = "(min-width: 768px)";

/**
 * Tabbed panels whose content is heavy (large drawings, charts) are built only
 * when they are needed:
 *
 * - nothing is built until the panel group comes within ~one screen of view,
 *   so the first paint and the prerendered HTML stay light;
 * - from then on the open panel is built, and a panel stays built once opened;
 * - once the browser is idle, `preload` fetches the rest. On wider screens,
 *   where the 3D coverflow shows the neighbouring pages, they are built too;
 *   phones only show a sliver of the next card, so there the rest wait to be opened.
 *
 * The server and the first client render both start with nothing built, so
 * hydration always matches.
 */
export function useDeferredPanels<K extends string>(active: K, keys: readonly K[], preload: () => Promise<unknown>) {
    const rootRef = useRef<HTMLDivElement>(null);
    const [near, setNear] = useState(false);
    const [built, setBuilt] = useState<ReadonlySet<K>>(() => new Set());

    useEffect(() => {
        const el = rootRef.current;
        if (!el || !("IntersectionObserver" in window)) {
            setNear(true);
            return;
        }
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setNear(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "900px 0px" },
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (near) setBuilt((current) => (current.has(active) ? current : new Set(current).add(active)));
    }, [near, active]);

    useEffect(() => {
        if (!near) return;
        let cancelled = false;
        const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1200));
        const cancel = window.cancelIdleCallback ?? window.clearTimeout;
        const handle = idle(() => {
            preload().then(() => {
                if (!cancelled && window.matchMedia(SHOWS_NEIGHBOURS).matches) setBuilt(new Set(keys));
            });
        });
        return () => {
            cancelled = true;
            cancel(handle);
        };
        // keys and preload are module-level constants
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [near]);

    return { rootRef, built };
}
