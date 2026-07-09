"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/Card";
import { AnalyticsCards } from "@/components/AnalyticsCards";
import { DashboardCharts } from "@/components/DashboardCharts";
import { LeadTable } from "@/components/LeadTable";
import { ResetDemoButton } from "@/components/ResetDemoButton";
import type { LeadRecord } from "@/lib/types";
import { formatEnumLabel } from "@/lib/utils";

type Filters = {
  urgency: string;
  status: string;
  service: string;
};

const emptyFilters: Filters = {
  urgency: "",
  status: "",
  service: "",
};

export function DashboardClient() {
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const query = useMemo(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      }
    });
    return params.toString();
  }, [filters]);

  const loadLeads = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/leads${query ? `?${query}` : ""}`);
      const data = (await response.json()) as { leads?: LeadRecord[]; error?: string };

      if (!response.ok || !data.leads) {
        throw new Error(data.error ?? "Could not load leads");
      }

      setLeads(data.leads);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Could not load leads");
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  useEffect(() => {
    void loadLeads();
  }, [loadLeads]);

  async function updateStatus(leadId: string, status: LeadRecord["status"]) {
    const response = await fetch(`/api/leads/${leadId}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      setError("Status update failed.");
      return;
    }

    setLeads((current) =>
      current.map((lead) => (lead.id === leadId ? { ...lead, status } : lead)),
    );
  }

  async function resetDemo() {
    const response = await fetch("/api/demo/reset", { method: "POST" });
    if (!response.ok) {
      setError("Demo reset failed.");
      return;
    }

    await loadLeads();
  }

  return (
    <>
      <div className="dashboard-header">
        <div>
          <p className="eyebrow">Dispatch operations</p>
          <h1>PestCo dispatch board</h1>
          <p className="lede">
            Track lead score, urgency, pipeline status, AI recommendations, and
            automation activity from one recruiter-friendly dashboard.
          </p>
        </div>
        <ResetDemoButton onReset={resetDemo} />
      </div>

      <AnalyticsCards leads={leads} />

      <div className="dashboard-main">
        <Card>
          <div className="panel-header">
            <div>
              <h2>Qualified lead queue</h2>
              <p className="table-secondary">Newest leads first, filterable by urgency, status, and service.</p>
            </div>
            <div className="filters">
              {(["urgency", "status", "service"] as const).map((filterKey) => (
                <select
                  key={filterKey}
                  value={filters[filterKey]}
                  aria-label={`Filter by ${filterKey}`}
                  onChange={(event) =>
                    setFilters((current) => ({
                      ...current,
                      [filterKey]: event.target.value,
                    }))
                  }
                >
                  <option value="">All {filterKey}</option>
                  {(filterKey === "urgency"
                    ? ["low", "medium", "high"]
                    : filterKey === "status"
                      ? ["New", "Contacted", "Qualified", "InspectionScheduled", "Closed"]
                      : ["ants", "termites", "rodents", "roaches", "general"]
                  ).map((value) => (
                    <option key={value} value={value}>
                      {formatEnumLabel(value)}
                    </option>
                  ))}
                </select>
              ))}
            </div>
          </div>
          <div className="panel-body">
            {isLoading ? (
              <div className="empty-state">Loading leads...</div>
            ) : error ? (
              <div className="empty-state">{error}</div>
            ) : (
              <LeadTable leads={leads} onStatusChange={updateStatus} />
            )}
          </div>
        </Card>

        <div>
          <DashboardCharts leads={leads} />
          <Card>
            <div className="panel-body">
              <h3>Automation rule</h3>
              <p className="table-secondary">
                Leads with score 75+ or high urgency trigger the mock GoHighLevel
                opportunity mapping and optional Slack notification.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
