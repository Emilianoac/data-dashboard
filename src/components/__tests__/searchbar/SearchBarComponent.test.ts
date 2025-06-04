import { mount, VueWrapper } from "@vue/test-utils";
import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import Searchbar from "@/components/searchbar/SearchBarComponent.vue";
import { useAppStore } from "@/stores/app";
import { useSearchStore } from "@/stores/search";

let wrapper: VueWrapper

describe("Searchbar", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    wrapper = mount(Searchbar, {
      global: {
        plugins: [createPinia()],
      },
    })
  });

  it("should update the search query in the store when typing in the input", async () => {
    const input = wrapper.find("input");
    await input.setValue("aguas");

    const store = useSearchStore();
    expect(store.query).toBe("aguas");
  });

  it("should display results when search query is not empty", async () => {
    const input = wrapper.find("input");
    await input.setValue("aguas");

    const store = useSearchStore();
    expect(store.showResults).toBe(true);
  });

  it("should not display results when search query is empty", async () => {
    const input = wrapper.find("input");
  
    await input.setValue("aguas");
    await input.setValue(""); 

    const store = useSearchStore();
    expect(store.showResults).toBe(false);
  });

  it("should close results when clicking outside the search bar", async () => {
    const input = wrapper.find("input");

    await input.setValue("aguas");
    await wrapper.find(".searchbar-overlay").trigger("click");
    
    const store = useSearchStore();
    expect(store.showResults).toBe(false);
  });

  it("should access and update the Pinia store", () => {
    const store = useAppStore();
    store.setCurrentConstituent("NuevoIPSA");
    
    expect(store.currentConstiuent).toBe("NuevoIPSA");
  });
});
