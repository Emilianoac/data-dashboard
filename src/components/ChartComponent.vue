<script lang="ts" setup>
import { ref, watch, computed, onMounted, reactive } from "vue";
import { useDark } from "@vueuse/core";
import { useChartStore } from "@/stores/chart";
import { useAppStore } from "@/stores/app";
import es from "apexcharts/dist/locales/es.json";

const appStore = useAppStore();
const chartStore = useChartStore();
const isDark = useDark();
const chart = ref();

const baseChartOptions = {
  chart: {
    id: "app-chart",
    locales: [es],
    defaultLocale: "es",
    toolbar: { show: false },
    zoom: { enabled: false },
    background: "transparent",
  },
  xaxis: { type: "datetime" },
  dataLabels: { enabled: false },
  stroke: { curve: "smooth", width: 1 },
};

const chartOptions = reactive({
  ...baseChartOptions,
  theme: {
    mode: isDark.value ? "dark" : "light",
    monochrome: { enabled: true, shadeTo: "black", shadeIntensity: 0.94 },
  },
});

const series = computed(() => [{ name: "valor", data: chartStore.chartDataFilteredByTime } ]);

// Change chart theme based on dark mode
watch(isDark, (value, oldValue) => {
  if (value !== oldValue) {
    chart.value?.updateOptions({ theme: { mode: value ? "dark" : "light" } });
  }
});

onMounted(async () => {
  await appStore.getConstituentHistory();
});
</script>

<template>
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
      v-for="(filter) in chartStore.chartFilters"
      :key="filter.value"
      :title="filter.enabled ? 'Filtrar por ' + filter.label : 'No hay datos para este rango de tiempo'"
      @click="filter.enabled && chartStore.setChartFilter(filter.value)"
      :disabled="!filter.enabled"
      :class="{ 
        'active': chartStore.currentChartFilter === filter.value,
        'disabled': !filter.enabled
      }">
        {{ filter.label }}
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

  button.disabled {
    @apply bg-gray-100 dark:bg-gray-600;
    @apply text-gray-500 dark:text-gray-400;
    @apply cursor-not-allowed opacity-70;
  }
}
</style>
