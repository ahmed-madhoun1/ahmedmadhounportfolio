import { motion, useScroll, useTransform } from "framer-motion";

interface BackgroundDepthElementsProps {
  variant?: "hero" | "projects" | "skills" | "contact";
}

export const BackgroundDepthElements = ({ variant = "hero" }: BackgroundDepthElementsProps) => {
  const { scrollY } = useScroll();
  const yParallaxFast = useTransform(scrollY, [0, 1000], [0, -120]);
  const yParallaxSlow = useTransform(scrollY, [0, 1000], [0, -50]);
  const rotateParallax = useTransform(scrollY, [0, 1000], [0, 45]);

  if (variant === "hero") {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden select-none -z-10"
        style={{ perspective: "1000px" }}
      >
        {/* Subtle 3D floating wireframe ring - Top Left */}
        <motion.div
          style={{ y: yParallaxSlow, rotateZ: rotateParallax }}
          className="absolute -top-12 -left-12 w-64 h-64 md:w-80 md:h-80 rounded-full border border-neutral-300/40 dark:border-neutral-700/30 opacity-60 dark:opacity-40 [transform:rotateX(55deg)_rotateY(15deg)]"
        />

        {/* Outer concentric accent ring */}
        <motion.div
          style={{ y: yParallaxFast }}
          className="absolute top-20 -left-6 w-80 h-80 md:w-96 md:h-96 rounded-full border border-dashed border-neutral-300/30 dark:border-neutral-800/40 opacity-40 dark:opacity-30 [transform:rotateX(60deg)_rotateY(-20deg)]"
        />

        {/* Floating geometric diamond - Top Right */}
        <motion.div
          style={{ y: yParallaxFast }}
          animate={{
            y: [0, -12, 0],
            rotate: [45, 52, 45],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="hidden md:block absolute top-28 right-16 w-16 h-16 border border-neutral-400/30 dark:border-neutral-600/30 rounded-xl backdrop-blur-[1px] bg-gradient-to-br from-neutral-200/10 to-transparent dark:from-neutral-700/10"
        />

        {/* Ambient perspective depth gradient at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-white dark:from-neutral-950 to-transparent" />
      </div>
    );
  }

  if (variant === "projects") {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden select-none -z-10"
      >
        {/* Subtle ambient 3D geometric accents behind project section */}
        <div className="absolute top-1/4 -right-24 w-96 h-96 rounded-full bg-gradient-to-br from-blue-500/5 to-purple-500/5 dark:from-blue-500/10 dark:to-indigo-500/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -left-24 w-96 h-96 rounded-full bg-gradient-to-tr from-emerald-500/5 to-cyan-500/5 dark:from-emerald-500/10 dark:to-teal-500/5 blur-3xl pointer-events-none" />
        
        {/* Subtle geometric wireframe grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8888880a_1px,transparent_1px),linear-gradient(to_bottom,#8888880a_1px,transparent_1px)] bg-[size:48px_48px] opacity-60" />
      </div>
    );
  }

  if (variant === "skills") {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden select-none -z-10"
      >
        <div className="absolute top-12 left-1/3 w-72 h-72 rounded-full bg-gradient-to-r from-cyan-500/5 to-blue-500/5 dark:from-cyan-500/10 dark:to-blue-500/10 blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-80 h-80 rounded-full bg-gradient-to-l from-violet-500/5 to-fuchsia-500/5 dark:from-violet-500/10 dark:to-purple-500/10 blur-3xl" />
      </div>
    );
  }

  return null;
};
