
import { motion } from 'framer-motion';

export const About = () => {
    return (
        <section id="about" className="py-20 bg-white dark:bg-gray-900 transition-colors">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">About Me</h2>
                    <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full"></div>

                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
                        Mobile Software Engineer with extensive experience in Flutter, Android native, and Kotlin Multiplatform.
                        Proven track record of developing high-performance applications, optimizing UI rendering,
                        and implementing secure data-sharing functionalities.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};
