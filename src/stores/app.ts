import  { ref, computed } from "vue";
import  { defineStore } from "pinia";
import localeString from "@/utils/localeString";
import  getConstituentHistoryAPI from "@/api/history/_index";
import  {getAllConstituentsAPI, searchConstituentAPI}  from "@/api/constituyentes/_index";
import  getResumenAPI from "@/api/resumen/_index";
import  type { ConstituentAPI, Constituent } from "@/types/constituent";
import  type { ResumenAPI } from "@/types/resumen";
import  type { HistoryAPI } from "@/types/history";

export const useAppStore = defineStore("app", () => {
  const constituents = ref<ConstituentAPI | undefined>(undefined);
  const currentConstiuent = ref<string>("IPSA");
  const currentConstituentHistory = ref<HistoryAPI | undefined>(undefined);
  const currentConstituentResumen = ref<ResumenAPI | undefined>(undefined);

  const searchResults = ref<Constituent[]>([]);

  const currentChartFilter = ref<string>("1y");
  const isLoading = ref(false);
  const error = ref<{status: boolean, message: string} | undefined>(undefined);

  function setCurrentConstituent(index: string) {
    currentConstiuent.value = index;
  }

  function setError(status : {status: boolean, message: string} | undefined) {
    if (status) {
      error.value = status;
    } else {
      error.value = undefined;
    }
  }

  function setChartFilter(filter: string) {
    currentChartFilter.value = filter;
  };

  async function getConstituents() {
    try {
      const data = await getAllConstituentsAPI() as ConstituentAPI;
      constituents.value = data
    } catch (error) {
      console.error(error)
    }
  };

  async function setSearchResults(search: string) {
    try {
      const data = await searchConstituentAPI(search) as Constituent[];
      searchResults.value = data;
    } catch (error) {
      console.error(error)
    }
  }

  async function getConstituentHistory() {
    isLoading.value = true;
    error.value = undefined;

    try {
      const data = await getConstituentHistoryAPI({index: currentConstiuent.value}) as HistoryAPI;
      if (!data) throw new Error(`No se encontraron datos para el índice ${currentConstiuent.value}`);

      currentConstituentHistory.value = data
    } catch(e) {
      if (e instanceof Error) {
        error.value = { status: true, message: e.message };
      }
    } finally {
      isLoading.value = false;
    }
  }

  async function getConstituentResumen() {
    try {
      const data = await getResumenAPI({index:currentConstiuent.value}) as ResumenAPI;
      if (!data) return;
      currentConstituentResumen.value = data
    } catch (error) {
      console.error(error)
    }
  }

  const formatedChartData = computed( () => {
    return currentConstituentHistory.value?.data.chart.map((item) => ({timestamp :item.datetimeLastPriceTs * 1000, value: localeString(item.closePrice)}));
  });

  const formattedResumenData =  computed(() => {
    if (!currentConstituentResumen.value) return null;
    const green = "text-green-600 dark:text-green-500";
    const red = "text-red-600 dark:text-red-500";

    const getClass = (value: number) => {
      if (value > 0) return green;
      if (value < 0) return red;
      return "";
    };

    const { data } = currentConstituentResumen.value;
    const { price } = data;

    function formatNumber(data: number) {
      return `${data > 0 ? "+" : ""}${data.toFixed(2)}`;
    }

    return {
      marketName: data.info.marketName,
      name: data.info.name,
      hourOpen: data.info.hourOpen,
      hourClose: data.info.hourClose,
      shortName: data.info.shortName,
      datetimeLastPrice: data.price.datetimeLastPrice,
      countryName: data.info.countryName,
      closePriceFormatted: localeString(price.closePrice),
      openPriceFormatted: localeString(price.openPrice),
      lastPriceFormatted: localeString(price.lastPrice),
      performanceRelativeFormatted: {
        value: formatNumber(price.performanceRelative),
        class: getClass(price.performanceRelative),
      },
      performanceAbsoluteFormatted: {
        value: formatNumber(price.performanceAbsolute),
        class: getClass(price.performanceAbsolute),
      },
      pct30DFormatted: {
        value: formatNumber(price.pct30D),
        class: getClass(price.pct30D),
      },
      pctRelW52Formatted: {
        value: formatNumber(price.pctRelW52),
        class: getClass(price.pctRelW52),
      },
      pctRelCYFormatted: {
        value: formatNumber(price.pctRelCY),
        class: getClass(price.pctRelCY),
      },
      maxDayFormatted: localeString(price.maxDay),
      minDayFormatted: localeString(price.minDay),
      min52WFormatted: localeString(price.min52W),
      max52WFormatted: localeString(price.max52W),
    };
  });

  return {
      // State
      constituents,
      currentConstiuent,
      currentConstituentHistory,
      currentConstituentResumen,
      error,
      isLoading,
      currentChartFilter,
      searchResults,

      // Actions
      getConstituents,
      getConstituentHistory,
      getConstituentResumen,
      setCurrentConstituent,
      setError,
      setSearchResults,
      setChartFilter,

      // Computed
      formatedChartData,
      formattedResumenData,
    }
})
