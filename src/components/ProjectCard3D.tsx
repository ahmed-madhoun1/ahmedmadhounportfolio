import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Smartphone, ArrowUpRight } from "lucide-react";
import { getProjectCover } from "../utils/imageUtils";
import type { Project } from "../data/portfolioData";

interface ProjectCard3DProps {
  project: Project;
  onOpenDetails: () => void;
  index: number;
}

export const ProjectCard3D = ({ project, onOpenDetails }: ProjectCard3DProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({ opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const coverImage = getProjectCover(project.name);

  // Soft, luxurious 3D perspective tilt
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;

    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Gentle, pleasant tilt angle (max 4.5 degrees)
    const rotateX = -((y - centerY) / centerY) * 4.5;
    const rotateY = ((x - centerX) / centerX) * 4.5;

    // Soft specular highlight position
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`,
      transition: "transform 0.12s ease-out",
    });

    setGlareStyle({
      background: `radial-gradient(circle 220px at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.12), transparent 70%)`,
      opacity: 1,
    });
  }, []);

  const handlePointerEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handlePointerLeave = useCallback(() => {
    setIsHovered(false);
    setTiltStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)",
      transition: "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
    });
    setGlareStyle({
      opacity: 0,
      transition: "opacity 0.4s ease-out",
    });
  }, []);

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 14 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={onOpenDetails}
      style={{
        transformStyle: "preserve-3d",
        ...tiltStyle,
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpenDetails();
        }
      }}
      aria-label={`View details for ${project.name}`}
      className={`group relative flex flex-col h-[410px] bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-sm overflow-hidden select-none cursor-pointer transition-all duration-300 ${
        isHovered
          ? "border-neutral-300 dark:border-neutral-700 shadow-[0_16px_36px_-12px_rgba(0,0,0,0.08)] dark:shadow-[0_16px_36px_-12px_rgba(0,0,0,0.55)]"
          : ""
      }`}
    >
      {/* Specular glare overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-30 rounded-2xl transition-opacity duration-300"
        style={glareStyle}
      />

      {/* Cover Image Area */}
      <div className="relative h-44 bg-neutral-100 dark:bg-neutral-800 overflow-hidden shrink-0">
        {coverImage ? (
          <img
            src={coverImage}
            alt={`${project.name} preview`}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-600 ease-out will-change-transform"
            style={{
              transform: isHovered ? "scale(1.04)" : "scale(1)",
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-300 dark:text-neutral-600">
            <Smartphone size={36} />
          </div>
        )}

        {/* Soft gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-neutral-950/15 to-transparent pointer-events-none" />
      </div>

      {/* Card Content Area */}
      <div className="flex-1 flex flex-col p-5 justify-between">
        <div>
          <h3 className="text-base font-bold text-neutral-900 dark:text-white leading-tight tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
            {project.name}
          </h3>
          <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 mt-1 mb-2.5">
            {project.role}
          </p>

          <p className="text-xs text-neutral-600 dark:text-neutral-300 line-clamp-3 leading-relaxed">
            {project.shortDesc}
          </p>
        </div>

        {/* Footer Area with Tech stack and action links */}
        <div className="pt-3.5 border-t border-neutral-100 dark:border-neutral-800/80 flex flex-col gap-2.5">
          {/* Tech Pills */}
          <div className="flex flex-wrap gap-1.5 overflow-hidden max-h-6">
            {project.technologies?.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded text-[10px] font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
              >
                {tech}
              </span>
            ))}
            {(project.technologies?.length ?? 0) > 3 && (
              <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                +{project.technologies!.length - 3}
              </span>
            )}
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs font-semibold text-neutral-900 dark:text-white flex items-center gap-1 group-hover:gap-1.5 transition-all">
              Details <ArrowUpRight size={13} className="text-blue-500 opacity-60 group-hover:opacity-100 transition-opacity" />
            </span>

            <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
              {project.appStoreUrl && (
                <a
                  href={project.appStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-medium px-2 py-0.5 rounded border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:border-neutral-400 transition-colors"
                >
                  App Store
                </a>
              )}
              {project.playStoreUrl && (
                <a
                  href={project.playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-medium px-2 py-0.5 rounded border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:border-neutral-400 transition-colors"
                >
                  Play Store
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
};
