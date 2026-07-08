import Link from "next/link";
import { Activity, Gauge, Send, TableProperties, Workflow } from "lucide-react";
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

export default function Home() {
  return (
    <main className="page-shell">
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
        <div>
          <p className="eyebrow">AI specialist portfolio demo</p>
          <h1>PestCo AI Lead Automation</h1>
          <p className="lede">
            AI-powered lead qualification and CRM automation demo for pest
            control businesses. It scores inbound requests, recommends next
            actions, and simulates GoHighLevel-style pipeline automation.
          </p>

          <div className="workflow-strip" aria-label="Workflow overview">
            {steps.map((step) => (
              <div className="workflow-step" key={step.title}>
                <strong>{step.title}</strong>
                <span>{step.text}</span>
              </div>
            ))}
          </div>

          <div className="dashboard-grid">
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
