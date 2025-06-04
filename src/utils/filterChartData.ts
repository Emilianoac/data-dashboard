import localeString from "@/utils/localeString";
import type { ChartFilter } from "@/types/chart";
import type { Chart } from "@/types/history";

export function filterChartData(data: Chart[], filter: ChartFilter) {
  const minDataPoints = 2;
  const endDate = new Date();
  const startDate = new Date();

  switch (filter) {
    case "1d": startDate.setDate(endDate.getDate() - 1); break;
    case "1s": startDate.setDate(endDate.getDate() - 7); break;
    case "1m": startDate.setMonth(endDate.getMonth() - 1); break;
    case "3m": startDate.setMonth(endDate.getMonth() - 3); break;
    case "6m": startDate.setMonth(endDate.getMonth() - 6); break;
    case "1a": startDate.setFullYear(endDate.getFullYear() - 1); break;
    case "5a": startDate.setFullYear(endDate.getFullYear() - 5); break;
  }

  const filtered = data.filter(item => {
    const date = new Date(item.datetimeLastPriceTs * 1000);
    return date >= startDate && date <= endDate;
  });

  if (filtered.length < minDataPoints) return [];

  return filtered.map(item => [
    new Date(item.datetimeLastPriceTs * 1000).getTime(),
    localeString(item.closePrice),
  ]);
}
