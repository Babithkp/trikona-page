"use client";

import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ArrowRight } from "lucide-react";

import { Field } from "@/components/ui/Field";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { submitToWeb3Forms } from "@/lib/forms";

type FormData = {
  name: string;
  contact: string;
  budget: string;
  orgType: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Accepts the contact field if it looks like a real email or phone number. */
function isValidContact(value: string) {
  const trimmed = value.trim();
  if (emailPattern.test(trimmed)) return true;
  const digits = trimmed.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

const budgetsByCurrency = {
  inr: [
    "₹1,00,000 – ₹5,00,000",
    "₹5,00,000 – ₹15,00,000",
    "₹15,00,000+",
    "Not sure yet",
  ],
  usd: ["$2,000 – $6,000", "$6,000 – $18,000", "$18,000+", "Not sure yet"],
} as const;

const orgTypes = [
  "Startup",
  "Small / medium business",
  "Enterprise",
  "Agency or studio",
  "Other",
];

/** The budget field as a picker rather than a native dropdown. */
function BudgetPicker({
  id,
  value,
  onChange,
  invalid,
  describedBy,
  currency,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  invalid?: boolean;
  describedBy?: string;
  currency: "inr" | "usd";
}) {
  const budgets = budgetsByCurrency[currency];

  return (
    <div
      aria-invalid={invalid}
      aria-describedby={describedBy}
      className="flex flex-wrap gap-2"
    >
      {budgets.map((budget, i) => {
        const active = value === budget;
        return (
          <button
            key={budget}
            type="button"
            id={i === 0 ? id : undefined}
            aria-pressed={active}
            onClick={() => onChange(budget)}
            className={cn(
              "h-10 rounded-lg px-3.5 text-sm font-medium transition-colors duration-150",
              active ? "bg-ink text-white" : "bg-surface-3 text-ink-2 hover:bg-surface-2",
            )}
          >
            {budget}
          </button>
        );
      })}
    </div>
  );
}

/**
 * The one lead form used on this landing page — in the hero and again at the
 * bottom CTA, identically. Four fields only (name, email/phone, budget,
 * organisation type): enough to route and qualify a lead without the
 * open-ended "what are you building?" message field that slows ad traffic
 * down before it has seen any proof.
 *
 * `currency` swaps the budget tiers between the India (INR) and
 * international (USD) landing page variants; `source` tags which page the
 * lead came from so submissions can be routed/reported separately.
 */
export default function HeroLeadForm({
  currency = "inr",
  source = "custom-software-landing-hero",
}: {
  currency?: "inr" | "usd";
  source?: string;
}) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [status, setStatus] = React.useState("");

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ defaultValues: { budget: "", orgType: "" } });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setStatus("Sending…");

    const result = await submitToWeb3Forms({
      subject: `New scoping call request from ${data.name}`,
      source,
      ...data,
    });

    if (result.ok) {
      reset();
      setStatus("Thanks. We'll reach out shortly.");
      toast.success("Got it! We'll be in touch shortly.");
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
      className="flex w-full flex-col gap-4"
    >
      <Field
        name="hero-name"
        label="Name"
        required
        error={errors.name ? "Please enter your name." : undefined}
      >
        {(props) => (
          <input
            {...props}
            type="text"
            placeholder="Your name"
            autoComplete="name"
            {...register("name", { required: true })}
          />
        )}
      </Field>

      <Field
        name="hero-contact"
        label="Email or phone"
        required
        error={
          errors.contact?.type === "validate"
            ? "Please enter a valid email or phone number."
            : errors.contact
              ? "Please enter your email or phone."
              : undefined
        }
      >
        {(props) => (
          <input
            {...props}
            type="text"
            placeholder="Email or phone"
            autoComplete="email"
            {...register("contact", {
              required: true,
              validate: (value) => isValidContact(value),
            })}
          />
        )}
      </Field>

      <Field
        name="hero-budget"
        label="Budget"
        required
        error={errors.budget ? "Please select a budget range." : undefined}
      >
        {(props) => (
          <Controller
            control={control}
            name="budget"
            rules={{ required: true }}
            render={({ field }) => (
              <BudgetPicker
                id={props.id}
                value={field.value}
                onChange={field.onChange}
                invalid={props["aria-invalid"]}
                describedBy={props["aria-describedby"]}
                currency={currency}
              />
            )}
          />
        )}
      </Field>

      <Field
        name="hero-org-type"
        label="Organisation type"
        required
        error={errors.orgType ? "Please select an organisation type." : undefined}
      >
        {(props) => (
          <select
            {...props}
            defaultValue=""
            {...register("orgType", { required: true })}
          >
            <option value="" disabled>
              Select one
            </option>
            {orgTypes.map((orgType) => (
              <option key={orgType} value={orgType}>
                {orgType}
              </option>
            ))}
          </select>
        )}
      </Field>

      <Button
        type="submit"
        variant="gradient"
        size="lg"
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? "Sending…" : "Get my free scoping call"}
        {isSubmitting ? null : <ArrowRight />}
      </Button>

      {status ? (
        <p role="status" aria-live="polite" className="text-sm text-ink-3">
          {status}
        </p>
      ) : null}
    </form>
  );
}
