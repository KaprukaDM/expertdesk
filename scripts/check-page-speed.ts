// Lightweight load-speed check for the cro-sins-auditor agent (Basic tier) — a plain fetch
// timing check, not full browser automation, since Basic is meant to stay fast and cheap.
//   npx tsx scripts/check-page-speed.ts <url>
async function main() {
  const url = process.argv[2];
  if (!url) {
    console.error("Usage: npx tsx scripts/check-page-speed.ts <url>");
    process.exit(1);
  }

  const start = performance.now();
  const res = await fetch(url);
  const body = await res.text();
  const totalMs = Math.round(performance.now() - start);

  console.log(
    JSON.stringify(
      {
        url,
        status: res.status,
        totalMs,
        sizeKB: Math.round(Buffer.byteLength(body, "utf8") / 1024),
        // Rough, not a Core Web Vitals substitute — flags an obviously heavy/slow response,
        // not render performance. cro-tracking-auditor/CWV tooling covers deeper perf work.
        flag: totalMs > 3000 ? "slow" : totalMs > 1500 ? "borderline" : "fine",
      },
      null,
      2,
    ),
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
