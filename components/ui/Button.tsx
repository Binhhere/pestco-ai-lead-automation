type ButtonProps = {
  label: string;
  variant?: "primary" | "secondary";
  type?: "button" | "submit";
  isLoading?: boolean;
  onClick?: () => void;
};

export function Button({
  label,
  variant = "primary",
  type = "button",
  isLoading = false,
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={isLoading}
      aria-busy={isLoading || undefined}
    >
      {isLoading ? "Working\u2026" : label}
    </button>
  );
}
