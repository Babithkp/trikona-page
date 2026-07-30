"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Send } from "lucide-react";

import { Field } from "@/components/ui/Field";
import { Button } from "@/components/ui/button";
import { submitToWeb3Forms } from "@/lib/forms";

type FormData = {
  firstName: string;
  lastName: string;
  contactNumber: string;
  email: string;
  budget: string;
  message: string;
};

const budgets = [
  "Not sure yet",
  "Under ₹1,00,000",
  "₹1,00,000 – ₹5,00,000",
  "₹5,00,000 – ₹15,00,000",
  "₹15,00,000+",
];

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  // Mirrored into a live region so screen reader users hear the outcome —
  // toasts alone are announced inconsistently.
  const [status, setStatus] = React.useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setStatus("Sending your message…");

    const result = await submitToWeb3Forms({
      subject: `New enquiry from ${data.firstName} ${data.lastName}`.trim(),
      ...data,
    });

    if (result.ok) {
      reset();
      setStatus("Thanks — your message is on its way. We'll reply within two working days.");
      toast.success("Thanks for reaching out! We'll get back to you shortly.");
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

        <Field name="contactNumber" label="Phone">
          {(props) => (
            <input
              {...props}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              {...register("contactNumber")}
            />
          )}
        </Field>
      </div>

      <Field name="budget" label="Approximate budget">
        {(props) => (
          <select {...props} {...register("budget")} defaultValue="">
            <option value="">Select a range</option>
            {budgets.map((budget) => (
              <option key={budget} value={budget}>
                {budget}
              </option>
            ))}
          </select>
        )}
      </Field>

      <Field
        name="message"
        label="What are you building?"
        required
        hint="A couple of sentences is plenty — what the product is, and what problem it solves."
        error={errors.message ? "Please tell us a little about the project." : undefined}
      >
        {(props) => (
          <textarea
            {...props}
            rows={5}
            className={`${props.className} resize-y`}
            {...register("message", { required: true, minLength: 10 })}
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
        {isSubmitting ? "Sending…" : "Send message"}
        {isSubmitting ? null : <Send />}
      </Button>

      <p role="status" aria-live="polite" className="min-h-5 text-sm text-ink-3">
        {status}
      </p>
    </form>
  );
}
