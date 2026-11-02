import Image from "next/image";
import { ReactNode } from "react";

interface PhoneMockupProps {
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
  children?: ReactNode;
  aspectRatio?: string;
}

export default function PhoneMockup({
  imageSrc,
  imageAlt = "GetMyEvent Mobile App Screen",
  className = "",
  children,
}: PhoneMockupProps) {
  return (
    <div
      className={`relative mx-auto w-[280px] sm:w-[310px] md:w-[330px] aspect-[9/18.5] rounded-[48px] p-3 bg-[#1E2024] shadow-[0_25px_60px_-15px_rgba(17,24,39,0.25),0_0_0_1px_rgba(255,255,255,0.1)_inset] border-4 border-[#2D3139] ${className}`}
    >
      {/* Outer subtle reflection */}
      <div className="absolute inset-0 rounded-[44px] pointer-events-none ring-1 ring-white/10" />

      {/* Dynamic Island Pill */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-30 flex items-center justify-between px-2.5 shadow-sm">
        <div className="w-2.5 h-2.5 rounded-full bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center">
          <div className="w-1 h-1 rounded-full bg-[#0E1528]" />
        </div>
        <div className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
      </div>

      {/* Screen Container */}
      <div className="relative w-full h-full rounded-[38px] overflow-hidden bg-[#FAF8F5] border border-black/10 flex flex-col">
        {imageSrc ? (
          <div className="relative w-full h-full">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover object-top"
              sizes="(max-width: 640px) 280px, (max-width: 768px) 310px, 330px"
              priority
            />
          </div>
        ) : (
          children
        )}
      </div>

      {/* Home indicator bar at bottom */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/70 rounded-full z-30 pointer-events-none" />
    </div>
  );
}
