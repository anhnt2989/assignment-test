export interface WeatherWidgetProps {
  hasData: boolean
  location: string
  date: string
  weatherStatus: string
  weatherOverall: {
    icon: string
    temperature: number
    // metric: 'celcius' | 'farenheit'
  }
  weatherInfo: {
    humidity: number
    windStatus: {
      windSpeed: number
      windDirection: string
    }
    airQuantity: string
  }
  currentUnit: string
  currentWindSpeedUnit: string
  currentAqiLevel: string
  handleChangeTempUnit: (unit: string) => void
  forecast: Array<Forecast>
}

export interface Forecast {
  date: number
  icon: string
  maxTemperature: number
  minTemperature: number
  avgTemperature?: number
  wStatus?: string
}