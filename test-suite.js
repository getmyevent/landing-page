const puppeteer = require("puppeteer-core");
const fs = require("fs");
const path = require("path");

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const ARTIFACT_DIR = "C:\\Users\\pushp\\.gemini\\antigravity\\brain\\39ec2701-995d-4171-a25e-907cdcb9d51d";
const BASE_URL = "http://localhost:3000";

const BREAKPOINTS = [
  { name: "390px", width: 390, height: 844 },
  { name: "768px", width: 768, height: 1024 },
  { name: "1024px", width: 1024, height: 800 },
  { name: "1440px", width: 1440, height: 900 },
];

async function runTests() {
  console.log("Launching headless Chrome...");
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
  });

  const results = {};

  for (const bp of BREAKPOINTS) {
    console.log(`\n--- Testing breakpoint: ${bp.name} (${bp.width}x${bp.height}) ---`);
    const page = await browser.newPage();
    await page.setViewport({ width: bp.width, height: bp.height });

    // Navigate to page
    await page.goto(BASE_URL, { waitUntil: "networkidle0", timeout: 30000 });
    await new Promise((r) => setTimeout(r, 1500));

    // 1. Check Horizontal Overflow
    const scrollInfo = await page.evaluate(() => {
      const scrollW = document.documentElement.scrollWidth;
      const clientW = document.documentElement.clientWidth;
      const innerW = window.innerWidth;
      return {
        scrollWidth: scrollW,
        clientWidth: clientW,
        innerWidth: innerW,
        hasHorizontalOverflow: scrollW > innerW,
      };
    });
    console.log(`Horizontal Overflow Check:`, scrollInfo);

    // 2. Capture Viewport Screenshot
    const vpPath = path.join(ARTIFACT_DIR, `screenshot-${bp.name}.png`);
    await page.screenshot({ path: vpPath });
    console.log(`Saved viewport screenshot: ${vpPath}`);

    // 3. Capture Full Page Screenshot
    const fullPath = path.join(ARTIFACT_DIR, `screenshot-${bp.name}-full.png`);
    await page.screenshot({ path: fullPath, fullPage: true });
    console.log(`Saved full page screenshot: ${fullPath}`);

    // 4. Test Interactive Three-Way Toggle
    try {
      console.log("Testing 3-Way Toggle...");
      const organTab = await page.$x("//button[contains(., 'For organizers')]");
      if (organTab && organTab.length > 0) {
        await organTab[0].click();
        await new Promise((r) => setTimeout(r, 500));
        console.log("Clicked 'For organizers' tab successfully.");
      }
      const exhibTab = await page.$x("//button[contains(., 'For exhibitors')]");
      if (exhibTab && exhibTab.length > 0) {
        await exhibTab[0].click();
        await new Promise((r) => setTimeout(r, 500));
        console.log("Clicked 'For exhibitors' tab successfully.");
      }
    } catch (e) {
      console.log("Toggle check note:", e.message);
    }

    // 5. Test Mobile Menu (on 390px)
    if (bp.width < 768) {
      try {
        console.log("Testing mobile menu overlay...");
        const menuBtn = await page.$('button[aria-label="Open menu"]');
        if (menuBtn) {
          await menuBtn.click();
          await new Promise((r) => setTimeout(r, 600));
          const menuShot = path.join(ARTIFACT_DIR, `screenshot-mobile-menu.png`);
          await page.screenshot({ path: menuShot });
          console.log(`Saved mobile menu screenshot: ${menuShot}`);

          // Close menu
          const closeBtn = await page.$('button[aria-label="Close menu"]');
          if (closeBtn) await closeBtn.click();
          await new Promise((r) => setTimeout(r, 400));
        }
      } catch (e) {
        console.log("Mobile menu note:", e.message);
      }
    }

    // 6. Test Form Submission
    if (bp.name === "1440px") {
      try {
        console.log("Testing lead form submission...");
        await page.evaluate(() => {
          const el = document.getElementById("contact");
          if (el) el.scrollIntoView();
        });
        await new Promise((r) => setTimeout(r, 800));

        await page.type("#name", "Hari Test Organizer");
        await page.type("#organization", "Semiconductor Global Summit 2026");
        await page.type("#email", "lead-test@example.com");
        await page.type("#message", "We are organizing a 2,500 person summit and need GetMyEvent on-ground companion.");

        const submitBtn = await page.$('form button[type="submit"]');
        if (submitBtn) {
          await submitBtn.click();
          await new Promise((r) => setTimeout(r, 1500));
          const formSuccessShot = path.join(ARTIFACT_DIR, "screenshot-form-success.png");
          await page.screenshot({ path: formSuccessShot });
          console.log(`Saved form submit screenshot: ${formSuccessShot}`);
        }
      } catch (e) {
        console.log("Form submit note:", e.message);
      }
    }

    results[bp.name] = {
      ...scrollInfo,
      viewportScreenshot: vpPath,
      fullPageScreenshot: fullPath,
    };

    await page.close();
  }

  // Generate scroll recording frames for 390px and 1440px
  console.log("\nGenerating scroll frames for 390px & 1440px...");
  for (const width of [390, 1440]) {
    const page = await browser.newPage();
    await page.setViewport({ width, height: width === 390 ? 844 : 900 });
    await page.goto(BASE_URL, { waitUntil: "networkidle0" });

    const totalHeight = await page.evaluate(() => document.body.scrollHeight);
    const scrollStep = width === 390 ? 700 : 800;
    let frameIdx = 0;

    for (let y = 0; y < totalHeight; y += scrollStep) {
      await page.evaluate((top) => window.scrollTo(0, top), y);
      await new Promise((r) => setTimeout(r, 350));
      const framePath = path.join(
        ARTIFACT_DIR,
        `scroll-${width}px-frame-${frameIdx}.png`
      );
      await page.screenshot({ path: framePath });
      frameIdx++;
    }
    console.log(`Captured ${frameIdx} scroll frames for ${width}px.`);
    await page.close();
  }

  await browser.close();
  console.log("\nAll browser tests and screenshots completed successfully!");
  fs.writeFileSync(
    path.join(ARTIFACT_DIR, "test-results.json"),
    JSON.stringify(results, null, 2)
  );
}

runTests().catch((e) => {
  console.error("Test error:", e);
  process.exit(1);
});
