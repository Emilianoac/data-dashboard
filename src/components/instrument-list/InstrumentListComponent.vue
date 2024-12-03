<script lang="ts" setup>
import { useAppStore } from "@/stores/app";
import { computed} from "vue";
import { useTableStore } from "@/stores/table";
import InsrumentListHeader from "@/components/instrument-list/InstrumentListHeaderComponent.vue";
import InstrumentListItemComponent from "./InstrumentListItemComponent.vue";

const appStore = useAppStore();
const tableStore = useTableStore();

await appStore.getConstituents();

const sortedConstituents = computed(() => {
  const constituents = [...(appStore.constituents?.data.constituents || [])];
  if (tableStore.sortField) {
    constituents.sort((a, b) => {
      const fieldA = a[tableStore.sortField! as keyof typeof a];
      const fieldB = b[tableStore.sortField! as keyof typeof b];
      if (fieldA > fieldB) return tableStore.sortOrder === "asc" ? 1 : -1;
      if (fieldA < fieldB) return tableStore.sortOrder === "asc" ? -1 : 1;
      return 0;
    });
  }
  return constituents.map(item => item);
  //return constituents.map(item => formatConstituent(item));
});

const firstHalf = computed(() => {
  const half = Math.ceil(sortedConstituents.value.length / 2);
  return sortedConstituents.value.slice(0, half);
});

const secondHalf = computed(() => {
  const half = Math.ceil(sortedConstituents.value.length / 2);
  return sortedConstituents.value.slice(half);
});

</script>

<template>
  <div class="list-container">
    <div class="list-wrapper">
      <div class="w-[100%] xl:w-[50%]">
        <InsrumentListHeader/>
        <ul
          v-for="item in firstHalf"
          :key="item.codeInstrument"
          class="list-row">
          <InstrumentListItemComponent :item-data="item"/>
        </ul>
      </div>

      <div class="w-[100%] xl:w-[50%]">
        <InsrumentListHeader class="!hidden lg:!grid"/>
        <ul
          v-for="item in secondHalf"
          :key="item.codeInstrument"
          class="list-row">
          <InstrumentListItemComponent :item-data="item"/>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.list-container {
  @apply w-full;
}

.list-wrapper {
  @apply block lg:flex gap-4;
  @apply border-t border-slate-200 dark:border-slate-800;
}

.list-row {
  @apply w-full block;
  @apply text-sm font-semibold;
}
</style>
