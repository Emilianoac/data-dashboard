<script lang="ts" setup>
import { ref, watch, computed } from "vue";
import { useDark } from "@vueuse/core";
import { useAppStore } from "@/stores/app";
import ErrorAlertComponent from "@/components/ErrorAlertComponent.vue";

const appStore = useAppStore();

async function getChartData() {
  await appStore.getConstituentHistory();
}

getChartData();

const isDark = useDark();
const chart = ref();
const filters = { "1d": "1D", "1s": "1S", "1m": "1M", "3m": "3M", "6m": "6M", "1y": "1Y", "5y": "5Y"};
const minDataPoints = 2;

const filterDataByTimeRange = computed(() => {

  const endDate = new Date();
  const startDate = new Date();

  switch (appStore.currentChartFilter) {
    case "1d":
      startDate.setDate(endDate.getDate() - 1);
      break;
    case "1s":
      startDate.setDate(endDate.getDate() - 7);
      break;
    case "1m":
      startDate.setMonth(endDate.getMonth() - 1);
      break;
    case "3m":
      startDate.setMonth(endDate.getMonth() - 3);
      break;
    case "6m":
      startDate.setMonth(endDate.getMonth() - 6);
      break;
    case "1y":
      startDate.setFullYear(endDate.getFullYear() - 1);
      break;
    case "5y":
      startDate.setFullYear(endDate.getFullYear() - 5);
      break;
  }

  if (!appStore.formatedChartData) return [];

  const filteredData = appStore.formatedChartData.filter((entry) => {
    const entryDate = new Date(entry.timestamp);
    return entryDate >= startDate && entryDate <= endDate;
  }).map((entry) => [new Date(entry.timestamp).getTime(), entry.value]);

  if (filteredData.length < minDataPoints) {
    appStore.setError({ status: true, message: "No hay suficientes datos para mostrar en este rango de tiempo." });
    appStore.setChartFilter("1y");
    return;
  }

  return filteredData;
});

const baseChartOptions = {
  chart: {
    id: "app-chart",
    toolbar: { show: false },
    zoom: { enabled: false },
    background: "transparent",
  },
  xaxis: { type: "datetime" },
  dataLabels: { enabled: false },
  stroke: { curve: "smooth", width: 1 },
};

const chartOptions = ref({
  ...baseChartOptions,
  theme: {
    mode: isDark.value ? "dark" : "light",
    monochrome: { enabled: true, shadeTo: "black", shadeIntensity: 0.94 },
  },
});

const series = computed(() => [
  { name: "valor", data: filterDataByTimeRange.value },
]);

watch(isDark, (value, oldValue) => {
  if (value !== oldValue) {
    chart.value?.updateOptions({
      theme: { mode: value ? "dark" : "light" },
    });
  }
});

function setFilter(filter: string) {
  appStore.setChartFilter(filter);
}
</script>

<template>
  <ErrorAlertComponent v-if="appStore.error?.status" :message="appStore.error.message" />
  <apex-chart
    ref="chart"
    width="100%"
    height="200"
    type="area"
    :series="series"
    :options="chartOptions"
  />

  <div class="chart-filters">
    <button
      v-for="(label, filter) in filters"
      :key="filter"
      :class="{ 'active': appStore.currentChartFilter === filter }"
      @click="setFilter(filter)">
        {{ label }}
    </button>
  </div>
</template>

<style lang="postcss" scoped>
.chart-filters {
  @apply w-max;
  @apply flex justify-center md:justify-start items-center;
  @apply mx-auto md:mx-0;
  @apply rounded-md overflow-hidden;
  @apply border border-gray-300 dark:border-gray-700;

  button {
    @apply bg-gray-100 dark:bg-gray-800;
    @apply px-2 md:px-4 py-1;
    @apply border-r border-gray-300 dark:border-gray-700 last:border-r-0;
    @apply hover:bg-gray-200 dark:hover:bg-gray-700;
  }

  button.active {
    @apply bg-blue-500 text-white;
  }
}
</style>
