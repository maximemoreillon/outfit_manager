import { Client } from "minio";

export const {
  S3_ENDPOINT = "play.min.io",
  S3_PORT = "9000",
  S3_USE_SSL = "true",
  S3_ACCESS_KEY = "",
  S3_SECRET_KEY = "",
  S3_BUCKET = "wardrobe-manager",
} = process.env;

export const s3Client = new Client({
  endPoint: S3_ENDPOINT,
  port: Number(S3_PORT),
  useSSL: S3_USE_SSL === "true",
  accessKey: S3_ACCESS_KEY,
  secretKey: S3_SECRET_KEY,
});
