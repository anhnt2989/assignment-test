export interface CoordinateAPIParams {
  q: string
  limit?: number
}

export interface CoordinateResponse {
  name: string
  local_names?: {
    "ar": string
    "ascii": string
    "az": string
    "bg": string
    "ca": string
    "da": string
    "de": string
    "el": string
    "en": string
    "eu": string
    "fa": string
    "feature_name": string
    "fi": string
    "fr": string
    "he": string
    "hi": string
    "hu": string
    "id": string
    "it": string
    "ja": string
    "lt": string
    "mk": string
    "nl": string
    "no": string
    "pl": string
    "pt": string
    "ru": string
    "sk": string
    "sl": string
    "sr": string
    "th": string
    "tr": string
    "vi": string
  },
  "lat": number
  "lon": number
  "country": string
}

export interface CFWeatherAPIParams {
  lat: number
  lon: number
  exclude?: string | any
  units?: string
  lang?: string
}

export interface CFWeatherResponse {
  "lat": number
  "lon": number
  "timezone": string
  "timezone_offset": number
  "current": {
    "dt": number
    "sunrise": number
    "sunset": number
    "temp": number
    "feels_like": number
    "pressure": number
    "humidity": number
    "dew_point": number
    "uvi": number
    "clouds": number
    "visibility": number
    "wind_speed": number
    "wind_deg": number
    "weather": Array<{
      "id": number
      "main": string
      "description": string
      "icon": string
    }>
  },
  "minutely": Array<{
    "dt": number,
    "precipitation": number
  }>,
  "hourly": Array<{
    "dt": number
    "temp": number
    "feels_like": number
    "pressure": number
    "humidity": number
    "dew_point": number
    "uvi": number
    "clouds": number
    "visibility": number
    "wind_speed": number
    "wind_deg": number
    "wind_gust": number
    "weather": Array<{
      "id": number
      "main": string
      "description": string
      "icon": string
    }>,
    "pop": number
  }>,
  "daily": Array<{
    "dt": number
    "sunrise": number
    "sunset": number
    "moonrise": number
    "moonset": number
    "moon_phase": number
    "temp": {
      "day": number
      "min": number
      "max": number
      "night": number
      "eve": number
      "morn": number
    },
    "feels_like": {
      "day": number
      "night": number
      "eve": number
      "morn": number
    },
    "pressure": number
    "humidity": number
    "dew_point": number
    "wind_speed": number
    "wind_deg": number
    "wind_gust": number
    "weather": Array<{
      "id": number
      "main": string
      "description": string
      "icon": string
    }>,
    "clouds": number
    "pop": number
    "rain": number
    "uvi": number
  }>
}

export interface HistoricalWeatherAPIParams {
  lat: number
  lon: number
  dt: number | string
  units?: string
  lang?: string
}

export interface HistoricalWeatherResponse {
  "lat": number
  "lon": number
  "timezone": string
  "timezone_offset": number
  "current": {
    "dt": number
    "sunrise":number
    "sunset": number
    "temp": number
    "feels_like": number
    "pressure": number
    "humidity": number
    "dew_point": number
    "uvi": number
    "clouds": number
    "visibility": number
    "wind_speed": number
    "wind_deg": number
    "weather": Array<{
      "id": number
      "main": string
      "description": string
      "icon": string
    }>
  },
  "hourly": Array<{
    "dt": number
    "temp": number
    "feels_like": number
    "pressure": number
    "humidity": number
    "dew_point":number
    "clouds": number
    "wind_speed": number
    "wind_deg": number
    "wind_gust": number
    "weather": Array<{
      "id": number
      "main": string
      "description": string
      "icon": string
    }>,
    "rain": {
      "1h": number
    }
  }>
}

export interface AirPollutionAPIParams {
  lat: number
  lon: number
}

export interface AirPollutionResponse {
  "coord": {
      "lon": number
      "lat": number
  },
  "list": Array<{
    "main": {
        "aqi": number
    },
    "components": {
        "co": number
        "no": number
        "no2": number
        "o3": number
        "so2": number
        "pm2_5": number
        "pm10": number
        "nh3": number
    },
    "dt": number
}>
}