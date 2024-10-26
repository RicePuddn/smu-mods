import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { env } from "@/env";

import { createTRPCRouter, publicProcedure } from "../trpc";

const s3Client = new S3Client({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});

const ALLOWED_MIME_TYPES = [
  "image/jpeg", // JPG
  "image/png", // PNG
  "image/gif", // GIF
  "application/pdf", // PDF
  "application/msword", // DOC
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
];

export const s3Router = createTRPCRouter({
  upload: publicProcedure
    .input(z.object({ key: z.string(), type: z.string() }))
    .mutation(async ({ input }) => {
      if (!ALLOWED_MIME_TYPES.includes(input.type)) {
        throw new TRPCError({
          message: "Invalid file type",
          code: "BAD_REQUEST",
        });
      }
      const command = new PutObjectCommand({
        Bucket: env.AWS_S3_BUCKET_NAME,
        Key: input.key,
        ContentType: input.type,
      });
      const signedUrl = await getSignedUrl(s3Client, command, {
        expiresIn: 60,
      });
      const srcUrl = await getFile(input.key);
      return {
        signedUrl,
        srcUrl,
        key: input.key,
      };
    }),
});

export async function getFile(key: string) {
  const command = new GetObjectCommand({
    Bucket: env.AWS_S3_BUCKET_NAME,
    Key: key,
  });

  const signedUrl = await getSignedUrl(s3Client, command, {
    expiresIn: 60,
  });

  return signedUrl;
}

export async function deleteImage(bucketKey: string) {
  const command = new DeleteObjectCommand({
    Bucket: env.AWS_S3_BUCKET_NAME,
    Key: bucketKey,
  });
  const tmp = await s3Client.send(command);
  if (tmp.$metadata.httpStatusCode !== 204) {
    return false;
  }
  return true;
}
