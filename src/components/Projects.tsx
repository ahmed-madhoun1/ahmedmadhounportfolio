import { useState } from "react";
import { motion } from "framer-motion";
import { ProjectDetailsModal } from "./ProjectDetailsModal";
import { ProjectCard3D } from "./ProjectCard3D";
import { BackgroundDepthElements } from "./3d/BackgroundDepthElements";
import { projects, type Project } from "../data/portfolioData";

const headerVariant = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <section
      id="projects"
      className="relative py-24 md:py-32 bg-neutral-50 dark:bg-neutral-900 border-y border-neutral-100 dark:border-neutral-800 overflow-hidden"
    >
      <BackgroundDepthElements variant="projects" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={headerVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-3">
            Portfolio
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Selected Projects
          </h2>
          <p className="mt-3 text-base text-neutral-500 dark:text-neutral-400 max-w-xl">
            Production applications built and shipped to real users across iOS and Android.
          </p>
        </motion.div>

        {/* Grid with 3D perspective cards */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.06 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {projects.map((project, idx) => (
            <ProjectCard3D
              key={project.name}
              project={project}
              index={idx}
              onOpenDetails={() => openModal(project)}
            />
          ))}
        </motion.div>
      </div>

      <ProjectDetailsModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </section>
  );
};


