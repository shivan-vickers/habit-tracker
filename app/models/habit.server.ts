import type { Habit, HabitGroup } from "@prisma/client";
import { prisma } from "~/utils/prisma.server";

export type { Habit } from "@prisma/client";

export async function createHabit(
  groupId: Habit["groupId"],
  content: Habit["content"]
) {
  return prisma.habit.create({ data: { groupId, content } });
}

export async function getHabitById(id: Habit["id"]) {
  return prisma.habit.findUnique({ where: { id } });
}

export async function getHabitsByGroupId(groupId: HabitGroup["id"]) {
  return prisma.habit.findMany({ where: { groupId } });
}

export async function updateHabitById(
  id: Habit["id"],
  content: Habit["content"]
) {
  return prisma.habit.update({ where: { id }, data: { content } });
}

export async function deleteHabitById(id: Habit["id"]) {
  return prisma.habit.delete({ where: { id } });
}
