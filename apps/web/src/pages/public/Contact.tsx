import { zodResolver } from "@hookform/resolvers/zod";
import { motion, useReducedMotion } from "framer-motion";
import {
  AlignLeft,
  ArrowRight,
  BedDouble,
  Clock3,
  Headset,
  LoaderCircle,
  type LucideIcon,
  Mail,
  MapPin,
  MessageCircleHeart,
  MessageSquare,
  Phone,
  UserRound,
  Users,
} from "lucide-react";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import LocationImage from "@/assets/cta_image.png";
import HeroImage from "@/assets/landing_hero.png";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { HOTEL_DETAILS } from "@/constants/hotel";
import { HoverText } from "@/features/public/components/hoverText";
import { useSendContactMessage } from "@/features/public/hooks/useSendContactMessage";
import {
  type ContactMessageInput,
  contactMessageSchema,
  contactSubjects,
} from "@/features/public/schemas/contact-message.schema";

const contactDetails: {
  title: string;
  icon: LucideIcon;
  lines: { label: string; href?: string }[];
}[] = [
  {
    title: "Call us",
    icon: Phone,
    lines: [
      {
        label: HOTEL_DETAILS.phone ?? "Phone details to be confirmed",
        ...(HOTEL_DETAILS.phone && { href: `tel:${HOTEL_DETAILS.phone}` }),
      },
    ],
  },
  {
    title: "Email us",
    icon: Mail,
    lines: [
      {
        label: HOTEL_DETAILS.email ?? "Email details to be confirmed",
        ...(HOTEL_DETAILS.email && {
          href: `mailto:${HOTEL_DETAILS.email}`,
        }),
      },
    ],
  },
  {
    title: "Visit us",
    icon: MapPin,
    lines: [{ label: HOTEL_DETAILS.address ?? HOTEL_DETAILS.location }],
  },
  {
    title: "Our hours",
    icon: Clock3,

    lines: [{ label: HOTEL_DETAILS.hours ?? "Hours details to be confirmed" }],
  },
];

const helpOptions: {
  title: string;
  description: string;
  href: string;
  action: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Room reservations",
    description: "Room bookings, availability, and special requests.",
    href: "/rooms",
    action: "Browse rooms",
    icon: BedDouble,
  },
  {
    title: "Customer support",
    description: "General questions and assistance with your stay.",
    href: "#contact-form",
    action: "Send an enquiry",
    icon: Headset,
  },
  {
    title: "Group bookings",
    description: "Corporate stays, celebrations, and group reservations.",
    href: "#contact-form",
    action: "Ask about group stays",
    icon: Users,
  },
  {
    title: "Feedback",
    description: "Share a suggestion or tell us about your experience.",
    href: "#contact-form",
    action: "Share feedback",
    icon: MessageCircleHeart,
  },
];

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      transition={{ duration: reduceMotion ? 0 : 0.4, delay }}
      viewport={{ once: true, amount: 0.14 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  );
}

function FieldError({ children }: { children?: React.ReactNode }) {
  if (!children) return null;
  return (
    <p className="mt-1.5 text-xs text-destructive" role="alert">
      {children}
    </p>
  );
}

