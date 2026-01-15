
import { motion } from 'framer-motion';
import { Calendar, Building2 } from 'lucide-react';

const experiences = [
    {
        role: 'Senior Flutter Engineer',
        company: 'Event Masters',
        period: 'May 2025 – Aug 2025',
        description: [
            'Developed and maintained multiple company apps using Flutter & Dart, including Event Masters Freelancers and Event Masters Promotions.',
            'Built the Academy module in Freelancers: designed course flows, integrated backend APIs, and implemented onboarding UX.',
            'Refactored legacy features and re-engineered code paths to improve responsiveness and maintainability.',
            'Led performance monitoring and cross-platform optimization efforts to enhance app stability and user experience.',
        ],
    },
    {
        role: 'Android Engineer',
        company: 'Saving Solutions Company',
        period: '', // Not provided in text, assuming N/A or previous. Wait, looks like the block structure is Company | Date? No, Saving Solutions Company has no date in the text block provided. Wait. "Event Masters | May 2025...". "Saving Solutions Company" line is solitary.
        // I will check the text again carefully.
        // "Android Engineer" -> "Saving Solutions Company". Formatting in user text was:
        // "Developed Zaheed... Android Engineer Saving Solutions Company"
        // I need to be careful. The user text says:
        // "Developed Zaheed... (bullets) ... Android Engineer Saving Solutions Company"
        // Usually the Role/Company is a header.
        // I will format it as Role: Android Engineer at Saving Solutions Company.
        description: [
            'Developed Zaheed a large-scale Android e-commerce app using Kotlin & Jetpack Compose.',
            'Implemented secure payment gateway, complex UI flows, and efficient pagination for large product catalogs.',
            'Optimized UI rendering and memory usage, resulting in 30% improved scrolling performance and reduced memory consumption.',
        ],
    },
    {
        role: 'Mobile Software Engineer',
        company: 'Cue Tech',
        period: '',
        description: [
            'Developed and shipped Aman (cross-platform, Flutter) and Cue (Android), focusing on secure data sharing and high performance.',
            'Implemented NFC & QR-based data flows and end-to-end encryption to secure emergency data exchanges.',
            'Optimized system performance, improving data transfer speed by 20%, increasing reliability under high-pressure scenarios.',
            'Delivered features from architecture to release; collaborated with backend and design teams to ensure seamless integrations.',
        ],
    },
];

export const Experience = () => {
    return (
        <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Experience</h2>
                    <div className="w-20 h-1.5 bg-blue-600 mx-auto mt-4 rounded-full"></div>
                </motion.div>

                <div className="max-w-4xl mx-auto space-y-8">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-800"
                        >
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{exp.role}</h3>
                                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mt-2">
                                        <Building2 size={18} />
                                        <span>{exp.company}</span>
                                    </div>
                                </div>
                                {exp.period && (
                                    <div className="flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
                                        <Calendar size={16} />
                                        <span>{exp.period}</span>
                                    </div>
                                )}
                            </div>
                            <ul className="space-y-3">
                                {exp.description.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                                        <span className="mt-2 w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0"></span>
                                        <span className="leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
