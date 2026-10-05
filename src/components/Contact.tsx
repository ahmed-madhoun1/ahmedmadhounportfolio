import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Phone, Github, Linkedin, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { personalInfo } from "../data/portfolioData";
import { fadeUp } from "../utils/animations";

// Formspree endpoint (free tier, no secret keys exposed on client side)
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xjkrpjge";

type FormState = "idle" | "loading" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}


const contactLinks = [
  {
    label: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    icon: Mail,
    ariaLabel: "Send an email",
  },
  {
    label: personalInfo.phone,
    href: `tel:${personalInfo.phone.replace(/-/g, "")}`,
    icon: Phone,
    ariaLabel: "Call phone number",
  },
  {
    label: "GitHub",
    href: personalInfo.github,
    icon: Github,
    ariaLabel: "View GitHub profile",
    external: true,
  },
  {
    label: "LinkedIn",
    href: personalInfo.linkedin,
    icon: Linkedin,
    ariaLabel: "View LinkedIn profile",
    external: true,
  },
];

const validate = (data: FormData): FormErrors => {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = "Name is required.";
  if (!data.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!data.message.trim()) errors.message = "Message is required.";
  else if (data.message.trim().length < 20) errors.message = "Message must be at least 20 characters.";
  return errors;
};

export const Contact = () => {
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [formState, setFormState] = useState<FormState>("idle");
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name as keyof FormData]) {
      const newErrors = validate({ ...formData, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof FormErrors] }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const newErrors = validate(formData);
    setErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof FormErrors] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = { name: true, email: true, phone: true, message: true };
    setTouched(allTouched);
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setFormState("loading");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || "Not provided",
          message: formData.message,
        }),
      });

      if (response.ok) {
        setFormState("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
        setTouched({});
        setErrors({});
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  const inputBase =
    "w-full px-4 py-3 text-sm rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600 transition-all duration-200 outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:border-neutral-900 dark:focus:border-white";
  const inputNormal = `${inputBase} border-neutral-200 dark:border-neutral-700`;
  const inputError = `${inputBase} border-red-400 dark:border-red-500 focus:ring-red-400`;

  return (
    <section
      id="contact"
      className="py-24 md:py-32 bg-white dark:bg-neutral-950"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Left column */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-3">
                Contact
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
                Let's work<br />together.
              </h2>
              <p className="mt-4 text-base text-neutral-500 dark:text-neutral-400 leading-relaxed">
                Open to senior mobile engineering roles, freelance projects, and technical collaborations. Feel free to reach out.
              </p>
            </div>

            <div className="space-y-3">
              {contactLinks.map(({ label, href, icon: Icon, ariaLabel, external }) => (
                <a
                  key={label}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  aria-label={ariaLabel}
                  className="flex items-center gap-3 p-3 rounded-xl text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all duration-200 group"
                >
                  <span className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 group-hover:bg-neutral-900 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-neutral-900 transition-all duration-200">
                    <Icon size={16} />
                  </span>
                  <span className="text-sm font-medium">{label}</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right column — form */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            {formState === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-16 px-8 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 gap-4"
              >
                <div className="p-4 rounded-full bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400">
                  <CheckCircle size={32} />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Message sent!</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-sm">
                  Thank you for reaching out. I'll get back to you as soon as possible.
                </p>
                <button
                  onClick={() => setFormState("idle")}
                  className="mt-2 text-sm font-semibold text-neutral-900 dark:text-white underline underline-offset-4 hover:opacity-60 transition-opacity"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="space-y-5 p-8 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800"
                aria-label="Contact form"
              >
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-6">Send a message</h3>

                {/* Error banner */}
                {formState === "error" && (
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/40 text-sm text-red-600 dark:text-red-400" role="alert">
                    <AlertCircle size={18} className="shrink-0 mt-0.5" />
                    <span>Something went wrong. Please try again or reach out via email directly.</span>
                  </div>
                )}

                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Name <span aria-hidden="true" className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Your full name"
                    className={errors.name ? inputError : inputNormal}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && (
                    <p id="name-error" role="alert" className="mt-1.5 text-xs text-red-500 dark:text-red-400">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Email <span aria-hidden="true" className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="your@email.com"
                    className={errors.email ? inputError : inputNormal}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <p id="email-error" role="alert" className="mt-1.5 text-xs text-red-500 dark:text-red-400">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone (optional) */}
                <div>
                  <label htmlFor="phone" className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Phone <span className="text-neutral-400 dark:text-neutral-600 font-normal">(optional)</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 234 567 890"
                    className={inputNormal}
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Message <span aria-hidden="true" className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Tell me about your project or opportunity..."
                    className={`resize-none ${errors.message ? inputError : inputNormal}`}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && (
                    <p id="message-error" role="alert" className="mt-1.5 text-xs text-red-500 dark:text-red-400">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={formState === "loading"}
                  whileHover={{ scale: formState === "loading" ? 1 : 1.02 }}
                  whileTap={{ scale: formState === "loading" ? 1 : 0.98 }}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-semibold hover:opacity-85 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
                  aria-disabled={formState === "loading"}
                >
                  {formState === "loading" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </motion.button>

                <p className="text-center text-xs text-neutral-400 dark:text-neutral-600">
                  Your information is kept private and never shared.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
