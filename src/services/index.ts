import axios from 'utils/axios'
import Endpoints from 'constants/endpoints'
import { Utils } from 'utils'
import { 
  CoordinateAPIParams, 
  CoordinateResponse, 
  CFWeatherAPIParams, 
  CFWeatherResponse ,
  HistoricalWeatherAPIParams,
  HistoricalWeatherResponse,
  AirPollutionAPIParams,
  AirPollutionResponse
} from 'models'

//should take API_KEY from .env file. In here, I fixed it for good
const API_KEY = '1c5da32bd6a0d1c4c017b21b49833c7f'
// const API_KEY = 'f0bfa3f9b1a5ab7ee5ceeda179a3864f'

export async function getCoordinatesFromLocationName(requestParams: CoordinateAPIParams): Promise<CoordinateResponse> {
  try {
    const response: CoordinateResponse = await axios().get(Utils.buildUrlWithParams(Endpoints.GET_COORDINATES, {...requestParams, appId: API_KEY}))
    return response
  } catch(error) {
    throw error
  }
}

export async function getCFWeather(requestParams: CFWeatherAPIParams): Promise<CFWeatherResponse> {
  try {
    const response: CFWeatherResponse = await axios().get(Utils.buildUrlWithParams(Endpoints.GET_CF_WEATHER, {...requestParams, appId: API_KEY}))
    return response
  } catch(error) {
    throw error
  }
}

export async function getHistoricalWeather(requestParams: HistoricalWeatherAPIParams): Promise<HistoricalWeatherResponse> {
  try {
    const response: HistoricalWeatherResponse = await axios().get(Utils.buildUrlWithParams(Endpoints.GET_H_WEATHER, {...requestParams, appId: API_KEY}))
    return response
  } catch(error) {
    throw error
  }
}

export async function getAirPollution(requestParams: AirPollutionAPIParams): Promise<AirPollutionResponse> {
  try {
    const response: AirPollutionResponse = await axios().get(Utils.buildUrlWithParams(Endpoints.GET_AIR_POLUTION, {...requestParams, appId: API_KEY}))
    return response
  } catch(error) {
    throw error
  }
}

// export async function generateIcon(icon: string): Promise<any> {
//   try {
//     const response: any = await axios().get(`http://openweathermap.org/img/wn/${icon}@2x.png`)
//     return response
//   } catch(error) {
//     throw error
//   }
// }