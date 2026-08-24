import { createServerFn } from "@tanstack/react-start";
import { EMAIL, type FlightService } from "@/lib/site";

const SERVICES: Record<FlightService, string> = {
  agriculture: "Agriculture",
  residential: "Residential / inspection",
  rescue: "Lost pet search",
  sales: "Buy a drone",
  other: "Something else",
};

const SEND_ERROR =
  "Could not send right now. Message us on Facebook or email aerialalliesllc@gmail.com.";

export type ContactInput = {
  name: string;
  email: string;
  phone: string;
  location: string;
  service: FlightService;
  pet: string;
  message: string;
  honey: string;
};

type SendResult = { ok: true } | { ok: false; error: string };

function validate(data: ContactInput): SendResult | { ok: true; payload: Record<string, string> } {
  if (data.honey.trim()) {
    return { ok: true };
  }

  const name = data.name.trim();
  const email = data.email.trim();
  const phone = data.phone.trim();
  const location = data.location.trim();
  const pet = data.pet.trim();
  const message = data.message.trim();

  if (!name || !message) {
    return { ok: false, error: "Name and a short note are required." };
  }
  if (!email && !phone) {
    return {
      ok: false,
      error: "Leave an email or a phone number so we can reach you.",
    };
  }

  const serviceLabel = SERVICES[data.service] ?? data.service;
  const subject =
    data.service === "rescue"
      ? `Lost pet — ${pet || name} — Aerial Allies`
      : data.service === "sales"
        ? `Drone purchase — ${name} — Aerial Allies`
        : `Flight request — ${serviceLabel} — Aerial Allies`;

  const payload: Record<string, string> = {
    name,
    email: email || "(no email)",
    phone: phone || "(no phone)",
    location: location || "(not given)",
    need: serviceLabel,
    message,
    _subject: subject,
    _template: "table",
    _captcha: "false",
  };
  if (pet) payload.pet = pet;
  if (email) payload._replyto = email;

  return { ok: true, payload };
}

async function postToFormSubmit(payload: Record<string, string>): Promise<SendResult> {
  const res = await fetch(`https://formsubmit.co/ajax/${EMAIL}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(15000),
  });

  const body = (await res.json().catch(() => null)) as
    | { success?: boolean | string; message?: string }
    | null;

  const pendingActivation = /confirm|activat/i.test(body?.message ?? "");
  const accepted =
    pendingActivation ||
    (res.ok &&
      (body == null ||
        body.success === true ||
        body.success === "true" ||
        /sent|success|thank/i.test(body.message ?? "")));

  if (!accepted) {
    return { ok: false, error: SEND_ERROR };
  }
  return { ok: true };
}

export const sendContact = createServerFn({ method: "POST" })
  .validator((input: ContactInput) => input)
  .handler(async ({ data }) => {
    const prepared = validate(data);
    if (!prepared.ok) return prepared;
    if (!("payload" in prepared)) return { ok: true as const };
    return postToFormSubmit(prepared.payload);
  });

export async function deliverContact(data: ContactInput): Promise<SendResult> {
  const prepared = validate(data);
  if (!prepared.ok) return prepared;
  if (!("payload" in prepared)) return { ok: true };

  try {
    const direct = await postToFormSubmit(prepared.payload);
    if (direct.ok) return direct;
  } catch {
    // Fall through to the server function if the browser cannot reach FormSubmit.
  }

  try {
    return await sendContact({ data });
  } catch {
    return { ok: false, error: SEND_ERROR };
  }
}
