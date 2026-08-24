import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { requestService } from "@/lib/site";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#services", label: "Services" },
  { href: "#shop", label: "For sale" },
  { href: "#story", label: "Bella" },
  { href: "#area", label: "Service area" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 bg-paper text-ink transition-[box-shadow] duration-[var(--motion-fast)] ease-[var(--ease-out)]",
        scrolled || open
          ? "shadow-[0_10px_32px_-18px_rgba(54,58,60,0.45)]"
          : "shadow-none",
      )}
    >
      <div className="h-1 w-full bg-[linear-gradient(90deg,var(--color-green)_0%,var(--color-green)_42%,var(--color-blue)_42%,var(--color-blue)_100%)]" />
      <div className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between gap-4 px-4 sm:h-[4.75rem] sm:px-6">
        <Logo compact />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-display text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-ink/70 transition-colors duration-[var(--motion-quick)] hover:text-green"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <Button asChild variant="blue" size="sm">
            <a href="#contact" onClick={() => requestService("rescue")}>
              Lost pet
            </a>
          </Button>
          <Button asChild size="sm">
            <a href="#contact">Request a flight</a>
          </Button>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>
      <div
        className={cn(
          "border-t border-line bg-paper lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav
          className="flex min-h-[calc(100dvh-4.75rem)] flex-col gap-1 px-4 py-6"
          aria-label="Mobile"
        >
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-3.5 font-display text-sm font-semibold uppercase tracking-[0.16em] text-ink"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-4 grid grid-cols-2 gap-2 px-1">
            <Button asChild variant="blue">
              <a
                href="#contact"
                onClick={() => {
                  requestService("rescue");
                  setOpen(false);
                }}
              >
                Lost pet
              </a>
            </Button>
            <Button asChild>
              <a href="#contact" onClick={() => setOpen(false)}>
                Request a flight
              </a>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
