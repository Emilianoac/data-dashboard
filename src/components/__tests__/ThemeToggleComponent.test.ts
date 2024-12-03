import { describe, it, expect, beforeEach, vi } from "vitest";
import { shallowMount } from "@vue/test-utils";
import ThemeToggle from "@/components/ThemeToggleComponent.vue";
import { useDark, useToggle } from "@vueuse/core";

vi.mock("@vueuse/core", () => {
  return {
    useDark: vi.fn(),
    useToggle: vi.fn(),
  }
})

describe("ThemeToggle.vue", () => {
  let isDarkMock: { value: boolean };
  let toggleDarkMock: () => void;

  beforeEach(() => {
    isDarkMock = { value: false }
    toggleDarkMock = vi.fn(() => {
      isDarkMock.value = !isDarkMock.value
    })

    //@ts-ignore
    vi.mocked(useDark).mockReturnValue(isDarkMock)
    //@ts-ignore
    vi.mocked(useToggle).mockReturnValue(toggleDarkMock)
  })

  it("renders the moon icon when dark mode is active", async () => {
    isDarkMock.value = true
    const wrapper = shallowMount(ThemeToggle)
    await wrapper.vm.$nextTick()
    expect(wrapper.findComponent({ name: "IconMoon" }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: "IconSun" }).exists()).toBe(false)
  })

  it("toggles between dark and light mode on button click", async () => {
    const wrapper = shallowMount(ThemeToggle)
    const button = wrapper.find("button")

    await button.trigger("click")
    expect(toggleDarkMock).toHaveBeenCalled()
    expect(isDarkMock.value).toBe(true)

    await button.trigger("click")
    expect(toggleDarkMock).toHaveBeenCalledTimes(2)
    expect(isDarkMock.value).toBe(false)
  })
})
