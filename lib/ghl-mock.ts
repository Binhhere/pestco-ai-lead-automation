import { prisma } from "@/lib/prisma";
import { hasDatabaseConfig } from "@/lib/utils";

export type AutomationLead = {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  pestType: string;
  score: number;
  urgency: string;
  summary: string;
  recommendedReply: string;
  status: string;
};

export function mapLeadToGhlPayload(lead: AutomationLead) {
  return {
    contact_name: lead.name,
    phone: lead.phone,
    email: lead.email,
    pest_type: lead.pestType,
    service_requested: lead.service,
    lead_score: lead.score,
    urgency: lead.urgency,
    ai_summary: lead.summary,
    recommended_reply: lead.recommendedReply,
    pipeline_stage: lead.status,
    opportunity: {
      name: `${lead.name} - ${lead.service} service`,
      value: lead.score >= 75 ? 450 : 225,
      status: "open",
      source: "PestCo AI Lead Automation",
    },
  };
}

export async function triggerMockGhlAutomation(lead: AutomationLead) {
  const payload = mapLeadToGhlPayload(lead);

  if (process.env.SLACK_WEBHOOK_URL) {
    await fetch(process.env.SLACK_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: `High-priority pest lead: ${lead.name} (${lead.score}) - ${lead.summary}`,
      }),
    });
  } else {
    console.log("[SIMULATED CRM AUTOMATION]", payload);
  }

  if (hasDatabaseConfig()) {
    await prisma.automationLog.create({
      data: {
        leadId: lead.id,
        eventType: "mock_ghl_opportunity_created",
        payload,
      },
    });
  }

  return payload;
}
