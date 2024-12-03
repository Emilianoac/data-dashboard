import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import Skeleton from "@/components/SkeletonComponent.vue";

describe("Skeleton.vue", () => {
  it("renders with the correct width and height", () => {
    const wrapper = shallowMount(Skeleton, {
      props: {
        width: "200px",
        height: "50px"
      }
    });

    const skeleton = wrapper.element as HTMLElement;
    expect(skeleton.style.width).toBe("200px");
    expect(skeleton.style.height).toBe("50px");
  })

  it("has the correct default classes", () => {
    const wrapper = shallowMount(Skeleton);

    expect(wrapper.classes()).toContain("skeleton");
  })

})
