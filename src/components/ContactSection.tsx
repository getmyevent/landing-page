"use client";

import { useState } from "react";
import { ArrowUpRight, CheckCircle2, AlertCircle, Mail, MapPin } from "lucide-react";

interface FormData {
  name: string;
  organization: string;
  email: string;
  eventType: string;
  expectedAttendees: string;
  eventDate: string;
  message: string;
  botField: string;
}

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    organization: "",
    email: "",
    eventType: "Conference",
    expectedAttendees: "500 - 1,000",
    eventDate: "",
    message: "",
    botField: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMsg) setErrorMsg(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    // Client-side validation
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setErrorMsg("Please enter your name (at least 2 characters).");
      return;
    }
    if (!formData.organization.trim()) {
      setErrorMsg("Please enter your company or summit organization.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    if (!formData.message.trim() || formData.message.trim().length < 5) {
      setErrorMsg("Please provide a short description or requirements (min 5 characters).");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Submission failed. Please try again.");
      }

      setSuccessMsg(
        "Thank you! We've received your inquiry and our team will get in touch within 24 hours."
      );
      setFormData({
        name: "",
        organization: "",
        email: "",
        eventType: "Conference",
        expectedAttendees: "500 - 1,000",
        eventDate: "",
        message: "",
        botField: "",
      });
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please email getmyevent.work@gmail.com directly.";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#FAF8F5] border-t border-[#EAE7E0]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left Column: Copy & Value Proposition */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#EAE7E0] shadow-sm mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EB3B38]" />
                <span className="text-xs font-semibold uppercase tracking-wider text-[#111827]/70">
                  Host With Us
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#111827] leading-[1.12]">
                Have an event in mind?{" "}
                <span className="text-[#EB3B38] inline-flex items-center">
                  Let&apos;s talk <ArrowUpRight className="w-8 h-8 ml-1 inline" />
                </span>
              </h2>

              <p className="mt-4 text-base sm:text-lg text-[#111827]/75 leading-relaxed">
                Let&apos;s explore how GetMyEvent can deliver a clearer, more
                connected experience for your upcoming summit or conference.
              </p>

              {/* Direct Touchpoints */}
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-[#EAE7E0] shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#EAE7E0] flex items-center justify-center text-[#EB3B38]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-[#111827]/50 font-medium">Direct Email</div>
                    <a
                      href="mailto:getmyevent.work@gmail.com"
                      className="text-sm sm:text-base font-semibold text-[#111827] hover:text-[#EB3B38] transition-colors"
                    >
                      getmyevent.work@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-[#EAE7E0] shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#EAE7E0] flex items-center justify-center text-[#EB3B38]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-[#111827]/50 font-medium">Headquarters</div>
                    <div className="text-sm sm:text-base font-semibold text-[#111827]">
                      Indore, Madhya Pradesh, India
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Guarantees */}
            <div className="mt-10 p-6 rounded-2xl bg-white border border-[#EAE7E0] space-y-3">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#111827]/80">
                <CheckCircle2 className="w-4 h-4 text-[#EB3B38] shrink-0" />
                <span>Response guaranteed within 24 hours</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#111827]/80">
                <CheckCircle2 className="w-4 h-4 text-[#EB3B38] shrink-0" />
                <span>Custom demo preview configured for your event</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#111827]/80">
                <CheckCircle2 className="w-4 h-4 text-[#EB3B38] shrink-0" />
                <span>On-ground deployment &amp; badge support available</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-10 rounded-3xl bg-white border border-[#EAE7E0] shadow-[0_8px_30px_rgba(17,24,39,0.05)]">
              <h3 className="text-2xl font-bold text-[#111827] tracking-tight mb-2">
                Tell us about your event
              </h3>
              <p className="text-sm text-[#111827]/60 mb-8">
                Fill in the details below and we&apos;ll prepare a tailored event plan.
              </p>

              {successMsg && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="text-sm font-medium">{successMsg}</div>
                </div>
              )}

              {errorMsg && (
                <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-[#EB3B38] shrink-0 mt-0.5" />
                  <div className="text-sm font-medium">{errorMsg}</div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Honeypot field (hidden from genuine users) */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="botField">Do not fill this field</label>
                  <input
                    type="text"
                    id="botField"
                    name="botField"
                    value={formData.botField}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* Name & Organization */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#111827]/70 mb-1.5"
                    >
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Hari Gupta"
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#EAE7E0] text-[#111827] text-sm focus:outline-none focus:ring-2 focus:ring-[#EB3B38] focus:bg-white transition-all min-h-[44px]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="organization"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#111827]/70 mb-1.5"
                    >
                      Organization / Summit *
                    </label>
                    <input
                      type="text"
                      id="organization"
                      name="organization"
                      required
                      value={formData.organization}
                      onChange={handleChange}
                      placeholder="e.g. Semiconductor Conclave 2026"
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#EAE7E0] text-[#111827] text-sm focus:outline-none focus:ring-2 focus:ring-[#EB3B38] focus:bg-white transition-all min-h-[44px]"
                    />
                  </div>
                </div>

                {/* Email & Event Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#111827]/70 mb-1.5"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@organization.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#EAE7E0] text-[#111827] text-sm focus:outline-none focus:ring-2 focus:ring-[#EB3B38] focus:bg-white transition-all min-h-[44px]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="eventType"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#111827]/70 mb-1.5"
                    >
                      Event Type *
                    </label>
                    <select
                      id="eventType"
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#EAE7E0] text-[#111827] text-sm focus:outline-none focus:ring-2 focus:ring-[#EB3B38] focus:bg-white transition-all min-h-[44px]"
                    >
                      <option value="Conference">Industry Conference</option>
                      <option value="Summit">Summit / Conclave</option>
                      <option value="Exhibition">Expo / Trade Exhibition</option>
                      <option value="College Fest">College Tech Fest / Symposium</option>
                      <option value="Corporate Gathering">Corporate Gathering</option>
                    </select>
                  </div>
                </div>

                {/* Expected Attendees & Event Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="expectedAttendees"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#111827]/70 mb-1.5"
                    >
                      Expected Attendees *
                    </label>
                    <select
                      id="expectedAttendees"
                      name="expectedAttendees"
                      value={formData.expectedAttendees}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#EAE7E0] text-[#111827] text-sm focus:outline-none focus:ring-2 focus:ring-[#EB3B38] focus:bg-white transition-all min-h-[44px]"
                    >
                      <option value="Under 500">Under 500 attendees</option>
                      <option value="500 - 1,000">500 – 1,000 attendees</option>
                      <option value="1,000 - 3,000">1,000 – 3,000 attendees</option>
                      <option value="3,000 - 10,000">3,000 – 10,000 attendees</option>
                      <option value="10,000+">10,000+ attendees</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="eventDate"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#111827]/70 mb-1.5"
                    >
                      Estimated Event Date
                    </label>
                    <input
                      type="date"
                      id="eventDate"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#EAE7E0] text-[#111827] text-sm focus:outline-none focus:ring-2 focus:ring-[#EB3B38] focus:bg-white transition-all min-h-[44px]"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#111827]/70 mb-1.5"
                  >
                    Event Details &amp; Requirements *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your event agenda, venue location, or specific requirements..."
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#EAE7E0] text-[#111827] text-sm focus:outline-none focus:ring-2 focus:ring-[#EB3B38] focus:bg-white transition-all"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#111827] text-white text-base font-semibold hover:bg-black transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 min-h-[48px] active:scale-[0.99] group"
                >
                  {loading ? (
                    <span>Submitting inquiry...</span>
                  ) : (
                    <>
                      <span>Send inquiry to GetMyEvent</span>
                      <ArrowUpRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
