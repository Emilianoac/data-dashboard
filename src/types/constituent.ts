export interface ConstituentAPI {
  data: Data
}

export interface Data {
  info: Info
  constituents: Constituent[]
}

export interface Info {
  name: string
  shortName: string
  countryName: string
  codeInstrument: string
}

export interface Constituent {
  codeInstrument: string
  name: string
  shortName: string
  pctDay: number
  pct30D: number
  pctCY: number
  pct1Y: number
  lastPrice: number
  datetimeLastPrice: string
  volumeMoney: number
  accumulatedVolumeMoney: number
  tend: string
  performanceAbsolute: number
  performanceRelative: number
}
