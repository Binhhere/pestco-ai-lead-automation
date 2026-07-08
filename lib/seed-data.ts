import type { Status } from "@prisma/client";

export const sampleLeads = [
  {
    name: "Maya Tran",
    phone: "555-0142",
    email: "maya.tran@example.com",
    service: "termites",
    message:
      "We found soft wood near the window frame and possible termite tubes along the garage wall. Need help today.",
    city: "Austin",
    preferredTime: "Today after 3 PM",
    score: 94,
    urgency: "high",
    pestType: "termites",
    summary:
      "Likely active termite issue with signs of wood damage and same-day intent.",
    recommendedReply:
      "We can prioritize this and call shortly to schedule the earliest termite inspection window.",
    nextAction:
      "Call within 10 minutes and offer same-day inspection.",
    status: "InspectionScheduled" as Status,
  },
  {
    name: "Jon Miller",
    phone: "555-0188",
    email: "jon.miller@example.com",
    service: "rodents",
    message:
      "Hearing scratching in the attic at night and saw droppings near the kitchen pantry.",
    city: "Round Rock",
    preferredTime: "Tomorrow morning",
    score: 78,
    urgency: "high",
    pestType: "rodents",
    summary:
      "Rodent activity appears active with attic noise and kitchen droppings.",
    recommendedReply:
      "We can help quickly and inspect entry points before the issue spreads.",
    nextAction: "Create opportunity and book inspection within 24 hours.",
    status: "Qualified" as Status,
  },
  {
    name: "Elena Park",
    phone: "555-0199",
    email: "elena.park@example.com",
    service: "roaches",
    message:
      "Roaches are showing up around the kitchen sink in our small restaurant before opening.",
    city: "San Antonio",
    preferredTime: "Early morning",
    score: 88,
    urgency: "high",
    pestType: "roaches",
    summary:
      "Commercial kitchen roach report should be prioritized due to operational risk.",
    recommendedReply:
      "We can prioritize a commercial inspection and discuss treatment windows around business hours.",
    nextAction: "Call immediately and route to commercial service pipeline.",
    status: "Contacted" as Status,
  },
  {
    name: "Priya Shah",
    phone: "555-0117",
    email: "priya.shah@example.com",
    service: "ants",
    message:
      "Small ant trail near the pantry. It is not urgent, but I would like pricing for treatment.",
    city: "Pflugerville",
    preferredTime: "Friday afternoon",
    score: 42,
    urgency: "low",
    pestType: "ants",
    summary:
      "Lower-pressure ant service inquiry with pricing intent.",
    recommendedReply:
      "We can share treatment options and schedule a convenient inspection window.",
    nextAction: "Send pricing follow-up and nurture if no response.",
    status: "New" as Status,
  },
  {
    name: "Carlos Rivera",
    phone: "555-0133",
    email: "carlos.rivera@example.com",
    service: "general",
    message:
      "Looking for quarterly pest prevention for a rental property before tenants move in.",
    city: "Georgetown",
    preferredTime: "Next week",
    score: 36,
    urgency: "low",
    pestType: "general",
    summary:
      "Preventive maintenance inquiry with flexible timing.",
    recommendedReply:
      "We can recommend a recurring plan and confirm service coverage for the property.",
    nextAction: "Send recurring plan options and request property details.",
    status: "Closed" as Status,
  },
  {
    name: "Nina Brooks",
    phone: "555-0106",
    email: "nina.brooks@example.com",
    service: "rodents",
    message:
      "I found droppings under the sink and my children use the kitchen daily. Can someone inspect soon?",
    city: "Cedar Park",
    preferredTime: "Today or tomorrow",
    score: 81,
    urgency: "high",
    pestType: "rodents",
    summary:
      "Rodent issue near kitchen with family safety concern and fast scheduling intent.",
    recommendedReply:
      "We can prioritize your inspection and call shortly to find the earliest opening.",
    nextAction: "Call and assign to urgent residential route.",
    status: "New" as Status,
  },
  {
    name: "Grace Lee",
    phone: "555-0172",
    email: "grace.lee@example.com",
    service: "roaches",
    message:
      "A few roaches appeared in the bathroom over the last week. I would like treatment before it gets worse.",
    city: "Buda",
    preferredTime: "Saturday",
    score: 63,
    urgency: "medium",
    pestType: "roaches",
    summary:
      "Moderate roach issue with early intervention intent.",
    recommendedReply:
      "We can inspect and recommend treatment before the activity spreads.",
    nextAction: "Send available appointment windows within 24 hours.",
    status: "Contacted" as Status,
  },
  {
    name: "Andre Wilson",
    phone: "555-0164",
    email: "andre.wilson@example.com",
    service: "ants",
    message:
      "Ants are coming through the patio door and into the living room after rain.",
    city: "Kyle",
    preferredTime: "Weekday afternoon",
    score: 55,
    urgency: "medium",
    pestType: "ants",
    summary:
      "Recurring ant entry point after rain, likely suitable for standard treatment.",
    recommendedReply:
      "We can inspect the entry point and recommend a treatment plan.",
    nextAction: "Book standard residential inspection.",
    status: "Qualified" as Status,
  },
  {
    name: "Heather Smith",
    phone: "555-0125",
    email: "heather.smith@example.com",
    service: "termites",
    message:
      "Buying a home and need a termite inspection report before closing next week.",
    city: "Leander",
    preferredTime: "Monday morning",
    score: 68,
    urgency: "medium",
    pestType: "termites",
    summary:
      "Termite inspection request tied to real estate closing deadline.",
    recommendedReply:
      "We can schedule an inspection and provide the report needed for closing.",
    nextAction: "Schedule inspection before closing deadline.",
    status: "InspectionScheduled" as Status,
  },
] as const;
