import { cn } from "@/lib/utils";

export function Logo({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <a
      href="#top"
      className={cn("group inline-flex items-center gap-2.5 no-underline", className)}
    >
      <img
        src="/images/logo-mark.png"
        alt=""
        className={cn("w-auto object-contain", compact ? "h-11 sm:h-12" : "h-14")}
        width={748}
        height={498}
      />
      <span className="leading-none">
        <span className="block font-display text-[0.92rem] font-bold uppercase tracking-[0.12em] text-ink sm:text-[1.02rem]">
          Aerial Allies
        </span>
        {!compact ? (
          <span className="mt-0.5 hidden font-display text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-blue sm:block">
            LLC
          </span>
        ) : (
          <span className="mt-0.5 hidden font-display text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-green sm:block">
            Drone services
          </span>
        )}
      </span>
    </a>
  );
}

export function LogoLockup({
  className,
  alt = "Aerial Allies LLC — agriculture, residential and pet rescue drone services",
}: {
  className?: string;
  alt?: string;
}) {
  return (
    <img
      src="/images/logo.png"
      alt={alt}
      className={cn("h-auto w-full object-contain", className)}
      width={900}
      height={820}
    />
  );
}
