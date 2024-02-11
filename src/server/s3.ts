import {
    S3Client
} from "@aws-sdk/client-s3";

import { env } from "@/env";

const bucket_name = env.AWS_BUCKET;
const connector = new S3Client({
    region: env.AWS_REGION,
    credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    },
});

export const s3 = {
    connector,
    bucket_name,
};
