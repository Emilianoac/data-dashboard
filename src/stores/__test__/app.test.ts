import { setActivePinia, createPinia } from "pinia";
import { describe, it, beforeEach, expect, vi } from "vitest";
import { useAppStore } from "@/stores/app";
import { getAllConstituentsAPI, searchConstituentAPI } from "@/api/constituyentes/_index";

vi.mock("@/api/constituyentes/_index", () => ({
  getAllConstituentsAPI: vi.fn(),
  searchConstituentAPI: vi.fn(),
}))

describe("useAppStore", () => {
  let store: ReturnType<typeof useAppStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useAppStore()
  })

  it("should initialize with default values", () => {
    expect(store.constituents).toBeUndefined()
    expect(store.currentConstiuent).toBe("IPSA")
    expect(store.isLoading).toBe(false)
  })

  it("should set current constituent", () => {
    store.setCurrentConstituent("NEW_INDEX")
    expect(store.currentConstiuent).toBe("NEW_INDEX")
  })

  it("should handle errors with setError", () => {
    store.setError({ status: true, message: "Test Error" })
    expect(store.error).toEqual({ status: true, message: "Test Error" })
  })

  it("should fetch constituents from API", async () => {
    const mockData = { constituents: [{ id: 1, name: "Test" }] }
    //@ts-ignore
    getAllConstituentsAPI.mockResolvedValueOnce(mockData)

    await store.getConstituents()

    expect(getAllConstituentsAPI).toHaveBeenCalled()
    expect(store.constituents).toEqual(mockData)
  })
})
