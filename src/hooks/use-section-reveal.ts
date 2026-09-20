import { useEffect } from "react";

/**
 * Fades + rises each top-level <section> inside <main> into place the
 * first time it scrolls into view, then stops watching it. Zero
 * dependencies — plain IntersectionObserver, no animation library.
 *
 * Pairs with the `.reveal` / `.is-revealed` rules appended to
 * src/globals.css. If the visitor has requested reduced motion, this
 * hook does nothing and sections rely on the CSS fallback that keeps
 * them fully visible with no transition at all.
 */
export function useSectionReveal() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const sections = document.querySelectorAll("main > section");
    if (sections.length === 0) return;

    sections.forEach((section) => section.classList.add("reveal"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);
}
