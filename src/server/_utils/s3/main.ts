import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { env } from "@/env";

const s3Client = new S3Client({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});

export const genPresignedUrl = async (
  key: string | undefined,
): Promise<string> => {
  const command = new GetObjectCommand({
    Bucket: env.AWS_BUCKET,
    Key: key,
  });

  const url = await getSignedUrl(s3Client, command, {
    expiresIn: 7200,
  });

  return url;
};

export const uploadImage = async (fileName: string) => {
  const { url, fields } = await createPresignedPost(s3Client, {
    Bucket: env.AWS_BUCKET,
    Key: fileName,
    Conditions: [
      { bucket: env.AWS_BUCKET },
      ["starts-with", "$Content-Type", "image/"],
    ],
    Expires: 600,
  });

  return { url, fields };
};
