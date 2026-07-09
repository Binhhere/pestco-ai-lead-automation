"use client";

import { Button } from "@/components/ui/Button";
import type { LeadRecord } from "@/lib/types";
import { formatEnumLabel } from "@/lib/utils";
import { StatusBadge } from "./StatusBadge";
import { UrgencyBadge } from "./UrgencyBadge";

type Props = {
  leads: LeadRecord[];
  onStatusChange: (leadId: string, status: LeadRecord["status"]) => Promise<void>;
};

const statuses: LeadRecord["status"][] = [
  "New",
  "Contacted",
  "Qualified",
  "InspectionScheduled",
  "Closed",
];

export function LeadTable({ leads, onStatusChange }: Props) {
  if (leads.length === 0) {
    return (
      <div className="empty-state">
        <h3>No leads match these filters</h3>
        <p>Clear filters or reset demo data to repopulate the dashboard.</p>
      </div>
    );
  }

  return (
    <div className="table-wrap">
      <table className="lead-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Service</th>
            <th>Urgency</th>
            <th>Score</th>
            <th>Status</th>
            <th>AI summary</th>
            <th>Next action</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td>
                <div className="table-primary">{lead.name}</div>
                <div className="table-secondary">{lead.city}</div>
              </td>
              <td>{formatEnumLabel(lead.service)}</td>
              <td>
                <UrgencyBadge urgency={lead.urgency} />
              </td>
              <td className="table-primary">{lead.score}</td>
              <td>
                <StatusBadge status={lead.status} />
              </td>
              <td>{lead.summary}</td>
              <td>{lead.nextAction}</td>
              <td>
                <select
                  value={lead.status}
                  aria-label={`Update ${lead.name} status`}
                  onChange={(event) =>
                    onStatusChange(lead.id, event.target.value as LeadRecord["status"])
                  }
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {formatEnumLabel(status)}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="form-actions">
        <Button
          label="Refresh table"
          variant="secondary"
          onClick={() => window.location.reload()}
        />
      </div>
    </div>
  );
}
