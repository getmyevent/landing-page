import Hero from "@/components/Hero";
import ProofStrip from "@/components/ProofStrip";
import FeatureGrid from "@/components/FeatureGrid";
import AudienceToggle from "@/components/AudienceToggle";
import CaseStudy from "@/components/CaseStudy";
import Team from "@/components/Team";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero */}
      <Hero />

      {/* 2. Proof Strip with Animated Counters */}
      <ProofStrip />

      {/* 3. Numbered Feature Grid 01-06 */}
      <FeatureGrid />

      {/* 4. 3-Way Audience Toggle (Delegates / Organizers / Exhibitors) */}
      <AudienceToggle />

      {/* 5. Live Case Study: MP Semiconductor Summit 2026 */}
      <CaseStudy />

      {/* 6. Team & Leadership */}
      <Team />

      {/* 7. Final CTA & Lead Form */}
      <ContactSection />

      {/* 8. Footer */}
      <Footer />
    </div>
  );
}
