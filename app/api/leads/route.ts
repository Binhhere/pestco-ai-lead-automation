import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { scoreLead } from "@/lib/ai-scoring";
import { triggerMockGhlAutomation } from "@/lib/ghl-mock";
import { prisma } from "@/lib/prisma";
import { sampleLeads } from "@/lib/seed-data";
import { hasDatabaseConfig } from "@/lib/utils";
import { leadFilterSchema, leadInputSchema } from "@/lib/validations";

export const dynamic = "force-dynamic";

function sampleLeadRecords() {
  const now = new Date().toISOString();
  return sampleLeads.map((lead, index) => ({
    ...lead,
    id: `sample-${index + 1}`,
    createdAt: new Date(Date.now() - index * 60 * 60 * 1000).toISOString(),
    updatedAt: now,
    automationLogs: [
      {
        id: `sample-log-${index + 1}`,
        leadId: `sample-${index + 1}`,
        eventType: "demo_sample_loaded",
        payload: { source: "lib/seed-data.ts" },
        createdAt: now,
      },
    ],
  }));
}

export async function GET(request: NextRequest) {
  const parsedFilters = leadFilterSchema.safeParse(
    Object.fromEntries(request.nextUrl.searchParams),
  );

  if (!parsedFilters.success) {
    return NextResponse.json(
      { error: "Invalid lead filters", details: parsedFilters.error.flatten() },
      { status: 400 },
    );
  }

  const filters = parsedFilters.data;

  if (!hasDatabaseConfig()) {
    const leads = sampleLeadRecords().filter((lead) => {
      return (
        (!filters.urgency || lead.urgency === filters.urgency) &&
        (!filters.status || lead.status === filters.status) &&
        (!filters.service || lead.service === filters.service)
      );
    });

    return NextResponse.json({ leads, mode: "sample" });
  }

  const where: Prisma.LeadWhereInput = {
    urgency: filters.urgency,
    status: filters.status,
    service: filters.service,
  };

  const leads = await prisma.lead.findMany({
    where,
    include: { automationLogs: { orderBy: { createdAt: "desc" } } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ leads, mode: "database" });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsedLead = leadInputSchema.safeParse(body);

  if (!parsedLead.success) {
    return NextResponse.json(
      { error: "Invalid lead", details: parsedLead.error.flatten() },
      { status: 400 },
    );
  }

  const input = parsedLead.data;
  const analysis = await scoreLead(input);

  if (!hasDatabaseConfig()) {
    const simulatedLead = {
      id: crypto.randomUUID(),
      ...input,
      preferredTime: input.preferredTime ?? null,
      score: analysis.score,
      urgency: analysis.urgency,
      pestType: analysis.pest_type,
      summary: analysis.summary,
      recommendedReply: analysis.recommended_reply,
      nextAction: analysis.next_action,
      status: "New",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      automationLogs: [],
    };

    return NextResponse.json(
      {
        lead: simulatedLead,
        analysis,
        mode: "sample",
        warning:
          "DATABASE_URL and DIRECT_URL are not configured, so this lead was scored but not persisted.",
      },
      { status: 201 },
    );
  }

  const lead = await prisma.lead.create({
    data: {
      ...input,
      preferredTime: input.preferredTime || null,
      score: analysis.score,
      urgency: analysis.urgency,
      pestType: analysis.pest_type,
      summary: analysis.summary,
      recommendedReply: analysis.recommended_reply,
      nextAction: analysis.next_action,
      status: "New",
    },
  });

  if (lead.score >= 75 || lead.urgency === "high") {
    await triggerMockGhlAutomation(lead);
  }

  const createdLead = await prisma.lead.findUnique({
    where: { id: lead.id },
    include: { automationLogs: { orderBy: { createdAt: "desc" } } },
  });

  return NextResponse.json({ lead: createdLead, analysis, mode: "database" }, { status: 201 });
}
