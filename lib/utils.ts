import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const stream2Buffer = (dataStream: any): Promise<Buffer> =>
  new Promise((resolve, reject) => {
    const chunks: any = [];
    dataStream.on("data", (chunk: any) => chunks.push(chunk));
    dataStream.on("end", () => resolve(Buffer.concat(chunks)));
    dataStream.on("error", reject);
  });
