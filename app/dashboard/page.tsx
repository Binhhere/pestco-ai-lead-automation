import Link from "next/link";
import { Workflow } from "lucide-react";
import { DashboardClient } from "@/components/DashboardClient";

export default function DashboardPage() {
  return (
    <main className="page-shell">
      <header className="topbar">
        <Link className="brand" href="/">
          <div className="brand-mark">
            <Workflow size={20} />
          </div>
          <span>PestCo AI Lead Automation</span>
        </Link>
        <nav className="nav-links" aria-label="Primary navigation">
          <Link className="link-button" href="/">
            Lead form
          </Link>
        </nav>
      </header>
      <DashboardClient />
    </main>
  );
}
