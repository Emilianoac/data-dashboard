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
  it("renders the chart and filters correctly", async () => {

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find("apex-chart").exists()).toBe(true);
    expect(wrapper.findAll("button").length).toBeGreaterThan(0);
  });

  it("applies the active class to the selected filter", async () => {
    const wrapper = shallowMount(ChartComponent, {
      global: {
        plugins: [createTestingPinia({
          initialState: {
            app: { currentChartFilter: "1m" },
          },
        })],
      },
    });

    const activeButton = wrapper.find("button.active");
    expect(activeButton.text()).toBe("1M");
  });

    it("displays an error when data is insufficient", async () => {
    const wrapper = mount(ChartComponent, {
      global: {
        plugins: [createTestingPinia({
          initialState: {
            app: { formatedChartData: [], currentChartFilter: "1d", error: { status: true, message: "No hay suficientes datos" } },
          },
        })],
      },
    });

    expect(wrapper.findComponent({ name: "ErrorAlertComponent" }).exists()).toBe(true);
    expect(wrapper.find(".alert-danger-text").text()).toBe("No hay suficientes datos");
  });

});

