"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface CounterProps {
  end: number;
  suffix?: string;
  label: string;
  sublabel?: string;
}

function AnimatedCounter({ end, suffix = "+", label, sublabel }: CounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;
    if (shouldReduceMotion) {
      setCount(end);
      return;
    }

    const start = 0;
    const duration = 1800; // ms
    const startTime = performance.now();

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(start + (end - start) * easeOut));

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(update);
  }, [isInView, end, shouldReduceMotion]);

  return (
    <div ref={ref} className="flex flex-col items-center text-center p-4">
      <div className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#111827]">
        {count.toLocaleString()}
        <span className="text-[#EB3B38] ml-0.5">{suffix}</span>
      </div>
      <div className="mt-2 text-sm sm:text-base font-semibold text-[#111827]/85 tracking-tight">
        {label}
      </div>
      {sublabel && (
        <div className="text-xs text-[#111827]/50 mt-0.5">{sublabel}</div>
      )}
    </div>
  );
}

export default function ProofStrip() {
  return (
    <section className="py-12 md:py-16 bg-[#FAF8F5] border-y border-[#EAE7E0]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Grid: Mobile 2x2, Tablet & Desktop 4 in a row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-[#EAE7E0]/70">
          <AnimatedCounter
            end={1200}
            suffix="+"
            label="Attendees onboarded"
            sublabel="Live real-time users"
          />
          <AnimatedCounter
            end={2400}
            suffix="+"
            label="Delegates managed"
            sublabel="Seamless verification"
          />
          <AnimatedCounter
            end={65}
            suffix="+"
            label="Industry speakers"
            sublabel="Keynotes & parallel tracks"
          />
          <AnimatedCounter
            end={50}
            suffix="+"
            label="Exhibitors & booths"
            sublabel="On-floor lead capture"
          />
        </div>

        {/* Zero Friction Proof Banner & Capacity Note */}
        <div className="mt-10 pt-8 border-t border-[#EAE7E0]/70 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          {/* Zero downloads, passwords, OTPs */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4 text-xs sm:text-sm font-semibold text-[#111827]/80">
            <span className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EB3B38]" />
              0 downloads
            </span>
            <span className="text-[#111827]/30">•</span>
            <span className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EB3B38]" />
              0 passwords
            </span>
            <span className="text-[#111827]/30">•</span>
            <span className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EB3B38]" />
              0 OTPs
            </span>
          </div>

          {/* Concurrent delegate note */}
          <div className="text-xs sm:text-sm font-medium text-[#111827]/60 flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#EB3B38]" />
            <span>Built for 10,000+ concurrent delegates</span>
          </div>
        </div>
      </div>
    </section>
  );
}
