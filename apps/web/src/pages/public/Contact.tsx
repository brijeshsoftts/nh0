import ContactImg from "@/assets/public/contact.png";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import PageHero from "@/features/public/components/PageHero";
import { SectionHeader } from "@/features/public/components/SectionHeader";

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        paths={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
        backgroundImage={ContactImg}
      />
      <ContactSection />
    </>
  );
}

function ContactSection() {
  return (
    <section
      aria-labelledby="contact-heading"
      className="bg-background text-foreground"
    >
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <SectionHeader
          title="Contact Us"
          description={<>Contact With Us Today</>}
        />

        <div className="grid items-center gap-8 md:grid-cols-[1.35fr_0.9fr] md:gap-10">
          <form
            action="mailto:reservations@nivarahotels.com"
            method="post"
            encType="text/plain"
            className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2"
          >
            <div className="grid gap-1.5">
              <label
                htmlFor="contact-first-name"
                className="text-xs font-medium"
              >
                First Name <span className="text-gold">*</span>
              </label>
              <Input
                id="contact-first-name"
                name="First name"
                autoComplete="given-name"
                placeholder="Ex. John"
                required
                className="h-10 rounded-lg bg-background px-3 text-xs"
              />
            </div>

            <div className="grid gap-1.5">
              <label
                htmlFor="contact-last-name"
                className="text-xs font-medium"
              >
                Last Name <span className="text-gold">*</span>
              </label>
              <Input
                id="contact-last-name"
                name="Last name"
                autoComplete="family-name"
                placeholder="Ex. Doe"
                required
                className="h-10 rounded-lg bg-background px-3 text-xs"
              />
            </div>

            <div className="grid gap-1.5">
              <label htmlFor="contact-email" className="text-xs font-medium">
                Email <span className="text-gold">*</span>
              </label>
              <Input
                id="contact-email"
                name="Email"
                type="email"
                autoComplete="email"
                placeholder="example@gmail.com"
                required
                className="h-10 rounded-lg bg-background px-3 text-xs"
              />
            </div>

            <div className="grid gap-1.5">
              <label htmlFor="contact-phone" className="text-xs font-medium">
                Phone <span className="text-gold">*</span>
              </label>
              <Input
                id="contact-phone"
                name="Phone"
                type="tel"
                autoComplete="tel"
                placeholder="Enter phone number"
                required
                className="h-10 rounded-lg bg-background px-3 text-xs"
              />
            </div>

            <div className="grid gap-1.5 sm:col-span-2">
              <label htmlFor="contact-subject" className="text-xs font-medium">
                Subject <span className="text-gold">*</span>
              </label>
              <Input
                id="contact-subject"
                name="Subject"
                placeholder="Enter here..."
                required
                className="h-10 rounded-lg bg-background px-3 text-xs"
              />
            </div>

            <div className="grid gap-1.5 sm:col-span-2">
              <label htmlFor="contact-message" className="text-xs font-medium">
                Your Message <span className="text-gold">*</span>
              </label>
              <Textarea
                id="contact-message"
                name="Message"
                placeholder="Enter here..."
                required
                className="min-h-24 resize-y rounded-lg bg-background px-3 py-2 text-xs"
              />
            </div>

            <button
              type="submit"
              className="mt-2 h-10 w-fit rounded-full bg-primary px-5 text-xs font-medium text-primary-foreground transition-[background-color,transform] duration-150 ease-out hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring enabled:active:scale-[0.96]"
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              Send a Message
            </button>
          </form>

          <img
            src={ContactImg}
            alt="Guest services representative speaking on the phone in an office"
            className="aspect-3/4 w-full rounded-xl object-cover outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
          />
        </div>
      </div>
    </section>
  );
}
