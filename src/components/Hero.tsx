
import { Download, ChevronDown, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export const Hero = () => {
    return (
        <section id="home" className="min-h-screen flex items-center justify-center pt-16 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                >
                    <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 tracking-tight">
                        Ahmed Almadhoun
                    </h1>
                    <h2 className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 font-medium">
                        Mobile Software Engineer
                    </h2>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-gray-600 dark:text-gray-400 mt-4">
                        <div className="flex items-center gap-2">
                            <Phone size={18} />
                            <span>+970-567-746-416</span>
                        </div>
                        <span className="hidden md:block">·</span>
                        <div className="flex items-center gap-2">
                            <Mail size={18} />
                            <a href="mailto:ahmed2madhoun2@gmail.com" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                ahmed2madhoun2@gmail.com
                            </a>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
                        <a
                            href="/resume.pdf"
                            download
                            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30 gap-2"
                        >
                            <Download size={20} />
                            Download CV
                        </a>
                        <a
                            href="#projects"
                            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
                        >
                            View Projects
                        </a>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-10"
                >
                    <a href="#about" className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors animate-bounce">
                        <ChevronDown size={32} />
                    </a>
                </motion.div>
            </div>
        </section>
    );
};
