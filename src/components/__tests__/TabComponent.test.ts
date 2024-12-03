import { describe, it, expect, vi } from "vitest";
import { shallowMount } from "@vue/test-utils";
import TabComponent from "@/components/TabComponent.vue";

describe("TabComponent.vue", () => {
  const items = [
    { name: "Tab 1", id: "tab1" },
    { name: "Tab 2", id: "tab2" },
    { name: "Tab 3", id: "tab3" }
  ]

  it("renders the tabs correctly", () => {
    const wrapper = shallowMount(TabComponent, {
      props: {
        id: "tabs-container",
        items,
      }
    })

    expect(wrapper.findAll(".tab-link")).toHaveLength(items.length)

    expect(wrapper.find(".tab-link.active").text()).toBe("Tab 1")
  })

  it("changes active tab when a tab is clicked", async () => {
    const wrapper = shallowMount(TabComponent, {
      props: {
        id: "tabs-container",
        items,
      }
    })

    const secondTabButton = wrapper.findAll(".tab-link").at(1);
    await secondTabButton?.trigger("click");

    expect(wrapper.find(".tab-link.active").text()).toBe("Tab 2")

    expect(wrapper.find("#tab-tab2").isVisible()).toBe(true)
    expect(wrapper.find("#tab-tab1").isVisible()).toBe(false)
  })

  it("shows default content when no slot is provided", () => {
    const wrapper = shallowMount(TabComponent, {
      props: {
        id: "tabs-container",
        items,
      }
    })

    expect(wrapper.html()).toContain("Default content for Tab Tab 1");
  })

  it("shows slot content when passed", async () => {
    const wrapper = shallowMount(TabComponent, {
      props: {
        id: "tabs-container",
        items,
      },
      slots: {
        tab1: "<div>Custom content for Tab 1</div>",
      }
    })

    expect(wrapper.html()).toContain("Custom content for Tab 1");
  })
})
