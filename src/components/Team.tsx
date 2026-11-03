"use client";

import { motion, useReducedMotion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const TEAM = [
  {
    name: "Hari Gupta",
    role: "Co-Founder & CEO",
    focus: "Product strategy, operations, and summit client partnerships.",
    initials: "HG",
    badge: "Co-Founder",
  },
  {
    name: "Pushpit Upadhyay",
    role: "Co-Founder & Tech Lead",
    focus: "Platform architecture, mobile web runtime, and real-time event analytics.",
    initials: "PU",
    badge: "Co-Founder",
  },
  {
    name: "Dr. Pratosh Bansal",
    role: "Director, IET DAVV",
    focus: "Institutional mentorship, academic incubation, and high-concurrency architecture advice.",
    initials: "PB",
    badge: "Mentor & Advisor",
    icon: GraduationCap,
  },
];

export default function Team() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="team" className="py-20 md:py-28 bg-[#FAF8F5] border-t border-[#EAE7E0]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#111827] leading-[1.12]">
            The team behind{" "}
            <span className="text-[#EB3B38]">GetMyEvent.</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#111827]/70">
            Engineered with deep event technology expertise and mentored by premier
            academic leadership at Institute of Engineering &amp; Technology (IET DAVV).
          </p>
        </div>

        {/* Team Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TEAM.map((member, idx) => (
            <motion.div
              key={member.name}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.5,
                delay: shouldReduceMotion ? 0 : idx * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="p-6 sm:p-7 rounded-2xl bg-white border border-[#EAE7E0] shadow-[0_4px_20px_-2px_rgba(17,24,39,0.03)] hover:shadow-[0_10px_30px_-4px_rgba(17,24,39,0.08)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Monogram Avatar & Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#111827] to-[#1E293B] text-white flex items-center justify-center font-bold text-base shadow-sm">
                    {member.initials}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#EB3B38]">
                    {member.badge}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-[#111827] tracking-tight">
                  {member.name}
                </h3>
                <div className="text-xs sm:text-sm font-semibold text-[#EB3B38] mt-0.5 mb-2.5">
                  {member.role}
                </div>
                <p className="text-xs sm:text-sm text-[#111827]/70 leading-relaxed">
                  {member.focus}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
