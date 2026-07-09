import { Badge } from "@/components/ui/Badge";

type Props = {
  urgency: "low" | "medium" | "high";
};

export function UrgencyBadge({ urgency }: Props) {
  const tone = urgency === "high" ? "alert" : urgency === "medium" ? "hazard" : "safe";

  return <Badge label={urgency} tone={tone} />;
}
