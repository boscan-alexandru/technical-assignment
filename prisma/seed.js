const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const messageTypes = [
    { type: "text" },
    { type: "image" },
    { type: "file" },
    { type: "video" },
  ];

  for (const messageType of messageTypes) {
    await prisma.messageType.upsert({
      where: { type: messageType.type },
      update: {},
      create: messageType,
    });
  }

  console.log("Seeded message types.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
