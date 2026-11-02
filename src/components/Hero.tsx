"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, Calendar, Users } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import PhoneMockup from "./PhoneMockup";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 lg:pt-20 lg:pb-32 bg-[#FAF8F5]">
      {/* Background subtle radial warm ambient glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[900px] md:h-[900px] rounded-full bg-gradient-to-tr from-[#EB3B38]/5 via-[#EB3B38]/[0.02] to-transparent blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & CTAs */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#EAE7E0] shadow-[0_2px_8px_rgba(17,24,39,0.04)] mb-6">
              <span className="w-2 h-2 rounded-full bg-[#EB3B38] animate-pulse" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-wider text-[#111827]/70 uppercase">
                The Digital Event Companion
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-bold text-[#111827] tracking-[-0.035em] leading-[1.08] max-w-2xl">
              Bring every part of your event{" "}
              <span className="text-[#EB3B38] inline-block">closer together.</span>
            </h1>

            {/* Subtext */}
            <p className="mt-6 text-lg sm:text-xl text-[#111827]/75 font-normal leading-relaxed max-w-xl">
              One mobile web app for agendas, speakers, exhibitors and venue
              maps. No downloads, no passwords, no OTPs.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
              <Link
                href="#features"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#EB3B38] text-white text-base font-semibold hover:bg-[#D42B28] transition-all duration-200 shadow-[0_4px_16px_rgba(235,59,56,0.28)] hover:shadow-[0_6px_22px_rgba(235,59,56,0.38)] active:scale-[0.98] min-h-[48px] group"
              >
                <span>Explore the platform</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <Link
                href="#casestudy"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-[#111827] border border-[#EAE7E0] text-base font-medium hover:border-[#111827]/30 hover:bg-[#FAF8F5] transition-all duration-200 shadow-sm min-h-[48px] active:scale-[0.98] group"
              >
                <span>See it in action</span>
                <ArrowUpRight className="w-4 h-4 text-[#111827]/60 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            {/* Bottom Tagline / Categories */}
            <div className="mt-10 pt-6 border-t border-[#EAE7E0]/60 flex items-center justify-center lg:justify-start gap-2 text-xs sm:text-sm font-medium text-[#111827]/50">
              <span className="text-[#111827]/70 font-semibold">Made for:</span>
              <span className="tracking-wide">CONFERENCES</span>
              <span className="text-[#EB3B38]">•</span>
              <span className="tracking-wide">SUMMITS</span>
              <span className="text-[#EB3B38]">•</span>
              <span className="tracking-wide">GATHERINGS</span>
            </div>
          </motion.div>

          {/* Right Column: Phone Mockup with subtle floating badges */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            {/* Parallax / Floating Phone Wrapper */}
            <motion.div
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      y: [-6, 6, -6],
                    }
              }
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative z-10"
            >
              <PhoneMockup
                imageSrc="/images/app-screen-login.png"
                imageAlt="GetMyEvent MP Semiconductor Summit 2026 App Interface"
                className="scale-95 sm:scale-100"
              />

              {/* Floating Badge 1: Top Left - Agenda at a glance */}
              <motion.div
                animate={
                  shouldReduceMotion
                    ? {}
                    : {
                        y: [4, -4, 4],
                      }
                }
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="hidden sm:flex absolute -left-10 md:-left-14 top-20 z-20 items-center gap-2.5 p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-[#EAE7E0] shadow-[0_12px_28px_rgba(17,24,39,0.08)] pointer-events-none"
              >
                <div className="w-8 h-8 rounded-xl bg-[#EB3B38]/10 flex items-center justify-center text-[#EB3B38]">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#111827]">Agenda at a glance</div>
                  <div className="text-[10px] text-[#111827]/50">Sessions, times & venues</div>
                </div>
              </motion.div>

              {/* Floating Badge 2: Bottom Right - People & Partners */}
              <motion.div
                animate={
                  shouldReduceMotion
                    ? {}
                    : {
                        y: [-5, 5, -5],
                      }
                }
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="hidden sm:flex absolute -right-6 md:-right-10 bottom-24 z-20 items-center gap-2.5 p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-[#EAE7E0] shadow-[0_12px_28px_rgba(17,24,39,0.08)] pointer-events-none"
              >
                <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#111827]">People & partners</div>
                  <div className="text-[10px] text-[#111827]/50">All in one event space</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
