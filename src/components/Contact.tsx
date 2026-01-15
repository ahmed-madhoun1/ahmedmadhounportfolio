
import { motion } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';

export const Contact = () => {
    return (
        <section id="contact" className="py-20 bg-white dark:bg-gray-900 transition-colors">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-8"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Get in Touch</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-8">
                        <a
                            href="mailto:ahmed2madhoun2@gmail.com"
                            className="flex items-center gap-3 px-6 py-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group w-full md:w-auto"
                        >
                            <Mail className="group-hover:scale-110 transition-transform" />
                            <span className="font-medium">ahmed2madhoun2@gmail.com</span>
                        </a>

                        <a
                            href="tel:+970567746416"
                            className="flex items-center gap-3 px-6 py-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 dark:hover:text-green-400 transition-colors group w-full md:w-auto"
                        >
                            <Phone className="group-hover:scale-110 transition-transform" />
                            <span className="font-medium">+970-567-746-416</span>
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
