import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin',
      taskGroups: {
        create: [
          {
            name: 'Example Task Group A',
            sort: 0,
            tasks: {
              create: [
                {
                  title: 'Test Task 1',
                  sort: 0,
                },
                {
                  title: 'Test Task 2',
                  description: 'This is a test task',
                  dueDate: '2024-12-31',
                  sort: 1,
                },
                {
                  title: 'Test Task 3',
                  description: 'This is a test task',
                  dueDate: '2024-12-31',
                  dueTime: '12:12:00',
                  sort: 2,
                },
              ],
            },
          },
          {
            name: 'Example Task Group B',
            sort: 1,
          },
        ],
      },
    },
  });

  // biome-ignore lint/suspicious/noConsoleLog: <explanation>
  console.log({ adminUser });
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
