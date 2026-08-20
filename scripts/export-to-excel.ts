// Dumps the local SQLite dev database to a multi-sheet .xlsx file for easy browsing.
// Write-only (exports our own trusted DB data) — never parses untrusted spreadsheets,
// so xlsx's known parsing-related CVEs don't apply to this usage.
import "dotenv/config";
import * as XLSX from "xlsx";
import { writeFileSync } from "node:fs";
import { prisma } from "@/lib/prisma";

function flattenJson(rows: Record<string, unknown>[]): Record<string, unknown>[] {
  return rows.map((row) => {
    const flat: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(row)) {
      flat[key] =
        value !== null && typeof value === "object" && !(value instanceof Date)
          ? JSON.stringify(value)
          : value;
    }
    return flat;
  });
}

async function main() {
  const [users, businessProfiles, wallets, tokenTransactions, audits, findings] = await Promise.all([
    prisma.user.findMany({ omit: { passwordHash: true } }),
    prisma.businessProfile.findMany({ omit: { researchRaw: true } }),
    prisma.wallet.findMany(),
    prisma.tokenTransaction.findMany(),
    prisma.audit.findMany({ omit: { rawAgentOutput: true } }),
    prisma.finding.findMany(),
  ]);

  const workbook = XLSX.utils.book_new();
  const sheets: [string, Record<string, unknown>[]][] = [
    ["Users", users],
    ["BusinessProfiles", businessProfiles],
    ["Wallets", wallets],
    ["TokenTransactions", tokenTransactions],
    ["Audits", audits],
    ["Findings", findings],
  ];

  for (const [name, rows] of sheets) {
    const sheet = XLSX.utils.json_to_sheet(flattenJson(rows));
    XLSX.utils.book_append_sheet(workbook, sheet, name);
  }

  const outPath = "data-export.xlsx";
  writeFileSync(outPath, XLSX.write(workbook, { type: "buffer", bookType: "xlsx" }));
  console.log(`Exported ${sheets.map(([n, r]) => `${n} (${r.length})`).join(", ")} to ${outPath}`);
}

main().then(() => prisma.$disconnect());
