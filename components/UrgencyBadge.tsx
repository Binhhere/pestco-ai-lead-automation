import { Badge } from "@astryxdesign/core/Badge";

type Props = {
  urgency: "low" | "medium" | "high";
};

export function UrgencyBadge({ urgency }: Props) {
  const variant =
    urgency === "high" ? "error" : urgency === "medium" ? "warning" : "success";

  return <Badge label={urgency} variant={variant} />;
}
