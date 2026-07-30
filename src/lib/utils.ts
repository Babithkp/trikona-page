import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge only knows Tailwind's stock scales. Our design system adds
 * custom font sizes (text-display, text-h1…) and shadows, which merge would
 * otherwise mistake for text *colours* and silently drop when a class like
 * `text-ink` appears alongside them. Registering them keeps conflict
 * resolution correct.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        { text: ["display", "hero", "h1", "h2", "h3", "lead"] },
      ],
      "shadow": [
        { shadow: ["xs", "sm", "md", "lg", "xl", "brand", "inset-top"] },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
