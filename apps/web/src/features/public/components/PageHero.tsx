import React from "react";
import { Link } from "react-router-dom";

interface PageHeroProps {
  title: string;
  paths: { label: string; href?: string }[];
  backgroundImage: string;
}

export default function PageHero({
  title,
  paths,
  backgroundImage,
}: PageHeroProps) {
  return (
    <section className="relative flex h-50 w-full flex-col items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      />

      {/* Dark Overlay for Text Readability */}
      <div className="absolute inset-0 z-0 bg-black/50" />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center px-4 text-center">
        <h1 className="mb-2 font-heading text-3xl leading-tight text-white md:text-4xl">
          {title}
        </h1>

        {/* Breadcrumb Navigation */}
        <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-white/90 md:text-base">
          {paths.map((path, index) => (
            <React.Fragment key={index}>
              {path.href ? (
                <Link
                  to={path.href}
                  className="underline-offset-4 transition-colors hover:text-primary-foreground hover:underline"
                >
                  {path.label}
                </Link>
              ) : (
                <span>{path.label}</span>
              )}

              {/* Separator */}
              {index < paths.length - 1 && (
                <span className="mx-1 text-white/60">|</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
