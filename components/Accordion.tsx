"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

export type AccordionItem = {
  id: string;
  eyebrow?: string;
  icon?: ReactNode;
  title: string;
  description: string;
};

type Props = {
  items: AccordionItem[];
  defaultOpenId?: string;
  ariaLabel: string;
};

export function Accordion({ items, defaultOpenId, ariaLabel }: Props) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null);

  function toggle(id: string) {
    setOpenId((current) => (current === id ? null : id));
  }

  return (
    <div className="accordion" role="list" aria-label={ariaLabel}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div className={`accordion-row${isOpen ? " is-open" : ""}`} key={item.id} role="listitem">
            <button
              type="button"
              className="accordion-trigger"
              aria-expanded={isOpen}
              aria-controls={`accordion-panel-${item.id}`}
              onClick={() => toggle(item.id)}
            >
              {item.icon ? <span className="accordion-icon">{item.icon}</span> : null}
              {item.eyebrow ? <span className="accordion-eyebrow">{item.eyebrow}</span> : null}
              <span className="accordion-title">{item.title}</span>
              <ChevronDown size={18} className="accordion-chevron" aria-hidden="true" />
            </button>
            <div
              className="accordion-panel"
              id={`accordion-panel-${item.id}`}
              role="region"
              aria-hidden={!isOpen}
            >
              <p>{item.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
