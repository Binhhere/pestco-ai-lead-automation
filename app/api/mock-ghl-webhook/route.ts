import { NextResponse } from "next/server";
import { mapLeadToGhlPayload, triggerMockGhlAutomation } from "@/lib/ghl-mock";
import { prisma } from "@/lib/prisma";
import { hasDatabaseConfig } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = (await request.json()) as { leadId?: string };

  if (!body.leadId) {
    return NextResponse.json({ error: "leadId is required" }, { status: 400 });
  }

  if (!hasDatabaseConfig()) {
    return NextResponse.json({
      payload: mapLeadToGhlPayload({
        id: body.leadId,
        name: "Sample Lead",
        phone: "555-0100",
        email: "sample@example.com",
        service: "general",
        pestType: "general",
        score: 80,
        urgency: "high",
        summary: "Sample high-score lead for webhook demonstration.",
        recommendedReply: "Call the customer and schedule the earliest inspection.",
        status: "New",
      }),
      mode: "sample",
    });
  }

  const lead = await prisma.lead.findUnique({ where: { id: body.leadId } });

  if (!lead) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  const payload = await triggerMockGhlAutomation(lead);
  return NextResponse.json({ payload, mode: "database" });
}
