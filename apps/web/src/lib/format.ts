const priceFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function formatPrice(amount: number): string {
  return priceFormatter.format(amount);
}

const BED_LABEL: Record<string, string> = {
  SINGLE: "Single",
  DOUBLE: "Double",
  QUEEN: "Queen",
  KING: "King",
  TWIN: "Twin",
};

export function formatBed(bedType: string, bedCount: number): string {
  return `${bedCount} ${BED_LABEL[bedType]} ${bedCount > 1 ? "beds" : "bed"}`;
}

export function getInitials(name?: string): string {
  if (!name) return "";

  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
