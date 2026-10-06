import { Check, HeartHandshake, Sparkles, Star } from "lucide-react";
import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";

import { FullScreenLoader } from "../common/Loader";



export const AuthLayout = () => {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) return <FullScreenLoader />;

  if (isAuthenticated) return <Navigate to={"/dashboard"} />;

  return (
    <div
      id="signup-page-container"
      className="flex min-h-screen flex-col justify-center bg-background text-foreground lg:flex-row"
    >
      {/* =========================================================================
          LEFT PANEL: Customer Registration Form & Authentication
          ========================================================================= */}

      <div className="flex h-fit flex-col justify-between overflow-y-auto p-6 sm:p-10 md:p-14 lg:w-1/2 lg:p-16 xl:p-20">
        <section className="mx-auto max-w-md pb-20 lg:pb-0">
          <Outlet />
        </section>
      </div>
      {/* =========================================================================
          RIGHT PANEL: Architectural Showcase & Guest Privileges
          ========================================================================= */}
      <div
        id="signup-right-panel"
        className="relative flex min-h-130 w-full flex-col justify-between overflow-hidden bg-card p-8 sm:p-12 lg:min-h-screen lg:w-1/2 lg:p-16 xl:p-20"
      >
        {/* Background Image with Architectural Pool Pavilion */}
        <img
          src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1800&q=85"
          alt="The tranquil pavilion and reflection pool at Nivara"
          className="absolute inset-0 h-full w-full scale-105 object-cover object-center transition-transform duration-1000 ease-out"
        />

        {/* Architectural Gradient Tints for Flawless Readability */}
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-background/30" />
        <div className="absolute inset-0 bg-background/20 backdrop-blur-[1px]" />

        {/* Center / Bottom Atmospheric Content */}
        <div className="relative z-10 my-auto space-y-8 py-12 lg:py-0">
          {/* Architectural Quote */}
          <div className="max-w-lg space-y-3">
            <span className="text-[10px] font-semibold tracking-[0.26em] text-foreground uppercase">
              The Architecture of Stillness
            </span>
            <blockquote className="mt-4 font-serif text-2xl leading-snug font-normal text-foreground sm:text-3xl lg:text-4xl">
              "Nivara is where architecture ceases to be an object and becomes
              an atmosphere of unhurried contemplation."
            </blockquote>
            <p className="pt-1 text-xs font-medium tracking-widest text-foreground uppercase">
              — Julian Alvarez, Principal Architect · Studio Altar
            </p>
          </div>

          {/* Member Privileges Grid */}
          <div className="max-w-xl space-y-4 rounded-2xl border border-border/80 bg-background/85 p-6 shadow-2xl backdrop-blur-md sm:p-8">
            <div className="flex items-center justify-between border-b border-border/70 pb-3">
              <h3 className="font-serif text-base font-medium text-foreground sm:text-lg">
                Privileges of Patron Registration
              </h3>
              <span className="text-[10px] font-semibold tracking-wider text-primary uppercase">
                Complimentary
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 pt-1 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-card text-primary">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">
                    Guaranteed 4 PM Checkout
                  </p>
                  <p className="text-[11px] leading-relaxed text-muted-foreground">
                    Unhurried final morning without packing in haste.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-card text-primary">
                  <Sparkles className="h-3.5 w-3.5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">
                    Private Cellar & Ritual
                  </p>
                  <p className="text-[11px] leading-relaxed text-muted-foreground">
                    Custom native infusions and seasonal vineyard vintages.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-card text-primary">
                  <HeartHandshake className="h-3.5 w-3.5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">
                    Direct Concierge Line
                  </p>
                  <p className="text-[11px] leading-relaxed text-muted-foreground">
                    Dedicated WhatsApp & private line with our head concierge.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-card text-primary">
                  <Star className="h-3.5 w-3.5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">
                    Private Residence Access
                  </p>
                  <p className="text-[11px] leading-relaxed text-muted-foreground">
                    Exclusive booking access for the 4-bedroom Hilltop Estate.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel Bottom Credit Bar */}
        <div className="relative z-10 flex items-center justify-between pt-4 text-[11px] font-light text-foreground/80">
          <span>The North Colonnade & Reflecting Pool</span>
          <span>Studio Altar · Completed 2016</span>
        </div>
      </div>
    </div>
  );
};
