import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import Loading from "@/components/LoadingComponent.vue";

describe("Loading.vue", () => {
  it("renders the loader container correctly", () => {
    const wrapper = shallowMount(Loading);

    const loader = wrapper.find(".loader");
    expect(loader.exists()).toBe(true);
  })
})
