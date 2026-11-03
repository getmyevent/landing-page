"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUp, Mail, Globe } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#FAF8F5] border-t border-[#EAE7E0] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#EAE7E0]/70">
          {/* Col 1: Logo & Tagline */}
          <div className="md:col-span-5 flex flex-col items-start">
            <Link href="/" className="relative h-9 w-44 mb-4">
              <Image
                src="/brand/logo-gradient.png"
                alt="GetMyEvent"
                fill
                className="object-contain object-left mix-blend-multiply"
                sizes="176px"
              />
            </Link>

            <div className="text-xs font-bold tracking-widest text-[#EB3B38] uppercase mb-2">
              EVENTS, CONNECTIONS, OPPORTUNITIES.
            </div>

            <p className="text-sm text-[#111827]/70 leading-relaxed max-w-sm mb-6">
              The zero-friction mobile web companion and organizer platform for
              conferences, summits, and meaningful gatherings.
            </p>

            <a
              href="mailto:getmyevent.work@gmail.com"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#111827] hover:text-[#EB3B38] transition-colors"
            >
              <Mail className="w-4 h-4 text-[#EB3B38]" />
              <span>getmyevent.work@gmail.com</span>
            </a>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#111827]/50 mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm font-medium text-[#111827]/75">
              <li>
                <Link href="#features" className="hover:text-[#EB3B38] transition-colors">
                  Overview &amp; Features
                </Link>
              </li>
              <li>
                <Link href="#experiences" className="hover:text-[#EB3B38] transition-colors">
                  Delegate Experience
                </Link>
              </li>
              <li>
                <Link href="#experiences" className="hover:text-[#EB3B38] transition-colors">
                  Exhibitor Lead Capture
                </Link>
              </li>
              <li>
                <Link href="#experiences" className="hover:text-[#EB3B38] transition-colors">
                  Organizer Console
                </Link>
              </li>
              <li>
                <Link href="#casestudy" className="hover:text-[#EB3B38] transition-colors">
                  MP Semiconductor Summit
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Mentorship */}
          <div className="md:col-span-4 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#111827]/50 mb-4">
                Incubation &amp; Mentorship
              </h4>
              <p className="text-xs text-[#111827]/60 leading-relaxed mb-4">
                Mentored under the leadership of Dr. Pratosh Bansal, Director,
                Institute of Engineering &amp; Technology (IET DAVV), Indore.
              </p>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#111827]/70">
                <Globe className="w-3.5 h-3.5 text-[#EB3B38]" />
                <span>Domain: getmyevent.in</span>
              </div>
            </div>

            {/* Socials with crisp SVGs */}
            <div className="flex items-center gap-3 mt-6">
              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white border border-[#EAE7E0] flex items-center justify-center text-[#111827]/70 hover:text-[#EB3B38] hover:border-[#EB3B38]/40 transition-colors shadow-xs"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.65 1.65 0 0 0 1.66-1.66 1.66 1.66 0 1 0-1.66 1.66m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                </svg>
              </a>

              {/* X / Twitter */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white border border-[#EAE7E0] flex items-center justify-center text-[#111827]/70 hover:text-[#EB3B38] hover:border-[#EB3B38]/40 transition-colors shadow-xs"
                aria-label="X / Twitter"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white border border-[#EAE7E0] flex items-center justify-center text-[#111827]/70 hover:text-[#EB3B38] hover:border-[#EB3B38]/40 transition-colors shadow-xs"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white border border-[#EAE7E0] flex items-center justify-center text-[#111827]/70 hover:text-[#EB3B38] hover:border-[#EB3B38]/40 transition-colors shadow-xs"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#111827]/50">
          <div>
            &copy; {new Date().getFullYear()} GetMyEvent (getmyevent.in). All rights
            reserved.
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#EAE7E0] hover:bg-[#FAF8F5] text-[#111827]/80 hover:text-[#111827] transition-all cursor-pointer font-medium"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
