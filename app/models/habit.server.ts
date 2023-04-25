import type { Habit, HabitGroup } from "@prisma/client";
import { prisma } from "~/utils/prisma.server";

export type { Habit } from "@prisma/client";

export async function createHabit({ groupId, content }: Habit) {
  return prisma.habit.create({ data: { groupId, content } });
}

export async function getHabitsByGroupId(groupId: HabitGroup["id"]) {
  return prisma.habit.findMany({ where: { groupId } });
}

export async function updateHabitById({ groupId, content }: Habit) {}

export async function deleteHabitById(id: Habit["id"]) {}
