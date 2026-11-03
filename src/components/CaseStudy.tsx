"use client";

import Image from "next/image";
import { MapPin, Calendar, Sparkles } from "lucide-react";

export default function CaseStudy() {
  return (
    <section id="casestudy" className="py-20 md:py-28 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Pill & Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#111827] leading-[1.12]">
            Proven at scale at{" "}
            <span className="text-[#EB3B38]">Madhya Pradesh Semiconductor Summit 2026</span>
          </h2>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-[#111827]/60 font-medium">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#EB3B38]" />
              Brilliant Convention Centre, Indore
            </span>
            <span className="text-[#111827]/30">•</span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#EB3B38]" />
              23–24 October 2026
            </span>
          </div>
        </div>

        {/* Full-Bleed Editorial Media Box with Overlay */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#EAE7E0] bg-[#111827]">
          {/* Main Background Image: Auditorium Crowd */}
          <div className="relative w-full h-[450px] sm:h-[520px] md:h-[600px] lg:h-[650px]">
            <Image
              src="/images/stage-dignitaries.png"
              alt="Madhya Pradesh Semiconductor Summit Auditorium and Stage"
              fill
              className="object-cover object-center opacity-40 mix-blend-luminosity"
              sizes="(max-width: 1280px) 100vw, 1280px"
              priority={false}
            />
            {/* Gradient Overlays for readable text */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/70 to-[#111827]/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#111827]/90 via-[#111827]/60 to-transparent" />
          </div>

          {/* Content Overlay */}
          <div className="absolute inset-0 p-6 sm:p-10 md:p-14 lg:p-16 flex flex-col justify-between z-10">
            {/* Top Tag & Quote */}
            <div className="max-w-2xl">
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
                &ldquo;Make the event experience feel as connected as the people
                in the room.&rdquo;
              </h3>
            </div>

            {/* Bottom Row: 3 Key Numbers + Secondary Kiosk Photo Pill */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end pt-8 border-t border-white/15">
              {/* 3 Key Numbers */}
              <div className="lg:col-span-8 grid grid-cols-3 gap-4 sm:gap-6 text-white">
                <div className="border-l-2 border-[#EB3B38] pl-3 sm:pl-4">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
                    1,200
                  </div>
                  <div className="text-xs sm:text-sm text-white/70 mt-1 font-medium">
                    Real live attendees onboarded
                  </div>
                </div>

                <div className="border-l-2 border-[#EB3B38] pl-3 sm:pl-4">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
                    2,400+
                  </div>
                  <div className="text-xs sm:text-sm text-white/70 mt-1 font-medium">
                    Delegates verified &amp; managed
                  </div>
                </div>

                <div className="border-l-2 border-[#EB3B38] pl-3 sm:pl-4">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
                    50+ / 65
                  </div>
                  <div className="text-xs sm:text-sm text-white/70 mt-1 font-medium">
                    Exhibitor booths &amp; speakers
                  </div>
                </div>
              </div>

              {/* On-ground Kiosk Photo Thumbnail & Badge */}
              <div className="lg:col-span-4 hidden sm:flex items-center gap-3.5 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-white/20">
                  <Image
                    src="/images/kiosk-team.png"
                    alt="GetMyEvent Team with the Kiosk at Brilliant Convention Centre"
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div className="text-xs text-white">
                  <div className="font-semibold text-white/95">
                    Live On-Ground Support
                  </div>
                  <div className="text-white/60 text-[11px] mt-0.5">
                    &ldquo;Scan to access the event&rdquo; entry kiosks
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Dual Media Grid Below Case Study */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative h-64 sm:h-72 rounded-2xl sm:rounded-3xl overflow-hidden border border-[#EAE7E0] group">
            <Image
              src="/images/kiosk-team.png"
              alt="GetMyEvent on-ground kiosk at MP Semiconductor Summit"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 600px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
              <p className="text-white text-sm sm:text-base font-semibold">
                Delegates scanning QR standees for immediate password-less entry
              </p>
            </div>
          </div>

          <div className="relative h-64 sm:h-72 rounded-2xl sm:rounded-3xl overflow-hidden border border-[#EAE7E0] group">
            <Image
              src="/images/stage-dignitaries.png"
              alt="MP Semiconductor Summit Plenary Session at Brilliant Convention Centre"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 600px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
              <p className="text-white text-sm sm:text-base font-semibold">
                Plenary stage hosting central government &amp; global semiconductor leadership
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
