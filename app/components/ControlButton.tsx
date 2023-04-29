import { useFetcher } from "@remix-run/react";
import clsx from "clsx";
import { PaletteIcon, Trash2Icon, XIcon } from "lucide-react";

export type ControlButtonProps = {
  className?: string;
  intent: string;
  name: string;
  value: string | number;
  icon: "X" | "Pallette" | "Trash";
};

export function ControlButton({
  className,
  intent,
  name,
  value,
  icon,
}: ControlButtonProps) {
  const fetcher = useFetcher();

  const constructedClassName = clsx(
    "stroke-sage-sage11 dark:stroke-sageDark-sage11 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100",
    className
  );

  return (
    <fetcher.Form className="flex items-center" method="post">
      <input type="hidden" name={name} value={value} />
      <button
        className="rounded-full opacity-0 transition-opacity duration-500 hover:bg-sage-sage6 group-hover/card:opacity-100 dark:hover:bg-sageDark-sage6"
        name="intent"
        value={intent}
      >
        {icon === "X" ? <XIcon className={constructedClassName} /> : null}
        {icon === "Pallette" ? (
          <PaletteIcon className={constructedClassName} />
        ) : null}
        {icon === "Trash" ? (
          <Trash2Icon className={constructedClassName} />
        ) : null}
      </button>
    </fetcher.Form>
  );
}
