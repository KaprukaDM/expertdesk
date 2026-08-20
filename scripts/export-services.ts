// Exports the service catalog (services × Basic/Standard/Premium packages, tokens, delivery,
// features) from src/lib/services.ts to a multi-sheet .xlsx. Source of truth is the config
// file, not the database — the catalog is static app config. Run: npm run services:export
import * as XLSX from "xlsx";
import { writeFileSync } from "node:fs";
import { listServices } from "@/lib/services";

async function main() {
  const SERVICES = await listServices();

  // One row per (service × package tier) — the natural grain for a pricing/scope sheet.
  const packageRows = SERVICES.flatMap((service) =>
    service.packages.map((pkg) => ({
      Service: service.name,
      Slug: service.slug,
      Package: pkg.name,
      Tagline: pkg.tagline ?? "",
      Price: pkg.price,
      Tokens: pkg.tokenCost,
      Delivery: pkg.delivery,
      "Delivery days": pkg.deliveryDays,
      Revisions: pkg.revisions,
      "Features count": pkg.features.length,
      Features: pkg.features.join("\n"),
    })),
  );

  // One row per service — quick catalog overview.
  const serviceRows = SERVICES.map((service) => ({
    Service: service.name,
    Slug: service.slug,
    Blurb: service.blurb,
    Basic: service.packages[0].tokenCost,
    Standard: service.packages[1].tokenCost,
    Premium: service.packages[2].tokenCost,
  }));

  const workbook = XLSX.utils.book_new();

  const pkgSheet = XLSX.utils.json_to_sheet(packageRows);
  pkgSheet["!cols"] = [
    { wch: 18 }, // Service
    { wch: 16 }, // Slug
    { wch: 10 }, // Package
    { wch: 40 }, // Tagline
    { wch: 14 }, // Price
    { wch: 8 }, // Tokens
    { wch: 16 }, // Delivery
    { wch: 12 }, // Delivery days
    { wch: 18 }, // Revisions
    { wch: 12 }, // Features count
    { wch: 70 }, // Features
  ];
  XLSX.utils.book_append_sheet(workbook, pkgSheet, "Packages");

  const svcSheet = XLSX.utils.json_to_sheet(serviceRows);
  svcSheet["!cols"] = [{ wch: 18 }, { wch: 16 }, { wch: 55 }, { wch: 8 }, { wch: 10 }, { wch: 10 }];
  XLSX.utils.book_append_sheet(workbook, svcSheet, "Services");

  const outPath = "services-catalog.xlsx";
  writeFileSync(outPath, XLSX.write(workbook, { type: "buffer", bookType: "xlsx" }));
  console.log(
    `Exported ${SERVICES.length} services / ${packageRows.length} packages to ${outPath}`,
  );
}

main();
