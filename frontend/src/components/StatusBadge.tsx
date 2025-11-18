import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "available" | "booked" | "blocked" | "confirmed" | "pending" | "completed" | "results-available" | "processing" | "ready" | "picked-up" | "active" | "inactive" | "paid" | "overdue";
  className?: string;
}

const statusConfig = {
  available: {
    bg: "bg-success-light",
    text: "text-success",
    label: "Available",
  },
  booked: {
    bg: "bg-warning-light",
    text: "text-warning",
    label: "Booked",
  },
  blocked: {
    bg: "bg-destructive/10",
    text: "text-destructive",
    label: "Blocked",
  },
  confirmed: {
    bg: "bg-success-light",
    text: "text-success",
    label: "Confirmed",
  },
  pending: {
    bg: "bg-warning-light",
    text: "text-warning",
    label: "Pending",
  },
  completed: {
    bg: "bg-success-light",
    text: "text-success",
    label: "Completed",
  },
  "results-available": {
    bg: "bg-info-light",
    text: "text-info",
    label: "Results Available",
  },
  processing: {
    bg: "bg-warning-light",
    text: "text-warning",
    label: "Processing",
  },
  ready: {
    bg: "bg-success-light",
    text: "text-success",
    label: "Ready for Pickup",
  },
  "picked-up": {
    bg: "bg-muted",
    text: "text-muted-foreground",
    label: "Picked Up",
  },
  active: {
    bg: "bg-success-light",
    text: "text-success",
    label: "Active",
  },
  inactive: {
    bg: "bg-muted",
    text: "text-muted-foreground",
    label: "Inactive",
  },
  paid: {
    bg: "bg-success-light",
    text: "text-success",
    label: "Paid",
  },
  overdue: {
    bg: "bg-destructive/10",
    text: "text-destructive",
    label: "Overdue",
  },
};

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium",
        config.bg,
        config.text,
        className
      )}
    >
      {config.label}
    </span>
  );
};
