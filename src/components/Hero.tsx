import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { personalInfo } from "../data/portfolioData";
import { heroContainer, heroItem } from "../utils/animations";
import { PhoneMockup } from "./PhoneMockup";

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

      {/* Subtle edge vignette */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_50%_50%,transparent_55%,white_100%)] dark:bg-[radial-gradient(ellipse_90%_80%_at_50%_50%,transparent_55%,#0a0a0a_100%)] pointer-events-none"
      />

      {/* Phone – mobile only: absolute at section level, truly behind all content */}
      <div
        className="md:hidden absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-[0.28] -translate-y-1/3"
        aria-hidden="true"
      >
        <PhoneMockup />
      </div>

      {/* Text-area scrim on mobile so text stays readable over the faint phone */}
      <div
        className="md:hidden absolute inset-0 pointer-events-none z-[1]
          bg-[radial-gradient(ellipse_70%_55%_at_50%_48%,rgba(255,255,255,0.45)_0%,transparent_85%)]
          dark:bg-[radial-gradient(ellipse_70%_55%_at_50%_48%,rgba(5,5,15,0.45)_0%,transparent_85%)]"
        aria-hidden="true"
      />

      {/* Two-column content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* ── Left: text content ── */}
          <motion.div
            variants={heroContainer}
            initial="hidden"
            animate="show"
            className="space-y-6 sm:space-y-7 text-center md:text-left"
          >
            {/* Name */}
            <motion.h1
              variants={heroItem}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-900 dark:text-white leading-[1.1]"
            >
              {personalInfo.name}
            </motion.h1>

            {/* Title */}
            <motion.h2
              variants={heroItem}
              className="text-lg sm:text-xl md:text-2xl font-medium text-neutral-600 dark:text-neutral-300"
            >
              {personalInfo.title}
            </motion.h2>

            {/* Tagline */}
            <motion.p
              variants={heroItem}
              className="text-sm sm:text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-lg leading-relaxed"
            >
              {personalInfo.tagline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={heroItem}
              className="flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-3 pt-1"
            >
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
            <motion.div
              variants={heroItem}
              className="flex items-center justify-center md:justify-start gap-2"
            >
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

          {/* ── Right: phone mockup – desktop only ── */}
          <div className="hidden md:flex justify-center md:justify-end items-center py-8 md:py-0">
            <PhoneMockup />
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block z-10"
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
