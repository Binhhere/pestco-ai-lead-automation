"use client";

import { Fragment, useState } from "react";
import { ChevronDown } from "lucide-react";
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
  const [openId, setOpenId] = useState<string | null>(null);

  if (leads.length === 0) {
    return (
      <div className="empty-state">
        <h3>No leads match these filters</h3>
        <p>Clear filters or reset demo data to repopulate the dashboard.</p>
      </div>
    );
  }

  function toggle(id: string) {
    setOpenId((current) => (current === id ? null : id));
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
            <th className="visually-hidden">Details</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => {
            const isOpen = openId === lead.id;

            return (
              <Fragment key={lead.id}>
                <tr className={isOpen ? "is-expanded" : undefined}>
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
                  <td>
                    <button
                      type="button"
                      className="row-expand-toggle"
                      aria-expanded={isOpen}
                      aria-controls={`lead-detail-${lead.id}`}
                      aria-label={`${isOpen ? "Hide" : "Show"} AI summary and next action for ${lead.name}`}
                      onClick={() => toggle(lead.id)}
                    >
                      <ChevronDown size={16} />
                    </button>
                  </td>
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
                {isOpen ? (
                  <tr className="lead-detail-row">
                    <td colSpan={7} id={`lead-detail-${lead.id}`}>
                      <div className="lead-detail">
                        <div>
                          <span className="lead-detail-label">AI summary</span>
                          <p>{lead.summary}</p>
                        </div>
                        <div>
                          <span className="lead-detail-label">Next action</span>
                          <p>{lead.nextAction}</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : null}
              </Fragment>
            );
          })}
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
