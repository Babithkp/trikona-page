import { site } from "@/lib/site";

/** Builds a wa.me link that opens a chat with `message` pre-filled. */
export function whatsappHref(message: string) {
  const digits = site.phones[0].replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
