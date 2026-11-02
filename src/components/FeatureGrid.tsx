"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  CalendarDays,
  Clock,
  Mic,
  Store,
  Compass,
  Layers,
} from "lucide-react";

const FEATURES = [
  {
    num: "01",
    title: "Event overview",
    description:
      "Keep the event essentials together, from dates and venue details to the information delegates need at a glance.",
    icon: CalendarDays,
  },
  {
    num: "02",
    title: "Agenda & sessions",
    description:
      "Make it easier to follow what is happening, when it is happening, and where each session takes place.",
    icon: Clock,
  },
  {
    num: "03",
    title: "Speakers & organizers",
    description:
      "Give attendees a clear view of the people shaping the event and the teams bringing it together.",
    icon: Mic,
  },
  {
    num: "04",
    title: "Exhibitors & partners",
    description:
      "Bring participating organizations and event partners into one accessible, interactive event experience.",
    icon: Store,
  },
  {
    num: "05",
    title: "Venue map",
    description:
      "Help delegates orient themselves with venue maps and navigation information available right from the web app.",
    icon: Compass,
  },
  {
    num: "06",
    title: "A consistent event space",
    description:
      "Present important event information in a simple interface that feels familiar and effortless across the whole delegate journey.",
    icon: Layers,
  },
];

export default function FeatureGrid() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="features" className="py-20 md:py-28 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#EAE7E0] shadow-sm mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EB3B38]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#111827]/70">
              Platform Features
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#111827] leading-[1.12]">
            Everything important.{" "}
            <span className="text-[#EB3B38]">Easy to find.</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#111827]/70 leading-relaxed">
            Event days move quickly. GetMyEvent makes the information people
            need easier to access, so delegates can spend less time searching
            and more time taking part.
          </p>
        </div>

        {/* Feature Cards Grid: Mobile 1 col, Tablet 2 cols, Desktop 3 cols */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.num}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: shouldReduceMotion ? 0 : idx * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative flex flex-col justify-between p-7 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border border-[#EAE7E0] shadow-[0_4px_20px_-2px_rgba(17,24,39,0.03)] hover:shadow-[0_12px_36px_-4px_rgba(17,24,39,0.09)] hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  {/* Top Bar: Icon + Number */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-11 h-11 rounded-xl bg-[#FAF8F5] border border-[#EAE7E0] flex items-center justify-center text-[#EB3B38] group-hover:bg-[#EB3B38] group-hover:text-white transition-colors duration-300">
                      <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <span className="text-sm font-semibold tracking-wider text-[#111827]/40">
                      {feature.num}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-[22px] font-bold text-[#111827] tracking-tight mb-2.5">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-[#111827]/70 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Subtle bottom indicator */}
                <div className="mt-8 pt-4 border-t border-[#EAE7E0]/60 flex items-center justify-between text-xs font-semibold text-[#111827]/40 group-hover:text-[#EB3B38] transition-colors">
                  <span>Explore capability</span>
                  <span className="transform group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
