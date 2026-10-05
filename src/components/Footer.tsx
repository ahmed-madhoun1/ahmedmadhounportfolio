import { Github, Linkedin, Mail } from "lucide-react";
import { personalInfo } from "../data/portfolioData";

const links = [
  { label: "GitHub", href: personalInfo.github, icon: Github },
  { label: "LinkedIn", href: personalInfo.linkedin, icon: Linkedin },
  { label: "Email", href: `mailto:${personalInfo.email}`, icon: Mail },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="py-10 bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-neutral-400 dark:text-neutral-500">
          © {currentYear} {personalInfo.name}. All rights reserved.
        </p>
        <div className="flex items-center gap-1">
          {links.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={label}
              className="p-2 rounded-lg text-neutral-400 dark:text-neutral-600 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all duration-200"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
