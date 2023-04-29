import type { HabitGroup, User } from "@prisma/client";
import { prisma } from "~/utils/prisma.server";

export type { Habit } from "@prisma/client";

export async function createHabitGroup({ name, userId }: HabitGroup) {}

export async function getHabitGroupById(id: HabitGroup["id"]) {}

export async function getHabitGroupsByUserId(userId: User["id"]) {
  return prisma.habitGroup.findMany({ where: { userId } });
}

export async function updateHabitGroupById(
  id: HabitGroup["id"],
  name: HabitGroup["name"]
) {
  return prisma.habitGroup.update({ where: { id }, data: { name } });
}

export async function deleteHabitGroupById(id: HabitGroup["id"]) {}
