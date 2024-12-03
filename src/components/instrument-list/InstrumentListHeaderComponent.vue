<script lang="ts" setup>
import { computed } from "vue";
import IconSort from "@/components/icons/IconSort.vue";
import IconAlphaSort from "@/components/icons/IconAlphaSort.vue";
import { useTableStore } from "@/stores/table";

const tableStore = useTableStore();

const fields = {
  shortName: { label: "Nombre", icon: IconAlphaSort },
  lastPrice: { label: "Último", icon: IconSort },
  accumulatedVolumeMoney: { label: "Monto (MM)", icon: IconSort },
  pctDay: { label: "Var Día", icon: IconSort },
  pct30D: { label: "Var 30d", icon: IconSort },
  pctCY: { label: "Año Actual", icon: IconSort },
  pct1Y: { label: "12 Meses", icon: IconSort },
};

const isFieldActive = (field: string) => computed(() => tableStore.sortField === field);

function sortBy(selectedField: string) {
  if (tableStore.sortField === selectedField) {
    tableStore.sortOrder = tableStore.sortOrder === "asc" ? "desc" : "asc";
  } else {
    tableStore.setSortField(selectedField);
    tableStore.toggleSortOrder();
  }
}
</script>

<template>
  <header class="list-header">
    <div
      v-for="(field, key) in fields"
      :key="key"
      class="list-header-item"
      :class="{ 'active': isFieldActive(key).value }"
      @click="sortBy(key)">
        {{ field.label }}
        <component :is="field.icon" :width="18" :height="18"/>
    </div>
  </header>
</template>


<style lang="postcss" scoped>
.list-header {
  @apply flex flex-col md:grid grid-cols-[_130px_repeat(6,1fr)];
  @apply text-slate-600 dark:text-slate-300;
  @apply text-sm md:text-[0.7em] font-bold cursor-pointer select-none;
  @apply border-b border-slate-200 dark:border-slate-800;

  .list-header-item {
    @apply flex items-center gap-1 justify-between md:justify-end first:justify-between md:first:justify-start;
    @apply w-full;
    @apply text-end;
    @apply hover:bg-slate-100 dark:hover:bg-slate-800;
    @apply py-2 px-1;
  }

  .list-header-item.active {
    @apply bg-slate-200 dark:bg-slate-900;
    @apply text-blue-600 dark:text-blue-500;

    svg {
      @apply rotate-[-360deg];
      @apply transition-transform duration-300;
    }
  }
}
</style>
