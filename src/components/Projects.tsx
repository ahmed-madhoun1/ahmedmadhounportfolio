import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Smartphone } from 'lucide-react';
import { getProjectCover } from '../utils/imageUtils';
import { ProjectDetailsModal } from './ProjectDetailsModal';

const projects = [
    {
        name: 'Event Masters',
        role: 'Senior Flutter Engineer',
        roleDesc: 'Built the academy feature and enhanced app performance across platforms.',
        shortDesc: 'A comprehensive event management app in Saudi Arabia that helps users plan corporate gatherings, weddings, and community events seamlessly, providing schedules, information, and tools to ensure a smooth event experience.',
        platform: 'Flutter',
        appStoreUrl: 'https://apps.apple.com/eg/app/event-masters/id6529560283',
        playStoreUrl: 'https://play.google.com/store/apps/details?id=com.application.eventMasters',
    },
    {
        name: 'POMOFIY',
        role: 'Senior Flutter Engineer',
        roleDesc: 'Built core features and ensured smooth cross-platform performance.',
        shortDesc: 'Developed a cross-platform app connecting brands with promoters and freelancers, implementing secure payments and a smooth UX to streamline event-based marketing campaigns.',
        platform: 'Flutter',
        appStoreUrl: 'https://apps.apple.com/sa/app/pomofiy-%D8%A8%D8%B1%D9%88%D9%85%D9%88%D9%81%D8%A7%D9%8A/id6748145000',
        playStoreUrl: 'https://play.google.com/store/apps/details?id=com.eventMasters.promotions',
    },
    {
        name: 'Zaheed',
        role: 'Senior Android Engineer',
        roleDesc: 'Built the app, led the dev team, and implemented core features.',
        shortDesc: 'A large-scale e-commerce app for Riyadh stores, bringing all offers into one place with a seamless shopping experience, secure payments, and optimized performance for fast, responsive navigation.',
        platform: 'Android',
        playStoreUrl: 'https://play.google.com/store/apps/details?id=com.bestcoders.zaheed',
    },
    {
        name: 'Eventorio',
        role: 'Senior Mobile Software Engineer',
        roleDesc: 'Built core features and ensured smooth cross-platform performance.',
        shortDesc: 'A multiplatform event companion app providing schedules, exhibitor directories, interactive maps, and tools to help attendees plan, navigate, and maximize their event experience.',
        platform: 'KMP',
        appStoreUrl: 'https://apps.apple.com/us/app/eventorio/id6502608372',
        playStoreUrl: 'https://play.google.com/store/apps/details?id=com.paleblueapps.eventorio&hl=en',
    },
    {
        name: 'TAB Tactical Analysis Board',
        role: 'Senior Mobile Software Engineer',
        roleDesc: 'Developed tactical analysis tools for sports professionals.',
        shortDesc: 'A specialized tool for coaches and analysts to create, save, and share tactical plays and game strategies with precision and ease.',
        platform: 'Flutter',
        appStoreUrl: 'https://apps.apple.com/us/app/tab-tactical-analysis-board/id6751580414',
        playStoreUrl: 'https://play.google.com/store/apps/details?id=com.skhaa.tab',
    },
    {
        name: 'Aman',
        role: 'Senior Flutter Engineer',
        roleDesc: 'Built core features and implemented secure data-sharing functionality.',
        shortDesc: 'A cross-platform emergency app connecting citizens with authorities, enabling secure data sharing via NFC and QR codes to improve response times and user safety.',
        platform: 'Flutter',
    },
    {
        name: 'Cue',
        role: 'Senior Android Engineer',
        roleDesc: 'Developed core features and integrated QR Code and NFC functionality.',
        shortDesc: 'A social media app enabling users to quickly and securely share information using QR Code and NFC technology, creating seamless digital interactions and connectivity.',
        platform: 'Android',
    },
    {
        name: 'Mataeim',
        role: 'Senior Android Engineer',
        roleDesc: 'Built core features and optimized app for smooth food ordering.',
        shortDesc: 'An app connecting users with nearby restaurants, enabling menu browsing, order placement, flexible payments, and scheduled deliveries for a seamless food ordering experience.',
        platform: 'Android',
    },
];

export const Projects = () => {
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (project: typeof projects[0]) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        // Small delay to clear selected project after animation if needed, but not strictly necessary here
    };

    return (
        <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Projects</h2>
                    <div className="w-20 h-1.5 bg-blue-600 mx-auto mt-4 rounded-full"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={index}
                            project={project}
                            index={index}
                            onOpenDetails={() => openModal(project)}
                        />
                    ))}
                </div>
            </div>

            <ProjectDetailsModal
                project={selectedProject}
                isOpen={isModalOpen}
                onClose={closeModal}
            />
        </section>
    );
};

const ProjectCard = ({ project, index, onOpenDetails }: { project: any; index: number; onOpenDetails: () => void }) => {
    const coverImage = getProjectCover(project.name);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-white/30 dark:bg-black/20 backdrop-blur-2xl rounded-2xl overflow-hidden shadow-lg border border-white/20 dark:border-white/10 flex flex-col h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
        >
            {/* Cover Image Area */}
            <div className="relative h-56 overflow-hidden">
                {coverImage ? (
                    <img
                        src={coverImage}
                        alt={project.name}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center text-gray-300 dark:text-gray-700">
                        <Smartphone size={48} />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />

                <div className="absolute bottom-4 left-4 right-4 z-10">
                    <div className="flex justify-between items-end">
                        <h3 className="text-xl font-bold text-white mb-1 drop-shadow-md">
                            {project.name}
                        </h3>
                        <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-semibold backdrop-blur-md bg-white/20 text-white border border-white/20 shadow-sm`}>
                            {project.platform}
                        </span>
                    </div>
                </div>
            </div>

            <div className="p-6 flex-1 flex flex-col bg-transparent">
                <div className="mb-4">
                    <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">{project.role}</p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 leading-relaxed">{project.shortDesc}</p>
                </div>

                <div className="mt-auto pt-4 border-t border-gray-100/50 dark:border-gray-700/50 flex items-center justify-between">
                    <button
                        onClick={onOpenDetails}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors group-hover:translate-x-1 duration-300"
                    >
                        View Details <ArrowRight size={16} />
                    </button>

                    <div className="flex gap-2">
                        {project.appStoreUrl && (
                            <a href={project.appStoreUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-all">
                                <Smartphone size={18} />
                            </a>
                        )}
                        {project.playStoreUrl && (
                            <a href={project.playStoreUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-all">
                                <Smartphone size={18} />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

