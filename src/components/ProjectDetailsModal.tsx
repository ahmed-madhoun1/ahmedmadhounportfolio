import { X, ChevronLeft, ChevronRight, Github, Smartphone } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getProjectImages } from "../utils/imageUtils";
import type { Project } from "../data/portfolioData";

interface ProjectDetailsModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

// Apple logo SVG (24x24 standard viewBox)
const AppleIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 1.01-2.87-.9.04-2 .6-2.65 1.35-.58.65-1.09 1.71-1.02 2.76.99.08 2.05-.49 2.66-1.24z" />
  </svg>
);

// Google Play icon (24x24 standard viewBox)
const PlayStoreIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
    <path d="M3.609 1.814L13.793 12 3.61 22.186c-.36-.263-.61-.69-.61-1.186V3c0-.496.25-.923.609-1.186zm11.254 11.256l2.365-2.365-11.83-6.812 9.465 9.177zm0 1.86l-9.465 9.177 11.83-6.812-2.365-2.365zm3.195-2.22l2.67-1.536c.64-.37.64-.97 0-1.34l-2.67-1.536-2.11 2.206 2.11 2.206z" />
  </svg>
);

export const ProjectDetailsModal = ({
  project,
  isOpen,
  onClose,
}: ProjectDetailsModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = project ? getProjectImages(project.name) : [];

  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen, project]);

  const nextImage = useCallback(() => {
    if (images.length === 0) return;
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    if (images.length === 0) return;
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && images.length > 1) nextImage();
      if (e.key === "ArrowLeft" && images.length > 1) prevImage();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose, nextImage, prevImage, images.length]);

  const hasLinks = Boolean(project && (project.appStoreUrl || project.playStoreUrl || project.githubUrl));

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-200 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={project ? `${project.name} details` : "Project details"}
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-xl flex flex-col bg-white dark:bg-neutral-950 shadow-2xl transform transition-transform duration-200 ease-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {project && (
          <>
            {/* Top bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 dark:border-neutral-800 shrink-0">
              <div>
                <h2 className="text-base font-bold text-neutral-900 dark:text-white leading-tight">
                  {project.name}
                </h2>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  {project.role}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                aria-label="Close panel"
              >
                <X size={18} />
              </button>
            </div>

            {/* Store / GitHub links bar - pinned at the top so it is NEVER hidden behind or below images */}
            {hasLinks && (
              <div className="px-6 py-3 border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50/90 dark:bg-neutral-900/70 backdrop-blur-sm flex flex-wrap items-center gap-2.5 shrink-0 z-10">
                {project.appStoreUrl && (
                  <a
                    href={project.appStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-semibold hover:bg-neutral-700 dark:hover:bg-neutral-200 transition-colors shadow-sm"
                  >
                    <AppleIcon />
                    App Store
                  </a>
                )}
                {project.playStoreUrl && (
                  <a
                    href={project.playStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-semibold hover:bg-neutral-700 dark:hover:bg-neutral-200 transition-colors shadow-sm"
                  >
                    <PlayStoreIcon />
                    Google Play
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors shadow-sm"
                  >
                    <Github size={14} />
                    GitHub
                  </a>
                )}
              </div>
            )}

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto">

              {/* Image carousel */}
              {images.length > 0 ? (
                <div className="relative w-full h-[260px] sm:h-[300px] bg-neutral-100 dark:bg-neutral-900 overflow-hidden shrink-0 flex items-center justify-center select-none border-b border-neutral-100 dark:border-neutral-800">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImageIndex}
                      src={images[currentImageIndex]}
                      alt={`${project.name} screenshot ${currentImageIndex + 1}`}
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="max-h-full max-w-full w-auto h-auto object-contain block mx-auto drop-shadow-md"
                    />
                  </AnimatePresence>
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 dark:bg-black/80 hover:bg-white dark:hover:bg-black text-neutral-800 dark:text-white shadow-md transition-colors z-10"
                        aria-label="Previous screenshot"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 dark:bg-black/80 hover:bg-white dark:hover:bg-black text-neutral-800 dark:text-white shadow-md transition-colors z-10"
                        aria-label="Next screenshot"
                      >
                        <ChevronRight size={16} />
                      </button>
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm z-10">
                        {images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            aria-label={`Go to screenshot ${idx + 1}`}
                            className={`rounded-full transition-all duration-150 ${idx === currentImageIndex ? "w-5 h-2 bg-white" : "w-2 h-2 bg-white/50 hover:bg-white/80"}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="h-24 flex items-center justify-center gap-2 text-neutral-400 dark:text-neutral-600 bg-neutral-50 dark:bg-neutral-900/60 shrink-0 border-b border-neutral-100 dark:border-neutral-800">
                  <Smartphone size={20} />
                  <span className="text-xs font-medium">No screenshots available</span>
                </div>
              )}

              {/* Details */}
              <div className="px-6 py-6 space-y-6">

                {/* About */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-2">
                    About
                  </p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {project.shortDesc}
                  </p>
                </div>

                {/* My Contribution */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-2">
                    My Contribution
                  </p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {project.roleDesc}
                  </p>
                </div>

                {/* Tech Stack */}
                {project.technologies && project.technologies.length > 0 && (
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-3">
                      Tech Stack
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-xs font-medium rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom bar */}
            <div className="px-6 py-4 border-t border-neutral-100 dark:border-neutral-800 shrink-0 bg-white dark:bg-neutral-950">
              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};
