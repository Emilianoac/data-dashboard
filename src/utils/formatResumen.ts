import localeString from "@/utils/localeString";
import type { ResumenAPI } from "@/types/resumen";

export default function formatResumen(data: ResumenAPI["data"]) {
  const green = "text-green-600 dark:text-green-500";
  const red = "text-red-600 dark:text-red-500";

  const getClass = (value: number) => {
    if (value > 0) return green;
    if (value < 0) return red;
    return "";
  };

  function formatNumber(data: number) {
    return `${data > 0 ? "+" : ""}${data.toFixed(2)}`;
  }

  const { price } = data;

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
}
