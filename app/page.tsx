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
import { Accordion, type AccordionItem } from "@/components/Accordion";

const stepItems: AccordionItem[] = [
  {
    id: "step-1",
    eyebrow: "WO-01",
    title: "Lead intake",
    description: "Customer submits service details through the public form.",
  },
  {
    id: "step-2",
    eyebrow: "WO-02",
    title: "AI scoring",
    description: "Mock or real AI classifies urgency, pest type, score, and next action.",
  },
  {
    id: "step-3",
    eyebrow: "WO-03",
    title: "CRM pipeline",
    description: "Qualified leads are stored with status and sales context.",
  },
  {
    id: "step-4",
    eyebrow: "WO-04",
    title: "Automation log",
    description: "High-score leads trigger the mock GoHighLevel workflow.",
  },
  {
    id: "step-5",
    eyebrow: "WO-05",
    title: "Dashboard",
    description: "Operators track response priority, funnel health, and reporting.",
  },
];

const capabilityItems: AccordionItem[] = [
  {
    id: "cap-1",
    icon: <Gauge size={18} />,
    title: "Deterministic mock AI",
    description: "Runs without a real OpenAI API key.",
  },
  {
    id: "cap-2",
    icon: <Send size={18} />,
    title: "Mock GHL routing",
    description: "Maps scored leads to CRM fields.",
  },
  {
    id: "cap-3",
    icon: <TableProperties size={18} />,
    title: "Prisma + Supabase",
    description: "Ready for Postgres persistence.",
  },
  {
    id: "cap-4",
    icon: <Activity size={18} />,
    title: "Reporting view",
    description: "Analytics, filters, and status changes.",
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
              View dispatch board
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

          <div className="accordion-group">
            <p className="accordion-group-label">Workflow</p>
            <Accordion ariaLabel="Workflow overview" defaultOpenId="step-1" items={stepItems} />
          </div>

          <div className="accordion-group">
            <p className="accordion-group-label">Under the hood</p>
            <Accordion ariaLabel="Demo capabilities" items={capabilityItems} />
          </div>
        </div>

        <LeadForm />
      </section>
    </main>
  );
}
