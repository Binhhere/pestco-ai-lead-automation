"use client";

import { FormEvent, useState } from "react";
import { Button } from "@astryxdesign/core/Button";
import { Card } from "@astryxdesign/core/Card";
import type { LeadInput } from "@/lib/validations";

const initialForm: LeadInput = {
  name: "",
  phone: "",
  email: "",
  service: "termites",
  message: "",
  city: "",
  preferredTime: "",
};

export function LeadForm() {
  const [form, setForm] = useState<LeadInput>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  function updateField<K extends keyof LeadInput>(key: K, value: LeadInput[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    setIsError(false);

    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = (await response.json()) as {
      lead?: { score: number; urgency: string; nextAction: string };
      error?: string;
      warning?: string;
    };

    setIsSubmitting(false);

    if (!response.ok || !data.lead) {
      setIsError(true);
      setMessage(data.error ?? "Could not submit the lead. Check the form and try again.");
      return;
    }

    setMessage(
      `Lead scored ${data.lead.score}/100 (${data.lead.urgency}). Next action: ${data.lead.nextAction}${data.warning ? ` ${data.warning}` : ""}`,
    );
    setForm(initialForm);
  }

  return (
    <Card padding={0}>
      <div className="panel-header">
        <div>
          <p className="eyebrow">Lead intake</p>
          <h2>Qualify a new pest control lead</h2>
        </div>
      </div>
      <form className="panel-body" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="name">Customer name</label>
            <input
              id="name"
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              placeholder="Maya Tran"
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              value={form.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              placeholder="555-0142"
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              placeholder="maya@example.com"
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="city">City</label>
            <input
              id="city"
              value={form.city}
              onChange={(event) => updateField("city", event.target.value)}
              placeholder="Austin"
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="service">Service</label>
            <select
              id="service"
              value={form.service}
              onChange={(event) =>
                updateField("service", event.target.value as LeadInput["service"])
              }
            >
              <option value="ants">Ants</option>
              <option value="termites">Termites</option>
              <option value="rodents">Rodents</option>
              <option value="roaches">Roaches</option>
              <option value="general">General</option>
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="preferredTime">Preferred time</label>
            <input
              id="preferredTime"
              value={form.preferredTime ?? ""}
              onChange={(event) => updateField("preferredTime", event.target.value)}
              placeholder="Today after 3 PM"
            />
          </div>
          <div className="form-field full">
            <label htmlFor="message">Issue details</label>
            <textarea
              id="message"
              value={form.message}
              onChange={(event) => updateField("message", event.target.value)}
              placeholder="We found soft wood near the garage wall and need help today."
              required
            />
          </div>
        </div>
        <div className="form-actions">
          <Button
            label="Score and route lead"
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
          />
        </div>
        {message ? (
          <p className={`status-message${isError ? " error" : ""}`}>{message}</p>
        ) : null}
      </form>
    </Card>
  );
}
