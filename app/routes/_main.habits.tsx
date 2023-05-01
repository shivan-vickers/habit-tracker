import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  useLoaderData,
  useRouteError,
  isRouteErrorResponse,
} from "@remix-run/react";

import type { Habit } from "@prisma/client";
import { Masonry } from "react-plock";

import type { ErrorMessage } from "~/components/ErrorContainer";
import { ErrorContainer } from "~/components/ErrorContainer";
import { HabitGroupView } from "~/components/HabitGroupView";
import {
  createHabitGroup,
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
import { AddGroupBox } from "~/components/AddGroupBox";

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

  return json({ userId, habitGroups: habitGroupsWithHabits });
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

  if (intent === "updateHabit") {
    const content = form.get("content");
    const previousContent = form.get("previousContent");

    if (!content || content === previousContent) {
      return json({ status: 100 });
    }

    if (!habitId) throw badRequest("Habit ID is required");

    const parsedHabitId = parseInt(habitId.toString());
    if (!parsedHabitId) throw badRequest("Invalid ID");

    await updateHabitById(parsedHabitId, content.toString());
    return json(`Updated Habit with ID ${parsedHabitId}`, { status: 200 });
  } else if (intent === "createHabit") {
    const content = form.get("content");
    if (!content) return json({ status: 100 });

    if (!groupId) throw badRequest("Group ID is required");

    const habit = await createHabit(groupId.toString(), content.toString());

    return json(`Created new habit with ID: ${habit.id}`, { status: 201 });
  } else if (intent === "deleteHabit") {
    if (!habitId) throw badRequest("Habit ID is required");

    const parsedHabitId = parseInt(habitId.toString());
    if (!parsedHabitId) throw badRequest("Invalid ID");

    await deleteHabitById(parsedHabitId);

    return json(`Deleted habit with ID: ${parsedHabitId}`, { status: 200 });
  } else if (intent === "updateGroup") {
    const groupName = form.get("groupName");
    const previousName = form.get("previousName");

    if (!groupName || groupName === previousName) {
      return json({ status: 100 });
    }

    if (!groupId) throw badRequest("Group ID is required");

    await updateHabitGroupById(groupId.toString(), groupName.toString());

    return json(`Updated group with ID: ${groupId}`, { status: 200 });
  } else if (intent === "createGroup") {
    const name = form.get("groupName");
    if (!name) return json({ status: 200 });

    const userId = form.get("userId");
    if (!userId) throw badRequest("User ID is required");

    const habitGroup = await createHabitGroup(
      name.toString(),
      userId.toString()
    );

    return json(`Created new habit group with ID: ${habitGroup.id}`, {
      status: 201,
    });
  } else if (intent === "deleteGroup") {
    if (!groupId) throw badRequest("Group ID is required");

    await deleteHabitGroupById(groupId.toString());

    return json(`Deleted habit group with ID: ${groupId}`, { status: 200 });
  } else {
    throw badRequest("Invalid intent");
  }
}

export default function Habits() {
  const data = useLoaderData<typeof loader>();

  const items = data.habitGroups.map((group) => {
    return (
      <HabitGroupView
        className="h-fit w-60"
        key={group.id}
        id={group.id}
        name={group.name}
        habits={group.habits}
      />
    );
  });

  return (
    <>
      <AddGroupBox className="mx-auto mb-10 w-96 p-1" userId={data.userId} />
      <div className="mx-auto w-fit">
        <Masonry
          items={items}
          config={{
            columns: [1, 2, 3, 4, 5],
            gap: [12, 12, 12, 12, 12],
            media: [640, 768, 1024, 1280, 1536],
          }}
          render={(item, idx) => <div key={idx}>{item}</div>}
        />
      </div>
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  let { heading, content }: ErrorMessage = {
    heading: "Unknown Error",
    content: "I actually have no idea what happened here. Sorry!",
  };

  if (isRouteErrorResponse(error)) {
    heading = ` ${error.status} ${error.statusText}`;
    content = error.data;
  } else if (error instanceof Error) {
    heading = error.message;
    content = error.stack;
  }

  return <ErrorContainer heading={heading} content={content} />;
}
