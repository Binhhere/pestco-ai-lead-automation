import { Card } from "@/components/ui/Card";
import type { LeadRecord } from "@/lib/types";
import { toPercent } from "@/lib/utils";

type Props = {
  leads: LeadRecord[];
};

export function AnalyticsCards({ leads }: Props) {
  const total = leads.length;
  const highUrgency = leads.filter((lead) => lead.urgency === "high").length;
  const averageScore = total
    ? Math.round(leads.reduce((sum, lead) => sum + lead.score, 0) / total)
    : 0;
  const qualifiedCount = leads.filter((lead) =>
    ["Qualified", "InspectionScheduled", "Closed"].includes(lead.status),
  ).length;

  const cards = [
    { label: "Total leads", value: total },
    { label: "High urgency", value: `${toPercent(highUrgency, total)}%` },
    { label: "Avg. score", value: averageScore },
    { label: "Qualified funnel", value: qualifiedCount },
  ];

  return (
    <div className="dashboard-grid">
      {cards.map((card) => (
        <Card key={card.label}>
          <div className="metric-card">
            <div className="metric-label">{card.label}</div>
            <div className="metric-value">{card.value}</div>
          </div>
        </Card>
      ))}
    </div>
  );
}
