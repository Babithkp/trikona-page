import { randomUUID } from "node:crypto";
import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { NextResponse } from "next/server";

const BUCKET = "trikona-bucket";
const REGION = "ap-south-1";
const MAX_BYTES = 8 * 1024 * 1024;

const ALLOWED_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

const EXTENSIONS: Record<string, string> = {
  "application/pdf": "pdf",
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "docx",
};

/**
 * Issues a short-lived presigned POST so a candidate's resume can be uploaded
 * straight to S3 from the browser.
 *
 * The previous careers form captured the chosen file in React state and never
 * sent it anywhere, so every resume was silently discarded on submit.
 *
 * The key is server-generated (never taken from the client filename), the
 * content type is allow-listed, and the policy caps the upload size — so this
 * endpoint cannot be used to write arbitrary objects into the bucket.
 */
export async function POST(request: Request) {
  const { accessKeyId, secretAccessKey } = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  };

  if (!accessKeyId || !secretAccessKey) {
    return NextResponse.json(
      { error: "Resume uploads are not configured." },
      { status: 503 },
    );
  }

  let contentType: unknown;
  try {
    ({ contentType } = await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (typeof contentType !== "string" || !ALLOWED_TYPES.has(contentType)) {
    return NextResponse.json(
      { error: "Please upload a PDF, DOC or DOCX file." },
      { status: 415 },
    );
  }

  const client = new S3Client({
    region: REGION,
    credentials: { accessKeyId, secretAccessKey },
  });

  const key = `resumes/${randomUUID()}.${EXTENSIONS[contentType]}`;

  const presigned = await createPresignedPost(client, {
    Bucket: BUCKET,
    Key: key,
    Conditions: [
      ["content-length-range", 1, MAX_BYTES],
      ["eq", "$Content-Type", contentType],
    ],
    Fields: { "Content-Type": contentType },
    Expires: 120,
  });

  return NextResponse.json({
    url: presigned.url,
    fields: presigned.fields,
    fileUrl: `https://${BUCKET}.s3.${REGION}.amazonaws.com/${key}`,
  });
}
