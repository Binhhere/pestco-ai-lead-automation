import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sampleLeads } from "@/lib/seed-data";
import { hasDatabaseConfig } from "@/lib/utils";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;

  if (!hasDatabaseConfig()) {
    const index = Number(id.replace("sample-", "")) - 1;
    const lead = sampleLeads[index];

    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    const now = new Date().toISOString();
    return NextResponse.json({
      lead: {
        ...lead,
        id,
        createdAt: now,
        updatedAt: now,
        automationLogs: [
          {
            id: `sample-log-${id}`,
            leadId: id,
            eventType: "demo_sample_loaded",
            payload: { source: "sample fallback" },
            createdAt: now,
          },
        ],
      },
      mode: "sample",
    });
  }

  const lead = await prisma.lead.findUnique({
    where: { id },
    include: { automationLogs: { orderBy: { createdAt: "desc" } } },
  });

  if (!lead) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  return NextResponse.json({ lead, mode: "database" });
}
