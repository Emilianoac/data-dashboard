import { mount, VueWrapper } from "@vue/test-utils";
import { nextTick } from "vue";
import { describe, it, expect, vi, beforeEach } from "vitest";
import SearchBarResultComponent from "@/components/searchbar/SearchBarResultComponent.vue";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia, createPinia } from "pinia";
import { useSearchStore } from "@/stores/search";


let wrapper: VueWrapper;

describe("SearchBarResultComponent", () => {

  beforeEach(() => {
    setActivePinia(createPinia());
    wrapper = mount(SearchBarResultComponent, {
      global: {
        plugins: [createPinia()],
      },
    })
  });


  it("should render correctly when showResults is true", async () => {
    const searchStore = useSearchStore();
    searchStore.showResults = true;

    await nextTick();

    expect(wrapper.find(".searchbar-results").exists()).toBe(true);
  })
})
