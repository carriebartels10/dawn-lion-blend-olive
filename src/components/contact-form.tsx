import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { Check, ExternalLink, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { EMAIL, FACEBOOK_URL, type FlightService } from "@/lib/site";
import { deliverContact } from "@/lib/send-contact";
import { cn } from "@/lib/utils";

const SERVICES = [
  { value: "agriculture", label: "Agriculture" },
  { value: "residential", label: "Residential / inspection" },
  { value: "rescue", label: "Lost pet search" },
  { value: "sales", label: "Buy a drone" },
  { value: "other", label: "Something else" },
] as const;

type ServiceValue = FlightService;

export function ContactForm() {
  const [service, setService] = useState<ServiceValue>("agriculture");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const onService = (event: Event) => {
      const next = (event as CustomEvent<FlightService>).detail;
      if (next) setService(next);
    };
    window.addEventListener("aa:service", onService);
    return () => window.removeEventListener("aa:service", onService);
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const location = String(data.get("location") || "").trim();
    const message = String(data.get("message") || "").trim();
    const pet = String(data.get("pet") || "").trim();
    const honey = String(data.get("company") || "");

    if (!name || !message) {
      setError("Name and a short note are required.");
      return;
    }
    if (!email && !phone) {
      setError("Leave an email or a phone number so we can reach you.");
      return;
    }

    setError("");
    setSending(true);
    try {
      const result = await deliverContact({
        name,
        email,
        phone,
        location,
        service,
        pet,
        message,
        honey,
      });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setSent(true);
    } catch {
      setError(
        `Could not send right now. Message us on Facebook or email ${EMAIL}.`,
      );
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div className="rounded-xl border border-line bg-paper p-6 sm:p-8">
        <div className="mb-4 flex size-11 items-center justify-center rounded-md bg-green text-paper">
          <Check className="size-5" strokeWidth={2.2} />
        </div>
        <h3 className="font-display text-2xl font-semibold uppercase tracking-wide text-ink">
          We have your note
        </h3>
        <p className="mt-3 max-w-prose text-ink/80">
          Your request was sent to {EMAIL}. We will get back to you. Facebook is
          still the fastest line after dark, especially for a lost pet.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild>
            <a href={FACEBOOK_URL} target="_blank" rel="noreferrer">
              Message on Facebook
              <ExternalLink />
            </a>
          </Button>
          <Button variant="ink" type="button" onClick={() => setSent(false)}>
            Send another
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-xl border border-line bg-paper p-5 sm:p-8"
    >
      <div className="sr-only" aria-hidden="true">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="grid gap-5">
        <fieldset>
          <legend className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-ink">
            What do you need?
          </legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {SERVICES.map((item) => (
              <label
                key={item.value}
                className={cn(
                  "flex min-h-11 cursor-pointer items-center gap-3 rounded-md border px-3.5 text-sm transition-[border-color,background-color] duration-[var(--motion-quick)]",
                  service === item.value
                    ? "border-ink bg-ink text-paper"
                    : "border-line bg-mist text-ink hover:border-ink/40",
                )}
              >
                <input
                  type="radio"
                  name="service"
                  value={item.value}
                  checked={service === item.value}
                  onChange={() => setService(item.value)}
                  className="sr-only"
                />
                {item.label}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="name" label="Name" required>
            <Input
              id="name"
              name="name"
              autoComplete="name"
              required
              disabled={sending}
            />
          </Field>
          <Field id="phone" label="Phone">
            <Input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              disabled={sending}
            />
          </Field>
          <Field id="email" label="Email">
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              disabled={sending}
            />
          </Field>
          <Field id="location" label="Town or section">
            <Input
              id="location"
              name="location"
              placeholder="Hallam, Lincoln, Beatrice…"
              disabled={sending}
            />
          </Field>
        </div>

        {service === "rescue" ? (
          <Field id="pet" label="Pet name and description">
            <Input
              id="pet"
              name="pet"
              placeholder="Name, color, breed, collar"
              disabled={sending}
            />
          </Field>
        ) : null}

        <Field
          id="message"
          label={
            service === "rescue"
              ? "Last seen and what happened"
              : service === "sales"
                ? "Which drone and what for"
                : "Tell us about the job"
          }
        >
          <Textarea
            id="message"
            name="message"
            required
            disabled={sending}
            placeholder={
              service === "rescue"
                ? "When they went missing, last known spot, terrain — corn, timber, creek, highway…"
                : service === "sales"
                  ? "Matrice 4T, J70, or J150 — what you want to fly and when you need it."
                  : "Crop, roof, listing photos, storm damage — whatever you need from the air."
            }
          />
        </Field>

        {error ? (
          <p className="text-sm font-medium text-danger" role="alert">
            {error}
          </p>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button type="submit" size="lg" disabled={sending}>
            {sending ? (
              <>
                <Loader2 className="animate-spin" />
                Sending…
              </>
            ) : (
              "Send request"
            )}
          </Button>
          <Button asChild variant="ink" size="lg">
            <a href={FACEBOOK_URL} target="_blank" rel="noreferrer">
              Facebook
              <ExternalLink />
            </a>
          </Button>
        </div>
        <p className="text-sm text-muted">
          This form emails {EMAIL} directly. We fly when weather and airspace
          allow. Lost-pet searches come first.
        </p>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  required,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>
        {label}
        {required ? <span className="ml-1 text-green">*</span> : null}
      </Label>
      {children}
    </div>
  );
}
