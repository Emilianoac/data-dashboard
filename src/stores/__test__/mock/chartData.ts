import type { Chart } from "@/types/history";

export const mockChartData = [
  {
    "datetimeLastPrice": "06-11-2023 09:00:00",
    "datetimeLastPriceTs": 1699272000,
    "lastPrice": 1995,
    "highPrice": 1998,
    "lowPrice": 1939.9,
    "openPrice": 1940,
    "closePrice": 1995,
    "volume": 2802532,
    "volumeMoney": 5527534765,
    "performanceRelative": 2.835052,
    "performanceAbsolute": 55,
    "tend": "up"
  },
  {
    "datetimeLastPrice": "07-11-2023 09:00:00",
    "datetimeLastPriceTs": 1699358400,
    "lastPrice": 1982.2,
    "highPrice": 2000,
    "lowPrice": 1976.1,
    "openPrice": 1995,
    "closePrice": 1982.2,
    "volume": 270585,
    "volumeMoney": 537953194,
    "performanceRelative": -0.641604,
    "performanceAbsolute": -12.8,
    "tend": "down"
  },
  {
    "datetimeLastPrice": "08-11-2023 09:00:00",
    "datetimeLastPriceTs": 1699444800,
    "lastPrice": 2037,
    "highPrice": 2037,
    "lowPrice": 1976.9,
    "openPrice": 1982.2,
    "closePrice": 2037,
    "volume": 482753,
    "volumeMoney": 976631932,
    "performanceRelative": 2.764605,
    "performanceAbsolute": 54.8,
    "tend": "up"
  },
  {
    "datetimeLastPrice": "09-11-2023 09:00:00",
    "datetimeLastPriceTs": 1699531200,
    "lastPrice": 2051.1,
    "highPrice": 2080,
    "lowPrice": 2000,
    "openPrice": 2040,
    "closePrice": 2051.1,
    "volume": 589548,
    "volumeMoney": 1211594670,
    "performanceRelative": 0.692194,
    "performanceAbsolute": 14.1,
    "tend": "up"
  },
]

export const mockChartDataFiltered = generateData(1);

function generateData(period: number) {
  const data: Chart[] = [];
  for (let i = 0; i < 9; i++) {
    const timestamp = new Date().getTime() - (i * 1000 * 60 * 60 * period);
    data.push(
      { 
        lastPrice: Math.floor(Math.random() * 3000),
        closePrice: Math.floor(Math.random() * 3000),
        datetimeLastPriceTs: timestamp,
        datetimeLastPrice: new Date(timestamp).toLocaleString(),
        highPrice: Math.floor(Math.random() * 3000),
        lowPrice: Math.floor(Math.random() * 3000),
        openPrice: Math.floor(Math.random() * 3000),
        performanceAbsolute: Math.floor(Math.random() * 3000),
        performanceRelative: Math.floor(Math.random() * 3000),
        tend: Math.random() > 0.5 ? "up" : "down",
        volume: Math.floor(Math.random() * 3000),
        volumeMoney: Math.floor(Math.random() * 3000),
      }
    ); 
  }
  return data;
};