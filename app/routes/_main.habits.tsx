import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";

import type { Habit } from "@prisma/client";

import { HabitGroupView } from "~/components/HabitGroupView";
import { getHabitGroupsByUserId } from "~/models/habit-group.server";
import { getHabitsByGroupId } from "~/models/habit.server";
import { requireUserId } from "~/utils/session.server";

export type HabitGroupWithHabits = {
  id: number;
  name: string;
  userId: string;
  habits: Habit[];
};

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  console.log(formData);

  return redirect(``);
}

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const habitGroups = await getHabitGroupsByUserId(userId);

  let groupsWithHabits: HabitGroupWithHabits[] = [];

  for (const habitGroup of habitGroups) {
    groupsWithHabits.push({
      ...habitGroup,
      habits: await getHabitsByGroupId(habitGroup.id),
    });
  }

  return json({ habitGroups: groupsWithHabits });
}

export default function Habits() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="flex w-full justify-center">
      <div className="flex w-fit flex-row flex-wrap gap-2">
        {data.habitGroups.map((group) => {
          return (
            <HabitGroupView
              className="h-fit w-60"
              key={group.id}
              name={group.name}
              habits={group.habits}
            />
          );
        })}
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  let error = useRouteError();

  function errorContainer(heading?: any, content?: any) {
    return (
      <div className="m-12 border border-redDark-red6 bg-redDark-red2 p-4 text-redDark-red9">
        {heading ? <h1 className="text-lg font-semibold">{heading}</h1> : null}
        {content ? <pre>{content}</pre> : null}
      </div>
    );
  }

  if (isRouteErrorResponse(error)) {
    return errorContainer(`${error.status} ${error.statusText}`, error.data);
  } else if (error instanceof Error) {
    return errorContainer(error.message, error.stack);
  } else {
    return errorContainer(
      "Unknown Error",
      "I actually have no idea what happened here. Sorry!"
    );
  }
}
