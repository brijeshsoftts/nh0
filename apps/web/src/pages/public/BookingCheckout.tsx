import { ChevronRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import HeroImage from "@/assets/landing_hero.png";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { HoverText } from "@/features/public/components/hoverText";

function HeroSection() {
  const { slug } = useParams();

  return (
    <section className="relative flex h-[50vh] max-h-70 min-h-50 w-full items-center overflow-hidden font-sans">
      {/* Background Image */}
      {/* Referencing the exact image file provided */}
      <img
        src={HeroImage}
        alt="Sahara Sands resort pool at sunset"
        className="absolute inset-0 z-0 h-full w-full object-cover object-center"
      />

      {/* Gradient Overlay for Text Readability */}
      {/* Uses the semantic foreground token (Deep Warm Brown) to blend naturally with the brand palette */}
      <div className="absolute inset-0 w-[90%] bg-linear-to-r from-background via-background/95 to-background/50 sm:w-[00%] sm:to-transparent" />

      {/* Content Container */}
      <div className="relative z-20 container mx-auto flex h-full flex-col items-start justify-center px-6 pt-12 md:px-12">
        <div className="">
          <Breadcrumb>
            <BreadcrumbList className="text-white/70 sm:gap-2">
              <BreadcrumbItem>
                <BreadcrumbLink className="text-[13px] text-white/70 transition-colors hover:text-white md:text-[14px]">
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/50">
                <ChevronRight className="h-3.5 w-3.5" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink className="text-[13px] text-white/70 transition-colors hover:text-white md:text-[14px]">
                  <Link to="/rooms">Rooms</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/50">
                <ChevronRight className="h-3.5 w-3.5" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="text-[13px] text-white/70 transition-colors hover:text-white md:text-[14px]">
                  <Link to={`/rooms/${slug}`}>
                    {slug?.replaceAll("-", " ")}
                  </Link>
                </BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/50">
                <ChevronRight className="h-3.5 w-3.5" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="text-[13px] text-white md:text-[14px]">
                  Checkout
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h1 className="mb-6 font-heading text-4xl tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[72px]">
            <HoverText staggerDelay={30} duration={400}>
              Complete your <span className="text-primary">Booking</span>
            </HoverText>
          </h1>

          <p className="mb-6 text-base leading-relaxed font-light text-white/80 md:text-lg">
            Just a few more details to confirm your stay at Nivara.
          </p>

          {/* Breadcrumb Navigation */}
        </div>
      </div>
    </section>
  );
}

import {
  ArrowLeft,
  ArrowRight,
  Baby,
  Bed,
  Calendar,
  ChevronDown,
  CircleDot,
  CreditCard,
  Globe,
  Info,
  Landmark,
  Lock,
  Mail,
  MessageSquare,
  Moon,
  Phone,
  Scaling,
  ShieldCheck,
  Tag,
  User,
  Users,
} from "lucide-react";
import * as React from "react";
import { FaCcMastercard, FaCcVisa, FaGooglePay } from "react-icons/fa";
import { SiPaytm, SiPhonepe } from "react-icons/si";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

function CheckoutSection() {
  const [paymentMethod, setPaymentMethod] = React.useState("card");

  return (
    <div className="min-h-screen bg-background py-8 font-sans text-foreground md:py-12">
      <div className="container mx-auto max-w-300 px-4 md:px-8">
        {/* Progress Bar */}
        <div className="mx-auto mb-10 flex max-w-2xl items-start justify-center gap-2 md:gap-4">
          {/* Step 1 */}
          <div className="flex flex-1 flex-col items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-sm">
              1
            </div>
            <span className="text-xs font-semibold text-primary">
              Guest Details
            </span>
          </div>

          <div className="mt-4 h-px flex-1 bg-border" />

          {/* Step 2 */}
          <div className="flex flex-1 flex-col items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border/80 bg-card text-sm font-bold text-foreground/40">
              2
            </div>
            <span className="text-xs font-medium text-foreground/40">
              Payment
            </span>
          </div>

          <div className="mt-4 h-[1px] flex-1 bg-border" />

          {/* Step 3 */}
          <div className="flex flex-1 flex-col items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border/80 bg-card text-sm font-bold text-foreground/40">
              3
            </div>
            <span className="text-xs font-medium text-foreground/40">
              Confirmation
            </span>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_420px] lg:gap-10">
          {/* Left Column: Form Sections */}
          <div className="flex flex-col gap-6">
            {/* 1. Guest Information */}
            <Card className="rounded-2xl border-border/60 bg-card p-6 shadow-sm md:p-8">
              <div className="mb-6 flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="font-serif text-xl font-bold text-foreground">
                      Guest Information
                    </h2>
                    <p className="mt-0.5 text-sm text-foreground/60">
                      Please provide your details for the booking.
                    </p>
                  </div>
                </div>
                <span className="mt-1 hidden text-[11px] text-foreground/50 sm:block">
                  All fields are required *
                </span>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-foreground/80">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-primary/70" />
                    <Input
                      placeholder="Enter your full name"
                      className="h-11 rounded-xl border-input bg-background/50 pl-10 text-sm"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-foreground/80">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-primary/70" />
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      className="h-11 rounded-xl border-input bg-background/50 pl-10 text-sm"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-foreground/80">
                    Phone Number *
                  </label>
                  <div className="flex gap-2">
                    <div className="relative w-24 shrink-0">
                      <select className="h-11 w-full appearance-none rounded-xl border border-input bg-background/50 pr-8 pl-3 text-sm outline-none focus:ring-1 focus:ring-primary">
                        <option>+91</option>
                        <option>+1</option>
                        <option>+44</option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 h-3.5 w-3.5 -translate-y-1/2 text-foreground/50" />
                    </div>
                    <div className="relative flex-1">
                      <Phone className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-primary/70" />
                      <Input
                        type="tel"
                        placeholder="Enter phone number"
                        className="h-11 rounded-xl border-input bg-background/50 pl-10 text-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-foreground/80">
                    Country *
                  </label>
                  <div className="relative">
                    <Globe className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-primary/70" />
                    <select className="h-11 w-full appearance-none rounded-xl border border-input bg-background/50 pr-10 pl-10 text-sm text-foreground outline-none focus:ring-1 focus:ring-primary">
                      <option>India</option>
                      <option>United States</option>
                      <option>United Kingdom</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-foreground/50" />
                  </div>
                </div>
              </div>
            </Card>

            {/* 2. Stay Details */}
            <Card className="rounded-2xl border-border/60 bg-card p-6 shadow-sm md:p-8">
              <div className="mb-6 flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-serif text-xl font-bold text-foreground">
                    Stay Details
                  </h2>
                  <p className="mt-0.5 text-sm text-foreground/60">
                    Review your booking details.
                  </p>
                </div>
              </div>

              <div className="mb-5 grid grid-cols-2 items-end gap-5 md:grid-cols-[1fr_1fr_auto]">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-foreground/80">
                    Check-in Date
                  </label>
                  <div className="flex h-11 items-center gap-2.5 rounded-xl border border-border/50 bg-background/40 px-3.5 text-sm text-foreground/80">
                    <Calendar className="h-4 w-4 text-primary/70" />
                    15 Nov 2024
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-foreground/80">
                    Check-out Date
                  </label>
                  <div className="flex h-11 items-center gap-2.5 rounded-xl border border-border/50 bg-background/40 px-3.5 text-sm text-foreground/80">
                    <Calendar className="h-4 w-4 text-primary/70" />
                    18 Nov 2024
                  </div>
                </div>
                <div className="col-span-2 flex flex-col gap-1.5 md:col-span-1">
                  <label className="text-xs font-semibold text-foreground/80 md:hidden">
                    Duration
                  </label>
                  <div className="flex h-11 items-center justify-center gap-2 rounded-xl bg-secondary/60 px-4 text-sm font-medium text-foreground/90">
                    <Moon className="h-4 w-4 text-primary" />3 Nights
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-foreground/80">
                    Number of Adults
                  </label>
                  <div className="relative">
                    <Users className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-primary/70" />
                    <select className="h-11 w-full appearance-none rounded-xl border border-input bg-background/50 pr-10 pl-10 text-sm outline-none focus:ring-1 focus:ring-primary">
                      <option>2 Adults</option>
                      <option>1 Adult</option>
                      <option>3 Adults</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-foreground/50" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-foreground/80">
                    Number of Children
                  </label>
                  <div className="relative">
                    <Baby className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-primary/70" />
                    <select className="h-11 w-full appearance-none rounded-xl border border-input bg-background/50 pr-10 pl-10 text-sm outline-none focus:ring-1 focus:ring-primary">
                      <option>0 Children</option>
                      <option>1 Child</option>
                      <option>2 Children</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-foreground/50" />
                  </div>
                </div>
              </div>
            </Card>

            {/* 3. Special Requests */}
            <Card className="rounded-2xl border-border/60 bg-card p-6 shadow-sm md:p-8">
              <div className="mb-6 flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-serif text-xl font-bold text-foreground">
                    Special Requests{" "}
                    <span className="ml-1 font-sans text-sm font-normal text-foreground/50">
                      (Optional)
                    </span>
                  </h2>
                  <p className="mt-0.5 text-sm text-foreground/60">
                    Let us know if you have any special requests. We'll do our
                    best to accommodate you.
                  </p>
                </div>
              </div>
              <Textarea
                placeholder="E.g. Early check-in, extra bed, room with sea view, etc."
                className="min-h-[100px] resize-none rounded-xl border-input bg-background/50 text-sm"
              />
            </Card>

            {/* 4. Payment Method */}
            <Card className="rounded-2xl border-border/60 bg-card p-6 shadow-sm md:p-8">
              <div className="mb-6 flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-serif text-xl font-bold text-foreground">
                    Payment Method
                  </h2>
                  <p className="mt-0.5 text-sm text-foreground/60">
                    Choose your preferred payment method.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {/* Card Option */}
                <div
                  onClick={() => setPaymentMethod("card")}
                  className={cn(
                    "flex cursor-pointer items-center justify-between rounded-xl border-2 p-4 transition-all",
                    paymentMethod === "card"
                      ? "border-primary bg-primary/5"
                      : "border-border/50 bg-background/30 hover:border-primary/40"
                  )}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="text-primary">
                      {paymentMethod === "card" ? (
                        <CircleDot className="h-5 w-5 fill-primary text-primary" />
                      ) : (
                        <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/40" />
                      )}
                    </div>
                    <CreditCard className="h-5 w-5 text-foreground/70" />
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-foreground">
                        Credit / Debit Card
                      </span>
                      <span className="text-[11px] text-foreground/50">
                        Pay securely with your card.
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <FaCcVisa className="h-7 w-7 text-[#1A1F71]" />
                    <FaCcMastercard className="h-7 w-7 text-[#EB001B]" />
                    {/* RuPay mock text icon */}
                    <div className="flex h-7 items-center justify-center rounded border bg-white px-1.5 text-[10px] font-bold text-[#F26522] italic">
                      RuPay
                    </div>
                  </div>
                </div>

                {/* UPI Option */}
                <div
                  onClick={() => setPaymentMethod("upi")}
                  className={cn(
                    "flex cursor-pointer items-center justify-between rounded-xl border-2 p-4 transition-all",
                    paymentMethod === "upi"
                      ? "border-primary bg-primary/5"
                      : "border-border/50 bg-background/30 hover:border-primary/40"
                  )}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="text-primary">
                      {paymentMethod === "upi" ? (
                        <CircleDot className="h-5 w-5 fill-primary text-primary" />
                      ) : (
                        <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/40" />
                      )}
                    </div>
                    {/* Generic UPI icon stand-in */}
                    <svg
                      className="h-5 w-5 text-foreground/70"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-foreground">
                        UPI Payment
                      </span>
                      <span className="text-[11px] text-foreground/50">
                        Pay using UPI apps
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaGooglePay className="h-8 w-8 text-foreground/80" />
                    <SiPhonepe className="h-6 w-6 text-[#5f259f]" />
                    <SiPaytm className="h-9 w-9 text-[#002970]" />
                  </div>
                </div>

                {/* Net Banking Option */}
                <div
                  onClick={() => setPaymentMethod("netbanking")}
                  className={cn(
                    "flex cursor-pointer items-center justify-between rounded-xl border-2 p-4 transition-all",
                    paymentMethod === "netbanking"
                      ? "border-primary bg-primary/5"
                      : "border-border/50 bg-background/30 hover:border-primary/40"
                  )}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="text-primary">
                      {paymentMethod === "netbanking" ? (
                        <CircleDot className="h-5 w-5 fill-primary text-primary" />
                      ) : (
                        <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/40" />
                      )}
                    </div>
                    <Landmark className="h-5 w-5 text-foreground/70" />
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-foreground">
                        Net Banking
                      </span>
                      <span className="text-[11px] text-foreground/50">
                        Pay through your bank account
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Terms and Checkbox */}
            <div className="flex items-center space-x-3 px-2 pt-2">
              <Checkbox
                id="terms"
                className="border-primary/50 data-[state=checked]:bg-primary"
              />
              <label
                htmlFor="terms"
                className="text-sm leading-none font-medium text-foreground/80 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the{" "}
                <span className="cursor-pointer text-primary underline hover:text-primary/80">
                  Terms & Conditions
                </span>{" "}
                and{" "}
                <span className="cursor-pointer text-primary underline hover:text-primary/80">
                  Cancellation Policy
                </span>{" "}
                *
              </label>
            </div>

            {/* Back Button */}
            <div className="pt-2">
              <Button
                variant="outline"
                className="h-11 rounded-xl border-border px-5 text-foreground hover:bg-secondary/50"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Room Details
              </Button>
            </div>
          </div>

          {/* Right Column: Booking Summary & Policies */}
          <div className="flex flex-col gap-6">
            {/* Room Summary Card */}
            <Card className="overflow-hidden rounded-2xl border-border/60 bg-card shadow-sm">
              {/* Room Image */}
              <div className="relative h-[220px] w-full">
                <img
                  src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop"
                  alt="Deluxe Room Ocean View"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="p-6 md:p-7">
                {/* Title & Price */}
                <div className="mb-2 flex items-start justify-between">
                  <h3 className="font-serif text-2xl font-bold text-foreground">
                    Deluxe Room
                  </h3>
                  <div className="text-right">
                    <span className="text-[18px] font-bold text-foreground">
                      ₹ 4,500
                    </span>
                    <span className="text-[13px] text-foreground/70">
                      {" "}
                      / night
                    </span>
                  </div>
                </div>

                <p className="mb-5 text-sm leading-relaxed text-foreground/60">
                  A comfortable and elegant room with modern amenities and sea
                  view.
                </p>

                {/* Badges */}
                <div className="mb-6 flex items-center gap-4 border-b border-border/50 pb-6">
                  <div className="flex items-center gap-1.5 text-[13px] font-medium text-foreground/80">
                    <Bed className="h-4 w-4 text-primary" /> King Bed
                  </div>
                  <div className="flex items-center gap-1.5 text-[13px] font-medium text-foreground/80">
                    <Scaling className="h-4 w-4 text-primary" /> 350 sq.ft.
                  </div>
                  <div className="flex items-center gap-1.5 text-[13px] font-medium text-foreground/80">
                    <User className="h-4 w-4 text-primary" /> 2 Guests
                  </div>
                </div>

                {/* Dates */}
                <div className="mb-6 flex justify-between border-b border-border/50 pb-6">
                  <div className="flex flex-col">
                    <span className="mb-2 text-xs font-semibold tracking-wider text-foreground/60 uppercase">
                      Check-in
                    </span>
                    <div className="mb-1 flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="text-sm font-bold text-foreground">
                        15 Nov 2024
                      </span>
                    </div>
                    <span className="ml-6 text-[11px] text-foreground/50">
                      From 2:00 PM
                    </span>
                  </div>
                  <div className="flex flex-col items-end text-right">
                    <span className="mb-2 text-xs font-semibold tracking-wider text-foreground/60 uppercase">
                      Check-out
                    </span>
                    <div className="mb-1 flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="text-sm font-bold text-foreground">
                        18 Nov 2024
                      </span>
                    </div>
                    <span className="mr-6 text-[11px] text-foreground/50">
                      Until 11:00 AM
                    </span>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="mb-6 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground/70">
                      ₹ 4,500 × 3 nights
                    </span>
                    <span className="font-semibold text-foreground">
                      ₹ 13,500
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground/70">
                      Taxes & Fees (10%)
                    </span>
                    <span className="font-semibold text-foreground">
                      ₹ 1,350
                    </span>
                  </div>
                </div>

                <div className="mb-6 flex items-center justify-between border-t border-border/50 pt-5">
                  <span className="text-lg font-bold text-foreground">
                    Total Amount
                  </span>
                  <span className="font-serif text-2xl font-bold tracking-tight text-foreground">
                    ₹ 14,850
                  </span>
                </div>

                {/* Best Price Tag */}
                <div className="flex items-start gap-3 rounded-xl border border-[#C5E1D4] bg-[#EAF3EE] p-3">
                  <Tag className="mt-0.5 h-5 w-5 shrink-0 text-[#2E7D56]" />
                  <div className="flex flex-col">
                    <span className="text-[13px] font-bold text-[#2E7D56]">
                      Best Price Guaranteed
                    </span>
                    <span className="mt-0.5 text-[11px] text-[#2E7D56]/80">
                      No hidden charges. You're getting the best rate!
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Cancellation Policy */}
            <Card className="rounded-2xl border-border/60 bg-card p-6 shadow-sm">
              <div className="mb-4 flex gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <ShieldCheck className="h-3.5 w-3.5" />
                </div>
                <h3 className="font-serif text-base font-bold text-foreground">
                  Cancellation Policy
                </h3>
              </div>
              <ul className="mb-4 space-y-2 text-[13px] font-medium text-foreground/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/60" />
                  Free cancellation up to 24 hours before check-in.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/60" />
                  Cancellations within 24 hours will be charged for 1 night.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/60" />
                  No show will be charged the full booking amount.
                </li>
              </ul>
              <a
                href="#policy"
                className="flex items-center gap-1 text-[13px] font-bold text-primary hover:underline"
              >
                View Full Policy <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </Card>

            {/* Important Info */}
            <Card className="rounded-2xl border-border/60 bg-card p-6 shadow-sm">
              <div className="mb-4 flex gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Info className="h-3.5 w-3.5" />
                </div>
                <h3 className="font-serif text-base font-bold text-foreground">
                  Important Information
                </h3>
              </div>
              <ul className="space-y-2 text-[13px] font-medium text-foreground/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/60" />
                  Check-in time: 2:00 PM
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/60" />
                  Check-out time: 11:00 AM
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/60" />
                  Valid ID proof is required at check-in.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/60" />
                  Breakfast is included in your stay.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/60" />
                  Extra bed available on request (charges may apply).
                </li>
              </ul>
            </Card>

            {/* Sticky Action (Desktop bottom, mobile can be sticky bottom) */}
            <div className="mt-2 flex flex-col gap-3">
              <Button className="group h-14 w-full rounded-xl bg-primary text-[15px] font-bold text-primary-foreground shadow-md transition-all hover:bg-primary/90">
                <Lock className="mr-2 h-4 w-4" />
                Pay ₹ 14,850 and Confirm Booking
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-foreground/50">
                <ShieldCheck className="h-3.5 w-3.5" />
                Your payment information is secure and encrypted.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingCheckout() {
  return (
    <>
      <HeroSection />
      <CheckoutSection />
    </>
  );
}
