import { join } from "node:path";
import { mkdir, writeFile, readFile } from "node:fs/promises";

const STORAGE_ROOT = join(process.cwd(), "storage", "reports");

export async function saveReportFile(orderId: string, fileName: string, buffer: Buffer) {
  const dir = join(STORAGE_ROOT, orderId);
  await mkdir(dir, { recursive: true });
  const path = join(dir, fileName);
  await writeFile(path, buffer);
  return path;
}

export async function readReportFile(path: string) {
  return readFile(path);
}
