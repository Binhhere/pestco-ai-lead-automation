import { Badge } from "@astryxdesign/core/Badge";
import { formatEnumLabel } from "@/lib/utils";

type Props = {
  status: string;
};

export function StatusBadge({ status }: Props) {
  const variant =
    status === "Closed"
      ? "success"
      : status === "InspectionScheduled" || status === "Qualified"
        ? "warning"
        : status === "Contacted"
          ? "info"
          : "neutral";

  return <Badge label={formatEnumLabel(status)} variant={variant} />;
}
