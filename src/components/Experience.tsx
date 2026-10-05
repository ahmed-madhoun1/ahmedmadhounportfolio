import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { experiences, type Experience as ExperienceType } from "../data/portfolioData";
import { fadeUp, staggerContainer } from "../utils/animations";

export const Experience = () => {
  return (
    <section id="experience" className="relative py-24 md:py-32 bg-white dark:bg-neutral-950 overflow-hidden">
      {/* Subtle depth lighting accent in background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 -left-32 w-80 h-80 rounded-full bg-blue-500/5 dark:bg-blue-500/10 blur-3xl select-none"
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-3">
            Experience
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Work Experience
          </h2>
          <p className="mt-3 text-base text-neutral-500 dark:text-neutral-400 max-w-xl">
            Track record of shipping production Flutter and native Android applications to thousands of users.
          </p>
        </motion.div>

        <div className="relative">
          {/* Layered timeline line with gradient depth */}
          <div
            aria-hidden="true"
            className="absolute left-0 top-3 bottom-3 w-[2px] bg-gradient-to-b from-blue-500/60 via-neutral-300 dark:via-neutral-700 to-transparent ml-[7px]"
          />

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={staggerContainer} className="space-y-10">
            {experiences.map((exp, index) => (
              <ExperienceCard3D key={index} exp={exp} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ExperienceCard3D = ({ exp }: { exp: ExperienceType }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = -((y - rect.height / 2) / (rect.height / 2)) * 4.5;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 4.5;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(6px)`,
      transition: "transform 0.08s ease-out",
    });
  }, []);

  const handlePointerLeave = useCallback(() => {
    setTiltStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)",
      transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
    });
  }, []);

  return (
    <motion.div variants={fadeUp} className="relative pl-9 sm:pl-10">
      {/* 3D Timeline Node */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-2 -translate-x-[1px] flex items-center justify-center"
      >
        <span className="w-4 h-4 rounded-full border-2 border-neutral-900 dark:border-white bg-white dark:bg-neutral-950 shadow-sm" />
      </div>

      {/* 3D Perspective Card */}
      <div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{
          transformStyle: "preserve-3d",
          ...tiltStyle,
        }}
        className="group p-6 md:p-8 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300 hover:shadow-xl select-none"
      >
        <div
          className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5"
          style={{ transform: "translateZ(14px)" }}
        >
          <div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white tracking-tight">
              {exp.role}
            </h3>
            <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mt-1">
              {exp.company}
            </p>
          </div>

          {exp.period && (
            <div className="flex items-center gap-1.5 text-xs font-medium text-neutral-400 dark:text-neutral-500 shrink-0 bg-white/70 dark:bg-neutral-800/70 border border-neutral-200/50 dark:border-neutral-700/50 px-3 py-1 rounded-full backdrop-blur-sm self-start sm:self-auto">
              <Calendar size={12} className="text-neutral-500 dark:text-neutral-400" />
              <span>{exp.period}</span>
            </div>
          )}
        </div>

        <ul
          className="space-y-2.5"
          style={{ transform: "translateZ(10px)" }}
        >
          {exp.description.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
              <span aria-hidden="true" className="mt-[8px] w-1.5 h-1.5 bg-blue-500/70 dark:bg-blue-400/80 rounded-full flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

