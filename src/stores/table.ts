import { ref } from "vue";
import { defineStore } from "pinia";

export const useTableStore = defineStore("table", () => {
  const sortField = ref<string | null>(null);
  const sortOrder = ref<"asc" | "desc">("asc");

  function setSortField(field: string) {
    sortField.value = field;
  }

  function toggleSortOrder() {
    sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  }

  return { sortField, sortOrder, setSortField, toggleSortOrder };
})
