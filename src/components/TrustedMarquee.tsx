"use client";

const PARTNERS = [
  { name: "MPSS26", role: "Flagship Semiconductor Summit", featured: true },
  { name: "IET DAVV", role: "Mentorship & Academic Partner", featured: true },
  { name: "Brilliant Convention Centre", role: "Premier Host Venue", featured: true },
  { name: "Google Cloud", role: "Corporate Exhibitor", featured: false },
  { name: "AWS", role: "Corporate Exhibitor", featured: false },
  { name: "TCS", role: "Corporate Exhibitor", featured: false },
  { name: "Infosys", role: "Corporate Exhibitor", featured: false },
  { name: "Truechip Solutions", role: "Booth & Lead Partner", featured: false },
];

export default function TrustedMarquee() {
  return (
    <section className="py-10 bg-[#FAF8F5] overflow-hidden border-b border-[#EAE7E0]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
        <p className="text-xs uppercase tracking-widest font-semibold text-[#111827]/50">
          Trusted by Premier Summits, Venues &amp; Corporate Exhibitors
        </p>
      </div>

      {/* Infinite Marquee Track with hover pause */}
      <div className="relative w-full overflow-hidden mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max space-x-8 animate-marquee hover:[animation-play-state:paused] py-2">
          {[...PARTNERS, ...PARTNERS, ...PARTNERS].map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-white border border-[#EAE7E0] shadow-[0_2px_8px_rgba(17,24,39,0.03)] hover:border-[#111827]/40 transition-colors whitespace-nowrap cursor-default"
            >
              <span
                className={`font-semibold tracking-tight ${
                  item.featured
                    ? "text-[#111827] text-base"
                    : "text-[#111827]/80 text-sm"
                }`}
              >
                {item.name}
              </span>
              <span className="text-xs text-[#111827]/45 font-medium border-l border-[#EAE7E0] pl-2.5">
                {item.role}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
