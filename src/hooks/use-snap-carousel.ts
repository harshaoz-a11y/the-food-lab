import { useEffect, useRef } from "react";

const MOBILE_QUERY = "(max-width: 767px)";

/**
 * On phones the coverflow stages become a horizontal scroll-snap strip
 * (see the MOBILE PASS rules in globals.css). This hook keeps that strip
 * and the tab state in step:
 *
 * - choosing a tab scrolls its card into place;
 * - swiping to a card makes its tab active, once the scroll settles;
 * - the strip takes the height of the open card, so a short card does
 *   not leave the tallest card's empty space beneath it.
 *
 * Above the mobile breakpoint it does nothing and the 3D coverflow runs
 * as before. Cards must be the stage's direct children, in tab order.
 */
export function useSnapCarousel(activeIndex: number, onSwipe: (index: number) => void) {
    const stageRef = useRef<HTMLDivElement>(null);
    const onSwipeRef = useRef(onSwipe);
    onSwipeRef.current = onSwipe;

    const nearestIndex = (stage: HTMLElement) => {
        const items = Array.from(stage.children) as HTMLElement[];
        let best = 0;
        items.forEach((item, i) => {
            if (Math.abs(item.offsetLeft - stage.scrollLeft) < Math.abs(items[best].offsetLeft - stage.scrollLeft)) best = i;
        });
        return best;
    };

    // swipe → tab
    useEffect(() => {
        const stage = stageRef.current;
        if (!stage) return;
        const mq = window.matchMedia(MOBILE_QUERY);
        let timer: number | undefined;
        const onScroll = () => {
            if (!mq.matches) return;
            window.clearTimeout(timer);
            timer = window.setTimeout(() => onSwipeRef.current(nearestIndex(stage)), 90);
        };
        stage.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            stage.removeEventListener("scroll", onScroll);
            window.clearTimeout(timer);
        };
    }, []);

    // tab → scroll position and strip height
    useEffect(() => {
        const stage = stageRef.current;
        if (!stage) return;
        const mq = window.matchMedia(MOBILE_QUERY);
        let observer: ResizeObserver | undefined;

        const sync = () => {
            observer?.disconnect();
            const item = stage.children[activeIndex] as HTMLElement | undefined;
            if (!mq.matches || !item) {
                stage.style.height = "";
                return;
            }
            // Resize before scrolling: a layout change mid-scroll makes scroll-snap
            // re-snap to the card it is leaving, cancelling the smooth scroll.
            const fit = () => { stage.style.height = `${item.offsetHeight}px`; };
            fit();
            if (nearestIndex(stage) !== activeIndex) {
                const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
                stage.scrollTo({ left: item.offsetLeft, behavior: reduce ? "auto" : "smooth" });
            }
            observer = new ResizeObserver(fit);
            observer.observe(item);
        };

        sync();
        mq.addEventListener("change", sync);
        return () => {
            observer?.disconnect();
            mq.removeEventListener("change", sync);
        };
    }, [activeIndex]);

    return stageRef;
}
