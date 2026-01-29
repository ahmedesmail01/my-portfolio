import React from "react";
import clsx from "clsx";

export default function Section({
  id,
  title,
  subtitle,
  children,
  className,
}: {
  id?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={clsx("mx-auto max-w-6xl px-6 py-20", className)}
    >
      <header className="flex items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
          {subtitle ? (
            <p className="mt-2 max-w-2xl text-white/65">{subtitle}</p>
          ) : null}
        </div>
        <span className="hidden rounded-full border border-stroke bg-glass px-3 py-1 text-xs text-white/70 md:inline-flex">
          cinematic • fast • modern
        </span>
      </header>
      <div className="mt-10">{children}</div>
    </section>
  );
}
