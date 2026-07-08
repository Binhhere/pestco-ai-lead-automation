import { PrismaClient } from "@prisma/client";
import { sampleLeads } from "../lib/seed-data";

const prisma = new PrismaClient();

async function main() {
  await prisma.automationLog.deleteMany();
  await prisma.lead.deleteMany();

  for (const lead of sampleLeads) {
    await prisma.lead.create({
      data: {
        ...lead,
        automationLogs: {
          create: [
            {
              eventType: "demo_seed_created",
              payload: {
                source: "prisma/seed.ts",
                note: "Seed lead created for portfolio demo",
              },
            },
          ],
        },
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
