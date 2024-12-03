<script lang="ts" setup>
import { useAppStore } from "@/stores/app";
const appStore = useAppStore();
</script>

<template>
  <ul class="summary-list">
    <!-- Nombre -->
    <li class="summary-list-item">
      <span class="summary-list-item-key">NOMBRE</span>
      <span class="summary-list-item-value">
        {{ appStore.formattedResumenData?.shortName }}
      </span>
    </li>
  </ul>

  <hr class="opacity-30 my-2">

  <ul class="summary-list">
    <!--PAIS-->
    <li class="summary-list-item">
      <span class="summary-list-item-key">PAÍS</span>
      <span class="summary-list-item-value">
        {{ appStore.formattedResumenData?.countryName }}
      </span>
    </li>
    <!--HORA APERTURA-->
    <li class="summary-list-item">
      <span class="summary-list-item-key">HORA APERTURA</span>
      <span class="summary-list-item-value">
        {{ appStore.formattedResumenData?.hourOpen }}
      </span>
    </li>
    <!-- HORA CIERRE-->
    <li class="summary-list-item">
      <span class="summary-list-item-key">HORA CIERRE</span>
      <span class="summary-list-item-value">
        {{ appStore.formattedResumenData?.hourClose }}
      </span>
    </li>
  </ul>
</template>

<style lang="postcss" scoped>

</style>
