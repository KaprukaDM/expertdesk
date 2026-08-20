// Plain constants only — no server-only imports (Prisma etc.) so this is safe to import
// from client components too.

export const SIGNUP_BONUS_TOKENS = 100;

export interface TopupPackage {
  tokens: number;
  priceLkr: number;
  saveLabel?: string;
}

export const TOPUP_PACKAGES: TopupPackage[] = [
  { tokens: 100, priceLkr: 1000 },
  { tokens: 500, priceLkr: 4800, saveLabel: "Save 4%" },
  { tokens: 1000, priceLkr: 9000, saveLabel: "Save 10%" },
];

// List-price rate (smallest top-up bundle, no bulk discount) — used only to give a first-time
// visitor a sense of scale before they've topped up. Real pricing for a request is whatever the
// tailored proposal states.
const TOKEN_LKR_RATE = TOPUP_PACKAGES[0].priceLkr / TOPUP_PACKAGES[0].tokens;

export function estimateLkr(tokens: number): string {
  return `Rs ${Math.round(tokens * TOKEN_LKR_RATE).toLocaleString("en-LK")}`;
}
