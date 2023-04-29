import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";

import type { Habit } from "@prisma/client";

import { HabitGroupView } from "~/components/HabitGroupView";
import {
  deleteHabitGroupById,
  getHabitGroupsByUserId,
  updateHabitGroupById,
} from "~/models/habit-group.server";
import {
  createHabit,
  deleteHabitById,
  getHabitsByGroupId,
  updateHabitById,
} from "~/models/habit.server";
import { requireUserId } from "~/utils/session.server";
import { badRequest } from "~/utils/utils.server";

export type HabitGroupWithHabits = {
  id: string;
  name: string;
  userId: string;
  habits: Habit[];
};

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const habitGroups = await getHabitGroupsByUserId(userId);

  let habitGroupsWithHabits: HabitGroupWithHabits[] = [];

  for (const habitGroup of habitGroups) {
    habitGroupsWithHabits.push({
      ...habitGroup,
      habits: await getHabitsByGroupId(habitGroup.id),
    });
  }

  return json({ habitGroups: habitGroupsWithHabits });
}

export async function action({ request }: ActionArgs) {
  const method = request.method;

  if (method !== "POST") {
    throw json(`Method ${method} is not supported`, { status: 405 });
  }

  const form = await request.formData();

  const intent = form.get("intent");
  const groupId = form.get("groupId");
  const habitId = form.get("habitId");

  if (intent === "update") {
    const content = form.get("content");
    const previousContent = form.get("previousContent");

    if (!content || content === previousContent) {
      return json({ status: 100 });
    }

    if (habitId) {
      const parsedHabitId = parseInt(habitId.toString());
      if (!parsedHabitId) throw badRequest("Invalid ID");

      await updateHabitById(parsedHabitId, content.toString());

      return json(`Updated Habit with ID ${parsedHabitId}`, { status: 200 });
    } else if (groupId) {
      await updateHabitGroupById(groupId.toString(), content.toString());

      return json(`Updated group with ID: ${groupId}`, { status: 200 });
    } else {
      return badRequest("An ID is required");
    }
  } else if (intent === "create") {
    const content = form.get("content");
    if (!content) return json({ status: 100 });

    if (!groupId) throw badRequest("Group ID is required");

    const habit = await createHabit(groupId.toString(), content.toString());

    return json(`Created new habit with ID: ${habit.id}`, { status: 201 });
  } else if (intent === "delete") {
    if (!groupId && !habitId) throw badRequest("An ID is required");

    if (groupId) {
      await deleteHabitGroupById(groupId.toString());
      return json(`Deleted habit group with ID: ${groupId}`, { status: 200 });
    }

    if (habitId) {
      const parsedHabitId = parseInt(habitId.toString());
      if (!parsedHabitId) throw badRequest("Invalid ID");

      await deleteHabitById(parsedHabitId);
      return json(`Deleted habit with ID: ${habitId}`, { status: 200 });
    }
  } else {
    throw badRequest("Invalid intent");
  }
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
              id={group.id}
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
