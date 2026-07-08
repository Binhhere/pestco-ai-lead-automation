export type LeadRecord = {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: "ants" | "termites" | "rodents" | "roaches" | "general";
  message: string;
  city: string;
  preferredTime: string | null;
  score: number;
  urgency: "low" | "medium" | "high";
  pestType: "ants" | "termites" | "rodents" | "roaches" | "general";
  summary: string;
  recommendedReply: string;
  nextAction: string;
  status:
    | "New"
    | "Contacted"
    | "Qualified"
    | "InspectionScheduled"
    | "Closed";
  createdAt: string;
  updatedAt: string;
  automationLogs?: AutomationLogRecord[];
};

export type AutomationLogRecord = {
  id: string;
  leadId: string;
  eventType: string;
  payload: unknown;
  createdAt: string;
};
