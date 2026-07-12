import Link from "next/link";
import { getT, type Language } from "@/lib/translations";
import { Mail, MessageCircle, Calendar, Linkedin, Github } from "lucide-react";

export function SiteFooter({ lang }: { lang: Language }) {
  const t = getT(lang);

  const contactLinks = [
    {
      href: "mailto:samendjiaha@gmail.com",
      icon: Mail,
      label: "Email",
      text: "samendjiaha@gmail.com",
    },
    {
      href: "https://wa.me/237654557446",
      icon: MessageCircle,
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
