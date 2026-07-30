import { cn } from "@/lib/utils";

/**
 * Decorative light-field behind hero and CTA blocks.
 *
 * Two soft brand-tinted blooms plus a faint dot grid, masked so they fade out
 * rather than ending on a hard edge. Purely presentational: it is hidden from
 * assistive technology, sits behind content, and never intercepts pointers.
 */
export default function Aurora({
  className,
  variant = "hero",
}: {
  className?: string;
  variant?: "hero" | "soft";
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className,
      )}
    >
      <div className="mask-fade-edges absolute inset-0 bg-dots opacity-60" />

      <div
        className={cn(
          "absolute -top-32 -left-24 size-[34rem] rounded-full blur-[110px] animate-aurora",
          variant === "hero" ? "opacity-55" : "opacity-35",
        )}
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(166,50,242,0.42), rgba(166,50,242,0) 70%)",
        }}
      />

      <div
        className={cn(
          "absolute -top-16 -right-28 size-[30rem] rounded-full blur-[110px] animate-aurora [animation-delay:-8s]",
          variant === "hero" ? "opacity-50" : "opacity-30",
        )}
        style={{
          background:
            "radial-gradient(circle at 70% 30%, rgba(251,163,37,0.40), rgba(251,163,37,0) 70%)",
        }}
      />

      {/* Warms the fold so the hero never reads as flat white. */}
      <div className="absolute inset-x-0 top-0 h-[28rem] bg-gradient-to-b from-white via-white/70 to-transparent" />
    </div>
  );
}
