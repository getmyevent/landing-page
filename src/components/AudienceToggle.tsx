"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  MessageSquare,
  CalendarCheck,
  MapPin,
  Vote,
  QrCode,
  FileSpreadsheet,
  Users2,
  Activity,
  BarChart3,
  CheckCircle2,
  Store,
  LayoutDashboard,
  LucideIcon,
} from "lucide-react";
import PhoneMockup from "./PhoneMockup";

type AudienceKey = "delegates" | "organizers" | "exhibitors";

interface BulletItem {
  title: string;
  desc: string;
  icon: LucideIcon;
}

interface AudienceContent {
  id: AudienceKey;
  label: string;
  badge: string;
  title: string;
  description: string;
  bullets: BulletItem[];
  imageSrc: string;
  imageAlt: string;
  isDashboard?: boolean;
}

const AUDIENCES: AudienceContent[] = [
  {
    id: "delegates",
    label: "For delegates",
    badge: "Delegate Experience",
    title: "Everything attendees need. Directly in their pocket.",
    description:
      "No app store downloads, no passwords, no OTP barriers. Attendees enter directly through a personalized link sent on WhatsApp.",
    bullets: [
      {
        title: "Instant WhatsApp Access",
        desc: "Personalized secure link sent straight to each delegate's WhatsApp. Instant access on arrival.",
        icon: MessageSquare,
      },
      {
        title: "Live Interactive Agenda",
        desc: "Session timelines, speaker profiles, room locations, and real-time schedule updates.",
        icon: CalendarCheck,
      },
      {
        title: "Venue & Floor Navigation",
        desc: "Interactive hall maps so delegates find session halls, exhibition booths, and dining halls effortlessly.",
        icon: MapPin,
      },
      {
        title: "Attendee Networking & Live Polls",
        desc: "Engage with speakers during keynotes and connect with fellow industry delegates on the floor.",
        icon: Vote,
      },
    ],
    imageSrc: "/images/app-screen-delegate.png",
    imageAlt: "GetMyEvent Delegate App Screen showing MPSS26 badge and agenda",
    isDashboard: false,
  },
  {
    id: "exhibitors",
    label: "For exhibitors",
    badge: "Exhibitor & Booth Experience",
    title: "Turn booth traffic into qualified pipeline instantly.",
    description:
      "Give booth representatives their own dedicated on-floor interface to showcase products and capture leads in seconds.",
    bullets: [
      {
        title: "Company & Booth Showcase",
        desc: "Highlight team members, product catalogues, and whitepapers directly on delegate phones.",
        icon: Store,
      },
      {
        title: "Instant QR Lead Scanning",
        desc: "Scan attendee badges with your phone camera to capture verified contact details and requirements.",
        icon: QrCode,
      },
      {
        title: "In-App Delegate Inquiries",
        desc: "Attendees can contact exhibitors directly through the web app for follow-ups and inquiries.",
        icon: CheckCircle2,
      },
      {
        title: "One-Click CSV Export",
        desc: "Export captured leads and visitor notes instantly in CSV format for CRM integration.",
        icon: FileSpreadsheet,
      },
    ],
    imageSrc: "/images/app-screen-exhibitor.png",
    imageAlt: "GetMyEvent Exhibitor Lead Capture interface showing Truechip Solutions",
    isDashboard: false,
  },
  {
    id: "organizers",
    label: "For organizers",
    badge: "Organizer Console",
    title: "Manage your entire event from one central dashboard.",
    description:
      "Gain full control of delegate flow, monitor session attendance in real time, and oversee exhibitor performance effortlessly.",
    bullets: [
      {
        title: "Attendee & Check-In Management",
        desc: "Track registered delegates, manage entries, and verify check-ins across multiple venue gates.",
        icon: Users2,
      },
      {
        title: "Live Session & Programme Tracking",
        desc: "Monitor ongoing sessions, manage parallel tracks, and make live announcements on the fly.",
        icon: Activity,
      },
      {
        title: "Exhibitor & Lead Analytics",
        desc: "Observe booth footfall, top performers by leads captured, and overall engagement in real time.",
        icon: BarChart3,
      },
      {
        title: "Unified Web Console",
        desc: "Access all analytics and settings from any laptop or tablet without installing local software.",
        icon: LayoutDashboard,
      },
    ],
    imageSrc: "/images/organizer-dashboard.png",
    imageAlt: "GetMyEvent Organizer Console Dashboard with live event stats",
    isDashboard: true,
  },
];

export default function AudienceToggle() {
  const [activeTab, setActiveTab] = useState<AudienceKey>("delegates");
  const shouldReduceMotion = useReducedMotion();

  const currentAudience =
    AUDIENCES.find((a) => a.id === activeTab) || AUDIENCES[0];

  return (
    <section id="experiences" className="py-20 md:py-28 bg-[#FAF8F5] border-t border-[#EAE7E0]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#EAE7E0] shadow-sm mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EB3B38]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#111827]/70">
              Tailored Experiences
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#111827] leading-[1.15]">
            Designed around the people who{" "}
            <span className="text-[#EB3B38]">make events happen.</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#111827]/70">
            From the first agenda check to finding a session room or scanning a
            lead, GetMyEvent brings the essential touchpoints into a single,
            mobile-friendly space.
          </p>

          {/* 3-Way Pill Switcher */}
          <div className="mt-8 inline-flex p-1.5 rounded-full bg-white border border-[#EAE7E0] shadow-sm">
            {AUDIENCES.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 min-h-[44px] flex items-center justify-center ${
                    isActive
                      ? "text-white shadow-sm"
                      : "text-[#111827]/70 hover:text-[#111827]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 bg-[#111827] rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Display: Desktop 2 Columns Side-by-Side */}
        <div className="mt-6 p-6 sm:p-8 md:p-12 rounded-3xl bg-white border border-[#EAE7E0] shadow-[0_8px_30px_rgba(17,24,39,0.04)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentAudience.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center"
            >
              {/* Left Column: Bullets & Explanations */}
              <div className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#EAE7E0] w-fit mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#EB3B38]">
                    {currentAudience.badge}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#111827]">
                  {currentAudience.title}
                </h3>

                <p className="mt-3 text-base sm:text-lg text-[#111827]/70">
                  {currentAudience.description}
                </p>

                {/* Bullets List */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {currentAudience.bullets.map((bullet, idx) => {
                    const Icon = bullet.icon;
                    return (
                      <div
                        key={idx}
                        className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#EAE7E0]/70 flex flex-col gap-2"
                      >
                        <div className="w-9 h-9 rounded-xl bg-white border border-[#EAE7E0] flex items-center justify-center text-[#EB3B38] shadow-xs">
                          <Icon className="w-4 h-4" />
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-[#111827] tracking-tight">
                          {bullet.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-[#111827]/70 leading-relaxed">
                          {bullet.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Screen Preview */}
              <div className="lg:col-span-5 flex justify-center items-center order-1 lg:order-2">
                {currentAudience.isDashboard ? (
                  <div className="relative w-full max-w-lg aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-[#2D3139] bg-[#1E2024] p-1">
                    <div className="relative w-full h-full rounded-xl overflow-hidden bg-black">
                      <Image
                        src={currentAudience.imageSrc}
                        alt={currentAudience.imageAlt}
                        fill
                        className="object-contain"
                        sizes="(max-width: 1024px) 100vw, 500px"
                      />
                    </div>
                  </div>
                ) : (
                  <PhoneMockup
                    imageSrc={currentAudience.imageSrc}
                    imageAlt={currentAudience.imageAlt}
                    className="scale-95 sm:scale-100"
                  />
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
