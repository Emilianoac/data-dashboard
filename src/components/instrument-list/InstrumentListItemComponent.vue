<script lang="ts" setup>
import { useAppStore } from "@/stores/app";
import type { Constituent } from "@/types/constituent";

const appStore = useAppStore();

const props = defineProps<{
  itemData: Constituent;
}>()

const itemData = formatConstituent(props.itemData);

const fields = {
  shortName: {
    label: "Nombre",
    value: itemData.shortName,
    class: "",
  },
  lastPrice: {
    label: "Último",
    value: itemData.lastPriceFormatted,
    class: "",
  },
  accumulatedVolume: {
    label: "Monto (MM)",
    value: itemData.accumulatedVolumeFormatted,
    class: "",
  },
  pctDay: {
    label: "Var Día",
    value: itemData.pctDayFormatted,
    class: itemData.pctDayClass,
  },
  pct30D: {
    label: "Var 30d",
    value: itemData.pct30DFormatted,
    class: itemData.pct30DClass,
  },
  pctCY: {
    label: "Año Actual",
    value: itemData.pctCYFormatted,
    class: itemData.pctCYClass,
  },
  pct1Y: {
    label: "12 Meses",
    value: itemData.pct1YFormatted,
    class: itemData.pct1YClass,
  },
}

function formatConstituent(item: Constituent) {
  const green = "text-green-600 dark:text-green-500";
  const red = "text-red-600 dark:text-red-500";

  const getClass = (value: number) => {
    if (value > 0) return green;
    if (value < 0) return red;
    return "";
  };

  return {
    ...item,
    lastPriceFormatted: item.lastPrice.toLocaleString("cl-CL", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
    accumulatedVolumeFormatted: (item.accumulatedVolumeMoney / 1000000).toLocaleString("cl-CL", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
    pctDayFormatted: `${item.pctDay > 0 ? "+" : ""}${item.pctDay.toFixed(2)}`,
    pct30DFormatted: `${item.pct30D > 0 ? "+" : ""}${item.pct30D.toFixed(2)}`,
    pctCYFormatted: `${item.pctCY > 0 ? "+" : ""}${item.pctCY.toFixed(2)}`,
    pct1YFormatted: `${item.pct1Y > 0 ? "+" : ""}${item.pct1Y.toFixed(2)}`,
    pctDayClass: getClass(item.pctDay),
    pct30DClass: getClass(item.pct30D),
    pctCYClass: getClass(item.pctCY),
    pct1YClass: getClass(item.pct1Y),
  };
}

async function selectConstituent(item: Constituent) {
  appStore.setCurrentConstituent(item.codeInstrument);
  await appStore.getConstituentHistory();
  await appStore.getConstituentResumen();
}

</script>

<template>
  <li class="list-row-container" @click="selectConstituent(itemData)">
    <div
      v-for="field in fields"
      :key="field.value"
      class="list-cell"
      :class="field.class ?? ''">
      <span>{{ field.label }}:</span>
      {{ field.value }}
    </div>
  </li>
</template>

<style lang="postcss" scoped>

.list-row-container {
  @apply flex flex-col md:grid grid-cols-[auto] md:grid-cols-[_130px_repeat(6,1fr)];
  @apply text-start md:text-end;
  @apply border-b border-slate-200 dark:border-slate-800;
  @apply hover:bg-slate-100 dark:hover:bg-slate-900;
  @apply text-slate-600 dark:text-white;
  @apply cursor-pointer;
}

.list-cell {
  @apply first:text-start;
  @apply w-full;
  @apply p-2 lg:p-0 !px-1;

  span {
    @apply inline-block md:hidden;
    @apply text-black dark:text-white font-normal w-[100px];
  }
}
</style>
