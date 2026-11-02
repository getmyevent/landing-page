"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Menu, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Platform", href: "#features" },
  { label: "Experience", href: "#experiences" },
  { label: "Case Study", href: "#casestudy" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Team", href: "#team" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-md bg-[#FAF8F5]/85 border-b border-[#EAE7E0]/80 shadow-[0_2px_12px_rgba(17,24,39,0.03)]"
            : "bg-[#FAF8F5]/90 border-b border-[#EAE7E0]/40"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Brand Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 group transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EB3B38] rounded-md"
              aria-label="GetMyEvent Home"
            >
              <div className="relative h-8 w-36 sm:w-40 md:w-44">
                <Image
                  src="/brand/logo-gradient.png"
                  alt="GetMyEvent Logo"
                  fill
                  priority
                  className="object-contain object-left mix-blend-multiply"
                  sizes="(max-width: 768px) 160px, 180px"
                />
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav
              className="hidden lg:flex items-center gap-8 text-[15px] font-medium text-[#111827]/75"
              aria-label="Main Navigation"
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="transition-colors hover:text-[#111827] tracking-tight relative py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EB3B38] rounded"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Right CTA: Dark Pill */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                href="#contact"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#111827] text-white text-sm font-medium hover:bg-black transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EB3B38] group"
              >
                <span>Let&apos;s talk</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            {/* Mobile / Tablet Nav Controls */}
            <div className="flex items-center gap-2 lg:hidden">
              <Link
                href="#contact"
                className="inline-flex items-center gap-1 px-4 py-2 min-h-[44px] rounded-full bg-[#111827] text-white text-xs font-medium active:scale-95 transition-transform"
              >
                <span>Let&apos;s talk</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-[#111827] hover:bg-[#EAE7E0]/60 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EB3B38]"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Menu Overlay (under 768px / tablet) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 top-16 z-40 bg-[#FAF8F5] flex flex-col justify-between px-6 py-8 overflow-y-auto lg:hidden"
          >
            <div className="space-y-6 pt-4">
              <p className="text-xs uppercase tracking-widest text-[#111827]/40 font-semibold">
                Menu
              </p>
              <nav className="flex flex-col space-y-2">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between py-3.5 text-2xl font-medium tracking-tight text-[#111827] border-b border-[#EAE7E0]/70 min-h-[44px] active:text-[#EB3B38] transition-colors"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-5 h-5 text-[#111827]/40" />
                  </Link>
                ))}
              </nav>
            </div>

            <div className="pt-8 pb-4 border-t border-[#EAE7E0] space-y-4">
              <div className="flex items-center gap-2 text-xs text-[#111827]/60">
                <Sparkles className="w-4 h-4 text-[#EB3B38]" />
                <span>The Digital Event Companion</span>
              </div>
              <Link
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-[#111827] text-white text-base font-semibold min-h-[50px] shadow-md active:scale-[0.99] transition-transform"
              >
                <span>Have an event? Let&apos;s talk</span>
                <ArrowUpRight className="w-5 h-5" />
              </Link>
              <div className="text-center text-xs text-[#111827]/50 pt-2">
                getmyevent.work@gmail.com
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
