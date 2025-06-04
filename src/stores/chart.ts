import { defineStore } from "pinia";
import {ref, computed} from "vue";
import { filterChartData } from "@/utils/filterChartData";
import type { Chart } from "@/types/history";
import type  { ChartFilters, ChartFilter } from "@/types/chart";

export const useChartStore = defineStore("chart", () => {

  // State
  const chartData = ref<Chart[] | []>([]);
  const currentChartFilter = ref<ChartFilter>("1a");
  const chartFilters = ref<ChartFilters[]>([
    { label: "1D", value: "1d", enabled: false },
    { label: "1S", value: "1s", enabled: false },
    { label: "1M", value: "1m", enabled: false },
    { label: "3M", value: "3m", enabled: false },
    { label: "6M", value: "6m", enabled: false },
    { label: "1A", value: "1a", enabled: false },
    { label: "5A", value: "5a", enabled: false }
  ]);

  // Actions
  function setChartData(data: Chart[]) {
    chartData.value = data;
    chartFilters.value.forEach((filter) => {
      filter.enabled = filterChartData(chartData.value, filter.value as ChartFilter).length > 0;
    })
  };

  function setChartFilter(filter: ChartFilter) {
    currentChartFilter.value = filter;
  };


  // Getters
  const chartDataFilteredByTime = computed(() => {
    return filterChartData(chartData.value, currentChartFilter.value);
  });

  return  {
    // State
    chartData,
    currentChartFilter,
    chartFilters,

    // Actions
    setChartData,
    setChartFilter,

    // Getters
    chartDataFilteredByTime,
  }
});