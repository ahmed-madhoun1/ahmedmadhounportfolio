# Implementation & Progress Tracking: Ahmed Almadhoun Portfolio Upgrade

## 1. Project Overview & Context
This document tracks the upgrade of the personal portfolio website for **Ahmed Almadhoun**, positioned as **Senior Mobile Software Engineer / Senior Flutter Engineer**.
All content is strictly bound to the latest CV (`Ahmed_Almdhoun_CV.docx`) and verified production projects.

---

## 2. Updated Project & CV Data

### Experience (All 5 roles included):
1. **Senior Flutter Engineer | Skhaa for Information Technology (Aug 2025 – Jun 2026)**
   - High-traffic Flutter applications, 25% crash reduction, Clean Architecture.
   - Reusable UI component libraries accelerating delivery by 40%.
   - Integration of complex REST APIs and optimizing Android bottlenecks.
2. **Senior Flutter Engineer | Event Masters (May 2025 – Aug 2025)**
   - Architected 'Academy' module in Freelancers app (15% user retention increase).
   - Event Masters Promotions full lifecycle (99.9% crash-free sessions).
3. **Freelance Mobile Developer | Independent (Oct 2023 – Apr 2025)**
   - Independent client engagements for Flutter and Kotlin apps across full product lifecycle.
4. **Android Engineer | Saving Solutions Company (Jul 2023 – Oct 2023)**
   - Developed Zaheed (Kotlin & Jetpack Compose, secure payments, pagination, 30% scrolling improvement).
5. **Mobile Software Engineer (Freelance) | Cue Tech (Oct 2022 – Jun 2023)**
   - Developed Aman (Flutter) & Cue (Android), NFC & QR data flows, end-to-end encryption.

### Projects (9 production apps with real store links):
1. **Medace Hub** (App Store + Play Store) - Professional medical learning platform with curriculum-based video courses, progress tracking, in-app purchases, and bilingual support (EN/AR).
2. **Event Masters** (Play Store + App Store) - Saudi event platform & Academy module.
3. **POMOFIY** (App Store + Play Store) - Marketing platform connecting brands with promoters.
4. **Zaheed** (Play Store) - Riyadh e-commerce aggregator.
5. **Eventorio** (App Store + Play Store) - Kotlin Multiplatform (KMP) companion app.
6. **TAB - Tactical Analysis Board** (App Store + Play Store) - Sports tactical analysis tool at Skhaa.
7. **Aman** - Emergency response app with NFC/QR and end-to-end encryption.
8. **Cue** - Social connectivity platform with NFC & QR.
9. **Mataeim** - Food ordering and delivery system.

### Education:
- **Bachelor's Degree in Software Engineering**
  - Islamic University of Gaza | Sep 2018 – Sep 2022

### Certifications:
- **Using AI as a Personal Assistant (50-hour training program)** | GSG West Bank | Issued Jun 2025
- **SkillStack Paths (DSA & Fundamentals)** | Gaza Sky Geeks | Issued Jun 2025
- **Project Management** | Coursera

---

## 3. Task Status

- [x] **Task 1: Full audit & comparison of files and git history**
- [x] **Task 2: Fix TypeScript & Framer Motion type errors in Contact, Education, Projects**
- [x] **Task 3: Extract and incorporate all data from latest Ahmed_Almdhoun_CV.docx**
  - Added Skhaa for Information Technology (Senior Flutter Engineer)
  - Added Freelance Mobile Developer (Independent)
  - Added exact dates for Saving Solutions (Jul 2023 – Oct 2023) and Cue Tech (Oct 2022 – Jun 2023)
  - Added all AI & Automation skills (LLMs, Prompt Engineering, Agentic Workflows)
  - Updated study degree to "Bachelor's Degree in Software Engineering"
  - Updated exact project descriptions and store links
- [x] **Task 4: Add Medace Hub Application**
  - Added Medace Hub to `portfolioData.ts` with App Store & Google Play links
  - Downloaded high-resolution official App Store graphic asset to `src/assets/medace.png`
  - Mapped asset in `imageUtils.ts`
- [x] **Task 5: Production Build Verification (`npm run build`)**
  - Completed with code 0 (2139 modules transformed, zero errors).
- [x] **Task 6: Verified Production Metrics & Filters**
  - **Metrics Stats Strip (`StatsBar.tsx`)**: 5+ Years Exp, 9 Production Apps, 99.9% Crash-Free Stability, 100k+ Users Reached.
  - **Project Filter Tabs (`Projects.tsx`)**: Category pills (`All`, `Flutter`, `Android`, `KMP`) with badge counts.
  - **Store Badges**: Direct links to App Store and Google Play for published applications.
- [x] **Task 7: Comprehensive Professional Engineering Audit (Removed AI Text & Patterns)**
  - **Copy Rewritten for Authenticity**: Replaced all marketing buzzwords ("scalable", "innovative", "seamless", "cutting-edge", "empowering", "passionate") with direct, technical, grounded human statements.
  - **Removed Artificial AI Sections**: Removed generic placeholder testimonials and agency-style services cards that signify synthetic site generation.
  - **Strict Adherence to Rule 8 (No AI Branding)**: Eliminated all references to AI, prompt, LLM, and automation from summaries, skill categories, and certs.
  - **Clean Typography & Elements**: Removed decorative arrows from buttons/headings, removed pulsing dots, removed extraneous Unicode symbols and emojis.
  - **Navbar Refinement**: Replaced "Hire Me" with "Contact" and restored natural developer navigation (About, Experience, Projects, Skills, Education, Contact).
  - **Production Build Passed**: Verified with `npm run build` exiting with code 0 (2139 modules).
