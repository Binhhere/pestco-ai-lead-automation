"use client";

import { Card } from "@/components/ui/Card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { LeadRecord } from "@/lib/types";
import { formatEnumLabel } from "@/lib/utils";

type Props = {
  leads: LeadRecord[];
};

export function DashboardCharts({ leads }: Props) {
  const statusData = ["New", "Contacted", "Qualified", "InspectionScheduled", "Closed"].map(
    (status) => ({
      status: formatEnumLabel(status),
      leads: leads.filter((lead) => lead.status === status).length,
    }),
  );

  return (
    <Card>
      <div className="chart-card">
        <h3>Conversion funnel</h3>
        <ResponsiveContainer width="100%" height={245}>
          <BarChart data={statusData} margin={{ left: -20, right: 10, top: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#cabf99" />
            <XAxis
              dataKey="status"
              tick={{ fontSize: 11, fill: "#5b5744", fontFamily: "var(--font-mono)" }}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 12, fill: "#5b5744", fontFamily: "var(--font-mono)" }}
            />
            <Tooltip
              contentStyle={{
                background: "#f7f2e4",
                border: "1.5px solid #a4956a",
                borderRadius: 3,
                fontFamily: "var(--font-body)",
              }}
            />
            <Bar dataKey="leads" fill="#b8531f" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
