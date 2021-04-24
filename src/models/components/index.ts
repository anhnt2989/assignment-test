export interface WeatherWidgetProps {
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
  currentAqiLevel: string
  handleChangeTempUnit: (unit: string) => void
  forecast: Array<Forecast>
}

export interface Forecast {
  date: number
  icon: string
  maxTemperature: number
  minTemperature: number
}