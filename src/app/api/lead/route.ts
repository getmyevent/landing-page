import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Basic in-memory rate limiting map
// key: IP address, value: array of timestamps (ms)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5; // max 5 requests per minute per IP

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

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json(
        { error: "Please enter a brief message (minimum 5 characters)." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const recipientEmail =
      process.env.CONTACT_NOTIFICATION_EMAIL || "getmyevent.work@gmail.com";

    if (apiKey) {
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: "GetMyEvent Inquiries <notifications@getmyevent.in>",
        to: [recipientEmail],
        replyTo: email,
        subject: `New Event Inquiry: ${organization} (${eventType})`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #111827; max-width: 600px; margin: 0 auto; padding: 24px;">
            <div style="border-bottom: 2px solid #EB3B38; padding-bottom: 12px; margin-bottom: 20px;">
              <h2 style="color: #EB3B38; margin: 0; font-size: 22px;">GetMyEvent — New Event Lead</h2>
            </div>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr>
                <td style="padding: 8px 0; font-weight: 600; width: 160px; color: #4B5563;">Organizer Name:</td>
                <td style="padding: 8px 0; font-weight: 500;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #4B5563;">Organization:</td>
                <td style="padding: 8px 0; font-weight: 500;">${organization}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #4B5563;">Email:</td>
                <td style="padding: 8px 0; font-weight: 500;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #4B5563;">Event Type:</td>
                <td style="padding: 8px 0; font-weight: 500;">${eventType}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #4B5563;">Expected Attendees:</td>
                <td style="padding: 8px 0; font-weight: 500;">${expectedAttendees}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #4B5563;">Event Date:</td>
                <td style="padding: 8px 0; font-weight: 500;">${eventDate || "Not specified"}</td>
              </tr>
            </table>
            <div style="background-color: #FAF8F5; border: 1px solid #EAE7E0; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
              <h4 style="margin: 0 0 8px 0; color: #111827; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">Message / Requirements:</h4>
              <p style="margin: 0; white-space: pre-wrap; font-size: 15px; line-height: 1.6; color: #374151;">${message}</p>
            </div>
            <p style="font-size: 12px; color: #9CA3AF; margin-top: 32px; border-top: 1px solid #E5E7EB; padding-top: 12px;">
              Sent automatically from the GetMyEvent Landing Page (getmyevent.in)
            </p>
          </div>
        `,
      });
    } else {
      console.log(
        "[DEV NOTE] Resend API key not configured in .env.local. Received lead:",
        { name, organization, email, eventType, expectedAttendees, eventDate, message }
      );
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
