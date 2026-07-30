/**
 * Shared form submission helpers.
 *
 * The Web3Forms access key was previously hardcoded in three separate client
 * components. It is a public key by design (it only identifies the receiving
 * inbox), but keeping it in one env-backed place means it can be rotated
 * without touching component code.
 */
export const web3formsKey =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY ??
  "c70ae29d-0e7a-4698-a790-f8189613bf96";

export type SubmitResult = { ok: true } | { ok: false; message: string };

export async function submitToWeb3Forms(
  payload: Record<string, unknown>,
): Promise<SubmitResult> {
  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ ...payload, access_key: web3formsKey }),
    });

    if (!response.ok) {
      return {
        ok: false,
        message:
          "We couldn't send that just now. Please try again, or email us directly.",
      };
    }

    return { ok: true };
  } catch {
    return {
      ok: false,
      message:
        "Something went wrong. Please check your connection and try again.",
    };
  }
}
