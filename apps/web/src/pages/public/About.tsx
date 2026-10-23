import { addDays, format, startOfToday } from "date-fns";
import { Check, Star } from "lucide-react";
import { type FormEvent, useId, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AboutImg from "@/assets/public/about.png";
import BookingImg from "@/assets/public/booking.png";
import LoungeImg from "@/assets/public/rooms-details.png";
import { FeatureMarquee } from "@/components/common/FeatureMarquee";
import PageHero from "@/features/public/components/PageHero";
import { SectionHeader } from "@/features/public/components/SectionHeader";

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Us"
        paths={[{ label: "Home", href: "/" }, { label: "About Us" }]}
        backgroundImage={AboutImg}
      />
      <AboutSection />
      <FeatureMarquee />
      <WhyChooseUsSection />
      <FeatureMarquee />
      <MakeReservationSection />
    </>
  );
}

function AboutSection() {
  return (
    <section
      aria-labelledby="about-story-heading"
      className="bg-background text-foreground"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 sm:px-8 md:grid-cols-[0.9fr_1.1fr] md:gap-16 lg:px-12 lg:py-20">
        <figure className="relative mx-auto w-full max-w-sm md:max-w-none">
          <img
            src={AboutImg}
            alt="A member of the hotel team offering attentive, personal service"
            className="aspect-4/5 w-full rounded-lg object-cover object-center"
            loading="lazy"
            decoding="async"
          />
          <figcaption className="absolute top-5 -left-3 flex items-center gap-3 rounded-sm bg-primary px-4 py-2 text-primary-foreground shadow-sm sm:-left-5 sm:px-5 sm:py-3">
            <span className="font-heading text-3xl leading-none">16</span>
            <span className="text-xs leading-tight">
              Years
              <br />
              of Service
            </span>
          </figcaption>
        </figure>

        <div className="min-w-0">
          <p className="mb-3 text-[10px] font-medium tracking-[0.2em] text-gold uppercase">
            About Us
          </p>
          <h2
            id="about-story-heading"
            className="max-w-xl font-heading text-3xl leading-tight font-medium sm:text-4xl"
          >
            Luxurious Comfort, Timeless Elegance Awaits
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">
            For 16 years, we’ve welcomed guests with thoughtful details,
            attentive service, and the quiet comforts that make every stay feel
            special.
          </p>

          <dl className="mt-7 grid grid-cols-3 divide-x divide-border">
            <div className="min-w-0 pr-3 sm:pr-5">
              <dt className="font-heading text-xl leading-tight font-semibold text-primary sm:text-2xl">
                50+
              </dt>
              <dd className="mt-1 text-[10px] leading-4 text-muted-foreground sm:text-xs">
                Luxury Rooms
              </dd>
            </div>
            <div className="min-w-0 px-3 sm:px-5">
              <dt className="font-heading text-xl leading-tight font-semibold text-primary sm:text-2xl">
                60,000+
              </dt>
              <dd className="mt-1 text-[10px] leading-4 text-muted-foreground sm:text-xs">
                Happy Guests
              </dd>
            </div>
            <div className="min-w-0 pl-3 sm:pl-5">
              <dt className="font-heading text-xl leading-tight font-semibold text-primary sm:text-2xl">
                99%
              </dt>
              <dd className="mt-1 text-[10px] leading-4 text-muted-foreground sm:text-xs">
                Guest Satisfaction
              </dd>
            </div>
          </dl>

          <div className="mt-7">
            <p className="font-heading text-xl italic">Jenny Alexander</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Jenny Alexander <span className="text-gold">•</span> Owner
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyChooseUsSection() {
  return (
    <section
      aria-labelledby="why-choose-us-heading"
      className="overflow-hidden bg-background text-foreground"
    >
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <SectionHeader
          title="Why Choose Us"
          description={
            <>
              Discover Comfort Like <br /> Never Before
            </>
          }
        />

        <div className="grid grid-cols-2 items-center gap-4 md:grid-cols-[1.05fr_0.75fr_1.35fr] md:gap-5">
          <figure className="relative min-w-0 self-stretch">
            <img
              src={LoungeImg}
              alt="A bright, comfortable hotel lounge"
              className="aspect-4/5 h-full w-full rounded-lg object-cover object-center md:aspect-[0.8]"
              loading="lazy"
              decoding="async"
            />
            <figcaption className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-md bg-primary px-3 py-2 whitespace-nowrap text-primary-foreground shadow-sm sm:gap-3 sm:px-4">
              <span className="grid size-8 place-items-center rounded-full bg-gold text-gold-foreground">
                <Star className="size-4 fill-current" aria-hidden="true" />
              </span>
              <span className="text-[10px] leading-tight sm:text-xs">
                <span className="block font-medium">4.9 Star</span>
                Reviews
              </span>
            </figcaption>
          </figure>

          <img
            src={BookingImg}
            alt="A hotel team member helping a guest"
            className="aspect-3/5 w-full rounded-lg object-cover object-center md:aspect-[0.7]"
            loading="lazy"
            decoding="async"
          />

          <div className="col-span-2 min-w-0 pt-4 md:col-span-1 md:pt-0">
            <p className="text-sm leading-6 text-muted-foreground">
              From thoughtfully appointed spaces to attentive service, every
              detail is designed to make your stay feel effortless.
            </p>

            <dl className="mt-5 grid grid-cols-3 divide-x divide-border border-y border-border py-3">
              <div className="min-w-0 pr-2 sm:pr-4">
                <dt className="font-heading text-xl leading-tight font-semibold text-primary sm:text-2xl">
                  125+
                </dt>
                <dd className="mt-1 text-[10px] leading-4 text-muted-foreground sm:text-xs">
                  Staff Members
                </dd>
              </div>
              <div className="min-w-0 px-2 sm:px-4">
                <dt className="font-heading text-xl leading-tight font-semibold text-primary sm:text-2xl">
                  20+
                </dt>
                <dd className="mt-1 text-[10px] leading-4 text-muted-foreground sm:text-xs">
                  Amenities
                </dd>
              </div>
              <div className="min-w-0 pl-2 sm:pl-4">
                <dt className="font-heading text-xl leading-tight font-semibold text-primary sm:text-2xl">
                  24/7
                </dt>
                <dd className="mt-1 text-[10px] leading-4 text-muted-foreground sm:text-xs">
                  Booking Availability
                </dd>
              </div>
            </dl>

            <ul className="mt-4 space-y-2">
              {[
                "Luxurious & Comfortable Accommodations",
                "Exceptional Service & Hospitality",
                "Delicious Dining Options",
              ].map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-2 text-xs leading-5 text-muted-foreground"
                >
                  <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-gold text-gold-foreground">
                    <Check
                      className="size-3"
                      strokeWidth={2.5}
                      aria-hidden="true"
                    />
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>

            <Link
              to="/rooms"
              className="mt-5 inline-flex min-h-10 items-center rounded-full bg-primary px-5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function MakeReservationSection() {
  const formId = useId();
  const navigate = useNavigate();
  const today = format(startOfToday(), "yyyy-MM-dd");
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(
    format(addDays(startOfToday(), 1), "yyyy-MM-dd")
  );
  const [adults, setAdults] = useState("1");
  const [children, setChildren] = useState("0");
  const [dateError, setDateError] = useState("");
  const minCheckOut = checkIn
    ? format(addDays(new Date(`${checkIn}T00:00:00`), 1), "yyyy-MM-dd")
    : today;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (checkIn < today) {
      setDateError("Check-in cannot be in the past.");
      return;
    }

    if (checkOut <= checkIn) {
      setDateError("Check-out must be after check-in.");
      return;
    }

    const params = new URLSearchParams({
      "check-in": checkIn,
      "check-out": checkOut,
      adults,
      children,
      page: "1",
    });
    navigate(`/rooms?${params.toString()}`);
  };

  const inputClassName =
    "h-10 w-full min-w-0 rounded-lg border border-border bg-background px-3 text-xs text-foreground placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";
  const labelClassName = "mb-1.5 block text-[11px] font-medium text-foreground";

  return (
    <section
      aria-labelledby="reservation-heading"
      className="bg-background text-foreground"
    >
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <SectionHeader
          title="Make a Reservation"
          description={
            <>
              Book Your Stay and EnjoyYour <br /> Exceptional Comfort
            </>
          }
        />

        <div className="grid items-center gap-8 md:grid-cols-[1.35fr_0.9fr] md:gap-10">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2"
          >
            <div>
              <label htmlFor={`${formId}-name`} className={labelClassName}>
                Your Name <span className="text-gold">*</span>
              </label>
              <input
                id={`${formId}-name`}
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Ex. John Doe"
                className={inputClassName}
              />
            </div>

            <div>
              <label htmlFor={`${formId}-phone`} className={labelClassName}>
                Phone Number <span className="text-gold">*</span>
              </label>
              <input
                id={`${formId}-phone`}
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="Enter phone number"
                className={inputClassName}
              />
            </div>

            <div>
              <label htmlFor={`${formId}-checkin`} className={labelClassName}>
                Check-in Date <span className="text-gold">*</span>
              </label>
              <input
                id={`${formId}-checkin`}
                name="checkIn"
                type="date"
                required
                min={today}
                value={checkIn}
                onChange={(event) => {
                  const nextCheckIn = event.target.value;
                  setCheckIn(nextCheckIn);
                  setDateError("");
                  if (nextCheckIn && checkOut <= nextCheckIn) {
                    setCheckOut(
                      format(
                        addDays(new Date(`${nextCheckIn}T00:00:00`), 1),
                        "yyyy-MM-dd"
                      )
                    );
                  }
                }}
                className={inputClassName}
              />
            </div>

            <div>
              <label htmlFor={`${formId}-checkout`} className={labelClassName}>
                Check-out Date <span className="text-gold">*</span>
              </label>
              <input
                id={`${formId}-checkout`}
                name="checkOut"
                type="date"
                required
                min={minCheckOut}
                value={checkOut}
                onChange={(event) => {
                  setCheckOut(event.target.value);
                  setDateError("");
                }}
                className={inputClassName}
              />
            </div>

            <div>
              <label htmlFor={`${formId}-adults`} className={labelClassName}>
                Adults <span className="text-gold">*</span>
              </label>
              <select
                id={`${formId}-adults`}
                name="adults"
                value={adults}
                onChange={(event) => setAdults(event.target.value)}
                className={inputClassName}
              >
                {Array.from({ length: 8 }, (_, index) => index + 1).map(
                  (count) => (
                    <option key={count} value={count}>
                      {count}
                    </option>
                  )
                )}
              </select>
            </div>

            <div>
              <label htmlFor={`${formId}-children`} className={labelClassName}>
                Children <span className="text-gold">*</span>
              </label>
              <select
                id={`${formId}-children`}
                name="children"
                value={children}
                onChange={(event) => setChildren(event.target.value)}
                className={inputClassName}
              >
                {Array.from({ length: 7 }, (_, index) => index).map((count) => (
                  <option key={count} value={count}>
                    {count}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor={`${formId}-room-type`} className={labelClassName}>
                Room Type <span className="text-gold">*</span>
              </label>
              <select
                id={`${formId}-room-type`}
                name="roomType"
                defaultValue=""
                className={inputClassName}
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="any">Any room type</option>
              </select>
            </div>

            <div>
              <label htmlFor={`${formId}-rooms`} className={labelClassName}>
                Number of Rooms <span className="text-gold">*</span>
              </label>
              <select
                id={`${formId}-rooms`}
                name="rooms"
                defaultValue="1"
                className={inputClassName}
              >
                {Array.from({ length: 5 }, (_, index) => index + 1).map(
                  (count) => (
                    <option key={count} value={count}>
                      {count}
                    </option>
                  )
                )}
              </select>
            </div>

            {dateError ? (
              <p
                role="alert"
                className="text-xs text-destructive sm:col-span-2"
              >
                {dateError}
              </p>
            ) : null}

            <button
              type="submit"
              className="mt-1 inline-flex min-h-10 w-fit items-center justify-center rounded-full bg-primary px-5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:col-span-2"
            >
              Check Availability
            </button>
          </form>

          <figure className="relative mx-auto w-full max-w-md md:max-w-none">
            <img
              src={AboutImg}
              alt="A welcoming hotel team member ready to assist guests"
              className="aspect-7/8 w-full rounded-2xl object-cover object-center"
              loading="lazy"
              decoding="async"
            />
            <figcaption className="absolute inset-x-3 bottom-3 flex flex-wrap justify-center gap-1.5">
              {[
                "Breakfast Included",
                "Swimming Pool",
                "Wifi",
                "Spa & Wellness",
                "Pick Up & Drop",
                "Fitness Hub",
              ].map((amenity) => (
                <span
                  key={amenity}
                  className="rounded-full border border-primary-foreground/70 bg-foreground/20 px-2.5 py-1 text-[10px] text-primary-foreground backdrop-blur-sm"
                >
                  {amenity}
                </span>
              ))}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
