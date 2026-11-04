"use client";

import TeamCard, { TeamMember } from "./TeamCard";

const TEAM: TeamMember[] = [
  {
    name: "Hari Gupta",
    role: "Co-Founder & CEO",
    badge: "CO-FOUNDER",
    bio: "Product strategy, operations, and summit client partnerships.",
    image: "/team/hari-gupta.jpg",
    initials: "HG",
    objectPosition: "center 18%",
    linkedin: "https://www.linkedin.com",
    github: "https://github.com",
    email: "mailto:getmyevent.work@gmail.com",
  },
  {
    name: "Pushpit Upadhyay",
    role: "Co-Founder & Tech Lead",
    badge: "CO-FOUNDER",
    bio: "Platform architecture, mobile web runtime, and real-time event analytics.",
    image: "/team/pushpit-upadhyay.jpg",
    initials: "PU",
    objectPosition: "center 22%",
    linkedin: "https://www.linkedin.com",
    github: "https://github.com",
    email: "mailto:getmyevent.work@gmail.com",
  },
  {
    name: "Dr. Pratosh Bansal",
    role: "Director, IET DAVV",
    badge: "MENTOR & ADVISOR",
    bio: "Institutional mentorship, academic incubation, and high-concurrency architecture advice.",
    image: "/team/pratosh-bansal.jpg",
    initials: "PB",
    objectPosition: "center 20%",
    linkedin: "https://www.linkedin.com",
    email: "mailto:getmyevent.work@gmail.com",
  },
];

export default function Team() {
  return (
    <section id="team" className="scroll-mt-24 py-20 md:py-28 bg-[#FAF8F5] border-t border-[#EAE7E0]/60 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#EB3B38] mb-3">
            THE TEAM
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#111827] leading-[1.12]">
            The team behind{" "}
            <span className="text-[#EB3B38]">GetMyEvent.</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#111827]/70">
            Built by people who&apos;ve run real summits.
          </p>
        </div>

        {/* Responsive Layout:
            - Mobile (<640px): horizontal snap carousel with peek of next card
            - Tablet (640px-1023px): 2 columns with mentor centered below
            - Desktop (1024px+): 3 columns with gap-8 in max-w-6xl container
        */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 overflow-x-auto sm:overflow-visible snap-x snap-mandatory pb-6 sm:pb-0 px-4 sm:px-0 -mx-4 sm:mx-0">
          {TEAM.map((member, idx) => (
            <div
              key={member.name}
              className={`w-[78vw] max-w-[290px] shrink-0 snap-center ${
                idx === 2
                  ? "sm:col-span-2 sm:w-full sm:max-w-[340px] sm:mx-auto lg:col-span-1 lg:max-w-none"
                  : "sm:w-auto sm:max-w-none"
              }`}
            >
              <TeamCard member={member} index={idx} className="h-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
