"use client";

import { useState, useEffect, MouseEvent } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { Mail } from "lucide-react";

export interface TeamMember {
  name: string;
  role: string;
  badge: string;
  bio: string;
  image: string;
  initials: string;
  objectPosition?: string;
  linkedin?: string;
  github?: string;
  email?: string;
}

interface TeamCardProps {
  member: TeamMember;
  index: number;
  className?: string;
}

export default function TeamCard({ member, index, className = "" }: TeamCardProps) {
  const [imageError, setImageError] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Detect desktop pointer with hover support (disables 3D tilt on touch screens)
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCanHover(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
    }
  }, []);

  // Subtle 3D tilt following cursor (max 4 degrees)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 260, damping: 24 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["4deg", "-4deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-4deg", "4deg"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !canHover) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.55,
        delay: shouldReduceMotion ? 0 : index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={shouldReduceMotion ? {} : { y: -6 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: canHover && !shouldReduceMotion ? rotateX : 0,
        rotateY: canHover && !shouldReduceMotion ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      tabIndex={0}
      aria-label={`${member.name}, ${member.role}`}
      className={`group relative flex flex-col rounded-3xl bg-white border border-[#EAE5DD] shadow-[0_4px_20px_-2px_rgba(17,24,39,0.03)] hover:shadow-[0_16px_40px_-8px_rgba(17,24,39,0.1)] transition-shadow duration-300 p-3 sm:p-3.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EB3B38] focus-visible:ring-offset-2 ${className}`}
    >
      {/* Top Photo Container: 4/5 Aspect Ratio */}
      <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-[#FAF8F5] select-none">
        {/* Badge Pill: Top-Left Overlay */}
        <div className="absolute top-3 left-3 z-20 px-3 py-1 rounded-full bg-white/85 backdrop-blur-md border border-white/40 shadow-xs pointer-events-none">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#EB3B38]">
            {member.badge}
          </span>
        </div>

        {/* Real Photo or Graceful Initials Fallback */}
        {!imageError ? (
          <Image
            src={member.image}
            alt={`${member.name} — ${member.role}`}
            fill
            sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 360px"
            className="object-cover grayscale-[20%] transition-all duration-500 ease-out group-hover:grayscale-0 group-hover:scale-105 group-focus-within:grayscale-0 group-focus-within:scale-105"
            style={{ objectPosition: member.objectPosition || "center 20%" }}
            placeholder="blur"
            blurDataURL="data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Crect width='4' height='5' fill='%23FAF8F5'/%3E%3C/svg%3E"
            onError={() => setImageError(true)}
            priority={false}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-tr from-[#111827] via-[#1E293B] to-[#334155] text-white p-6">
            <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center font-bold text-2xl tracking-wider text-white shadow-inner">
              {member.initials}
            </div>
            <div className="text-xs uppercase tracking-widest text-white/50 mt-3 font-semibold">
              {member.role}
            </div>
          </div>
        )}

        {/* Social / Contact Row: Slides up on hover (Desktop) & always visible (Mobile) */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/85 via-black/45 to-transparent flex items-center justify-center gap-2.5 transition-all duration-300 ease-out sm:translate-y-full sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:group-focus-within:translate-y-0 sm:group-focus-within:opacity-100 z-20">
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on LinkedIn`}
              className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm text-[#111827] hover:text-[#EB3B38] hover:bg-white flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EB3B38]"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.46 1.46 0 1 0 0-2.92 1.46 1.46 0 0 0 0 2.92m1.39 9.74v-8.37H5.07v8.37h2.78z" />
              </svg>
            </a>
          )}

          {member.github && (
            <a
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on GitHub`}
              className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm text-[#111827] hover:text-[#EB3B38] hover:bg-white flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EB3B38]"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
          )}

          {member.email && (
            <a
              href={member.email}
              aria-label={`Email ${member.name}`}
              className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm text-[#111827] hover:text-[#EB3B38] hover:bg-white flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EB3B38]"
            >
              <Mail className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* Text Info Below Photo */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow">
        {/* Name with expanding coral underline */}
        <div className="mb-1">
          <h3 className="relative inline-block text-lg sm:text-xl font-bold tracking-tight text-[#111827]">
            <span>{member.name}</span>
            <span
              className="absolute left-0 bottom-0 h-[2px] w-0 bg-[#EB3B38] transition-all duration-300 ease-out group-hover:w-full group-focus-within:w-full"
              aria-hidden="true"
            />
          </h3>
        </div>

        {/* Role in Coral */}
        <div className="text-xs sm:text-sm font-semibold text-[#EB3B38] mt-0.5 mb-2.5">
          {member.role}
        </div>

        {/* Bio in Muted Gray */}
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed flex-grow">
          {member.bio}
        </p>
      </div>
    </motion.div>
  );
}
