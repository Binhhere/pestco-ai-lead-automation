type BadgeProps = {
  label: string;
  tone?: "hazard" | "safe" | "info" | "neutral" | "alert";
};

export function Badge({ label, tone = "neutral" }: BadgeProps) {
  return <span className={`badge badge-${tone}`}>{label}</span>;
}
