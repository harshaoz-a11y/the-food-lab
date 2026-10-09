import React, { useEffect, useState } from "react";
import foodLabBrandLogo from "@/assets/the-food-lab-brand-logo.png";

let cachedTransparentUrl: string | null = null;
let isProcessing = false;
const listeners = new Set<(url: string) => void>();

function processLogo(img: HTMLImageElement) {
  if (cachedTransparentUrl) return;

  try {
    const width = img.naturalWidth || 1280;
    const height = img.naturalHeight || 370;
    if (width === 0 || height === 0) return;

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    ctx.drawImage(img, 0, 0);
    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;

    // Background paper cream color: ~rgb(250, 237, 222)
    const bgR = 250;
    const bgG = 237;
    const bgB = 222;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      const diffR = Math.max(0, bgR - r);
      const diffG = Math.max(0, bgG - g);
      const diffB = Math.max(0, bgB - b);
      const diff = Math.max(diffR, diffG, diffB);

      // Background paper / scanning noise threshold
      if (diff < 12) {
        data[i + 3] = 0; // Fully transparent
      } else {
        // Smooth alpha calculation for anti-aliasing
        const t = Math.min(1, Math.max(0, (diff - 12) / 100));
        const alpha = t * t * (3 - 2 * t);

        // Recover true foreground color
        let fgR = Math.round((r - (1 - alpha) * bgR) / Math.max(0.08, alpha));
        let fgG = Math.round((g - (1 - alpha) * bgG) / Math.max(0.08, alpha));
        let fgB = Math.round((b - (1 - alpha) * bgB) / Math.max(0.08, alpha));

        fgR = Math.min(255, Math.max(0, fgR));
        fgG = Math.min(255, Math.max(0, fgG));
        fgB = Math.min(255, Math.max(0, fgB));

        // Blend translucent edge pixels cleanly towards primary ink (#173b30 -> 23, 59, 48)
        // to prevent any light cream fringing or halo
        const blendFactor = Math.min(1, alpha * 2);
        data[i] = Math.round(fgR * blendFactor + 23 * (1 - blendFactor));
        data[i + 1] = Math.round(fgG * blendFactor + 59 * (1 - blendFactor));
        data[i + 2] = Math.round(fgB * blendFactor + 48 * (1 - blendFactor));
        data[i + 3] = Math.round(alpha * 255);
      }
    }

    ctx.putImageData(imgData, 0, 0);
    cachedTransparentUrl = canvas.toDataURL("image/png");
    listeners.forEach((listener) => listener(cachedTransparentUrl!));
    listeners.clear();
  } catch (err) {
    console.error("Failed to process logo alpha transparency:", err);
  }
}

function initLogoProcessing() {
  if (cachedTransparentUrl || isProcessing || typeof window === "undefined") return;
  isProcessing = true;

  const img = new Image();
  img.crossOrigin = "anonymous";
  img.onload = () => processLogo(img);
  img.onerror = () => {
    isProcessing = false;
  };
  img.src = foodLabBrandLogo;

  if (img.complete && img.naturalWidth > 0) {
    processLogo(img);
  }
}

if (typeof window !== "undefined") {
  initLogoProcessing();
}

interface BrandLogoProps {
  className?: string;
  alt?: string;
}

export function BrandLogo({
  className = "h-11 sm:h-12 w-auto object-contain",
  alt = "The Food Lab — Invisible diets. Visible results.",
}: BrandLogoProps) {
  const [logoSrc, setLogoSrc] = useState<string | null>(cachedTransparentUrl);

  useEffect(() => {
    if (cachedTransparentUrl) {
      setLogoSrc(cachedTransparentUrl);
      return;
    }

    const handler = (url: string) => setLogoSrc(url);
    listeners.add(handler);
    initLogoProcessing();

    // Fallback if canvas is unavailable
    const timer = setTimeout(() => {
      if (!cachedTransparentUrl) {
        setLogoSrc(foodLabBrandLogo);
      }
    }, 400);

    return () => {
      listeners.delete(handler);
      clearTimeout(timer);
    };
  }, []);

  return (
    <img
      src={logoSrc || foodLabBrandLogo}
      alt={alt}
      className={`${className} transition-opacity duration-150 ${
        logoSrc ? "opacity-100" : "opacity-90"
      }`}
    />
  );
}

export default BrandLogo;
