import OpenAI from "openai";
import {
  aiLeadScoreSchema,
  type AiLeadScore,
  type LeadInput,
} from "@/lib/validations";

function includesAny(text: string, keywords: string[]) {
  return keywords.some((keyword) => text.includes(keyword));
}

export function mockScoreLead(input: LeadInput): AiLeadScore {
  const text = `${input.service} ${input.message} ${input.city}`.toLowerCase();
  let score = 28;
  let pestType: AiLeadScore["pest_type"] = input.service;

  if (
    includesAny(text, [
      "termite",
      "termites",
      "wood",
      "walls",
      "damage",
      "mud tube",
      "swarm",
    ])
  ) {
    score += 42;
    pestType = "termites";
  }

  if (
    includesAny(text, ["rodent", "rat", "mouse", "mice", "scratching", "attic", "droppings"])
  ) {
    score += 30;
    pestType = "rodents";
  }

  if (includesAny(text, ["roach", "roaches", "cockroach", "kitchen", "restaurant"])) {
    score += 34;
    pestType = "roaches";
  }

  if (includesAny(text, ["ant", "ants", "trail", "pantry"])) {
    score += 14;
    pestType = "ants";
  }

  if (includesAny(text, ["urgent", "asap", "today", "tonight", "infestation", "children"])) {
    score += 18;
  }

  if (includesAny(text, ["quote", "question", "prevent", "inspection only"])) {
    score -= 12;
  }

  score = Math.max(10, Math.min(100, score));
  const urgency: AiLeadScore["urgency"] =
    score >= 75 ? "high" : score >= 50 ? "medium" : "low";

  const summary =
    urgency === "high"
      ? `${input.name} appears to have an urgent ${pestType} issue in ${input.city}, with language indicating active risk or damage.`
      : urgency === "medium"
        ? `${input.name} has a credible ${pestType} problem in ${input.city} that should be qualified and scheduled soon.`
        : `${input.name} is asking about a lower-pressure ${pestType} service need in ${input.city}.`;

  const recommendedReply =
    urgency === "high"
      ? `Thanks, ${input.name}. We can prioritize this and call shortly to schedule the earliest inspection window.`
      : urgency === "medium"
        ? `Thanks, ${input.name}. We can review the details and offer an inspection time that fits your schedule.`
        : `Thanks, ${input.name}. We can help with options and pricing for the service you requested.`;

  const nextAction =
    urgency === "high"
      ? "Call within 10 minutes, create CRM opportunity, and offer same-day inspection."
      : urgency === "medium"
        ? "Send follow-up SMS/email and schedule an inspection within 24 hours."
        : "Send educational reply, confirm service area, and nurture in the CRM.";

  return {
    score,
    urgency,
    pest_type: pestType,
    summary,
    recommended_reply: recommendedReply,
    next_action: nextAction,
  };
}

export async function scoreLead(input: LeadInput): Promise<AiLeadScore> {
  const useMockAi = process.env.USE_MOCK_AI !== "false";
  const apiKey = process.env.OPENAI_API_KEY;

  if (useMockAi || !apiKey) {
    return mockScoreLead(input);
  }

  try {
    const client = new OpenAI({ apiKey });
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You score pest control leads. Return valid JSON only with score, urgency, pest_type, summary, recommended_reply, next_action.",
        },
        {
          role: "user",
          content: JSON.stringify(input),
        },
      ],
    });

    const raw = completion.choices[0]?.message.content;
    if (!raw) {
      return mockScoreLead(input);
    }

    const parsed = aiLeadScoreSchema.safeParse(JSON.parse(raw));
    if (!parsed.success) {
      // AI output is treated as untrusted external data. Falling back keeps the
      // demo reliable even if the model returns malformed or incomplete JSON.
      return mockScoreLead(input);
    }

    return parsed.data;
  } catch (error) {
    console.error("AI scoring failed; using deterministic mock scoring.", error);
    return mockScoreLead(input);
  }
}
