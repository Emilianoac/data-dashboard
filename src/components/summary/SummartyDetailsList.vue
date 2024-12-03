<script lang="ts" setup>
import { useAppStore } from "@/stores/app";
const appStore = useAppStore();
</script>

<template>
  <template v-if="appStore.formattedResumenData">
    <ul class="summary-list">
      <!-- Cotización -->
      <li class="summary-list-item">
        <span class="summary-list-item-key">Cotización</span>
        <span class="summary-list-item-value">
          {{ appStore.formattedResumenData?.datetimeLastPrice }}
        </span>
      </li>
    </ul>
  
    <hr class="opacity-70 my-2">
  
    <ul class="summary-list">
      <!--MERCADO-->
      <li class="summary-list-item">
        <span class="summary-list-item-key">MERCADO</span>
        <span class="summary-list-item-value">
          {{ appStore.formattedResumenData?.marketName }}
        </span>
      </li>
      <!--APERTURA-->
      <li class="summary-list-item">
        <span class="summary-list-item-key">APERTURA</span>
        <span class="summary-list-item-value">
          {{ appStore.formattedResumenData?.openPriceFormatted }}
        </span>
      </li>
      <!--CIERRE ANTERIOR-->
      <li class="summary-list-item">
        <span class="summary-list-item-key">CIERRE ANTERIOR</span>
        <span class="summary-list-item-value">
          {{ appStore.formattedResumenData?.closePriceFormatted }}
        </span>
      </li>
      <!-- MÁXIMO DIARIO -->
      <li class="summary-list-item">
        <span class="summary-list-item-key">MÁXIMO DIARIO</span>
        <span class="summary-list-item-value">
          {{ appStore.formattedResumenData?.maxDayFormatted }}
        </span>
      </li>
      <!-- MÍNIMO DIARIO -->
      <li class="summary-list-item">
        <span class="summary-list-item-key">MÍNIMO DIARIO</span>
        <span class="summary-list-item-value">
          {{ appStore.formattedResumenData?.minDayFormatted }}
        </span>
      </li>
      <!-- MÁXIMO 52-->
      <li class="summary-list-item">
        <span class="summary-list-item-key">MÁXIMO 52 SEMANAS</span>
        <span class="summary-list-item-value">
          {{ appStore.formattedResumenData?.max52WFormatted }}
        </span>
      </li>
      <!-- MÍNIMO 52-->
      <li class="summary-list-item">
        <span class="summary-list-item-key">MÍNIMO 52 SEMANAS</span>
        <span class="summary-list-item-value">
          {{ appStore.formattedResumenData?.min52WFormatted }}
        </span>
      </li>
    </ul>
  
    <div class="flex justify-between items-center text-sm mt-4 mb-1">
      <p>Variación**</p>
      <p>%</p>
    </div>
    <hr class="opacity-70">
  
    <ul class="summary-list">
      <!-- 1 MES -->
      <li class="summary-list-item">
        <span class="summary-list-item-key">1 MES</span>
        <span
          :class="appStore.formattedResumenData?.pct30DFormatted.class"
          class="summary-list-item-value">
          {{ appStore.formattedResumenData?.pct30DFormatted.value }}
        </span>
      </li>
  
      <!-- 1 AÑO -->
      <li class="summary-list-item">
        <span class="summary-list-item-key">1 AÑO</span>
        <span
          :class="appStore.formattedResumenData?.pctRelW52Formatted.class"
          class="summary-list-item-value">
          {{ appStore.formattedResumenData?.pctRelW52Formatted.value }}
        </span>
      </li>
  
      <!-- AÑO A LA FECHA-->
      <li class="summary-list-item">
        <span class="summary-list-item-key">AÑO A LA FECHA</span>
        <span
          :class="appStore.formattedResumenData?.pctRelCYFormatted.class"
          class="summary-list-item-value">
          {{ appStore.formattedResumenData?.pctRelCYFormatted.value }}
        </span>
      </li>
    </ul>
  </template>
</template>

<style lang="postcss" scoped>

</style>
