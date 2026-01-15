
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

export const Education = () => {
    return (
        <section id="education" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Education</h2>
                    <div className="w-20 h-1.5 bg-blue-600 mx-auto mt-4 rounded-full"></div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6"
                >
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-full text-blue-600 dark:text-blue-400">
                        <GraduationCap size={32} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            Software Engineering
                        </h3>
                        <p className="text-lg text-gray-700 dark:text-gray-300 mt-2">
                            Islamic University of Gaza — Bachelor’s degree
                        </p>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">
                            Sep 2018 – Sep 2022
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
