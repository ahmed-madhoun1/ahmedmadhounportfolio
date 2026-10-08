import { motion } from "framer-motion";

/* ─── Floating badge helper ─────────────────────────────────────────────── */
const Badge = ({
  children,
  className,
  delay = 0,
  dy = [-6, 6],
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  dy?: [number, number];
}) => (
  <motion.div
    className={`absolute flex items-center gap-2 px-3 py-1.5 rounded-xl
      bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm
      border border-neutral-200/80 dark:border-neutral-700/80
      shadow-lg text-xs font-semibold text-neutral-700 dark:text-neutral-200
      select-none pointer-events-none ${className ?? ""}`}
    animate={{ y: dy }}
    transition={{ duration: 3 + delay, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay }}
  >
    {children}
  </motion.div>
);

/* ─── Main phone SVG ────────────────────────────────────────────────────── */
const PhoneSVG = () => (
  <svg
    viewBox="0 0 260 540"
    className="w-44 sm:w-52 md:w-56 lg:w-60 xl:w-64 drop-shadow-[0_8px_32px_rgba(0,0,0,0.22)] dark:drop-shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      {/* Phone body */}
      <linearGradient id="pm-body" x1="0" y1="0" x2="260" y2="540" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#1e293b" />
        <stop offset="100%" stopColor="#0d1117" />
      </linearGradient>

      {/* Screen background */}
      <linearGradient id="pm-screen" x1="10" y1="12" x2="250" y2="528" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#0f172a" />
        <stop offset="55%" stopColor="#1a1040" />
        <stop offset="100%" stopColor="#0c0a1e" />
      </linearGradient>

      {/* Button shading */}
      <linearGradient id="pm-btn" x1="0" y1="0" x2="1" y2="1" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#334155" />
        <stop offset="100%" stopColor="#1e293b" />
      </linearGradient>

      {/* Subtle gloss shimmer on body */}
      <linearGradient id="pm-gloss" x1="0" y1="0" x2="260" y2="200" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="white" stopOpacity="0.06" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </linearGradient>

      {/* Screen top glow */}
      <radialGradient id="pm-glow" cx="130" cy="80" r="120" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.18" />
        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
      </radialGradient>

      {/* Bottom nav bar bg */}
      <linearGradient id="pm-nav" x1="10" y1="475" x2="250" y2="528" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#111827" />
        <stop offset="100%" stopColor="#0a0f1a" />
      </linearGradient>

      <clipPath id="pm-clip">
        <rect x="10" y="12" width="240" height="516" rx="40" />
      </clipPath>
    </defs>

    {/* ── Drop shadow ellipse ── */}
    <ellipse cx="130" cy="552" rx="95" ry="12" fill="black" opacity="0.18" />

    {/* ── Phone body ── */}
    <rect x="0" y="0" width="260" height="540" rx="50" fill="url(#pm-body)" />

    {/* Body outer edge – visible in light mode */}
    <rect x="0.75" y="0.75" width="258.5" height="538.5" rx="49.5"
      fill="none" stroke="#475569" strokeOpacity="0.45" strokeWidth="1.5" />
    {/* Inner highlight ring for dark mode gloss */}
    <rect x="2" y="2" width="256" height="536" rx="48.5"
      fill="none" stroke="white" strokeOpacity="0.08" strokeWidth="1" />

    {/* Gloss on top half */}
    <rect x="0" y="0" width="260" height="540" rx="50" fill="url(#pm-gloss)" />

    {/* ── Side buttons ── */}
    {/* Power – right */}
    <rect x="257" y="148" width="5" height="70" rx="2.5" fill="url(#pm-btn)" />
    {/* Volume up – left */}
    <rect x="-2" y="118" width="5" height="52" rx="2.5" fill="url(#pm-btn)" />
    {/* Volume down – left */}
    <rect x="-2" y="184" width="5" height="52" rx="2.5" fill="url(#pm-btn)" />
    {/* Mute toggle – left */}
    <rect x="-2" y="84" width="5" height="26" rx="2.5" fill="url(#pm-btn)" />

    {/* ── Screen ── */}
    <rect x="10" y="12" width="240" height="516" rx="40" fill="url(#pm-screen)" />

    {/* Screen content (clipped) */}
    <g clipPath="url(#pm-clip)">
      {/* Top glow */}
      <ellipse cx="130" cy="60" rx="130" ry="70" fill="url(#pm-glow)" />

      {/* ─ Status bar – wraps around Dynamic Island (centred at y≈31) ─ */}
      {/* Time – left of island */}
      {/* <text x="22" y="35" fontSize="11" fill="#242424ff" fillOpacity="0.92" fontFamily="system-ui, sans-serif" fontWeight="700">9:41</text> */}
      {/* Battery – right of island (x=172 to x=230) */}
      {/* <rect x="204" y="26" width="20" height="9" rx="2.5" fill="none" stroke="white" strokeOpacity="0.85" strokeWidth="1.2" />
      <rect x="224" y="29" width="2.5" height="3" rx="0.8" fill="white" fillOpacity="0.85" />
      <rect x="206" y="28" width="13" height="5" rx="1.2" fill="white" fillOpacity="0.9" /> */}
      {/* Wifi – right of island */}
      {/* <path d="M188 34 q3.5-3.5 7 0" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" strokeOpacity="0.9" />
      <path d="M185 31 q6-6 12 0" stroke="white" strokeWidth="1.3" strokeLinecap="round" fill="none" strokeOpacity="0.7" />
      <circle cx="191.5" cy="36.5" r="1.3" fill="white" fillOpacity="0.9" /> */}
      {/* Signal – right of island */}
      {/* <rect x="174" y="30" width="2.5" height="6" rx="1" fill="white" fillOpacity="0.5" />
      <rect x="178" y="28" width="2.5" height="8" rx="1" fill="white" fillOpacity="0.7" />
      <rect x="182" y="26" width="2.5" height="10" rx="1" fill="white" fillOpacity="0.9" /> */}

      {/* ─ App icon grid – row 1 ─ */}
      {/* Blue */}
      <rect x="22" y="86" width="46" height="46" rx="14" fill="#2563eb" />
      <rect x="30" y="100" width="30" height="4" rx="2" fill="white" fillOpacity="0.9" />
      <rect x="30" y="109" width="20" height="4" rx="2" fill="white" fillOpacity="0.55" />
      <rect x="30" y="118" width="25" height="4" rx="2" fill="white" fillOpacity="0.35" />

      {/* Teal */}
      <rect x="80" y="86" width="46" height="46" rx="14" fill="#0d9488" />
      <circle cx="103" cy="109" r="12" fill="white" fillOpacity="0.15" />
      <circle cx="103" cy="109" r="6" fill="white" fillOpacity="0.7" />
      <circle cx="103" cy="109" r="2.5" fill="#0d9488" />

      {/* Purple */}
      <rect x="138" y="86" width="46" height="46" rx="14" fill="#7c3aed" />
      <rect x="146" y="98" width="30" height="4" rx="2" fill="white" fillOpacity="0.9" />
      <rect x="146" y="107" width="22" height="4" rx="2" fill="white" fillOpacity="0.55" />
      <rect x="146" y="116" width="18" height="4" rx="2" fill="white" fillOpacity="0.35" />

      {/* Orange */}
      <rect x="196" y="86" width="46" height="46" rx="14" fill="#ea580c" />
      <path d="M211 109 l8-10 l8 10 l-4 0 l0 8 l-8 0 l0-8 z" fill="white" fillOpacity="0.85" />

      {/* ─ App icon grid – row 2 ─ */}
      {/* Pink */}
      <rect x="22" y="148" width="46" height="46" rx="14" fill="#db2777" />
      <circle cx="45" cy="171" r="9" fill="white" fillOpacity="0.2" />
      <path d="M37 171 l8-8 l8 8 M45 163 l0 16" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" fillOpacity="0" strokeOpacity="0.85" />

      {/* Sky */}
      <rect x="80" y="148" width="46" height="46" rx="14" fill="#0284c7" />
      <rect x="88" y="161" width="30" height="4" rx="2" fill="white" fillOpacity="0.9" />
      <rect x="88" y="170" width="24" height="4" rx="2" fill="white" fillOpacity="0.6" />
      <rect x="88" y="179" width="18" height="4" rx="2" fill="white" fillOpacity="0.35" />

      {/* Green */}
      <rect x="138" y="148" width="46" height="46" rx="14" fill="#16a34a" />
      <path d="M150 172 l6 6 l12-12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" strokeOpacity="0.9" />

      {/* Slate */}
      <rect x="196" y="148" width="46" height="46" rx="14" fill="#475569" />
      <rect x="204" y="161" width="30" height="4" rx="2" fill="white" fillOpacity="0.7" />
      <rect x="204" y="170" width="22" height="4" rx="2" fill="white" fillOpacity="0.4" />
      <rect x="204" y="179" width="28" height="4" rx="2" fill="white" fillOpacity="0.25" />

      {/* ─ Card / widget ─ */}
      <rect x="22" y="216" width="220" height="90" rx="18" fill="white" fillOpacity="0.05" stroke="white" strokeOpacity="0.1" strokeWidth="1" />
      {/* Card glow */}
      <rect x="22" y="216" width="220" height="90" rx="18" fill="#3b82f6" fillOpacity="0.06" />
      {/* Card title */}
      <rect x="36" y="232" width="70" height="6" rx="3" fill="white" fillOpacity="0.6" />
      {/* Code lines */}
      <rect x="36" y="248" width="110" height="4" rx="2" fill="#60a5fa" fillOpacity="0.7" />
      <rect x="36" y="258" width="80" height="4" rx="2" fill="#a78bfa" fillOpacity="0.6" />
      <rect x="36" y="268" width="95" height="4" rx="2" fill="#34d399" fillOpacity="0.55" />
      <rect x="36" y="278" width="60" height="4" rx="2" fill="#60a5fa" fillOpacity="0.4" />
      {/* Flutter logo-ish icon */}
      <path d="M196 234 l20 20 l-10 10 l-20-20 z" fill="#54c5f8" fillOpacity="0.75" />
      <path d="M196 254 l10 10 l-10 10 l-10-10 z" fill="#01579b" fillOpacity="0.75" />

      {/* ─ Mini icon row – graphical only, no tech labels ─ */}
      {/* Icon A – blue with layered diamonds */}
      <rect x="22" y="326" width="46" height="46" rx="14" fill="#1d4ed8" fillOpacity="0.65" stroke="#3b82f6" strokeOpacity="0.4" strokeWidth="1" />
      <rect x="38" y="338" width="14" height="14" rx="3" fill="white" fillOpacity="0.25" transform="rotate(45 45 345)" />
      <rect x="41" y="341" width="8" height="8" rx="2" fill="white" fillOpacity="0.7" transform="rotate(45 45 345)" />
      <rect x="44" y="344" width="2" height="2" rx="0.5" fill="#1d4ed8" fillOpacity="0.9" transform="rotate(45 45 345)" />

      {/* Icon B – teal with nested circles */}
      <rect x="80" y="326" width="46" height="46" rx="14" fill="#065f46" fillOpacity="0.65" stroke="#10b981" strokeOpacity="0.4" strokeWidth="1" />
      <circle cx="103" cy="349" r="11" fill="white" fillOpacity="0.12" />
      <circle cx="103" cy="349" r="7" fill="white" fillOpacity="0.22" />
      <circle cx="103" cy="349" r="3.5" fill="#10b981" fillOpacity="0.9" />
      <circle cx="103" cy="349" r="1" fill="white" fillOpacity="0.8" />

      {/* Icon C – purple with lightning bolt */}
      <rect x="138" y="326" width="46" height="46" rx="14" fill="#4c1d95" fillOpacity="0.65" stroke="#8b5cf6" strokeOpacity="0.4" strokeWidth="1" />
      <path d="M166 338 l-10 13 l6 0 l-4 13 l12-15 l-7 0 z" fill="white" fillOpacity="0.8" />

      {/* Icon D – sky with overlapping squares */}
      <rect x="196" y="326" width="46" height="46" rx="14" fill="#1e3a5f" fillOpacity="0.65" stroke="#38bdf8" strokeOpacity="0.4" strokeWidth="1" />
      <rect x="206" y="336" width="16" height="16" rx="4" fill="white" fillOpacity="0.2" stroke="white" strokeOpacity="0.5" strokeWidth="1" />
      <rect x="214" y="344" width="16" height="16" rx="4" fill="#38bdf8" fillOpacity="0.5" stroke="white" strokeOpacity="0.4" strokeWidth="1" />

      {/* ─ Bottom nav bar – 5 icons evenly at cx=44,88,130,172,216 cy=502 ─ */}
      <rect x="10" y="476" width="240" height="52" fill="url(#pm-nav)" />
      <line x1="10" y1="476" x2="250" y2="476" stroke="white" strokeOpacity="0.08" strokeWidth="1" />

      {/* Home – cx=44 */}
      <path d="M34 503 l10-9 l10 9 M39 503 l0 9 l10 0 l0-9" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" strokeOpacity="0.5" />

      {/* Search – cx=88 */}
      <circle cx="88" cy="500" r="6.5" stroke="#2563eb" strokeWidth="1.8" fill="none" strokeOpacity="0.5" />
      <line x1="93" y1="505" x2="98" y2="510" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.5" />

      {/* Plus active – cx=130 */}
      <circle cx="130" cy="500" r="11" fill="#2563eb" fillOpacity="0.9" />
      <line x1="130" y1="495" x2="130" y2="505" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="125" y1="500" x2="135" y2="500" stroke="white" strokeWidth="2.2" strokeLinecap="round" />

      {/* Bell – cx=172 */}
      <path d="M165 507 q0-9 7-9 q7 0 7 9 l2 4 l-18 0 z" stroke="#2563eb" strokeWidth="1.8" fill="none" strokeOpacity="0.5" strokeLinejoin="round" />
      <line x1="172" y1="512" x2="172" y2="515" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.5" />

      {/* Profile – cx=216 */}
      <circle cx="216" cy="497" r="4.5" stroke="#2563eb" strokeWidth="1.6" fill="none" strokeOpacity="0.5" />
      <path d="M207 512 q0-7 9-7 q9 0 9 7" stroke="#2563eb" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeOpacity="0.5" />
    </g>

    {/* ── Dynamic Island – smaller, realistic ── */}
    <rect x="94" y="20" width="72" height="22" rx="11" fill="#060810" />
    {/* Camera dot */}
    <circle cx="157" cy="31" r="3.5" fill="#1a1f2e" />
    <circle cx="157" cy="31" r="1.5" fill="#0d1117" />
    <circle cx="156" cy="30" r="0.6" fill="white" fillOpacity="0.35" />

    {/* ── Home indicator ── */}
    <rect x="95" y="521" width="70" height="5" rx="2.5" fill="#676767ff" fillOpacity="0.22" />

    {/* ── Gloss shimmer overlay ── */}
    <rect x="10" y="12" width="240" height="516" rx="40"
      fill="url(#pm-gloss)" opacity="0.5" />
  </svg>
);

