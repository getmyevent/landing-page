import type { Metadata } from "next";
import EventsExplorer from "@/components/EventsExplorer";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Events — GetMyEvent",
  description:
    "Explore past, live, and upcoming conferences and summits powered by GetMyEvent, including MP Semiconductor Summit 2026 and ICSCS-2026.",
  alternates: {
    canonical: "/events",
  },
};

export default function EventsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <EventsExplorer />
      <Footer />
    </div>
  );
}
