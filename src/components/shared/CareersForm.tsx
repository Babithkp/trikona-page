"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FileText, Send, Upload, X } from "lucide-react";

import { Field } from "@/components/ui/Field";
import { Button } from "@/components/ui/button";
import { submitToWeb3Forms } from "@/lib/forms";
import { site } from "@/lib/site";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  experience: string;
  portfolio: string;
  workType: string;
  note: string;
};

const MAX_BYTES = 8 * 1024 * 1024;
const ACCEPTED = ".pdf,.doc,.docx";

/**
 * Uploads the resume to S3 via a short-lived presigned POST, then submits the
 * application with a link to it.
 *
 * If uploads are not configured on the server, we say so plainly and let the
 * candidate apply with a portfolio link instead — rather than accepting the
 * file and dropping it, which is what happened before.
 */
async function uploadResume(file: File): Promise<string> {
  const presignResponse = await fetch("/api/resume", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contentType: file.type }),
  });

  if (!presignResponse.ok) {
    const { error } = await presignResponse.json().catch(() => ({ error: "" }));
    throw new Error(error || "Resume upload is unavailable right now.");
  }

  const { url, fields, fileUrl } = await presignResponse.json();

  const body = new FormData();
  Object.entries(fields as Record<string, string>).forEach(([key, value]) =>
    body.append(key, value),
  );
  body.append("file", file);

  const uploadResponse = await fetch(url, { method: "POST", body });
  if (!uploadResponse.ok) throw new Error("We couldn't upload that file.");

  return fileUrl as string;
}

export default function CareersForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [file, setFile] = React.useState<File | null>(null);
  const [fileError, setFileError] = React.useState<string>();
  const [status, setStatus] = React.useState("");
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0];
    setFileError(undefined);

    if (!selected) {
      setFile(null);
      return;
    }

    if (selected.size > MAX_BYTES) {
      setFileError("That file is larger than 8 MB. Please upload a smaller one.");
      setFile(null);
      event.target.value = "";
      return;
    }

    setFile(selected);
  };

  const clearFile = () => {
    setFile(null);
    setFileError(undefined);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setStatus("Sending your application…");

    let resumeUrl = "";

    if (file) {
      try {
        setStatus("Uploading your resume…");
        resumeUrl = await uploadResume(file);
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "We couldn't upload your resume.";
        setFileError(
          `${message} You can still apply — add a link to your resume below, or email it to ${site.email}.`,
        );
        setStatus("");
        setIsSubmitting(false);
        return;
      }
    }

    const result = await submitToWeb3Forms({
      subject: `Job application — ${data.role || "General"} — ${data.firstName} ${data.lastName}`.trim(),
      ...data,
      resumeUrl: resumeUrl || "Not attached",
    });

    if (result.ok) {
      reset();
      clearFile();
      setStatus("Thanks for applying — we'll be in touch if there's a fit.");
      toast.success("Application received. Thanks for applying!");
    } else {
      setStatus(result.message);
      toast.error(result.message);
    }

    setIsSubmitting(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-5"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          name="firstName"
          label="First name"
          required
          error={errors.firstName ? "Please enter your first name." : undefined}
        >
          {(props) => (
            <input
              {...props}
              type="text"
              autoComplete="given-name"
              {...register("firstName", { required: true })}
            />
          )}
        </Field>

        <Field name="lastName" label="Last name">
          {(props) => (
            <input
              {...props}
              type="text"
              autoComplete="family-name"
              {...register("lastName")}
            />
          )}
        </Field>

        <Field
          name="email"
          label="Email"
          required
          error={
            errors.email?.type === "pattern"
              ? "Please enter a valid email address."
              : errors.email
                ? "Please enter your email address."
                : undefined
          }
        >
          {(props) => (
            <input
              {...props}
              type="email"
              inputMode="email"
              autoComplete="email"
              {...register("email", {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
              })}
            />
          )}
        </Field>

        <Field
          name="role"
          label="Role you're applying for"
          required
          error={errors.role ? "Please tell us which role." : undefined}
        >
          {(props) => (
            <input {...props} type="text" {...register("role", { required: true })} />
          )}
        </Field>

        <Field
          name="experience"
          label="Years of experience"
          required
          error={errors.experience ? "Please add your experience." : undefined}
        >
          {(props) => (
            <input
              {...props}
              type="text"
              {...register("experience", { required: true })}
            />
          )}
        </Field>

        <Field name="workType" label="Preferred work type">
          {(props) => (
            <select {...props} {...register("workType")} defaultValue="">
              <option value="">Select an option</option>
              <option>Full-time</option>
              <option>Internship</option>
              <option>Contract</option>
              <option>Freelance</option>
            </select>
          )}
        </Field>
      </div>

      <Field
        name="portfolio"
        label="Portfolio, LinkedIn or resume link"
        hint="A link to your work tells us more than a CV ever will."
      >
        {(props) => (
          <input
            {...props}
            type="url"
            inputMode="url"
            placeholder="https://"
            {...register("portfolio")}
          />
        )}
      </Field>

      {/* Resume upload */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-ink-2">
          Resume
          <span className="ml-1.5 text-xs font-normal text-ink-4">
            (optional — PDF, DOC or DOCX, up to 8 MB)
          </span>
        </span>

        {file ? (
          <div className="flex items-center justify-between gap-4 rounded-lg border border-line-2 bg-surface-2 px-4 py-3">
            <span className="flex min-w-0 items-center gap-3 text-sm text-ink">
              <FileText aria-hidden="true" className="size-4 shrink-0 text-brand" />
              <span className="truncate">{file.name}</span>
            </span>
            <button
              type="button"
              onClick={clearFile}
              className="shrink-0 rounded-md p-1 text-ink-4 transition-colors hover:bg-surface-3 hover:text-ink"
              aria-label={`Remove ${file.name}`}
            >
              <X className="size-4" />
            </button>
          </div>
        ) : (
          <label
            htmlFor="resume"
            className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-line-2 bg-surface-2 px-4 py-8 text-center transition-colors hover:border-brand-400 hover:bg-brand-50"
          >
            <Upload aria-hidden="true" className="size-5 text-ink-4" />
            <span className="text-sm font-medium text-ink-2">
              Choose a file
            </span>
            <span className="text-xs text-ink-4">PDF, DOC or DOCX</span>
          </label>
        )}

        <input
          ref={fileInputRef}
          id="resume"
          type="file"
          accept={ACCEPTED}
          onChange={onFileChange}
          aria-describedby={fileError ? "resume-error" : undefined}
          aria-invalid={Boolean(fileError)}
          className="sr-only"
        />

        {fileError ? (
          <p id="resume-error" className="text-xs font-medium text-red-600">
            {fileError}
          </p>
        ) : null}
      </div>

      <Field name="note" label="Anything else we should know?">
        {(props) => (
          <textarea
            {...props}
            rows={4}
            className={`${props.className} resize-y`}
            {...register("note")}
          />
        )}
      </Field>

      <Button
        type="submit"
        variant="gradient"
        size="lg"
        disabled={isSubmitting}
        className="mt-1 w-full sm:w-auto sm:self-start"
      >
        {isSubmitting ? "Sending…" : "Submit application"}
        {isSubmitting ? null : <Send />}
      </Button>

      <p role="status" aria-live="polite" className="min-h-5 text-sm text-ink-3">
        {status}
      </p>
    </form>
  );
}
