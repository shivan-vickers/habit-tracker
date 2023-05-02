import type { Habit } from "@prisma/client";
import { clsx } from "clsx";
import { GripVerticalIcon } from "lucide-react";

import { ControlButton } from "./ControlButton";
import { GroupName } from "./GroupName";
import { HabitListItem } from "./HabitListItem";
import { NewListItem } from "./NewListItem";

export type HabitGroupViewProps = {
  className?: string;
  id: string;
  name: string;
  habits: Habit[];
};

export function HabitGroupView({
  className,
  id,
  name,
  habits,
}: HabitGroupViewProps) {
  return (
    <div
      className={clsx(
        "group/card rounded-lg border border-sage-sage8 py-3 shadow-blackA-blackA10 hover:shadow-md dark:border-sageDark-sage8",
        className
      )}
    >
      <GroupName id={id} name={name} />
      <ul className="flex max-h-96 flex-col overflow-auto">
        {habits.map((habit) => (
          <li
            className="group/item my-px flex flex-row items-center justify-between border-0 border-sage-sage7 px-2 hover:my-0 hover:border-b hover:border-t dark:border-sageDark-sage7"
            key={habit.id}
          >
            <GripVerticalIcon className="h-6 w-6 stroke-sage-sage11 opacity-0 group-hover/item:opacity-100 dark:stroke-sageDark-sage11" />
            <HabitListItem id={habit.id} content={habit.content} />
            <ControlButton
              className="h-8 w-8 p-2 group-hover/item:opacity-100"
              intent="deleteHabit"
              name="habitId"
              value={habit.id}
              icon="X"
            />
          </li>
        ))}
        <li>
          <NewListItem groupId={id} />
        </li>
      </ul>
      <div className="flex flex-row items-center justify-between px-2">
        <ControlButton
          className="h-9 w-9 p-2 transition-opacity duration-500 group-hover/card:opacity-100"
          intent="changeColor"
          name="groupId"
          value={id}
          icon="Pallette"
        />
        <ControlButton
          className="h-9 w-9 p-2 transition-opacity duration-500 group-hover/card:opacity-100"
          intent="deleteGroup"
          name="groupId"
          value={id}
          icon="Trash"
        />
      </div>
    </div>
  );
}
