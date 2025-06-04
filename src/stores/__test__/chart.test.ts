import {describe, it, beforeEach, expect} from "vitest";
import { useChartStore } from "@/stores/chart";
import { setActivePinia, createPinia } from "pinia";
import { mockChartData } from "./mock/chartData"

describe("useChartStore", () => {
  let store: ReturnType<typeof useChartStore>;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useChartStore();
  });

  it("should initialize with default values", () => {
    expect(store.currentChartFilter).toBe("1a");
    expect(store.chartData).toStrictEqual([]);
  });

  it("should set the chart data", () => {
    store.setChartData(mockChartData);
    expect(store.chartData).toStrictEqual(mockChartData);
  });

  it("should set the chart filter", () => {
    store.setChartFilter("1m");
    expect(store.currentChartFilter).toBe("1m");
  }); 

  describe("if chart data is empty", () => {
    it("should disable the filters", () => {
      store.setChartData([]);
      expect(store.chartFilters[0].enabled).toBe(false);
      expect(store.chartFilters[1].enabled).toBe(false);
      expect(store.chartFilters[2].enabled).toBe(false);
      expect(store.chartFilters[3].enabled).toBe(false);
      expect(store.chartFilters[4].enabled).toBe(false);
      expect(store.chartFilters[5].enabled).toBe(false);
      expect(store.chartFilters[6].enabled).toBe(false);
    });
  });
});