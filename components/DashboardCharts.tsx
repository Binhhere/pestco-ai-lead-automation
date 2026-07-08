"use client";

import { Card } from "@astryxdesign/core/Card";
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
    <Card padding={0}>
      <div className="chart-card">
        <h3>Conversion funnel</h3>
        <ResponsiveContainer width="100%" height={245}>
          <BarChart data={statusData} margin={{ left: -20, right: 10, top: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#dce3dd" />
            <XAxis dataKey="status" tick={{ fontSize: 11 }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="leads" fill="#1f7a4d" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
