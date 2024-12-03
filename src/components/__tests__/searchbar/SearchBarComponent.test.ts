import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import Searchbar from "@/components/searchbar/SearchBarComponent.vue";
import { useAppStore } from "@/stores/app";

describe("Searchbar", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("updates the search value when typing in the input", async () => {
    const wrapper = mount(Searchbar);
    const input = wrapper.find("input");
    
    await input.setValue("aguas");
    //@ts-ignore
    expect(wrapper.vm.search).toBe("aguas");
  });

  it("displays the results when search has a value", async () => {
    const wrapper = mount(Searchbar);
    const input = wrapper.find("input");

    await input.setValue("aguas");
    //@ts-ignore
    expect(wrapper.vm.showResults).toBe(true);
  });

  it("does not display results when search is empty", async () => {
    const wrapper = mount(Searchbar);
    const input = wrapper.find("input");
  
    await input.setValue("aguas");
    await input.setValue(""); 
  
    //@ts-ignore
    expect(wrapper.vm.showResults).toBe(false);
  });

  it("closes the results when clicking on the overlay", async () => {
    const wrapper = mount(Searchbar);
    const input = wrapper.find("input");

    await input.setValue("aguas");
    await wrapper.find(".searchbar-overlay").trigger("click");
    //@ts-ignore
    expect(wrapper.vm.showResults).toBe(false);
  });

  it("should access and update the Pinia store", () => {
    const store = useAppStore();
    store.setCurrentConstituent("NuevoIPSA");
    
    expect(store.currentConstiuent).toBe("NuevoIPSA");
  });
});
