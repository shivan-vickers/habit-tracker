import type { User } from "@prisma/client";
import bcrypt from "bcryptjs";

import { prisma } from "~/utils/prisma.server";

export type { User } from "@prisma/client";

export async function getUserById(id: User["id"]) {
  return prisma.user.findUnique({ where: { id } });
}

export async function getUserByUsername(username: User["username"]) {
  return prisma.user.findUnique({ where: { username } });
}

export async function createUser(username: User["username"], password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      username,
      passwordHash: hashedPassword,
    },
  });
}

export async function deleteUserByUsername(username: User["username"]) {
  return prisma.user.delete({ where: { username } });
}

export async function verifyLogin(
  username: User["username"],
  password: User["passwordHash"]
) {
  const userWithPassword = await getUserByUsername(username);

  if (!userWithPassword || !userWithPassword.passwordHash) {
    return null;
  }

  const isValid = await bcrypt.compare(password, userWithPassword.passwordHash);

  if (!isValid) {
    return null;
  }

  const { passwordHash: _password, ...userWithoutPassword } = userWithPassword;

  return userWithoutPassword;
}
