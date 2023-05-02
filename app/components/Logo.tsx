import clsx from "clsx";
import { SwordsIcon } from "lucide-react";

export type LogoProps = {
  className?: string;
  size: "sm" | "md" | "lg";
};

export function Logo({ className, size }: LogoProps) {
  return (
    <div
      className={clsx(
        "flex flex-row items-center",
        { "gap-3": size === "sm" },
        { "gap-6": size === "md" }
      )}
    >
      <SwordsIcon
        className={clsx(
          "fill-teal-teal9 stroke-teal-teal9 dark:fill-tealDark-teal9 dark:stroke-tealDark-teal9",
          { "h-6 w-6": size === "sm" },
          { "h-10 w-10": size === "md" }
        )}
      />
      <h1
        className={clsx(
          "hidden sm:block",
          { "text-xl": size === "sm" },
          { "text-2xl": size === "md" },
          { "font-normal": size === "sm" },
          { "font-medium": size === "md" }
        )}
      >
        Dailies
      </h1>
    </div>
  );
}
