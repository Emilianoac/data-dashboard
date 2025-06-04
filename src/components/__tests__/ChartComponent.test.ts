import { mount, shallowMount} from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import ChartComponent from "@/components/ChartComponent.vue";


const wrapper = shallowMount(ChartComponent, {
  global: {
    plugins: [createTestingPinia()],
  },
})

describe("ChartComponent", () => {
  it("should render the chart and filters correctly", async () => {

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find("apex-chart").exists()).toBe(true);
    expect(wrapper.findAll("button").length).toBeGreaterThan(0);
  });

  it("should apply the active class to the selected filter", async () => {
    const wrapper = shallowMount(ChartComponent, {
      global: {
        plugins: [createTestingPinia({
          initialState: {
            app: { currentChartFilter: "1a" },
          },
        })],
      },
    });

    const activeButton = wrapper.find("button.active");
    expect(activeButton.text()).toBe("1A");
  });

  it("should disable the filter when there is not enough data", () => {
    const mockFilters = [
      { label: "1D", value: "1d", enabled: false },
      { label: "1S", value: "1s", enabled: false },
      { label: "1M", value: "1m", enabled: false },
      { label: "3M", value: "3m", enabled: false },
      { label: "6M", value: "6m", enabled: false },
      { label: "1A", value: "1a", enabled: false },
      { label: "5A", value: "5a", enabled: false },
    ];

    const wrapper = mount(ChartComponent, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              chart: {
                chartFilters: mockFilters,
                currentChartFilter: "1d",
              },
              app: {
                formatedChartData: [],
                error: { status: true, message: "No hay suficientes datos" },
              },
            },
            stubActions: false,
          }),
        ],
      },
    });

    const filtersContainer = wrapper.find(".chart-filters");
    const filterButtons = filtersContainer.findAll("button");

    expect(filterButtons.length).toBe(mockFilters.length);

    filterButtons.forEach((btn, i) => {
      expect(btn.text()).toBe(mockFilters[i].label);
      expect(btn.attributes("disabled")).toBeDefined();
    });
  });
});

