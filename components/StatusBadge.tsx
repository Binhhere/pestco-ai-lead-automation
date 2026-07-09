import { Badge } from "@/components/ui/Badge";
import { formatEnumLabel } from "@/lib/utils";

type Props = {
  status: string;
};

export function StatusBadge({ status }: Props) {
  const tone =
    status === "Closed"
      ? "safe"
      : status === "InspectionScheduled" || status === "Qualified"
        ? "hazard"
        : status === "Contacted"
          ? "info"
          : "neutral";

  return <Badge label={formatEnumLabel(status)} tone={tone} />;
}