/* ─── Exported component ─────────────────────────────────────────────────── */
export const PhoneMockup = () => (
  <div className="relative flex items-center justify-center">
    {/* Glow blobs behind phone */}
    <div className="absolute w-64 h-64 rounded-full bg-blue-400/25 dark:bg-blue-500/20 blur-3xl -translate-x-4 -translate-y-4 pointer-events-none" />
    <div className="absolute w-48 h-48 rounded-full bg-violet-400/20 dark:bg-violet-500/15 blur-2xl translate-x-10 translate-y-10 pointer-events-none" />

    {/* Phone with float animation */}
    <motion.div
      initial={{ opacity: 0, x: 40, rotate: -6 }}
      animate={{ opacity: 1, x: 0, rotate: -6 }}
      transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}
    >
      <motion.div
        animate={{ y: [-10, 10] }}
        transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      >
        <PhoneSVG />
      </motion.div>
    </motion.div>

    {/* Floating badges */}
    <Badge className="-top-2 -left-6 md:-left-10" delay={0} dy={[-5, 5]}>
      <span className="text-base">📱</span>
      <span>Flutter</span>
    </Badge>

    <Badge className="-bottom-2 right-0 md:-right-4" delay={1.4} dy={[-6, 6]}>
      <span className="text-base">⚡</span>
      <span>Kotlin & KMP</span>
    </Badge>
  </div>
);
