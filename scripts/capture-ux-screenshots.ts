// Captures desktop + mobile screenshots of a page for the cro-ux-reviewer agent, so the UX
// Review is judged from what a visitor actually sees, not just the HTML/CSS source.
//   npx tsx scripts/capture-ux-screenshots.ts <url> [outputDir]
import { mkdirSync } from "node:fs";
import { chromium } from "playwright";

const VIEWPORTS = {
  desktop: { width: 1920, height: 1080 },
  mobile: { width: 375, height: 812 }, // iPhone-class viewport
};

async function main() {
  const url = process.argv[2];
  const outputDir = process.argv[3] ?? "screenshots";
  if (!url) {
    console.error("Usage: npx tsx scripts/capture-ux-screenshots.ts <url> [outputDir]");
    process.exit(1);
  }

  mkdirSync(outputDir, { recursive: true });

  const browser = await chromium.launch();
  const report: Record<string, unknown> = { url };

  for (const [device, viewport] of Object.entries(VIEWPORTS)) {
    const page = await browser.newPage({ viewport });
    await page.goto(url, { waitUntil: "networkidle" });

    const path = `${outputDir}/${device}.png`;
    await page.screenshot({ path, fullPage: true });

    const { scrollWidth, clientWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));

    report[device] = {
      screenshot: path,
      hasHorizontalScroll: scrollWidth > clientWidth,
      scrollWidth,
      viewportWidth: clientWidth,
    };

    await page.close();
  }

  await browser.close();
  console.log(JSON.stringify(report, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
