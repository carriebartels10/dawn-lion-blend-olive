import type { ReactNode } from "react";
import {
  ArrowRight,
  ExternalLink,
  House,
  Mail,
  MapPinned,
  PawPrint,
  ShieldCheck,
  Store,
  Sunrise,
  Wheat,
} from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { LogoLockup } from "@/components/logo";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { EMAIL, FACEBOOK_URL, MAILTO, TOWNS, requestService } from "@/lib/site";
import { cn } from "@/lib/utils";

export function HomePage() {
  return (
    <div id="top" className="bg-mist text-ink">
      <SiteHeader />
      <Hero />
      <Services />
      <Story />
      <FlagBand />
      <HowWeFly />
      <Frankie />
      <Shop />
      <ServiceArea />
      <Contact />
      <SiteFooter />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative isolate flex min-h-dvh items-end overflow-hidden bg-ink-deep pt-[4.75rem]">
      <img
        src="/images/hero.jpg?v=fleet3"
        alt="DJI Matrice 4T flying over southeast Nebraska cornfields at golden hour"
        className="absolute inset-0 size-full object-cover"
        width={1920}
        height={1080}
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(31,36,38,0.28)_0%,rgba(31,36,38,0.12)_36%,rgba(31,36,38,0.82)_100%)]" />
      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-8 px-4 pb-14 pt-10 sm:px-6 sm:pb-20 lg:grid-cols-[minmax(0,280px)_1fr] lg:items-end lg:gap-12">
        <div className="stagger-in hidden max-w-[280px] rounded-xl bg-paper p-4 shadow-[0_24px_50px_-28px_rgba(31,36,38,0.65)] sm:p-5 lg:block">
          <LogoLockup />
        </div>
        <div className="stagger-in max-w-xl pb-1">
          <p className="font-display text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-paper/80">
            Agriculture · Residential · Pet Rescue
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold uppercase leading-[0.95] tracking-[0.04em] text-paper">
            Neighbors in the air.
          </h1>
          <p className="mt-5 max-w-lg text-lg text-paper/90 sm:text-xl">
            Drone service across Southeast Nebraska. We fly for farms,
            homesteads, and lost pets.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href="#contact">
                Request a flight
                <ArrowRight />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#story">Read Bella’s story</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="scroll-mt-24 bg-mist py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-green">
            What we fly
          </p>
          <h2 className="mt-3 font-display text-2xl font-bold uppercase tracking-[0.04em] text-ink">
            Three jobs. One drone in the air.
          </h2>
          <p className="mt-4 text-lg text-ink/80">
            Same crew, same country roads. Whether it is a quarter-section of
            beans, a metal roof after hail, or a dog in the corn, we take off
            from near Hallam and cover Southeast Nebraska.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <ServiceCard
            id="agriculture"
            icon={<Wheat className="size-5" strokeWidth={1.75} />}
            tone="green"
            eyebrow="Agriculture"
            title="See the whole field"
            image="/images/ag.jpg?v=fleet3"
            alt="DJI Agras T100 agricultural spray drone over Nebraska crop rows"
            service="agriculture"
            body="From the cab you see a row. From a few hundred feet you see the stand, the wet corner, and the trouble you would miss until harvest. Crop scouting, field maps, and aerial views of corn, beans, and pasture."
          />
          <ServiceCard
            id="residential"
            icon={<House className="size-5" strokeWidth={1.75} />}
            tone="ink"
            eyebrow="Residential"
            title="Roofs, listings, storm"
            image="/images/residential.jpg?v=fleet3"
            alt="DJI Matrice 4T inspecting a Nebraska farmhouse and barn"
            service="residential"
            body="Roof and outbuilding inspections without a ladder. Storm-damage photos for insurance. Listing pictures that show the house, the bins, the timber, and the road in — the way a buyer actually looks at an acreage."
          />
          <ServiceCard
            id="rescue"
            icon={<PawPrint className="size-5" strokeWidth={1.75} />}
            tone="blue"
            eyebrow="Pet rescue"
            title="When a dog runs a section"
            image="/images/rescue.jpg?v=fleet3"
            alt="DJI Matrice 4T flying low over a Nebraska cornfield at dusk"
            service="rescue"
            body="Clock is running. We put a camera over fence lines, draws, and crop and pin what we see. Bella was our first official find — missing near Hallam, spotted from the air, home the same night."
          />
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  id,
  icon,
  eyebrow,
  title,
  image,
  alt,
  body,
  service,
  tone,
  cta = "Book this flight",
  imageClass,
}: {
  id: string;
  icon: ReactNode;
  eyebrow: string;
  title: string;
  image: string;
  alt: string;
  body: string;
  service: "agriculture" | "residential" | "rescue" | "sales";
  tone: "green" | "blue" | "ink";
  cta?: string;
  imageClass?: string;
}) {
  return (
    <article
      id={id}
      className="flex scroll-mt-28 flex-col overflow-hidden rounded-xl border border-line bg-paper"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={alt}
          className={cn("size-full object-cover", imageClass)}
          width={1400}
          height={1050}
          loading="lazy"
        />
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div
          className={cn(
            "flex items-center gap-2",
            tone === "green" && "text-green",
            tone === "blue" && "text-blue",
            tone === "ink" && "text-ink",
          )}
        >
          {icon}
          <span className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.2em]">
            {eyebrow}
          </span>
        </div>
        <h3 className="mt-3 font-display text-xl font-bold uppercase tracking-wide text-ink">
          {title}
        </h3>
        <p className="mt-3 flex-1 text-[1.02rem] leading-relaxed text-ink/80">
          {body}
        </p>
        <a
          href="#contact"
          onClick={() => requestService(service)}
          className="mt-5 inline-flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-[0.16em] text-green"
        >
          {cta}
          <ArrowRight className="size-3.5" />
        </a>
      </div>
    </article>
  );
}

