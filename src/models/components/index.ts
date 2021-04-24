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
  forecast: Array<Forecast>
}

interface Forecast {
  weekDay: string
  icon: string
  maxTemperature: number
  minTemperature: number
}