import { join } from "node:path";
import { mkdir, writeFile, readFile } from "node:fs/promises";

const STORAGE_ROOT = join(process.cwd(), "storage", "briefs");

export async function saveBriefFile(requestId: string, fileName: string, buffer: Buffer) {
  const dir = join(STORAGE_ROOT, requestId);
  await mkdir(dir, { recursive: true });
  const path = join(dir, fileName);
  await writeFile(path, buffer);
  return path;
}

export async function readBriefFile(path: string) {
  return readFile(path);
}
