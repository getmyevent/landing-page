"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Calendar, MapPin, ArrowUpRight, Radio } from "lucide-react";

type EventTabKey = "live" | "future" | "past";

interface EventItem {
  id: string;
  status: EventTabKey;
  eyebrow: string;
  title: string;
  shortName: string;
  date: string;
  location: string;
  image: string;
  imageAlt: string;
  ctaLabel: string;
  ctaHref: string;
  external?: boolean;
}

const EVENT_TABS: { id: EventTabKey; label: string }[] = [
  { id: "live", label: "Live events" },
  { id: "future", label: "Upcoming events" },
  { id: "past", label: "Past events" },
];

const EVENTS: EventItem[] = [
  {
    id: "icscs-2026",
    status: "future",
    eyebrow: "UPCOMING EVENT · ICSCS-2026",
    title: "International Conference on Sustainability in Chemical Sciences",
    shortName: "ICSCS-2026",
    date: "12–15 December 2026",
    location: "Chilika, Odisha, India",
    image: "/images/icscs-2026-odisha.jpg",
    imageAlt:
      "International Conference on Sustainability in Chemical Sciences (ICSCS-2026) — Chilika, Odisha, India",
    ctaLabel: "Official Website",
    ctaHref: "https://chemistrymeet.wixsite.com/icscs2026",
    external: true,
  },
  {
    id: "mpss-2026",
    status: "past",
    eyebrow: "PAST EVENT · MPSS26",
    title: "Madhya Pradesh Semiconductor Summit 2026",
    shortName: "MPSS26",
    date: "23–24 October 2026",
    location: "Brilliant Convention Centre, Indore",
    image: "/images/stage-dignitaries.png",
    imageAlt:
      "Madhya Pradesh Semiconductor Summit 2026 plenary stage at Brilliant Convention Centre, Indore",
    ctaLabel: "View Case Study",
    ctaHref: "/#casestudy",
    external: false,
  },
];

export default function EventsExplorer() {
  const [activeTab, setActiveTab] = useState<EventTabKey>("future");
  const shouldReduceMotion = useReducedMotion();

  const activeEvents = EVENTS.filter((event) => event.status === activeTab);

  return (
    <section className="pt-8 sm:pt-10 pb-20 md:pb-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Header + 3-Way Switcher (matching AudienceToggle layout) */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#111827] leading-[1.15]">
            Summits &amp; conferences{" "}
            <span className="text-[#EB3B38]">powered by GetMyEvent.</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-[#111827]/70">
            Explore live, upcoming, and past gatherings running on our
            zero-friction digital event companion.
          </p>

          {/* 3-Way Switcher Pill */}
          <div
            className="mt-8 inline-flex p-1.5 rounded-full bg-white border border-[#EAE7E0] shadow-sm"
            role="tablist"
            aria-label="Event status tabs"
          >
            {EVENT_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 min-h-[44px] flex items-center justify-center cursor-pointer ${
                    isActive
                      ? "bg-[#111827] text-white shadow-md font-bold"
                      : "text-[#111827]/70 hover:text-[#111827] hover:bg-black/5"
                  }`}
                >
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Display Container */}
        <div className="max-w-5xl mx-auto p-6 sm:p-8 md:p-10 rounded-3xl bg-white border border-[#EAE7E0] shadow-[0_8px_30px_rgba(17,24,39,0.04)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
            >
              {activeEvents.length > 0 ? (
                <div className="space-y-8">
                  {activeEvents.map((event) => (
                    <div
                      key={event.id}
                      className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center"
                    >
                      {/* Left Column: Uniform Event Info */}
                      <div className="lg:col-span-6 flex flex-col items-start order-2 lg:order-1">
                        <div className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#EB3B38] mb-3">
                          {event.eyebrow}
                        </div>

                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111827] leading-snug">
                          {event.title}
                        </h2>

                        <div className="mt-5 space-y-2.5 text-sm sm:text-base text-[#111827]/75 font-medium">
                          <div className="flex items-center gap-2.5">
                            <Calendar className="w-4 h-4 text-[#EB3B38] shrink-0" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-start gap-2.5">
                            <MapPin className="w-4 h-4 text-[#EB3B38] shrink-0 mt-1" />
                            <span>{event.location}</span>
                          </div>
                        </div>

                        <div className="mt-7">
                          {event.external ? (
                            <a
                              href={event.ctaHref}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#111827] text-white text-sm font-semibold hover:bg-[#EB3B38] transition-colors group"
                            >
                              <span>{event.ctaLabel}</span>
                              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </a>
                          ) : (
                            <Link
                              href={event.ctaHref}
                              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#111827] text-white text-sm font-semibold hover:bg-[#EB3B38] transition-colors group"
                            >
                              <span>{event.ctaLabel}</span>
                              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </Link>
                          )}
                        </div>
                      </div>

                      {/* Right Column: Event Visual */}
                      <div className="lg:col-span-6 order-1 lg:order-2">
                        <div className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden bg-[#FAF8F5] border border-[#EAE7E0] shadow-sm">
                          <Image
                            src={event.image}
                            alt={event.imageAlt}
                            fill
                            className="object-cover object-center"
                            sizes="(max-width: 1024px) 100vw, 480px"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-10 sm:py-12 text-center max-w-md mx-auto flex flex-col items-center">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-4">
                    <Radio className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="text-xs font-bold uppercase tracking-widest text-[#EB3B38] mb-2">
                    LIVE STATUS
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight text-[#111827]">
                    No live events right now
                  </h2>
                  <p className="mt-2 text-sm text-[#111827]/70">
                    Check Upcoming events or partner with GetMyEvent for your next
                    conference.
                  </p>
                  <Link
                    href="/#contact"
                    className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#111827] text-white text-sm font-semibold hover:bg-[#EB3B38] transition-colors group"
                  >
                    <span>Host your event</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
