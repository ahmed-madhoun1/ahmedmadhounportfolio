import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const projects = [
    {
        name: 'Mataeim',
        role: 'Senior Android Engineer',
        roleDesc: 'Built core features and optimized app for smooth food ordering.',
        shortDesc: 'An app connecting users with nearby restaurants, enabling menu browsing, order placement, flexible payments, and scheduled deliveries for a seamless food ordering experience.',
        platform: 'Android',
    },
    {
        name: 'Cue',
        role: 'Senior Android Engineer',
        roleDesc: 'Developed core features and integrated QR Code and NFC functionality.',
        shortDesc: 'A social media app enabling users to quickly and securely share information using QR Code and NFC technology, creating seamless digital interactions and connectivity.',
        platform: 'Android',
    },
    {
        name: 'Aman',
        role: 'Senior Flutter Engineer',
        roleDesc: 'Built core features and implemented secure data-sharing functionality.',
        shortDesc: 'A cross-platform emergency app connecting citizens with authorities, enabling secure data sharing via NFC and QR codes to improve response times and user safety.',
        platform: 'Flutter',
    },
    {
        name: 'Zaheed',
        role: 'Senior Android Engineer',
        roleDesc: 'Built the app, led the dev team, and implemented core features.',
        shortDesc: 'A large-scale e-commerce app for Riyadh stores, bringing all offers into one place with a seamless shopping experience, secure payments, and optimized performance for fast, responsive navigation.',
        platform: 'Android',
    },
    {
        name: 'Eventorio',
        role: 'Senior Mobile Software Engineer',
        roleDesc: 'Built core features and ensured smooth cross-platform performance.',
        shortDesc: 'A multiplatform event companion app providing schedules, exhibitor directories, interactive maps, and tools to help attendees plan, navigate, and maximize their event experience.',
        platform: 'KMP',
    },
    {
        name: 'Event Masters',
        role: 'Senior Flutter Engineer',
        roleDesc: 'Built the academy feature and enhanced app performance across platforms.',
        shortDesc: 'A comprehensive event management app in Saudi Arabia that helps users plan corporate gatherings, weddings, and community events seamlessly, providing schedules, information, and tools to ensure a smooth event experience.',
        platform: 'Flutter',
    },
    {
        name: 'POMOFIY',
        role: 'Senior Flutter Engineer',
        roleDesc: 'Built core features and ensured smooth cross-platform performance.',
        shortDesc: 'Developed a cross-platform app connecting brands with promoters and freelancers, implementing secure payments and a smooth UX to streamline event-based marketing campaigns.',
        platform: 'Flutter',
    },
];

export const Projects = () => {
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
                        <ProjectCard key={index} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const ProjectCard = ({ project, index }: { project: any; index: number }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-800 flex flex-col"
        >
            <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{project.name}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${project.platform === 'Flutter' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                        project.platform === 'Android' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                            'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
                        }`}>
                        {project.platform}
                    </span>
                </div>

                <div className="mb-4">
                    <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-1">My role</p>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">{project.role} — {project.roleDesc}</p>
                </div>

                <div className="mb-4 flex-1">
                    <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-1">Project description</p>
                    <p className={`text-gray-600 dark:text-gray-400 text-sm leading-relaxed ${!isExpanded && 'line-clamp-3'}`}>
                        {project.name} ({project.platform}): {project.shortDesc}
                    </p>
                </div>

                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="mt-auto flex items-center justify-center gap-1 text-sm font-medium text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors w-full pt-4 border-t border-gray-100 dark:border-gray-800"
                >
                    {isExpanded ? (
                        <>Show Less <ChevronUp size={16} /></>
                    ) : (
                        <>Read More <ChevronDown size={16} /></>
                    )}
                </button>
            </div>
        </motion.div>
    );
};
