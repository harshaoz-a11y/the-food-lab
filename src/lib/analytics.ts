// Google Analytics 4 events for the site's two calls to action. The Google tag itself
// (page views, scrolls, etc.) is loaded in index.html.

declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
    }
}

/**
 * Every Order / Consult button is a mailto: link, which GA4 does not count as an
 * outbound click. One listener reports them as `order_protein11_click` or
 * `book_consult_click`, with the section they were clicked in.
 */
export function trackCallsToAction() {
    document.addEventListener("click", (event) => {
        const link = (event.target as Element | null)?.closest?.('a[href^="mailto:"]');
        if (!link || !window.gtag) return;

        const href = link.getAttribute("href") ?? "";
        const name = href.includes("Order%20Protein%2011")
            ? "order_protein11_click"
            : href.includes("consult")
              ? "book_consult_click"
              : "email_click";
        const where =
            link.closest(".mobile-action-bar") ? "mobile_action_bar"
            : link.closest("header") ? "header"
            : link.closest("main > section")?.id || "page";

        window.gtag("event", name, { location: where, link_text: link.textContent?.trim() });
    });
}
