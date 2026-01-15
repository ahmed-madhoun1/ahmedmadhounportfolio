import { motion, AnimatePresence } from 'framer-motion';
import { X, Smartphone, ChevronLeft, ChevronRight } from 'lucide-react';

import { useState, useEffect } from 'react';
import { getProjectImages } from '../utils/imageUtils';

interface Project {
    name: string;
    role: string;
    roleDesc: string;
    shortDesc: string;
    platform: string;
    appStoreUrl?: string;
    playStoreUrl?: string;
}

interface ProjectDetailsModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}

export const ProjectDetailsModal = ({ project, isOpen, onClose }: ProjectDetailsModalProps) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = project ? getProjectImages(project.name) : [];

    useEffect(() => {
        if (isOpen) {
            setCurrentImageIndex(0);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, project]);

    if (!isOpen || !project) return null;

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/30 backdrop-blur-md"
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="relative w-full max-w-4xl max-h-[90vh] bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-white/20 dark:border-white/10"
                >
                    {/* Header with Images */}
                    <div className="relative h-64 sm:h-80 md:h-96 bg-gray-100/50 dark:bg-gray-800/50 shrink-0">
                        {images.length > 0 ? (
                            <>
                                <img
                                    src={images[currentImageIndex]}
                                    alt={`${project.name} screenshot ${currentImageIndex + 1}`}
                                    className="w-full h-full object-contain p-4"
                                />
                                {images.length > 1 && (
                                    <>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); prevImage(); }}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/30 text-gray-800 dark:text-white hover:bg-white/40 dark:hover:bg-black/40 transition-all"
                                        >
                                            <ChevronLeft size={24} />
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); nextImage(); }}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/30 text-gray-800 dark:text-white hover:bg-white/40 dark:hover:bg-black/40 transition-all"
                                        >
                                            <ChevronRight size={24} />
                                        </button>
                                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 p-2 rounded-full bg-black/20 backdrop-blur-md">
                                            {images.map((_, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                                                    className={`w-2 h-2 rounded-full transition-all ${idx === currentImageIndex ? 'bg-white scale-110' : 'bg-white/50 hover:bg-white/80'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}
                            </>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <span className="text-lg">No images available</span>
                            </div>
                        )}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 backdrop-blur-md border border-white/20 text-gray-800 dark:text-white transition-all shadow-sm"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-gradient-to-b from-transparent to-white/50 dark:to-black/50">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
                                    {project.name}
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-300 border border-blue-500/20 text-sm font-medium rounded-full backdrop-blur-sm">
                                        {project.platform}
                                    </span>
                                    <span className="px-3 py-1 bg-purple-500/10 text-purple-600 dark:text-purple-300 border border-purple-500/20 text-sm font-medium rounded-full backdrop-blur-sm">
                                        {project.role}
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                {project.appStoreUrl && (
                                    <a
                                        href={project.appStoreUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm"
                                    >
                                        <Smartphone size={18} />
                                        App Store
                                    </a>
                                )}
                                {project.playStoreUrl && (
                                    <a
                                        href={project.playStoreUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm"
                                    >
                                        <Smartphone size={18} />
                                        Play Store
                                    </a>
                                )}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Role Overview</h3>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {project.roleDesc}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">About the Project</h3>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                                    {project.shortDesc}
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};
