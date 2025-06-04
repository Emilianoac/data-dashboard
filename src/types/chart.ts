export type ChartFilter = "1d" | "1s" | "1m" | "3m" | "6m" | "1a" | "5a";

export interface ChartFilters {
  label: string;
  value: ChartFilter;
  enabled: boolean;
}
