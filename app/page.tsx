import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Gauge,
  Send,
  ShieldCheck,
  TableProperties,
  Workflow,
} from "lucide-react";
import { LeadForm } from "@/components/LeadForm";

const steps = [
  {
    title: "Lead intake",
    text: "Customer submits service details through the public form.",
  },
  {
    title: "AI scoring",
    text: "Mock or real AI classifies urgency, pest type, score, and next action.",
  },
  {
    title: "CRM pipeline",
    text: "Qualified leads are stored with status and sales context.",
  },
  {
    title: "Automation log",
    text: "High-score leads trigger the mock GoHighLevel workflow.",
  },
  {
    title: "Dashboard",
    text: "Operators track response priority, funnel health, and reporting.",
  },
];

const metrics = [
  { value: "75+", label: "CRM route score" },
  { value: "24h", label: "service-response lens" },
  { value: "9", label: "realistic pest scenarios" },
];

export default function Home() {
  return (
    <main className="page-shell home-shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">
            <Workflow size={20} />
          </div>
          <span>PestCo AI Lead Automation</span>
        </div>
        <nav className="nav-links" aria-label="Primary navigation">
          <Link className="link-button" href="/dashboard">
            Dashboard
          </Link>
        </nav>
      </header>

      <section className="hero-grid">
        <div className="hero-copy">
          <div className="hero-kicker">
            <span className="eyebrow">AI specialist portfolio demo</span>
            <span className="signal-pill">
              <ShieldCheck size={14} />
              Wise House-fit workflow
            </span>
          </div>
          <h1>PestCo AI Lead Automation</h1>
          <p className="lede">
            A recruiter-ready demo shaped for a modern pest-control operation:
            fast lead triage, family-safe service context, CRM routing, and
            dashboard reporting for leadership.
          </p>

          <div className="hero-actions">
            <Link className="primary-link" href="/dashboard">
              View dashboard
              <ArrowRight size={16} />
            </Link>
            <span className="runtime-note">Mock AI runs without an OpenAI key.</span>
          </div>

          <div className="ops-summary" aria-label="Demo operating targets">
            {metrics.map((metric) => (
              <div className="ops-metric" key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>

          <div className="workflow-strip" aria-label="Workflow overview">
            {steps.map((step, index) => (
              <div className="workflow-step" key={step.title}>
                <span className="step-index">{String(index + 1).padStart(2, "0")}</span>
                <strong>{step.title}</strong>
                <span>{step.text}</span>
              </div>
            ))}
          </div>

          <div className="feature-grid">
            <div className="panel metric-card">
              <Gauge size={22} />
              <h3>Deterministic mock AI</h3>
              <p className="table-secondary">Runs without a real OpenAI API key.</p>
            </div>
            <div className="panel metric-card">
              <Send size={22} />
              <h3>Mock GHL routing</h3>
              <p className="table-secondary">Maps scored leads to CRM fields.</p>
            </div>
            <div className="panel metric-card">
              <TableProperties size={22} />
              <h3>Prisma + Supabase</h3>
              <p className="table-secondary">Ready for Postgres persistence.</p>
            </div>
            <div className="panel metric-card">
              <Activity size={22} />
              <h3>Reporting view</h3>
              <p className="table-secondary">Analytics, filters, and status changes.</p>
            </div>
          </div>
        </div>

        <LeadForm />
      </section>
    </main>
  );
}
