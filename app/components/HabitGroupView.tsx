import type { Habit } from "@prisma/client";
import { clsx } from "clsx";
import {
  GripVerticalIcon,
  PaletteIcon,
  PlusIcon,
  Trash2Icon,
  XIcon,
} from "lucide-react";

export type HabitGroupViewProps = {
  className?: string;
  name: string;
  habits: Habit[];
};

export function HabitGroupView({
  className,
  name,
  habits,
}: HabitGroupViewProps) {
  const constructedClassName = clsx(
    "rounded-lg border border-sage-sage7 py-3 dark:border-sageDark-sage7",
    className
  );

  return (
    <div className={constructedClassName}>
      <p className="px-4 pb-2 font-semibold">{name}</p>
      <ul className="flex flex-col">
        {habits.map((habit) => (
          <li
            className="my-px flex flex-row items-center justify-between border-sageDark-sage7 px-2 py-2 hover:my-0 hover:border-b hover:border-t"
            key={habit.id}
          >
            <div className="flex flex-row items-start gap-1">
              <GripVerticalIcon
                className="mt-[2px] stroke-sageDark-sage11"
                size={20}
              />
              {habit.content}
            </div>
            <XIcon className="mt-[2px] stroke-sageDark-sage11" size={20} />
          </li>
        ))}
        <li className="flex flex-row items-center gap-1 px-3 py-2 text-sageDark-sage11">
          <PlusIcon size={18} />
          New habit
        </li>
      </ul>
      <div className="flex flex-row justify-between gap-4 px-2 pt-2">
        <PaletteIcon
          className="h-9 w-9 rounded-full stroke-sageDark-sage11 p-2 hover:bg-sageDark-sage8"
          size={16}
        />
        <Trash2Icon
          className="h-9 w-9 rounded-full stroke-sageDark-sage11 p-2 hover:bg-sageDark-sage8"
          size={16}
        />
      </div>
    </div>
  );
}
