import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { personalInfo } from "../data/portfolioData";
import { heroContainer, heroItem } from "../utils/animations";
import { BackgroundDepthElements } from "./3d/BackgroundDepthElements";

// Lazy load 3D Canvas so critical content and FCP are never blocked
const Hero3DCanvas = lazy(() => import("./3d/Hero3DCanvas"));

const socialLinks = [
  { label: "GitHub", href: personalInfo.github, icon: Github },
  { label: "LinkedIn", href: personalInfo.linkedin, icon: Linkedin },
  { label: "Email", href: `mailto:${personalInfo.email}`, icon: Mail },
];

export const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex flex-col items-center justify-center pt-20 pb-16 overflow-hidden bg-white dark:bg-neutral-950"
    >
      {/* Background grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,#f5f5f5_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f5_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)] bg-[size:56px_56px] opacity-70"
      />
      
      {/* 3D WebGL Canvas Layer (Non-blocking Lazy Load) */}
      <Suspense fallback={null}>
        <Hero3DCanvas />
      </Suspense>

      {/* Ambient 3D floating perspective geometry */}
      <BackgroundDepthElements variant="hero" />

      {/* Vignette fade to ensure text contrast */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_65%_at_50%_45%,transparent_35%,white_95%)] dark:bg-[radial-gradient(ellipse_80%_65%_at_50%_45%,transparent_35%,#0a0a0a_95%)] pointer-events-none"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pointer-events-auto">
        <motion.div variants={heroContainer} initial="hidden" animate="show" className="space-y-6 sm:space-y-7">
          {/* Availability pill */}
          <motion.div variants={heroItem} className="flex justify-center">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-200/80 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md text-xs font-medium text-neutral-600 dark:text-neutral-400 shadow-sm">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" aria-hidden="true" />
              Available for full-time and contract roles
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={heroItem}
            className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-neutral-900 dark:text-white leading-[1.1] drop-shadow-sm"
          >
            {personalInfo.name}
          </motion.h1>

          {/* Title */}
          <motion.h2 variants={heroItem} className="text-lg sm:text-xl md:text-2xl font-medium text-neutral-600 dark:text-neutral-300">
            {personalInfo.title}
          </motion.h2>

          {/* Tagline */}
          <motion.p variants={heroItem} className="text-sm sm:text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            {personalInfo.tagline}
          </motion.p>

          {/* CTAs with subtle 3D hover elevation */}
          <motion.div variants={heroItem} className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href="#projects"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-semibold hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white/60 dark:bg-neutral-900/60 backdrop-blur-sm text-neutral-800 dark:text-neutral-200 text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Get in Touch
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div variants={heroItem} className="flex items-center justify-center gap-2 pt-2">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2.5 rounded-xl text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-neutral-800/80 hover:scale-110 active:scale-95 transition-all"
              >
                <Icon size={19} />
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="mt-12 hidden md:block z-10"
      >
        <a
          href="#about"
          aria-label="Scroll to About section"
          className="text-neutral-400 dark:text-neutral-600 hover:text-neutral-700 dark:hover:text-neutral-300 transition-all inline-block hover:translate-y-1"
        >
          <ArrowDown size={18} />
        </a>
      </motion.div>
    </section>
  );
};

