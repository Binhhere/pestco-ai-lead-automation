import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sampleLeads } from "@/lib/seed-data";
import { hasDatabaseConfig } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function POST() {
  if (!hasDatabaseConfig()) {
    return NextResponse.json({
      success: true,
      mode: "sample",
      message:
        "DATABASE_URL and DIRECT_URL are not configured. The dashboard will continue using bundled sample leads.",
    });
  }

  await prisma.automationLog.deleteMany();
  await prisma.lead.deleteMany();

  for (const lead of sampleLeads) {
    await prisma.lead.create({
      data: {
        ...lead,
        automationLogs: {
          create: {
            eventType: "demo_reset_seeded",
            payload: { source: "POST /api/demo/reset" },
          },
        },
      },
    });
  }

  return NextResponse.json({ success: true, mode: "database" });
}
