<script lang="ts" setup>
import { ref } from "vue";

interface Tab {
  name: string;
  id: string;
}

const props = defineProps<{
  id: string;
  items: Tab[];
}>();

const activeTab = ref(props.items[0].id);

function openTab(tabName: string) {
  activeTab.value = tabName;
}
</script>

<template>
  <div class="tab" :id="id">
    <div class="tab-header">
      <button
        v-for="(item, i) in items"
        @click="openTab(item.id)"
        :data-id="item.id"
        :key="i"
        class="tab-link"
        :class="{ 'active': activeTab === item.id }">
        {{ item.name }}
      </button>
    </div>
    <div class="tab-body">
      <div
        v-for="(item, i) in items"
        :key="i"
        :id="`tab-${item.id}`"
        class="tab-content"
        v-show="activeTab === item.id">
          <slot :name="item.id">Default content for Tab {{ item.name }}</slot>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.tab {
  @apply w-full;

  .tab-header{
    @apply flex justify-start items-center gap-3;
    @apply border-b border-gray-200 dark:border-gray-700;
    @apply overflow-x-auto;

    .tab-link {
      @apply p-2;
      @apply cursor-pointer;
      @apply font-bold uppercase;
      @apply whitespace-nowrap;
    }

    .tab-link.active {
      @apply border-b-2 border-blue-500;
    }
  }

}
</style>
