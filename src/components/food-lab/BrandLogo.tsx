// Transparent ink-on-nothing mark; the header and footer tint it cream with a CSS filter.
import foodLabLogo from "@/assets/the-food-lab-logo.png";

interface BrandLogoProps {
  className?: string;
  alt?: string;
}

export function BrandLogo({
  className = "h-11 sm:h-12 w-auto object-contain",
  alt = "The Food Lab — Invisible diets. Visible results.",
}: BrandLogoProps) {
  return (
    <img
      src={foodLabLogo}
      alt={alt}
      width={640}
      height={176}
      decoding="async"
      className={className}
    />
  );
}

export default BrandLogo;
