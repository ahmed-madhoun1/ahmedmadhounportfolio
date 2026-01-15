
import { motion } from 'framer-motion';

const skillCategories = [
    {
        title: 'Core Technical Skills',
        skills: [
            'Flutter', 'Dart', 'Android', 'Kotlin', 'Jetpack Compose',
            'Bloc / Cubit', 'Kotlin Multiplatform (KMP)', 'Android SDK',
            'Android Jetpack (Coroutines, Flow, Lifecycle)', 'REST APIs'
        ],
    },
    {
        title: 'Additional Tools & Patterns',
        skills: [
            'AI Tools', 'Firebase', 'Hilt / Koin', 'CI/CD (GitHub Actions/GitLab CI)',
            'Unit & Integration Testing', 'TDD', 'Git', 'NFC & QR integrations',
            'Performance optimization', 'Modularization', 'Clean Architecture',
            'MVI / MVVM', 'Swift (iOS)'
        ],
    },
];

export const Skills = () => {
    return (
        <section id="skills" className="py-20 bg-white dark:bg-gray-900 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Skills</h2>
                    <div className="w-20 h-1.5 bg-blue-600 mx-auto mt-4 rounded-full"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {skillCategories.map((category, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: idx === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center md:text-left">
                                {category.title}
                            </h3>
                            <div className="flex flex-wrap justify-center md:justify-start gap-3">
                                {category.skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
