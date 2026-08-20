// Generates branded illustration thumbnails for the popular-services cards via the OpenAI
// Images API and saves them to public/services/<slug>.png. Run all, or pass slugs to limit:
//   npx tsx scripts/gen-service-images.ts            (all)
//   npx tsx scripts/gen-service-images.ts seo        (one)
import "dotenv/config";
import { writeFileSync, mkdirSync } from "node:fs";

const KEY = process.env.OPEN_AI_KEY || process.env.OPENAI_API_KEY;
if (!KEY) {
  console.error("No OpenAI key found (OPEN_AI_KEY).");
  process.exit(1);
}

// Shared style keeps all cards reading as one branded set.
const STYLE =
  "Minimalist soft 3D isometric illustration, one clean centered object, brand palette of deep teal #002D2D and fresh green #008060 / #95BF47 accents, on a plain very light grey studio background, soft diffused lighting with a subtle shadow, premium modern glossy app-icon aesthetic, no text, no words, no letters.";

const SUBJECTS: Record<string, string> = {
  seo: "a magnifying glass over an upward-trending bar chart",
  "google-ads": "a target bullseye with a rising arrow hitting the centre",
  "meta-ads": "a smartphone showing a social feed ad with a small megaphone",
  "video-editing": "a video editing timeline with a play button on a filmstrip",
  "graphic-design": "an artist's colour palette with a design pen tool",
  "motion-graphics": "playful floating geometric shapes with motion trails",
  "content-strategy": "a content calendar with a pen and a document",
  geo: "a glowing AI chat bubble with a sparkle and a small magnifier",
  cro: "a conversion funnel with an upward arrow and a click cursor",
  "video-creation": "a film clapperboard with a play button and a small camera",
  "social-media-management": "a smartphone with a social profile grid and a small chat bubble with a heart icon",
  "ai-chatbot": "a chat bubble with a small robot face and a sparkle, next to a smartphone",
  "website-development": "a browser window with a code bracket symbol and a small gear",
};

const slugs = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(SUBJECTS);

async function gen(slug: string, model: string) {
  const prompt = `${SUBJECTS[slug]}. ${STYLE}`;
  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model, prompt, size: "1024x1024", n: 1, quality: model === "gpt-image-1" ? "medium" : undefined, response_format: model === "dall-e-3" ? "b64_json" : undefined }),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`${res.status} ${t.slice(0, 400)}`);
  }
  const data = await res.json();
  const b64 = data.data[0].b64_json as string;
  writeFileSync(`public/services/${slug}.png`, Buffer.from(b64, "base64"));
  console.log(`  ✓ ${slug}.png  (${Math.round((b64.length * 0.75) / 1024)}KB)`);
}

async function main() {
  mkdirSync("public/services", { recursive: true });
  for (const slug of slugs) {
    if (!SUBJECTS[slug]) {
      console.error(`  ✗ ${slug}: no subject defined`);
      continue;
    }
    try {
      await gen(slug, "gpt-image-1");
    } catch (e) {
      // Fall back to dall-e-3 if gpt-image-1 is unavailable for this account.
      const msg = (e as Error).message;
      console.error(`  gpt-image-1 failed for ${slug} (${msg.slice(0, 120)}) — trying dall-e-3`);
      try {
        await gen(slug, "dall-e-3");
      } catch (e2) {
        console.error(`  ✗ ${slug}: ${(e2 as Error).message.slice(0, 200)}`);
      }
    }
  }
}

main();
