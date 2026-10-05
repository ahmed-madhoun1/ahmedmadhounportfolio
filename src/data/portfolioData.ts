// Portfolio Data - Single source of truth for all content
// Sourced strictly from Ahmed Almadhoun's verified background

export const personalInfo = {
  name: 'Ahmed Almadhoun',
  title: 'Senior Mobile Software Engineer',
  tagline: 'Mobile software engineer specializing in Flutter, Kotlin, and Android development.',
  summary:
    'Senior Mobile Software Engineer with over 5 years of experience developing iOS and Android applications. Specializes in Flutter, Kotlin, and Clean Architecture, with direct experience shipping production apps to the App Store and Google Play. Background includes building modular architectures, implementing end-to-end encryption, and optimizing app performance for high-traffic products.',
  email: 'ahmed2madhoun2@gmail.com',
  phone: '+970-567-746-416',
  github: 'https://github.com/ahmed-madhoun1',
  linkedin: 'https://www.linkedin.com/in/ahmed-madhoun1/',
} as const;

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string[];
}

export const experiences: Experience[] = [
  {
    role: 'Senior Flutter Engineer',
    company: 'Skhaa for Information Technology',
    period: 'Aug 2025 – Jun 2026',
    description: [
      'Built and maintained high-traffic Flutter applications, reducing crash rates by 25% through structured error handling and Clean Architecture.',
      'Developed reusable UI component libraries used across development teams to speed up feature delivery.',
      'Integrated backend REST APIs and resolved Android-specific performance bottlenecks.',
    ],
  },
  {
    role: 'Senior Flutter Engineer',
    company: 'Event Masters',
    period: 'May 2025 – Aug 2025',
    description: [
      "Built the 'Academy' module for the Freelancers app, improving user onboarding and retention.",
      'Maintained Event Masters Promotions throughout its release cycle, maintaining 99.9% crash-free sessions and reliable backend synchronization.',
      'Refactored legacy code to improve responsiveness and simplify maintenance.',
      'Monitored production performance and resolved cross-platform stability issues.',
    ],
  },
  {
    role: 'Freelance Mobile Developer',
    company: 'Independent',
    period: 'Oct 2023 – Apr 2025',
    description: [
      'Developed and shipped custom Flutter and Kotlin mobile applications for independent clients.',
      'Handled requirements gathering, architecture, implementation, and App Store / Google Play submissions.',
      'Worked directly with founders and teams to deliver mobile products on schedule.',
    ],
  },
  {
    role: 'Android Engineer',
    company: 'Saving Solutions Company',
    period: 'Jul 2023 – Oct 2023',
    description: [
      'Developed Zaheed, an Android e-commerce application using Kotlin and Jetpack Compose.',
      'Implemented payment gateways, checkout flows, and pagination for large product catalogs.',
      'Optimized UI rendering and memory usage, improving list scrolling performance by 30%.',
    ],
  },
  {
    role: 'Mobile Software Engineer',
    company: 'Cue Tech',
    period: 'Oct 2022 – Jun 2023',
    description: [
      'Developed Aman (Flutter, cross-platform) and Cue (Android, Kotlin), focusing on secure data exchange.',
      'Implemented NFC and QR-based data transfer and end-to-end encryption for emergency information sharing.',
      'Improved data transfer speed by 20% through efficient serialization and background processing.',
      'Collaborated with design and backend teams from technical planning to release.',
    ],
  },
];

export interface SkillCategory {
  title: string;
  icon: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Mobile Development',
    icon: 'smartphone',
    skills: ['Flutter', 'Dart', 'Kotlin', 'Android SDK', 'iOS', 'Kotlin Multiplatform (KMP)', 'Compose Multiplatform'],
  },
  {
    title: 'Architecture & Design',
    icon: 'layers',
    skills: ['Clean Architecture', 'SOLID Principles', 'MVI / MVVM', 'Modularization', 'Unit & Widget Testing'],
  },
  {
    title: 'UI & State Management',
    icon: 'cpu',
    skills: ['Bloc', 'Provider', 'Jetpack Compose', 'Material Design', 'Coroutines & Flow'],
  },
  {
    title: 'Networking & APIs',
    icon: 'cloud',
    skills: ['RESTful APIs', 'Dio', 'Retrofit', 'GraphQL', 'WebSockets', 'Firebase'],
  },
  {
    title: 'Security, Storage & DevOps',
    icon: 'tool',
    skills: [
      'End-to-End Encryption',
      'OAuth2 & Biometrics',
      'SQLite & Room',
      'Secure Storage & ProGuard',
      'CI/CD (GitHub Actions)',
      'Google Play Console & App Store Connect',
    ],
  },
];

export interface Project {
  name: string;
  role: string;
  roleDesc: string;
  shortDesc: string;
  platform: 'Flutter' | 'Android' | 'KMP';
  appStoreUrl?: string;
  playStoreUrl?: string;
  githubUrl?: string;
  technologies?: string[];
}

