import type { Metadata, Viewport } from "next";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import Navbar from "@/components/Navbar";

export const viewport: Viewport = {
  themeColor: "#FAF8F5",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "GetMyEvent — One Platform. Built Around Your Event.",
  description:
    "The digital event companion for conferences, summits, and gatherings. One mobile web app for agendas, speakers, exhibitors, and venue maps. No downloads, no passwords, no OTPs.",
  metadataBase: new URL("https://getmyevent.in"),
  alternates: {
    canonical: "/",
  },
  keywords: [
    "GetMyEvent",
    "event web app",
    "conference companion app",
    "summit event management",
    "no-download event app",
    "exhibitor lead capture",
    "attendee networking",
    "MP Semiconductor Summit 2026",
    "Indore event tech",
  ],
  authors: [{ name: "GetMyEvent Team", url: "https://getmyevent.in" }],
  openGraph: {
    title: "GetMyEvent — One Platform. Built Around Your Event.",
    description:
      "One mobile web app for agendas, speakers, exhibitors and venue maps. 0 downloads, 0 passwords, 0 OTPs.",
    url: "https://getmyevent.in",
    siteName: "GetMyEvent",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/brand/hero-mockup.jpeg",
        width: 1200,
        height: 630,
        alt: "GetMyEvent Digital Companion Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GetMyEvent — One Platform. Built Around Your Event.",
    description:
      "One mobile web app for agendas, speakers, exhibitors and venue maps. 0 downloads, 0 passwords, 0 OTPs.",
    images: ["/brand/hero-mockup.jpeg"],
  },
  icons: {
    icon: "/brand/logo-gradient.png",
    apple: "/brand/logo-gradient.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-[#FAF8F5] text-[#111827] antialiased selection:bg-[#EB3B38]/15 selection:text-[#EB3B38] overflow-x-hidden font-sans">
        <LenisProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
          </div>
        </LenisProvider>
      </body>
    </html>
  );
}
