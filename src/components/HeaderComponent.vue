<script lang="ts" setup>
import { useAppStore } from "@/stores/app";

const appStore = useAppStore();
await appStore.getConstituentResumen();

</script>

<template>
  <div class="header">
    <h1 class="header-name">
      {{ appStore.formattedResumenData?.shortName }},
      {{ appStore.formattedResumenData?.countryName }}
    </h1>
    <p class="text-sm mb-2 opacity-70 font-semibold">Índice</p>
    <ul class="header-info" v-if="appStore.formattedResumenData">
      <li class="header-info-item">
        <span class="header-info-key">Valor Actual</span>
        <span class="header-info-value">
          {{ appStore.formattedResumenData.lastPriceFormatted }}
        </span>
      </li>
      <li class="header-info-item">
        <span class="header-info-key">Var.% Actual</span>
        <span
          class="header-info-value"
          :class="appStore.formattedResumenData.performanceRelativeFormatted.class">
            {{ appStore.formattedResumenData.performanceAbsoluteFormatted.value }}
        </span>
      </li>
      <li class="header-info-item">
        <span class="header-info-key">Var.% Punto Actual</span>
        <span
          class="header-info-value"
          :class="appStore.formattedResumenData.performanceAbsoluteFormatted.class">
          {{ appStore.formattedResumenData.performanceAbsoluteFormatted.value }}
        </span>
      </li>
    </ul>
  </div>
</template>

<style lang="postcss" scoped>
.header {
  .header-name {
    @apply font-bold text-xl uppercase mb-4;
  }

  .header-info {
    @apply flex gap-6 py-2;
    @apply border-y border-slate-200 dark:border-slate-800;
    @apply overflow-x-auto;

    .header-info-item {
      @apply flex justify-center items-center gap-2;
      @apply font-semibold;

      .header-info-key {
        @apply text-sm opacity-70;
      }

      .header-info-key,
      .header-info-value  {
        @apply whitespace-nowrap;
      }
    }

  }
}
</style>
