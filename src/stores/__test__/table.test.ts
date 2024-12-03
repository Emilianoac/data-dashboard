import { setActivePinia, createPinia } from "pinia";
import { describe, it, beforeEach, expect } from "vitest";
import { useTableStore } from "@/stores/table";

describe("useTableStore", () => {
  let store: ReturnType<typeof useTableStore>;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useTableStore();
  })

  it("should initialize with default values", () => {
    expect(store.sortField).toBeNull();
    expect(store.sortOrder).toBe("asc");
  })

  it("should set the sort field", () => {
    store.setSortField("name");
    expect(store.sortField).toBe("name");
  })

  it("should toggle sort order from asc to desc", () => {
    store.toggleSortOrder();
    expect(store.sortOrder).toBe("desc");
  })

  it("should toggle sort order back to asc", () => {
    store.toggleSortOrder();
    store.toggleSortOrder() ;
    expect(store.sortOrder).toBe("asc");
  })
})