export const projects: Project[] = [
  {
    name: 'Medace Hub',
    role: 'Senior Flutter Engineer',
    roleDesc: 'Developed curriculum-based video player, progress tracking, in-app purchases, and bilingual localization (Arabic and English).',
    shortDesc:
      'A medical learning application for medical students and doctors. Includes structured video courses by subject, chapter previews, user progress tracking, in-app subscription passes, and full English and Arabic support.',
    platform: 'Flutter',
    appStoreUrl: 'https://apps.apple.com/us/app/medace-hub/id6757759024',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=app.medace.medace',
    technologies: ['Flutter', 'Dart', 'In-App Purchases', 'REST APIs', 'Video Streaming', 'State Management'],
  },
  {
    name: 'Event Masters',
    role: 'Senior Flutter Engineer',
    roleDesc: 'Built the academy module and maintained cross-platform event coordination features.',
    shortDesc:
      'An event management application for corporate and community events in Saudi Arabia. Includes schedule management, exhibitor directories, and booking workflows.',
    platform: 'Flutter',
    appStoreUrl: 'https://apps.apple.com/eg/app/event-masters/id6529560283',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.application.eventMasters',
    technologies: ['Flutter', 'Dart', 'REST APIs', 'Firebase', 'Clean Architecture'],
  },
  {
    name: 'POMOFIY',
    role: 'Senior Flutter Engineer',
    roleDesc: 'Implemented promoter onboarding, matching workflows, and payment gateway integration.',
    shortDesc:
      'A platform connecting brands with promoters and freelancers for event marketing campaigns, featuring secure payments and profile verification.',
    platform: 'Flutter',
    appStoreUrl: 'https://apps.apple.com/sa/app/pomofiy/id6748145000',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.eventMasters.promotions',
    technologies: ['Flutter', 'Dart', 'REST APIs', 'Payment Gateways'],
  },
  {
    name: 'Zaheed',
    role: 'Senior Android Engineer',
    roleDesc: 'Built e-commerce browsing, catalog pagination, and checkout flows using Jetpack Compose.',
    shortDesc:
      'An Android e-commerce application serving retail stores in Riyadh. Features store directories, product search, and integrated payment processing.',
    platform: 'Android',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.bestcoders.zaheed',
    technologies: ['Kotlin', 'Jetpack Compose', 'Coroutines', 'Hilt', 'Clean Architecture'],
  },
  {
    name: 'Eventorio',
    role: 'Mobile Software Engineer',
    roleDesc: 'Engineered cross-platform modules using Kotlin Multiplatform (KMP) and Compose Multiplatform.',
    shortDesc:
      'An event companion application providing interactive venue maps, exhibitor directories, and schedule planners for conference attendees.',
    platform: 'KMP',
    appStoreUrl: 'https://apps.apple.com/us/app/eventorio/id6502608372',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.paleblueapps.eventorio',
    technologies: ['Kotlin Multiplatform (KMP)', 'Compose Multiplatform', 'REST APIs'],
  },
  {
    name: 'TAB - Tactical Analysis Board',
    role: 'Senior Flutter Engineer',
    roleDesc: 'Built real-time tactical board and strategy sharing features for sports analysts.',
    shortDesc:
      'A specialized tool for sports coaches and analysts to draw, save, and export tactical plays and game strategies.',
    platform: 'Flutter',
    appStoreUrl: 'https://apps.apple.com/ie/app/tab-tactical-analysis-board/id6751580414',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.skhaa.tab',
    technologies: ['Flutter', 'Dart', 'Firebase', 'State Management'],
  },
  {
    name: 'Aman',
    role: 'Flutter Engineer',
    roleDesc: 'Engineered NFC and QR emergency data transfer with end-to-end encryption.',
    shortDesc:
      'An emergency response application that enables instant, encrypted data exchange between citizens and response teams via NFC and QR codes.',
    platform: 'Flutter',
    technologies: ['Flutter', 'Dart', 'NFC', 'QR Code', 'End-to-End Encryption'],
  },
  {
    name: 'Cue',
    role: 'Android Engineer',
    roleDesc: 'Built contact sharing and hardware integration with NFC and QR reading.',
    shortDesc:
      'A digital contact and information exchange application using QR codes and NFC for fast peer-to-peer data sharing.',
    platform: 'Android',
    technologies: ['Kotlin', 'Jetpack Compose', 'NFC', 'QR Code'],
  },
  {
    name: 'Mataeim',
    role: 'Android Engineer',
    roleDesc: 'Developed restaurant menu navigation, order tracking, and payment processing.',
    shortDesc:
      'A food ordering application connecting customers with local restaurants, featuring scheduled deliveries and multiple payment methods.',
    platform: 'Android',
    technologies: ['Kotlin', 'Jetpack Compose', 'REST APIs', 'Firebase'],
  },
];

export const education = {
  degree: "Bachelor's Degree in Mobile Computing & Smart Device Applications",
  institution: 'Islamic University of Gaza',
  period: 'Sep 2018 – Sep 2022',
};

export interface Certificate {
  title: string;
  issuer: string;
  date?: string;
}

export const certificates: Certificate[] = [
  {
    title: 'Using AI as a Personal Assistant (50-hour training program)',
    issuer: 'GSG West Bank',
    date: 'Issued Jun 2025',
  },
  {
    title: 'SkillStack Paths (Fundamentals and Data Structures & Algorithms)',
    issuer: 'Gaza Sky Geeks',
    date: 'Issued Jun 2025',
  },
];

export interface MetricStat {
  value: string;
  label: string;
  sublabel: string;
}

export const stats: MetricStat[] = [
  { value: '5+', label: 'Years Experience', sublabel: 'Mobile software engineering' },
  { value: '9', label: 'Production Apps', sublabel: 'Published on App Store & Google Play' },
  { value: '99.9%', label: 'Crash-Free Rate', sublabel: 'Across production releases' },
  { value: '100k+', label: 'Active Users', sublabel: 'Across published applications' },
];
