import { motion } from "framer-motion";
import { stats } from "../data/portfolioData";
import { fadeUp } from "../utils/animations";

export const StatsBar = () => {
  return (
    <section className="relative z-20 -mt-8 mb-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        style={{ perspective: "1000px" }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 sm:p-7 rounded-2xl bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border border-neutral-200/90 dark:border-neutral-800 shadow-lg"
      >
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`flex flex-col items-center sm:items-start text-center sm:text-left transition-transform duration-300 hover:-translate-y-1 ${
              index !== 0 ? "sm:border-l sm:border-neutral-200 dark:sm:border-neutral-800 sm:pl-6" : ""
            }`}
          >
            <span className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white bg-clip-text">
              {stat.value}
            </span>
            <span className="mt-1 text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200">
              {stat.label}
            </span>
            <span className="text-[11px] text-neutral-500 dark:text-neutral-400 hidden sm:block">
              {stat.sublabel}
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

