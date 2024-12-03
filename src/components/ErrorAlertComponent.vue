<script lang="ts" setup>
import { useAppStore } from "@/stores/app";
import IconWarning from "@/components/icons/IconWarning.vue";

const props = defineProps<{
  message: string;
}>();

const appStore = useAppStore();

</script>

<template>
  <div class="alert-container" @click.stop="appStore.setError(undefined)">
    <div class="alert alert-danger" role="alert">
      <IconWarning class="alert-danger-icon"/>
      <p class="alert-danger-text">{{ props.message }}</p>
      <button @click="appStore.setError(undefined)" class="alert-danger-button">Cerrar</button>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.alert-container {
  @apply fixed top-0 left-0 z-[999] w-full h-screen;
  @apply flex justify-center items-center h-screen;
  @apply bg-black bg-opacity-[2%] backdrop-blur-sm;

  .alert {
    @apply flex flex-col justify-center items-center;
    @apply bg-slate-50 dark:bg-slate-950 p-6;
    @apply border border-slate-200 dark:border-slate-900;
    @apply rounded-lg;
    @apply shadow-xl;
    @apply text-center;
    @apply mx-2;

    .alert-danger-icon {
      @apply w-12 h-12;
      @apply text-yellow-500;
    }

    .alert-danger-text {
      @apply mt-4;
    }

    .alert-danger-button {
      @apply mt-4 bg-blue-500 text-white p-2 px-5 rounded-md;
    }
  }
}

</style>
