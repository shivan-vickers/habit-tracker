import { type Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const habitGroupsData: Prisma.HabitGroupCreateWithoutUserInput[] = [
  { name: "Morning" },
  { name: "Evening" },
];

const habitsData: Prisma.HabitCreateWithoutGroupInput[] = [
  { content: "Brush teeth" },
  { content: "Wash face" },
  { content: "Drink water" },
  { content: "Brush teeth" },
  { content: "Wash face" },
  { content: "Drink water" },
  { content: "Eat a snack" },
];

async function main() {
  const hashedPassword = await bcrypt.hash("admin", 10);

  const userData: Prisma.UserCreateInput = {
    username: "shva",
    passwordHash: hashedPassword,
  };

  const user = await prisma.user.create({ data: { ...userData } });

  let habitGroups = [];

  for (const habitGroupData of habitGroupsData) {
    habitGroups.push(
      await prisma.habitGroup.create({
        data: {
          userId: user.id,
          ...habitGroupData,
        },
      })
    );
  }

  let habitDivider = 1;

  for (const habitData of habitsData) {
    const assignedGroup = habitDivider < 4 ? habitGroups[0] : habitGroups[1];

    await prisma.habit.create({
      data: {
        groupId: assignedGroup.id,
        ...habitData,
      },
    });

    habitDivider++;
  }

  console.log(`Database has been seeded. 🌱`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
