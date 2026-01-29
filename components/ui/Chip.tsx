import clsx from "clsx";

export default function Chip({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border border-stroke bg-black/25 px-3 py-1 text-xs text-white/75",
        className,
      )}
    >
      {children}
    </span>
  );
}
