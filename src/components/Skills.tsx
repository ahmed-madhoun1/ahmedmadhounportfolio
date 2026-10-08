import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Smartphone, Layers, Cpu, Cloud, Wrench, Tablet, Apple, Zap, GitBranch, Shield } from "lucide-react";
import { skillCategories, type SkillCategory } from "../data/portfolioData";
import { fadeUp, staggerContainer } from "../utils/animations";
import { BackgroundDepthElements } from "./3d/BackgroundDepthElements";

type IconComponent = React.ComponentType<{ size?: number; className?: string }>;

const iconMap: Record<string, IconComponent> = {
  smartphone: Smartphone,
  layers: Layers,
  cpu: Cpu,
  cloud: Cloud,
  tool: Wrench,
  android: Tablet,
  apple: Apple,
  flutter: Zap,
  kmp: GitBranch,
  shield: Shield,
};

export const Skills = () => {
  return (
    <section id="skills" className="relative py-24 md:py-32 bg-neutral-50 dark:bg-neutral-900 border-y border-neutral-100 dark:border-neutral-800 overflow-hidden">
      <BackgroundDepthElements variant="skills" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-3">
            Skills
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Technical Skills
          </h2>
          <p className="mt-3 text-base text-neutral-500 dark:text-neutral-400 max-w-xl">
            Specialized in building performant, production-ready mobile architectures and scalable UI systems.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {skillCategories.map((category) => (
            <SkillCard3D key={category.title} category={category} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const SkillCard3D = ({ category }: { category: SkillCategory }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const Icon: IconComponent = iconMap[category.icon] ?? Smartphone;

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = -((y - rect.height / 2) / (rect.height / 2)) * 7;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 7;

    setTiltStyle({
      transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(8px)`,
      transition: "transform 0.08s ease-out",
    });
  }, []);

  const handlePointerLeave = useCallback(() => {
    setTiltStyle({
      transform: "perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)",
      transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
    });
  }, []);

  return (
    <motion.div
      variants={fadeUp}
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        transformStyle: "preserve-3d",
        ...tiltStyle,
      }}
      className="p-6 rounded-2xl bg-white dark:bg-neutral-800/60 border border-neutral-100 dark:border-neutral-700/60 hover:border-neutral-300 dark:hover:border-neutral-600 hover:shadow-xl transition-all duration-300 group cursor-default select-none"
    >
      <div
        className="flex items-center gap-3 mb-5"
        style={{ transform: "translateZ(16px)" }}
      >
        <div className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-700/60 text-neutral-600 dark:text-neutral-300 group-hover:bg-neutral-900 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-neutral-900 group-hover:rotate-6 group-hover:scale-110 transition-all duration-300 shadow-sm">
          <Icon size={18} />
        </div>
        <h3 className="text-sm font-bold text-neutral-900 dark:text-white tracking-tight">
          {category.title}
        </h3>
      </div>

      <div
        className="flex flex-wrap gap-2"
        style={{ transform: "translateZ(12px)" }}
      >
        {category.skills.map((skill) => (
          <span
            key={skill}
            className="inline-block px-2.5 py-1 text-xs font-medium rounded-lg bg-neutral-100 dark:bg-neutral-700/50 text-neutral-700 dark:text-neutral-300 border border-neutral-200/60 dark:border-neutral-600/40 hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-900 hover:-translate-y-0.5 hover:shadow-sm transition-all duration-200"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

