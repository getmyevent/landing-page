const puppeteer = require('puppeteer-core');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\pushp\\.gemini\\antigravity\\brain\\39ec2701-995d-4171-a25e-907cdcb9d51d';

const viewports = [
  { width: 375, height: 812, name: 'team-375px-mobile' },
  { width: 768, height: 1024, name: 'team-768px-tablet' },
  { width: 1280, height: 900, name: 'team-1280px-desktop' }
];

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  for (const vp of viewports) {
    const page = await browser.newPage();
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    
    // Scroll so that #team is fully in view with its eyebrow header
    await page.evaluate(() => {
      const el = document.getElementById('team');
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'instant' });
      }
    });
    await new Promise(r => setTimeout(r, 800));

    const teamEl = await page.$('#team');
    if (teamEl) {
      await teamEl.screenshot({ path: path.join(ARTIFACT_DIR, vp.name + '.png') });
      console.log('Saved ' + vp.name + '.png');
    }

    if (vp.width === 1280) {
      // Test hover on first card
      const firstCard = await page.$('#team .group');
      if (firstCard) {
        await firstCard.hover();
        await new Promise(r => setTimeout(r, 600));
        await teamEl.screenshot({ path: path.join(ARTIFACT_DIR, 'team-1280px-hover.png') });
        console.log('Saved team-1280px-hover.png');
      }
    }

    await page.close();
  }

  await browser.close();
  console.log('All team screenshots refreshed successfully!');
})();
