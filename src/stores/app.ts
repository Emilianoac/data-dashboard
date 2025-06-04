import  { ref, computed } from "vue";
import  { defineStore } from "pinia";
import  { useChartStore } from "./chart";
import  formatResumen from "@/utils/formatResumen";
import  getConstituentHistoryAPI from "@/api/history/_index";
import  getResumenAPI from "@/api/resumen/_index";
import  { getAllConstituentsAPI }  from "@/api/constituyentes/_index";
import  type { ConstituentAPI } from "@/types/constituent";
import  type { ResumenAPI } from "@/types/resumen";
import  type { HistoryAPI } from "@/types/history";

export const useAppStore = defineStore("app", () => {  

  // State
  const constituents = ref<ConstituentAPI | undefined>(undefined);
  const currentConstiuent = ref<string>("IPSA");
  const currentConstituentHistory = ref<HistoryAPI | undefined>(undefined);
  const currentConstituentResumen = ref<ResumenAPI | undefined>(undefined);
  const isLoading = ref(false);
  const error = ref<{status: boolean, message: string} | undefined>(undefined);


  // Actions
  function setCurrentConstituent(id: string) {
    currentConstiuent.value = id;
  };

  function setError(status : {status: boolean, message: string} | undefined) {
    if (status) {
      error.value = status;
    } else {
      error.value = undefined;
    }
  };

  async function getConstituents() {
    try {
      const data = await getAllConstituentsAPI() as ConstituentAPI;
      constituents.value = data
    } catch (error) {
      console.error(error)
    }
  };

  async function getConstituentHistory() {
    isLoading.value = true;
    error.value = undefined;

    const chart = useChartStore();

    try {
      const data = await getConstituentHistoryAPI({index: currentConstiuent.value}) as HistoryAPI;
      if (!data) throw new Error(`No se encontraron datos para el índice ${currentConstiuent.value}`);
      currentConstituentHistory.value = data
      chart.setChartData(data.data.chart);
    } catch(e) {
      if (e instanceof Error) {
        error.value = { status: true, message: e.message };
      }
    } finally {
      isLoading.value = false;
    }
  };

  async function getConstituentResumen() {
    try {
      const data = await getResumenAPI({index:currentConstiuent.value}) as ResumenAPI;
      if (!data) return;
      currentConstituentResumen.value = data
    } catch (error) {
      console.error(error)
    }
  };

  // Getters
  const formattedResumenData = computed(() => {
    if (!currentConstituentResumen.value) return null;
    return formatResumen(currentConstituentResumen.value.data);
  });

  return {
    // State
    constituents,
    currentConstiuent,
    currentConstituentHistory,
    currentConstituentResumen,
    error,
    isLoading,

    // Actions
    getConstituents,
    getConstituentHistory,
    getConstituentResumen,
    setCurrentConstituent,
    setError,

    // Getters
    formattedResumenData,
  }
})
