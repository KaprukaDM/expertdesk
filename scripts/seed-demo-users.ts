/**
 * Seeds two demo sign-in accounts so the two dashboards can be exercised end to end:
 *
 *   Customer  -> role CUSTOMER -> loads /dashboard
 *   Agency    -> role ADMIN    -> loads /admin  (back-office / order fulfilment)
 *
 * Idempotent: re-running upserts the same two users (password re-hashed each run) and
 * ensures each has a wallet. Run with:  npm run db:seed
 */
import "dotenv/config";
import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/prisma";
import { getOrCreateWallet } from "../src/lib/tokens";

type DemoUser = {
  email: string;
  password: string;
  name: string;
  businessName: string;
  role: "CUSTOMER" | "ADMIN";
};

// Credentials come from the environment (.env) so they live in one place; the fallbacks
// keep the script runnable if the vars are unset.
const DEMO_USERS: DemoUser[] = [
  {
    email: process.env.DEMO_CUSTOMER1_EMAIL ?? "customer1@demo.test",
    password: process.env.DEMO_CUSTOMER1_PASSWORD ?? "Customer123!",
    name: "Demo Customer 1",
    businessName: "Demo Customer 1 Co.",
    role: "CUSTOMER",
  },
  {
    email: process.env.DEMO_CUSTOMER2_EMAIL ?? "customer2@demo.test",
    password: process.env.DEMO_CUSTOMER2_PASSWORD ?? "Customer123!",
    name: "Demo Customer 2",
    businessName: "Demo Customer 2 Co.",
    role: "CUSTOMER",
  },
  {
    email: process.env.DEMO_AGENCY_EMAIL ?? "agency@kapruka.com",
    password: process.env.DEMO_AGENCY_PASSWORD ?? "Agency123!",
    name: "Kapruka Agency",
    businessName: "Kapruka Digital Marketing",
    role: "ADMIN",
  },
];

async function main() {
  for (const u of DEMO_USERS) {
    const passwordHash = await bcrypt.hash(u.password, 10);
    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: { passwordHash, name: u.name, businessName: u.businessName, role: u.role },
      create: {
        email: u.email,
        passwordHash,
        name: u.name,
        businessName: u.businessName,
        role: u.role,
      },
    });
    await getOrCreateWallet(user.id);
    console.log(`  ✓ ${u.role.padEnd(8)}  ${u.email}  /  ${u.password}`);
  }

  console.log("\nDone. Log in at /login with either account above.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => process.exit(0));