function Story() {
  return (
    <section id="story" className="scroll-mt-24 bg-blue text-paper">
      <div className="mx-auto grid max-w-6xl lg:grid-cols-2">
        <div className="relative aspect-[3/4] lg:aspect-auto lg:min-h-full">
          <img
            src="/images/bella.jpg?v=fb"
            alt="Bella, a merle Mini Aussie, sitting in the passenger seat of a pickup after Aerial Allies found her near Hallam"
            className="absolute inset-0 size-full object-cover object-center"
            width={1536}
            height={2048}
            loading="lazy"
          />
        </div>
        <div className="px-4 py-16 sm:px-10 sm:py-20 lg:px-14">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-paper/65">
            First official search
          </p>
          <h2 className="mt-3 font-display text-2xl font-bold uppercase tracking-[0.04em]">
            Bella came home
          </h2>
          <p className="mt-6 text-lg italic leading-relaxed text-paper/92">
            “If it’s not a sign from God that we found our purpose in our
            business, I don’t know what would be.”
          </p>
          <div className="mt-6 space-y-4 text-[1.05rem] leading-relaxed text-paper/80">
            <p>
              Bella went missing close to Hallam. We saw the post on the Lincoln
              lost-and-found pets page from our back porch and said we’d keep an
              eye out. Five minutes later she walked around the corner of the
              shop — then bolted into the corn and beans.
            </p>
            <p>
              That is when we deployed the drone. We spotted her and pinned her
              before weather grounded us. We drove the section. A half mile from
              where we last saw her, she was on the side of the road. We sat
              down in the middle of it. Miss Bella jumped in the truck.
            </p>
            <p>Home the same night. That is why we fly.</p>
          </div>
          <Button asChild variant="paper" className="mt-8">
            <a href="#contact" onClick={() => requestService("rescue")}>
              Report a lost pet
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

function FlagBand() {
  return (
    <section className="relative isolate overflow-hidden bg-ink-deep">
      <img
        src="/images/flag.jpg?v=fleet3"
        alt="American flag flying from a DJI Matrice 4T over Nebraska farmland"
        className="absolute inset-0 size-full object-cover object-center"
        width={1600}
        height={900}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-ink/55" />
      <div className="relative mx-auto flex min-h-[280px] max-w-6xl flex-col justify-end px-4 py-16 sm:min-h-[340px] sm:px-6">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-paper/70">
          Soaring with the Stars & Stripes
        </p>
        <h2 className="mt-3 max-w-xl font-display text-2xl font-bold uppercase tracking-[0.04em] text-paper">
          Proud to fly it over Nebraska ground.
        </h2>
      </div>
    </section>
  );
}

function HowWeFly() {
  const steps = [
    {
      n: "01",
      title: "Tell us the job",
      body: "Field, roof, listing, or a missing pet. Town or section, what you need, and when.",
    },
    {
      n: "02",
      title: "We check the sky",
      body: "Weather, airspace, and a safe place to take off. We fly neighborly — not over a crowd, not through a storm.",
    },
    {
      n: "03",
      title: "You get the view",
      body: "Photos, video, or a pin on the map. For a lost pet, we stay on it until weather or light says otherwise.",
    },
  ];

  return (
    <section className="bg-mist py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-green">
              How a flight works
            </p>
            <h2 className="mt-3 font-display text-2xl font-bold uppercase tracking-[0.04em] text-ink">
              No runaround. Just airtime.
            </h2>
            <p className="mt-4 max-w-prose text-lg text-ink/80">
              We are a working rural crew, not a call center. Message us the
              same way you would a neighbor — email or Facebook.
            </p>
            <div className="mt-8 overflow-hidden rounded-xl">
              <img
                src="/images/shop.jpg?v=outdoor"
                alt="DJI Matrice 4T and RC Plus controller staged on a pickup tailgate in a Nebraska farmyard"
                className="aspect-[4/3] w-full object-cover"
                width={1400}
                height={1050}
                loading="lazy"
              />
            </div>
          </div>
          <ol className="grid gap-4">
            {steps.map((step) => (
              <li
                key={step.n}
                className="rounded-xl border border-line bg-paper p-6 sm:p-7"
              >
                <span className="font-display text-sm font-semibold tracking-[0.2em] text-green">
                  {step.n}
                </span>
                <h3 className="mt-2 font-display text-xl font-bold uppercase tracking-wide text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-ink/80">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Frankie() {
  return (
    <section className="bg-paper py-20 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <div className="order-first overflow-hidden rounded-xl lg:order-last">
          <img
            src="/images/frankie-j70.jpg?v=fb"
            alt="Frankie, Aerial Allies’ Bernese Mountain Dog, sitting in front of an EAVision J70 spray drone"
            className="aspect-[3/4] w-full object-cover object-center"
            width={1200}
            height={1600}
            loading="lazy"
          />
        </div>
        <div>
          <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-green">
            The J70
          </p>
          <h2 className="mt-3 font-display text-2xl font-bold uppercase tracking-[0.04em] text-ink">
            Frankie, for scale.
          </h2>
          <p className="mt-4 max-w-prose text-lg text-ink/80">
            Our Bernese sitting in front of the EAVision J70 — the compact spray
            drone for smaller fields, fencerows, and family farms. When the job
            does not need the J150, this is the drone we roll out.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <a href="#contact" onClick={() => requestService("agriculture")}>
                Book a spray flight
              </a>
            </Button>
            <Button asChild variant="ink">
              <a href="#contact" onClick={() => requestService("sales")}>
                Ask about buying a J70
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Shop() {
  return (
    <section id="shop" className="scroll-mt-24 bg-mist py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-green">
            For sale
          </p>
          <h2 className="mt-3 font-display text-2xl font-bold uppercase tracking-[0.04em] text-ink">
            The drones we fly — and sell.
          </h2>
          <p className="mt-4 text-lg text-ink/80">
            DJI Matrice 4T. EAVision J70 and J150. Same machines we take off
            from Hallam. Ask us about buying one for your own farm, roof work,
            or search.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <ServiceCard
            id="matrice-4t"
            icon={<Store className="size-5" strokeWidth={1.75} />}
            tone="ink"
            eyebrow="DJI"
            title="Matrice 4T"
            image="/images/shop.jpg?v=outdoor"
            alt="DJI Matrice 4T and RC Plus controller staged on a pickup tailgate"
            service="sales"
            cta="Ask about buying"
            body="The camera and thermal drone we fly for roofs, listings, and lost pets. A working aircraft, not a toy."
          />
          <ServiceCard
            id="j70"
            icon={<Store className="size-5" strokeWidth={1.75} />}
            tone="green"
            eyebrow="EAVision"
            title="J70"
            image="/images/frankie-j70.jpg?v=fb"
            alt="Frankie sitting in front of an EAVision J70 spray drone"
            service="sales"
            cta="Ask about buying"
            imageClass="object-top"
            body="Compact spray drone for smaller fields, fencerows, and family farms. The one Frankie is sitting in front of."
          />
          <ServiceCard
            id="j150"
            icon={<Store className="size-5" strokeWidth={1.75} />}
            tone="green"
            eyebrow="EAVision"
            title="J150"
            image="/images/j150.jpg?v=sale"
            alt="EAVision J150 agricultural spray drone over crop rows"
            service="sales"
            cta="Ask about buying"
            body="The larger spray drone for bigger jobs. When the field needs more tank than the J70, this is the one."
          />
        </div>
      </div>
    </section>
  );
}

function ServiceArea() {
  return (
    <section id="area" className="scroll-mt-24 border-y border-line bg-paper py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div>
            <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-green">
              Southeast Nebraska
            </p>
            <h2 className="mt-3 font-display text-2xl font-bold uppercase tracking-[0.04em] text-ink">
              Based near Hallam. Flying the country around it.
            </h2>
            <p className="mt-4 max-w-prose text-lg text-ink/80">
              Lincoln to Beatrice, Crete to the county line, and the gravel in
              between. If you are on the edge of our map, still ask — a lost
              pet does not care about a radius.
            </p>
            <ul className="mt-8 grid gap-3 text-ink/85">
              <li className="flex items-start gap-3">
                <MapPinned className="mt-0.5 size-4 shrink-0 text-green" />
                Shop and home base near Hallam, Lancaster County
              </li>
              <li className="flex items-start gap-3">
                <Sunrise className="mt-0.5 size-4 shrink-0 text-green" />
                Daylight flights; weather calls the rest
              </li>
              <li className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-green" />
                Legal, low, and neighborly — we do not buzz houses for sport
              </li>
            </ul>
          </div>
          <div>
            <p className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              Towns we regularly fly
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {TOWNS.map((town) => (
                <li
                  key={town}
                  className="rounded-md border border-line bg-mist px-3 py-2 font-display text-xs font-semibold uppercase tracking-[0.14em] text-ink"
                >
                  {town}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 bg-mist py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-green">
            Get us in the air
          </p>
          <h2 className="mt-3 font-display text-2xl font-bold uppercase tracking-[0.04em] text-ink">
            Request a flight, report a lost pet, or buy a drone.
          </h2>
          <p className="mt-4 max-w-prose text-lg text-ink/80">
            Fill this out and we will follow up. We sell the DJI Matrice 4T and
            the EAVision J70 and J150. Email or Facebook — Facebook is still
            the quickest line after dark when a dog is still out.
          </p>
          <a
            href={MAILTO}
            className="mt-8 flex items-center gap-3 rounded-xl border border-line bg-paper p-4 pr-5 text-ink transition-colors duration-[var(--motion-quick)] hover:border-green"
          >
            <span className="flex size-11 items-center justify-center rounded-md bg-green text-paper">
              <Mail className="size-5" strokeWidth={1.75} />
            </span>
            <span>
              <span className="block font-display text-sm font-semibold uppercase tracking-[0.12em]">
                Email
              </span>
              <span className="mt-0.5 block text-sm text-muted normal-case tracking-normal">
                {EMAIL}
              </span>
            </span>
          </a>
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-3 rounded-xl border border-line bg-paper p-4 pr-5 text-ink transition-colors duration-[var(--motion-quick)] hover:border-green"
          >
            <img
              src="/images/logo-mark.png"
              alt=""
              className="size-11 rounded-md object-contain"
              width={748}
              height={498}
            />
            <span>
              <span className="block font-display text-sm font-semibold uppercase tracking-[0.12em]">
                Aerial Allies on Facebook
              </span>
              <span className="mt-0.5 flex items-center gap-1 text-sm text-muted">
                Message the page
                <ExternalLink className="size-3.5" />
              </span>
            </span>
          </a>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 sm:px-6 sm:py-14 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-[240px] rounded-xl bg-paper p-4">
          <LogoLockup />
        </div>
        <div className="flex flex-col gap-2 font-display text-xs font-semibold uppercase tracking-[0.16em] text-paper/70">
          <a href="#services" className="hover:text-paper">
            Services
          </a>
          <a href="#shop" className="hover:text-paper">
            For sale
          </a>
          <a href="#story" className="hover:text-paper">
            Bella’s story
          </a>
          <a href={MAILTO} className="normal-case tracking-normal hover:text-paper">
            {EMAIL}
          </a>
          <a href={FACEBOOK_URL} target="_blank" rel="noreferrer" className="hover:text-paper">
            Facebook
          </a>
          <a href="#contact" className="hover:text-paper">
            Contact
          </a>
        </div>
      </div>
      <div className="border-t border-paper/10">
        <p className="mx-auto max-w-6xl px-4 py-4 font-display text-[0.65rem] uppercase tracking-[0.16em] text-paper/45 sm:px-6">
          © {new Date().getFullYear()} Aerial Allies LLC · aerialallies.com
        </p>
      </div>
    </footer>
  );
}
