import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Basic in-memory rate limiting map
// key: IP address, value: array of timestamps (ms)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5; // max 5 requests per minute per IP

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  // Filter out timestamps outside the window
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  recent.push(now);
  rateLimitMap.set(ip, recent);
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a minute before trying again." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const {
      name,
      organization,
      email,
      eventType,
      expectedAttendees,
      eventDate,
      message,
      // Honeypot field
      botField,
    } = body;

    // Honeypot detection
    if (botField) {
      // Return 200 silently so bots don't know they were caught
      return NextResponse.json({ success: true, message: "Inquiry received." });
    }

    // Server-side validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Please enter your full name." },
        { status: 400 }
      );
    }

    if (!organization || typeof organization !== "string" || organization.trim().length === 0) {
      return NextResponse.json(
        { error: "Please enter your organization or summit name." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!eventType || typeof eventType !== "string") {
      return NextResponse.json(
        { error: "Please select an event type." },
        { status: 400 }
      );
    }

    if (!expectedAttendees || typeof expectedAttendees !== "string") {
      return NextResponse.json(
        { error: "Please specify the expected number of attendees." },
        { status: 400 }
      );
    }

    if (!eventDate || typeof eventDate !== "string" || eventDate.trim().length === 0) {
      return NextResponse.json(
        { error: "Please select an estimated event date." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json(
        { error: "Please enter a brief message (minimum 5 characters)." },
        { status: 400 }
      );
    }

    const safeName = escapeHtml(name.trim());
    const safeOrg = escapeHtml(organization.trim());
    const safeEmail = escapeHtml(email.trim());
    const safeEventType = escapeHtml(eventType.trim());
    const safeAttendees = escapeHtml(expectedAttendees.trim());
    const safeDate = escapeHtml(String(eventDate).trim());
    const safeMessage = escapeHtml(message.trim());

    const recipientEmail =
      process.env.CONTACT_NOTIFICATION_EMAIL || "getmyevent.work@gmail.com";
    const apiKey = process.env.RESEND_API_KEY;

    if (apiKey) {
      // If Resend API key is provided, send via Resend
      const fromEmail =
        process.env.RESEND_FROM_EMAIL ||
        "GetMyEvent Inquiries <onboarding@resend.dev>";
      const resend = new Resend(apiKey);
      const { error: sendError } = await resend.emails.send({
        from: fromEmail,
        to: [recipientEmail],
        replyTo: safeEmail,
        subject: `New Event Inquiry: ${safeOrg} (${safeEventType})`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #111827; max-width: 600px; margin: 0 auto; padding: 24px;">
            <div style="border-bottom: 2px solid #EB3B38; padding-bottom: 12px; margin-bottom: 20px;">
              <h2 style="color: #EB3B38; margin: 0; font-size: 22px;">GetMyEvent — New Event Lead</h2>
            </div>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr>
                <td style="padding: 8px 0; font-weight: 600; width: 160px; color: #4B5563;">Organizer Name:</td>
                <td style="padding: 8px 0; font-weight: 500;">${safeName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #4B5563;">Organization:</td>
                <td style="padding: 8px 0; font-weight: 500;">${safeOrg}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #4B5563;">Email:</td>
                <td style="padding: 8px 0; font-weight: 500;"><a href="mailto:${safeEmail}">${safeEmail}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #4B5563;">Event Type:</td>
                <td style="padding: 8px 0; font-weight: 500;">${safeEventType}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #4B5563;">Expected Attendees:</td>
                <td style="padding: 8px 0; font-weight: 500;">${safeAttendees}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #4B5563;">Event Date:</td>
                <td style="padding: 8px 0; font-weight: 500;">${safeDate}</td>
              </tr>
            </table>
            <div style="background-color: #FAF8F5; border: 1px solid #EAE7E0; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
              <h4 style="margin: 0 0 8px 0; color: #111827; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">Message / Requirements:</h4>
              <p style="margin: 0; white-space: pre-wrap; font-size: 15px; line-height: 1.6; color: #374151;">${safeMessage}</p>
            </div>
            <p style="font-size: 12px; color: #9CA3AF; margin-top: 32px; border-top: 1px solid #E5E7EB; padding-top: 12px;">
              Sent automatically from the GetMyEvent Landing Page (getmyevent.in)
            </p>
          </div>
        `,
      });

      if (sendError) {
        console.error("Resend delivery error:", sendError);
        return NextResponse.json(
          {
            error:
              "Could not forward your inquiry right now. Please email getmyevent.work@gmail.com directly.",
          },
          { status: 502 }
        );
      }
    } else {
      // Forward via FormSubmit (zero Vercel dashboard / zero API key required)
      const formSubmitRes = await fetch(
        `https://formsubmit.co/ajax/${recipientEmail}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            _subject: `New Event Inquiry: ${safeOrg} (${safeEventType})`,
            _replyto: safeEmail,
            _template: "table",
            _captcha: "false",
            "Organizer Name": safeName,
            "Organization / Summit": safeOrg,
            "Email Address": safeEmail,
            "Event Type": safeEventType,
            "Expected Attendees": safeAttendees,
            "Estimated Event Date": safeDate,
            "Event Details & Requirements": safeMessage,
          }),
        }
      );

      const formSubmitData = await formSubmitRes.json().catch(() => null);

      if (!formSubmitRes.ok) {
        console.error("FormSubmit delivery error:", formSubmitData);
        return NextResponse.json(
          {
            error:
              "Could not forward your inquiry right now. Please reach out to getmyevent.work@gmail.com directly.",
          },
          { status: 502 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: "Thank you! Our team will get in touch with you shortly.",
    });
  } catch (err: unknown) {
    console.error("Lead API error:", err);
    return NextResponse.json(
      { error: "An error occurred while submitting. Please try again or reach out at getmyevent.work@gmail.com." },
      { status: 500 }
    );
  }
}
