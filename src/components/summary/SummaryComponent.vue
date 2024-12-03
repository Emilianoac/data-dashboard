<script lang="ts" setup>
import { ref } from "vue";
import SummartyDetailsList from "@/components/summary/SummartyDetailsList.vue";
import SummarySummaryList from "@/components/summary/SummarySummaryList.vue";

const activeTab = ref("details");

function openTab(tabName: "summary" | "details") {
  activeTab.value = tabName;
}
</script>

<template>
  <div class="summary">
    <div class="summary-header">
      <button @click="openTab('summary')" :class="{'active' : activeTab == 'summary'}">
        <span>Resumen</span>
      </button>
      <button @click="openTab('details')" :class="{'active' : activeTab == 'details'}">
        <span>Detalles</span>
      </button>
    </div>
    <div class="summary-body">
      <div v-show="activeTab === 'summary'">
        <SummarySummaryList />
      </div>
      <div v-show="activeTab === 'details'">
        <SummartyDetailsList />
      </div>
    </div>
  </div>
</template>

<style lang="postcss">

.summary {
  @apply w-full h-full;
  @apply p-4;

  .summary-header {
    @apply flex justify-start items-center gap-3;
    @apply border-b border-gray-200 dark:border-gray-700;

    button {
      @apply w-full;
      @apply p-2;
      @apply cursor-pointer;
      @apply font-bold text-center;
      @apply border-b-2 border-transparent;
      @apply opacity-40;
    }

    button.active {
      @apply border-b-2 border-blue-500 dark:border-blue-400;
      @apply opacity-100;
    }
  }

  .summary-body {
    @apply mt-4;

    .summary-list {
      @apply w-full text-[0.74em] text-slate-700 dark:text-white;

      .summary-list-item {
        @apply flex justify-between items-center;
        @apply py-[1px];
        @apply font-bold;

        &:last-child {
          @apply border-b-0;
        }

        .summary-list-item-key {
          @apply opacity-90;
        }
      }

    }
  }
}
</style>
