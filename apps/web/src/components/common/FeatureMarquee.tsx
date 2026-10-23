import { Sparkle } from "lucide-react";
import React from "react";

// Custom 4-pointed star icon to match the reference image exactly

export function FeatureMarquee() {
  const features = [
    "Breakfast Included",
    "Swimming Pool",
    "High Speed Wifi",
    "Spa & Wellness",
  ];

  // We duplicate the items a few times so the continuous scroll never runs out of content
  const marqueeItems = [...features, ...features, ...features];

  return (
    <div className="relative flex w-full items-center overflow-hidden border-y border-border/20 bg-primary py-4 md:py-6">
      {/* 
        Inline styles are used here for the keyframe animation to ensure it works 
        immediately without requiring modifications to the Tailwind config file.
      */}
      <style>
        {`
          @keyframes infinite-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-70%); }
          }
          .animate-infinite-scroll {
            animation: infinite-scroll 25s linear infinite;
          }
          .animate-infinite-scroll:hover {
            animation-play-state: paused;
          }
        `}
      </style>

      {/* Marquee Track */}
      <div className="animate-infinite-scroll flex w-max whitespace-nowrap">
        <div className="flex items-center">
          {marqueeItems.map((feature, index) => (
            <React.Fragment key={index}>
              {/* Text Item */}
              <span className="px-8 font-heading text-xl font-medium tracking-wide text-primary-foreground md:px-12 md:text-2xl">
                {feature}
              </span>

              {/* Separator Icon */}
              <Sparkle className="h-5 w-5 shrink-0 text-secondary md:h-6 md:w-6" />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
