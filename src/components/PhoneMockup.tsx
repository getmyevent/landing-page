import Image from "next/image";
import { ReactNode } from "react";

interface PhoneMockupProps {
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
  children?: ReactNode;
}

export default function PhoneMockup({
  imageSrc,
  imageAlt = "GetMyEvent Mobile App Screen",
  className = "",
  children,
}: PhoneMockupProps) {
  return (
    <div
      className={`relative mx-auto w-[275px] sm:w-[300px] md:w-[325px] rounded-[36px] p-2 sm:p-2.5 bg-[#16181D] shadow-[0_25px_60px_-15px_rgba(17,24,39,0.22),0_0_0_1px_rgba(255,255,255,0.08)_inset] border-[3px] border-[#2A2E37] flex flex-col ${className}`}
    >
      {/* Outer bezel edge highlight */}
      <div className="absolute inset-0 rounded-[33px] pointer-events-none ring-1 ring-white/10" />

      {/* Top hardware bezel: subtle speaker and camera dot (outside the screen area) */}
      <div className="w-full h-3 sm:h-3.5 flex items-center justify-center gap-2 shrink-0 pointer-events-none">
        <div className="w-10 h-1 bg-[#282B33] rounded-full" />
        <div className="w-1.5 h-1.5 bg-[#1E2128] rounded-full border border-white/5" />
      </div>

      {/* Screen Container with clean gentle radius - zero cutting of text or corners */}
      <div className="relative w-full aspect-[1/2.02] rounded-[20px] overflow-hidden bg-[#FAF8F5] shadow-[0_1px_3px_rgba(0,0,0,0.12)_inset] flex flex-col">
        {imageSrc ? (
          <div className="relative w-full h-full">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-contain object-top"
              sizes="(max-width: 640px) 275px, (max-width: 768px) 300px, 325px"
              priority
            />
          </div>
        ) : (
          children
        )}
      </div>

      {/* Bottom hardware bezel: subtle home indicator bar (outside the screen area) */}
      <div className="w-full h-3 sm:h-3.5 flex items-center justify-center shrink-0 pointer-events-none">
        <div className="w-20 h-1 bg-[#2A2E38] rounded-full" />
      </div>
    </div>
  );
}

