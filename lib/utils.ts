import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Readable } from "stream";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

export const stream2Buffer = (dataStream: Readable): Promise<Buffer> =>
  new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    dataStream.on("data", (chunk: Buffer) => chunks.push(chunk));
    dataStream.on("end", () => resolve(Buffer.concat(chunks)));
    dataStream.on("error", reject);
  });
