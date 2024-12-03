import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import SearchBarResultComponent from "@/components/searchbar/SearchBarResultComponent.vue";
import { createTestingPinia } from "@pinia/testing";

describe("SearchBarResultComponent", () => {
  it("renders correctly when showResults is true", async () => {
    const wrapper = mount(SearchBarResultComponent, {
      props: {
        showResults: true,
        search: "Test",
      },
      global: {
        plugins: [createTestingPinia()],
      },
    })

    expect(wrapper.find(".searchbar-results").exists()).toBe(true);
  })

  it("emits update:showResult when search prop changes", async () => {
    const wrapper = mount(SearchBarResultComponent, {
      props: {
        showResults: false,
        search: "",
      },
      global: {
        plugins: [createTestingPinia()],
      },
    })

    await wrapper.setProps({ search: "New Search" });
    expect(wrapper.emitted("update:showResults")).toBeTruthy();
  })
})
