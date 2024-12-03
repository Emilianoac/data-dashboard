import { describe, it, expect } from "vitest";
import { mount, shallowMount } from "@vue/test-utils";
import ErrorAlert from "@/components/ErrorAlertComponent.vue";
import { createTestingPinia } from "@pinia/testing";
import { useAppStore } from "@/stores/app";
import IconWarning from "@/components/icons/IconWarning.vue";


const wrapper = mount(ErrorAlert, {
  global: {
    plugins: [createTestingPinia()],
  },
})

const appStore = useAppStore();

describe("ErrorAlert.vue", () => {

  it("renders the component", () => {
    expect(wrapper.exists()).toBe(true);
  })

  it("renders the icon", () => {
    expect(wrapper.findComponent(IconWarning).exists()).toBe(true);
  })

  it("renders the message", () => {
    const wrapper = shallowMount(ErrorAlert, {
      props: {
        message: "Error message"
      }
    })
    expect(wrapper.text()).toContain("Error message");
  })

  it("closes the message", async () => {
    await wrapper.find(".alert-danger-button").trigger("click");

    expect(appStore.error).toBe(undefined);
  })
})
