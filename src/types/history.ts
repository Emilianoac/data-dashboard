export interface HistoryAPI {
  data: Data
}

export interface Data {
  info: Info
  chart: Chart[]
}

export interface Info {
  name: string
  shortName: string
  countryName: string
  currencyName: string
  currencySymbol: string
  codeInstrument: string
  hourOpen: string
  hourClose: string
}

export interface Chart {
  datetimeLastPrice: string
  datetimeLastPriceTs: number
  lastPrice: number
  highPrice: number
  lowPrice: number
  openPrice: number
  closePrice: number
  volume: number
  volumeMoney: number
  performanceRelative: number
  performanceAbsolute: number
  tend: string
}
