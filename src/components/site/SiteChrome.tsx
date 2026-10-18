import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { BrandLogo } from "@/components/food-lab/BrandLogo";

// Links work from any page: on the home page they scroll, elsewhere they go home first.
const navigation = [{
    label: "Our approach",
    href: "/#happiness-macro"
}, {
    label: "Why most diets fail",
    href: "/#real-life"
}, {
    label: "The science",
    href: "/#demonstration"
}, {
    label: "Nutrition consults",
    href: "/consults"
}, {
    label: "Protein 11",
    href: "/#fit-peasant"
}];

// Every call to action goes to one of these two places.
export const ORDER_PROTEIN11 = "mailto:harsha@thefoodlab.in?subject=Order%20Protein%2011&body=Hi%20Food%20Lab%2C%20I%27d%20like%20to%20order%20Protein%2011.%0A%0ANumber%20of%20bars%20(minimum%203)%3A%20%0AArea%20in%20Bengaluru%3A%20";
export const BOOK_FIT_CALL = "mailto:harsha@thefoodlab.in?subject=Book%20my%20free%2020-min%20Fit%20Call&body=Hi%20Food%20Lab%2C%20I%27d%20like%20to%20book%20a%20free%2020-minute%20Fit%20Call.%0A%0AMy%20main%20goal%3A%20%0AWhat%20I%27ve%20tried%20before%3A%20";

export function Brand() {
    return (
        <a
            href="/"
            className="flex items-center shrink-0"
            aria-label="The Food Lab home">
            <BrandLogo className="h-11 sm:h-12 w-auto object-contain" />
        </a>
    );
}

export function Header() {
    const [open, setOpen] = useState(false);

    return (
        <header
            className="fixed inset-x-0 top-0 z-50 border-b border-ink/15 bg-[#faedde]/95 backdrop-blur-sm">
            <div
                className="mx-auto flex h-[74px] max-w-[1400px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
                <Brand />
                <nav className="site-nav hidden flex-1 justify-evenly xl:flex" aria-label="Primary navigation">
                    {navigation.map(item => (<a key={item.href} href={item.href} className="site-nav__link">
                        {item.label}
                    </a>))}
                </nav>
                <div className="flex items-center gap-2.5">
                    <a
                        href={BOOK_FIT_CALL}
                        className="header-cta header-cta--ghost hidden xl:inline-flex">Free 20-min Fit Call</a>
                    <a
                        href={ORDER_PROTEIN11}
                        className="header-cta header-cta--gold hidden sm:inline-flex">Order Protein 11 <ArrowRight className="h-4 w-4" /></a>
                    <button
                        type="button"
                        onClick={() => setOpen(value => !value)}
                        className="grid h-11 w-11 place-items-center rounded-full border border-ink/25 text-ink xl:hidden"
                        aria-label={open ? "Close menu" : "Open menu"}
                        aria-expanded={open}>
                        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>
            {open && (<nav
                className="absolute left-0 right-0 top-full border-t border-ink/15 bg-[#faedde] px-5 py-4 shadow-[0_8px_18px_rgba(23,59,48,.08)] xl:hidden"
                aria-label="Mobile navigation">
                {navigation.map(item => (<a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between border-b border-ink/10 py-3 text-base text-ink">
                    {item.label}<ArrowRight className="h-4 w-4 text-primary" />
                </a>))}
                <div className="mt-4 grid gap-2.5">
                    <a
                        href={ORDER_PROTEIN11}
                        onClick={() => setOpen(false)}
                        className="header-cta header-cta--gold justify-center">Order Protein 11 <ArrowRight className="h-4 w-4" /></a>
                    <a
                        href={BOOK_FIT_CALL}
                        onClick={() => setOpen(false)}
                        className="header-cta header-cta--ghost justify-center">Book a free 20-min Fit Call</a>
                </div>
            </nav>)}
        </header>
    );
}

export function SiteFooter() {
    return (
        <footer className="paper-sheet site-footer">
            <div
                className="mx-auto flex h-[74px] max-w-[1400px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
                <Brand />
                <p className="site-footer__tagline hidden font-serif text-lg italic md:block">We observe. We question. Then we build.</p>
                <div
                    className="site-footer__contact text-right font-mono text-[11px] uppercase leading-relaxed tracking-[0.12em]">Bengaluru<br />harsha@thefoodlab.in</div>
            </div>
        </footer>
    );
}

// Phones only: the two calls to action stay one thumb away from the first screen,
// and step aside when a closing section (id="your-experiment") shows the same two.
export function MobileActionBar() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const closing = document.getElementById("your-experiment");
        if (!closing) {
            setVisible(true);
            return;
        }
        const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting));
        observer.observe(closing);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            className={`mobile-action-bar ${visible ? "is-visible" : ""}`}
            aria-hidden={!visible}>
            <a
                href={BOOK_FIT_CALL}
                tabIndex={visible ? 0 : -1}
                className="mobile-action-bar__ghost">Free Fit Call</a>
            <a
                href={ORDER_PROTEIN11}
                tabIndex={visible ? 0 : -1}
                className="mobile-action-bar__gold">Order Protein 11 <ArrowRight className="h-4 w-4" /></a>
        </div>
    );
}
