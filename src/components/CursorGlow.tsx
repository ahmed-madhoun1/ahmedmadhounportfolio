import { useEffect, useRef, useState } from "react";

export const CursorGlow = () => {
  const glowRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Only enable on desktop with fine pointer and no reduced motion preference
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isFinePointer || prefersReducedMotion) {
      return;
    }

    setIsEnabled(true);

    let mouseX = -100;
    let mouseY = -100;
    let currentX = -100;
    let currentY = -100;
    let isHoveringInteractive = false;
    let rafId: number;

    const onPointerMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Check if target is interactive
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest("a, button, [role='button'], input, textarea, select")
        );
        isHoveringInteractive = isInteractive;
      }
    };

    const updatePosition = () => {
      rafId = requestAnimationFrame(updatePosition);

      // Smooth lerp for outer ambient glow
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${currentX - 140}px, ${currentY - 140}px, 0)`;
      }

      // Fast precision follower for center dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0) scale(${
          isHoveringInteractive ? 2.5 : 1
        })`;
        dotRef.current.style.opacity = mouseX > 0 ? "1" : "0";
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    rafId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!isEnabled) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden select-none"
    >
      {/* Soft Ambient Cursor Radial Glow */}
      <div
        ref={glowRef}
        className="absolute top-0 left-0 w-[280px] h-[280px] rounded-full bg-blue-500/10 dark:bg-blue-400/15 blur-2xl transition-opacity duration-300 will-change-transform"
      />

      {/* Subtle Precision Follower Dot */}
      <div
        ref={dotRef}
        className="absolute top-0 left-0 w-2 h-2 rounded-full bg-neutral-900/40 dark:bg-white/60 backdrop-blur-[1px] transition-all duration-150 ease-out will-change-transform"
      />
    </div>
  );
};
