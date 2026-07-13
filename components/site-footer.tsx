import Link from "next/link";
import { getT, type Language } from "@/lib/translations";
import { Mail, Calendar, Linkedin, Github } from "lucide-react";
import {SVGProps} from "react";

export const WhatsappIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="none"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.87 1.21 3.07.15.2 2.09 3.2 5.07 4.49.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35ZM12.05 21.5a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.38 9.38 0 0 1-1.44-5.01c0-5.18 4.22-9.4 9.41-9.4a9.4 9.4 0 0 1 9.4 9.41c0 5.18-4.22 9.41-9.4 9.41ZM20.05 3.94A11.8 11.8 0 0 0 12.04 0C5.46 0 .1 5.35.1 11.92c0 2.1.55 4.15 1.6 5.96L0 24l6.28-1.65a11.9 11.9 0 0 0 5.76 1.47c6.58 0 11.93-5.35 11.93-11.92a11.86 11.86 0 0 0-3.93-8.96Z" />
    </svg>
);

export function SiteFooter({ lang }: { lang: Language }) {
  const t = getT(lang);

  const contactLinks = [
    {
      href: "mailto:contact@samensteeve.com",
      icon: Mail,
      label: "Email",
      text: "contact@samensteeve.com",
    },
    {
      href: "https://wa.me/237654557446",
      icon: WhatsappIcon,
      label: "WhatsApp",
      text: "+237 654 557 446",
    },
    {
      href: "https://cal.com/samen-steeve/30min",
      icon: Calendar,
      label: t.footer.bookCall,
      text: "Cal.com (30 min)",
    },
  ];

  const socialLinks = [
    {
      href: "https://linkedin.com/in/samensteeve",
      icon: Linkedin,
      label: "LinkedIn",
    },
    {
      href: "https://github.com/samsteeven",
      icon: Github,
      label: "GitHub",
    },
  ];

  return (
    <footer className="border-t border-line bg-paper-raised/40 py-16 transition-all duration-300">
      <div className="mx-auto max-w-5xl px-4 sm:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Brand Col */}
          <div className="flex flex-col gap-4">
            <span className="font-display text-base font-extrabold tracking-tight text-ink">
              SAMEN STEEVE<span className="text-accent">.</span>
            </span>
            <p className="text-xs leading-relaxed text-ink-soft/80">
              {t.footer.specialty}
            </p>
            <p className="text-[11px] leading-relaxed text-ink-soft/60">
              {t.footer.location}
            </p>
          </div>

          {/* Contact Col */}
          <div className="flex flex-col gap-4">
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-ink">
              Contact
            </h3>
            <div className="flex flex-col gap-3 font-mono text-[11px] text-ink-soft">
              {contactLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-accent transition duration-200"
                >
                  <item.icon className="h-4 w-4 shrink-0 text-accent/80" />
                  <span>{item.text}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Col */}
          <div className="flex flex-col gap-4">
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-ink">
              Navigation
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 font-mono text-[11px] text-ink-soft">
              <Link href={`/${lang}/services`} className="hover:text-accent transition duration-200">
                {t.nav.services}
              </Link>
              <Link href={`/${lang}/comment-ca-marche`} className="hover:text-accent transition duration-200">
                {t.nav.process}
              </Link>
              <Link href={`/${lang}/realisations`} className="hover:text-accent transition duration-200">
                {t.nav.realisations}
              </Link>
              <Link href={`/${lang}/demarrer-un-projet`} className="hover:text-accent transition duration-200 font-semibold text-accent/90">
                {t.nav.cta}
              </Link>
            </div>
            <div className="mt-2 flex gap-4 text-ink-soft">
              {socialLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition duration-200"
                  aria-label={item.label}
                >
                  <item.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="mt-12 border-t border-line/50 pt-8 flex flex-col sm:flex-row justify-between gap-4">
          <p className="text-[10px] font-mono text-ink-soft/50">
            &copy; {new Date().getFullYear()} Samen Steeve. {t.footer.rights}
          </p>
          <a
            href="https://samensteeve.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-mono text-accent hover:underline"
          >
            samensteeve.com &rarr;
          </a>
        </div>
      </div>
    </footer>
  );
}
