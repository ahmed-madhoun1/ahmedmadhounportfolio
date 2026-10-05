import { motion } from "framer-motion";
import { GraduationCap, Award, Calendar } from "lucide-react";
import { education, certificates } from "../data/portfolioData";
import { fadeUp, staggerContainer } from "../utils/animations";

export const Education = () => {
  return (
    <section
      id="education"
      className="py-24 md:py-32 bg-white dark:bg-neutral-950 transition-colors"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-14"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-3">
            Education
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Education & Certifications
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-6"
        >
          {/* Degree Card */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row sm:items-start gap-5 p-7 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-100 dark:border-neutral-800 hover:border-neutral-200 dark:hover:border-neutral-700 transition-all duration-300 shadow-sm"
          >
            <div className="shrink-0 p-3.5 w-fit rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-sm">
              <GraduationCap size={24} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                  {education.degree}
                </h3>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 dark:text-neutral-400 shrink-0">
                  <Calendar size={13} />
                  {education.period}
                </span>
              </div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-300 mt-1">
                {education.institution}
              </p>
            </div>
          </motion.div>

          {/* Certificates Grid */}
          {certificates && certificates.length > 0 && (
            <motion.div variants={fadeUp} className="mt-8">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-4 flex items-center gap-2">
                <Award size={14} />
                Professional Certifications & Training
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {certificates.map((cert, index) => (
                  <div
                    key={index}
                    className="p-5 rounded-xl bg-neutral-50/70 dark:bg-neutral-900/40 border border-neutral-100 dark:border-neutral-800/80 flex flex-col justify-between hover:border-neutral-200 dark:hover:border-neutral-700 transition-colors"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-neutral-900 dark:text-white leading-snug">
                        {cert.title}
                      </h4>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1.5 font-medium">
                        {cert.issuer}
                      </p>
                    </div>
                    {cert.date && (
                      <span className="text-[11px] text-neutral-400 dark:text-neutral-500 mt-3 block">
                        {cert.date}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

