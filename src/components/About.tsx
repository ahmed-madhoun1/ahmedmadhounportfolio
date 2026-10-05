import { motion } from "framer-motion";
import { personalInfo } from "../data/portfolioData";
import { fadeUp, staggerContainer } from "../utils/animations";

const focusAreas = [
  {
    title: "Cross-Platform Flutter",
    desc: "Building single-codebase iOS and Android applications with structured state management and Clean Architecture.",
  },
  {
    title: "Native Android & KMP",
    desc: "Developing native Android apps with Kotlin and Jetpack Compose, with shared business logic using Kotlin Multiplatform.",
  },
  {
    title: "Production Stability",
    desc: "Profiling memory, optimizing list rendering, and implementing automated workflows targeting 99.9% crash-free sessions.",
  },
];

export const About = () => {
  return (
    <section
      id="about"
      className="py-24 md:py-32 bg-neutral-50 dark:bg-neutral-900 border-y border-neutral-100 dark:border-neutral-800"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left column - text */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="lg:col-span-7 space-y-6"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-3">
                About Me
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
                Engineering mobile apps with focus on stability and clean architecture.
              </h2>
            </div>

            <p className="text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
              {personalInfo.summary}
            </p>

            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
              My work spans the full mobile release cycle: architecting state management with Bloc and Provider, developing native Android components with Jetpack Compose, profiling and eliminating memory leaks, and managing deployments to Google Play Console and App Store Connect.
            </p>

            <div className="pt-2">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-white hover:opacity-60 transition-opacity underline underline-offset-4"
              >
                Get in touch
              </a>
            </div>
          </motion.div>

          {/* Right column - focus cards */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="lg:col-span-5 space-y-4"
          >
            {focusAreas.map((area) => (
              <motion.div
                key={area.title}
                variants={fadeUp}
                whileHover={{ scale: 1.02, x: 4 }}
                transition={{ duration: 0.2 }}
                className="p-5 rounded-2xl bg-white dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-700/60 shadow-sm hover:shadow-md hover:border-neutral-300 dark:hover:border-neutral-600 transition-all duration-300"
              >
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                  {area.title}
                </h3>
                <p className="mt-1.5 text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  {area.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
