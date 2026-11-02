"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Palette, MessageCircle, BarChart3 } from "lucide-react";

const STEPS = [
  {
    step: "01",
    title: "We brand it to your event",
    headline: "Pre-configured before guests arrive",
    description:
      "We take your delegate registrations, schedule, speaker bios, and venue blueprints. Every attendee profile and exhibitor booth is customized and ready in advance.",
    icon: Palette,
    details: [
      "Custom branding & event theme",
      "Pre-loaded speaker & session schedules",
      "Exhibitor directory & booth assignment",
    ],
  },
  {
    step: "02",
    title: "Delegates get a WhatsApp link",
    headline: "Zero app download, zero login friction",
    description:
      "Each attendee receives their unique, personalized access link directly on WhatsApp or SMS. One tap opens the full web app: no password, no OTP, no app store hurdles.",
    icon: MessageCircle,
    details: [
      "Direct personalized WhatsApp delivery",
      "Instant access with zero login passwords",
      "Interactive venue navigation & agendas",
    ],
  },
  {
    step: "03",
    title: "You run everything from one dashboard",
    headline: "Live oversight from opening to closing",
    description:
      "Manage real-time check-ins, push live programme updates, monitor venue crowd distribution, and track exhibitor lead numbers from a central organizer console.",
    icon: BarChart3,
    details: [
      "Real-time attendee check-in counts",
      "Live schedule modification & alerts",
      "Instant exhibitor CSV lead analytics",
    ],
  },
];

export default function HowItWorks() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-[#FAF8F5] border-t border-[#EAE7E0]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#EAE7E0] shadow-sm mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EB3B38]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#111827]/70">
              Simple 3-Step Process
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#111827] leading-[1.12]">
            Built for your event.{" "}
            <span className="text-[#EB3B38]">Ready before it starts.</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#111827]/70">
            From registration data to delegate access, we prepare your entire event
            experience so you can focus on running a world-class gathering.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map((s, idx) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.step}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: shouldReduceMotion ? 0 : idx * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative flex flex-col justify-between p-8 rounded-3xl bg-white border border-[#EAE7E0] shadow-[0_4px_20px_-2px_rgba(17,24,39,0.03)] hover:shadow-[0_12px_36px_-4px_rgba(17,24,39,0.08)] transition-all duration-300"
              >
                <div>
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#FAF8F5] border border-[#EAE7E0] flex items-center justify-center text-[#EB3B38]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-bold tracking-tight text-[#EB3B38]/30">
                      {s.step}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl sm:text-2xl font-bold text-[#111827] tracking-tight mb-1">
                    {s.title}
                  </h3>
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#EB3B38] mb-3">
                    {s.headline}
                  </div>

                  <p className="text-sm sm:text-base text-[#111827]/70 leading-relaxed mb-6">
                    {s.description}
                  </p>
                </div>

                {/* Micro Details List */}
                <div className="pt-5 border-t border-[#EAE7E0]/60 space-y-2">
                  {s.details.map((detail, dIdx) => (
                    <div
                      key={dIdx}
                      className="flex items-center gap-2 text-xs sm:text-sm text-[#111827]/80"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#EB3B38]" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
