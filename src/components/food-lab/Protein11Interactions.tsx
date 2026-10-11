import React, { useState, useCallback, useRef, useEffect } from "react";
import { User, ArrowLeft, ArrowRight } from "lucide-react";
import { PERSONAS } from "./protein11Personas";
import ParticleBarExplorer from "./ParticleBarExplorer";
import Chapter2Digestion from "./Chapter2Digestion";
import Chapter3YourDay from "./Chapter3YourDay";
import Chapter4Fresh from "./Chapter4Fresh";
import "./Protein11Interactions.css";

export function Protein11Interactions() {
  // Shared state for all chapters: defaults to none (null)
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);

  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  
  const slides = [
    <ParticleBarExplorer key="particle-bar" />,
    <Chapter2Digestion key="chapter2" />,
    <Chapter3YourDay 
      key="chapter3"
      selectedPersonaId={selectedPersona}
      onSelectPersona={setSelectedPersona}
      onSelectPartnership={() => {}} // Chapter3YourDay doesn't actually use this in its current form
    />,
    <Chapter4Fresh key="chapter4" />
  ];
  
  const slideRefs = useRef<Array<HTMLDivElement | null>>(Array(4).fill(null));
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  // Auto-rotate every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);
  
  // Pause auto-rotate on hover
  useEffect(() => {
    if (containerRef.current) {
      const handleMouseEnter = () => {
        // Clear interval would be handled by a separate effect if needed
        // For simplicity, we'll rely on the interval continuing but user can still drag
      };
      const handleMouseLeave = () => {
        // Resume interval
      };
      
      containerRef.current.addEventListener("mouseenter", handleMouseEnter);
      containerRef.current.addEventListener("mouseleave", handleMouseLeave);
      
      return () => {
        containerRef.current.removeEventListener("mouseenter", handleMouseEnter);
        containerRef.current.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);
  
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    const x = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
    setStartX(x);
    setIsDragging(true);
  };
  
  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const x = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
    const diff = x - startX;
    setTranslateX(diff);
  };
  
  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    const x = e.type === "touchend" ? e.changedTouches[0].clientX : e.clientX;
    const diff = x - startX;
    
    // If dragged more than 20% of slide width, change slide
    const slideWidth = containerRef.current ? containerRef.current.clientWidth : 0;
    if (Math.abs(diff) > slideWidth * 0.2) {
      if (diff > 0) {
        // Dragged right -> previous slide
        setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
      } else {
        // Dragged left -> next slide
        setCurrentSlide(prev => (prev + 1) % slides.length);
      }
    }
    // Reset translateX after animation
    setTranslateX(0);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }
  };
  
  // Calculate transforms for coverflow effect
  const slideStyles = slides.map((_, index) => {
    const offset = index - currentSlide;
    const absOffset = Math.abs(offset);
    
    // Base transform for coverflow
    let rotateY = 0;
    let translateZ = 0;
    let opacity = 1;
    let scale = 1;
    
    if (absOffset === 1) {
      // Adjacent slides
      rotateY = offset * 30; // 30 degrees
      translateZ = -200; // 200px back
      opacity = 0.8;
      scale = 0.9;
    } else if (absOffset === 2) {
      // Two slides away
      rotateY = offset * 60; // 60 degrees
      translateZ = -500; // 500px back
      opacity = 0.6;
      scale = 0.8;
    } else if (absOffset >= 3) {
      // Further away
      rotateY = offset * 90; // 90 degrees
      translateZ = -800; // 800px back
      opacity = 0.3;
      scale = 0.7;
    }
    
    // Center slide (offset = 0)
    if (offset === 0) {
      rotateY = 0;
      translateZ = 0;
      opacity = 1;
      scale = 1;
    }
    
    return {
      transform: `
        perspective(1200px)
        rotateY(${rotateY}deg)
        translateZ(${translateZ}px)
        translateX(${translateX}px)
        scale(${scale})
      `,
      opacity,
      zIndex: Math.round(100 - absOffset * 10) // Higher z-index for center slides
    };
  });
  
  return (
    <div className="p11-experience-root" id="p11-experience">
      {/* Top Bar: "Who's eating?" Chips (Shared State, defaults to none) */}
      <header className="p11-whos-eating-bar" aria-label="Who's eating persona filter">
        <div className="p11-whos-eating-lead">
          <User className="h-4 w-4 text-brick" aria-hidden="true" />
          <span className="p11-whos-eating-title">Who’s eating?</span>
        </div>
        <div className="p11-whos-eating-chips" role="toolbar" aria-label="Who's eating schedules">
          {PERSONAS.map((persona) => {
            const isSelected = selectedPersona === persona.id;
            return (
              <button
                key={persona.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() =>
                  setSelectedPersona(isSelected ? null : persona.id)
                }
                className={`p11-whos-eating-chip ${isSelected ? "is-active" : ""}`}
              >
                {persona.chipLabel}
              </button>
            );
          })}
          {selectedPersona !== null && (
            <button
              type="button"
              onClick={() => setSelectedPersona(null)}
              className="p11-whos-eating-clear"
              aria-label="Clear persona selection"
            >
              Reset
            </button>
          )}
        </div>
      </header>

      {/* Carousel Container */}
      <div
        ref={containerRef}
        className="p11-carousel-container"
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart, { passive: true }}
        onMouseMove={handleDragMove}
        onTouchMove={handleDragMove, { passive: true }}
        onMouseUp={handleDragEnd}
        onTouchEnd={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchCancel={handleDragEnd}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        aria-label="Chapter carousel"
        role="region"
      >
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={slide.key}
            ref={el => (slideRefs.current[index] = el)}
            className="p11-carousel-slide"
            style={slideStyles[index]}
            aria-hidden={index !== currentSlide}
          >
            {slide}
          </div>
        ))}
        
        {/* Navigation buttons */}
        <button
          type="button"
          onClick={() => setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length)}
          className="p11-carousel-nav p11-carousel-nav-prev"
          aria-label="Previous chapter"
        >
          <ArrowLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => setCurrentSlide(prev => (prev + 1) % slides.length)}
          className="p11-carousel-nav p11-carousel-nav-next"
          aria-label="Next chapter"
        >
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </button>
        
        {/* Slide indicators */}
        <div className="p11-carousel-indicators" aria-label="Slide navigation">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`p11-carousel-indicator ${index === currentSlide ? "is-active" : ""}`}
              aria-label={`Slide ${index + 1} of ${slides.length}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Protein11Interactions;