function ContactHero() {
  return (
    <section className="relative flex h-[60vh] max-h-150 min-h-112.5 w-full items-center overflow-hidden font-sans">
      <img
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[center_55%]"
        fetchPriority="high"
        src={HeroImage}
      />

      <div className="container mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <Reveal className="max-w-xl">
          <p className="text-xs font-semibold tracking-[0.16em] text-white/70 uppercase">
            Contact us
          </p>
          <h1 className="mt-3 font-heading text-4xl leading-[1.05] font-medium text-white sm:text-5xl md:text-6xl">
            <HoverText>
              We’re here
              <span className="block text-primary">for you</span>
            </HoverText>
          </h1>
          <p className="mt-4 max-w-md text-sm leading-6 text-white/70 sm:text-base">
            Have a question, special request, or need help with your booking?
            Our team is ready to help you plan a perfect stay.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function ContactDetailsStrip() {
  return (
    <section className="relative z-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid divide-y divide-border rounded-lg border border-border bg-card shadow-sm sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {contactDetails.map(({ title, icon: Icon, lines }, index) => (
            <Reveal className="min-w-0" delay={index * 0.06} key={title}>
              <div className="flex min-h-20 items-center gap-3 px-4 py-4 sm:px-5">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-secondary text-primary">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <div className="min-w-0">
                  <h2 className="text-sm font-semibold text-foreground">
                    {title}
                  </h2>
                  {lines.map(({ label, href }) => (
                    <p
                      className="mt-0.5 truncate text-xs text-muted-foreground"
                      key={label}
                    >
                      {href ? (
                        <a
                          className="rounded-sm hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                          href={href}
                        >
                          {label}
                        </a>
                      ) : (
                        label
                      )}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const form = useForm<ContactMessageInput>({
    resolver: zodResolver(contactMessageSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      message: "",
    },
  });
  const sendMessage = useSendContactMessage();
  const [submitted, setSubmitted] = React.useState(false);
  const subjectError = form.formState.errors.subject?.message;

  const onSubmit = form.handleSubmit((values) => {
    setSubmitted(false);
    sendMessage.mutate(values, {
      onSuccess: () => {
        form.reset();
        setSubmitted(true);
      },
    });
  });

  return (
    <section
      aria-labelledby="contact-form-heading"
      className="min-w-0"
      id="contact-form"
    >
      <Reveal>
        <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
          Send us a message
        </p>
        <h2
          className="mt-2 font-heading text-3xl font-medium text-foreground sm:text-4xl"
          id="contact-form-heading"
        >
          Get in touch
        </h2>
        <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
          Fill out the form and our team will get back to you as soon as
          possible.
        </p>
      </Reveal>

      <form
        className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2"
        noValidate
        onChange={() => {
          setSubmitted(false);
          if (sendMessage.isError) sendMessage.reset();
        }}
        onSubmit={onSubmit}
      >
        <div>
          <div className="relative">
            <UserRound
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-primary"
            />
            <Label className="sr-only" htmlFor="contact-name">
              Full name
            </Label>
            <Input
              aria-invalid={Boolean(form.formState.errors.fullName)}
              autoComplete="name"
              className="h-11 bg-card pl-10"
              id="contact-name"
              placeholder="Full name *"
              {...form.register("fullName")}
            />
          </div>
          <FieldError>{form.formState.errors.fullName?.message}</FieldError>
        </div>

        <div>
          <div className="relative">
            <Mail
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-primary"
            />
            <Label className="sr-only" htmlFor="contact-email">
              Email address
            </Label>
            <Input
              aria-invalid={Boolean(form.formState.errors.email)}
              autoComplete="email"
              className="h-11 bg-card pl-10"
              id="contact-email"
              placeholder="Email address *"
              type="email"
              {...form.register("email")}
            />
          </div>
          <FieldError>{form.formState.errors.email?.message}</FieldError>
        </div>

        <div>
          <div className="relative">
            <Phone
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-primary"
            />
            <Label className="sr-only" htmlFor="contact-phone">
              Phone number, optional
            </Label>
            <Input
              autoComplete="tel"
              className="h-11 bg-card pl-10"
              id="contact-phone"
              inputMode="tel"
              placeholder="Phone number"
              {...form.register("phone")}
            />
          </div>
          <FieldError>{form.formState.errors.phone?.message}</FieldError>
        </div>

        <div>
          <div className="relative">
            <AlignLeft
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-3.5 z-10 size-4 -translate-y-1/2 text-primary"
            />
            <Controller
              control={form.control}
              name="subject"
              render={({ field }) => (
                <Select
                  onValueChange={(value) => field.onChange(value ?? "")}
                  value={field.value ?? ""}
                >
                  <SelectTrigger
                    aria-invalid={Boolean(subjectError)}
                    className="h-11 w-full bg-card pl-10"
                    id="contact-subject"
                  >
                    <SelectValue placeholder="Subject *" />
                  </SelectTrigger>
                  <SelectContent>
                    {contactSubjects.map((subject) => (
                      <SelectItem key={subject.value} value={subject.value}>
                        {subject.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <Label className="sr-only" htmlFor="contact-subject">
              Subject
            </Label>
          </div>
          <FieldError>{subjectError}</FieldError>
        </div>

        <div className="sm:col-span-2">
          <div className="relative">
            <MessageSquare
              aria-hidden="true"
              className="pointer-events-none absolute top-3.5 left-3.5 size-4 text-primary"
            />
            <Label className="sr-only" htmlFor="contact-message">
              Your message
            </Label>
            <Textarea
              aria-invalid={Boolean(form.formState.errors.message)}
              className="min-h-28 resize-y bg-card pt-3 pl-10"
              id="contact-message"
              maxLength={3000}
              placeholder="Your message *"
              {...form.register("message")}
            />
          </div>
          <div className="mt-1 flex items-start justify-between gap-3">
            <FieldError>{form.formState.errors.message?.message}</FieldError>
          </div>
        </div>

        {submitted && (
          <p
            className="rounded-md border border-success/30 bg-success/5 px-3 py-2 text-sm text-success sm:col-span-2"
            role="status"
          >
            Thanks for reaching out. Your message has been sent to our team.
          </p>
        )}
        {sendMessage.isError && (
          <p
            className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive sm:col-span-2"
            role="alert"
          >
            We couldn’t send your message. Please try again or email us
            directly.
          </p>
        )}

        <Button
          className="h-11 w-full sm:col-span-2"
          disabled={sendMessage.isPending}
          type="submit"
        >
          {sendMessage.isPending && (
            <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
          )}
          {sendMessage.isPending ? "Sending message" : "Send message"}
          {!sendMessage.isPending && (
            <ArrowRight aria-hidden="true" className="size-4" />
          )}
        </Button>
      </form>
    </section>
  );
}

function LocationPanel() {
  return (
    <Reveal className="min-w-0">
      <Card className="overflow-hidden rounded-lg border-border bg-card p-2 shadow-sm">
        <div className="aspect-video overflow-hidden rounded-md bg-muted">
          <img
            alt="Sunset view at the resort"
            className="h-full w-full object-cover"
            loading="lazy"
            src={LocationImage}
          />
        </div>
        <div className="p-3 sm:p-4">
          <h2 className="font-heading text-2xl font-medium text-foreground">
            Our location
          </h2>
          <p className="mt-1 text-sm leading-5 text-muted-foreground">
            {HOTEL_DETAILS.address ?? HOTEL_DETAILS.location}
          </p>
          <div className="relative mt-3 h-40 overflow-hidden rounded-md border border-border bg-muted sm:h-48">
            <iframe
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${encodeURIComponent(HOTEL_DETAILS.address ?? HOTEL_DETAILS.location)}&output=embed`}
              title={`Map showing ${HOTEL_DETAILS.name} in ${HOTEL_DETAILS.location}`}
            />
          </div>
          <a
            className="mt-3 inline-flex min-h-10 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(HOTEL_DETAILS.address ?? HOTEL_DETAILS.location)}`}
            rel="noreferrer"
            target="_blank"
          >
            <MapPin aria-hidden="true" className="size-4" />
            Get directions
            <ArrowRight aria-hidden="true" className="size-4" />
          </a>
        </div>
      </Card>
    </Reveal>
  );
}

function QuickHelp() {
  return (
    <section aria-labelledby="quick-help-heading" className="py-10 sm:py-12">
      <div className="flex flex-col gap-2">
        <h2
          className="font-heading text-2xl font-medium text-foreground sm:text-3xl"
          id="quick-help-heading"
        >
          Need quick help?
        </h2>
        <p className="text-sm text-muted-foreground">
          Choose the team best suited to your question.
        </p>
      </div>
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {helpOptions.map(
          ({ title, description, href, action, icon: Icon }, index) => (
            <Reveal delay={index * 0.06} key={title}>
              <Card className="flex h-full flex-col items-center rounded-lg border-border bg-card px-4 py-5 text-center shadow-sm transition-colors hover:border-primary/40">
                <span className="grid size-11 place-items-center rounded-full bg-secondary text-primary">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <h3 className="mt-3 text-sm font-semibold text-foreground">
                  {title}
                </h3>
                <p className="mt-1.5 min-h-10 text-xs leading-5 text-muted-foreground">
                  {description}
                </p>
                <Link
                  className="mt-3 rounded-sm text-xs font-semibold text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  to={href}
                >
                  {action}
                </Link>
              </Card>
            </Reveal>
          )
        )}
      </div>
    </section>
  );
}

function SupportBanner() {
  return (
    <Reveal>
      <section className="relative isolate overflow-hidden rounded-lg border border-border bg-foreground text-background">
        <img
          alt=""
          aria-hidden="true"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
          loading="lazy"
          src={HeroImage}
        />
        <div className="absolute inset-0 -z-10 bg-black/30" />
        <div className="grid gap-6 p-5 sm:p-7 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <div>
            <h2 className="font-heading text-2xl font-medium text-white sm:text-3xl">
              Still have questions?
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-5 text-white/80">
              Our team can help with room information, reservations, and guest
              enquiries in Lucknow.
            </p>
          </div>
          <ul className="grid gap-2 text-sm text-background/90 sm:grid-cols-2 md:grid-cols-1">
            {[
              { label: "Room booking support", icon: BedDouble },
              { label: "Guest enquiries", icon: MessageSquare },
              { label: "Group stay enquiries", icon: Users },
              { label: "Lucknow stay guidance", icon: MapPin },
            ].map(({ label, icon: Icon }) => (
              <li className="flex items-center gap-2" key={label}>
                <Icon aria-hidden="true" className="size-4" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Reveal>
  );
}

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactDetailsStrip />
      <div className="container mx-auto max-w-7xl px-4 pt-10 sm:px-6 sm:pt-12 lg:px-8">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(20rem,0.95fr)] lg:gap-10">
          <ContactForm />
          <LocationPanel />
        </div>
        <QuickHelp />
        <SupportBanner />
      </div>
    </>
  );
}
