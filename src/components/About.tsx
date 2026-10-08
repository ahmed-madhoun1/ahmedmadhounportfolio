import { motion } from "framer-motion";
import { fadeUp } from "../utils/animations";

export const About = () => {
  return (
    <section
      id="about"
      className="py-24 md:py-32 bg-neutral-50 dark:bg-neutral-900 border-y border-neutral-100 dark:border-neutral-800"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-3">
                About Me
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
                7 years of mobile engineering across Android, iOS, and Flutter.
              </h2>
            </div>

            <p className="text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
              I am a mobile software engineer with 7 years of experience building and maintaining production applications for Android and iOS. My primary technical focus is Flutter, native Android with Kotlin, and Kotlin Multiplatform.
            </p>

            <p className="text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
              Over the past several years, I have worked with companies, startups, and remote teams on apps across e-commerce, healthcare, and event management. My work typically covers the full lifecycle: structuring the codebase, integrating backend APIs, fixing performance bottlenecks, and publishing releases on Google Play and the App Store.
            </p>

            <p className="text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
              I hold a bachelor's degree in Software Engineering. In my day-to-day work, I prioritize readable code, predictable state management, and keeping production crash rates as low as possible.
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
        </div>
      </div>
    </section>
  );
};
