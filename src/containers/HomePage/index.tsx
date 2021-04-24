import React from 'react'
import { Container } from 'reactstrap'
import { Row, Col, Typography } from 'antd'
import { isEmpty, map } from 'lodash'
import dayjs from 'dayjs'

import LocationInput from 'components/LocationInput'
import WeatherWidget from 'components/WeatherWidget'

import { CFWeatherAPIParams, AirPollutionAPIParams } from 'models'
import { Utils } from 'utils'
import { 
  getCoordinatesFromLocationName,
  getCFWeather,
  getAirPollution
} from 'services'

import Wrapper from './HomePageWrapper'

const { Title } = Typography

var customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

function HomePage() {
  const [currentLocation, setCurrentLocation] = React.useState(null)
  const [weatherData, setWeatherData] = React.useState(null)
  const [weatherOverall, setWeatherOverall] = React.useState(null)
  const [weatherInfo, setWeatherInfo] = React.useState(null)
  const [locationParam, setLocationParam] = React.useState({q: ''})
  const [unit, setUnit] = React.useState('farenheit')
  const [currentAqiLevel, setCurrentAqiLevel] = React.useState('Good')
  const [weatherStatus, setWeatherStatus] = React.useState('Unknown')
  const [forecast, setForecast] = React.useState([])

  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

  React.useEffect(() => {
    if (currentLocation) {
      const { lat, lon } = currentLocation
      getForecastWeather({ lat, lon, exclude: 'hourly' })
      getPollutionStatus({ lat, lon })
    }
    // eslint-disable-next-line
  }, [currentLocation, unit])

  const getLocationCoors = async () => {
    try {
      const response = await getCoordinatesFromLocationName(locationParam)
      if (response && !isEmpty(response)) {
        setCurrentLocation(response[0])
      }
    } catch(error) {

    }
  }

  const getForecastWeather = async (requestParams: CFWeatherAPIParams) => {
    try {
      const response = await getCFWeather(requestParams)
      if (response && !isEmpty(response)) {
        const status = response?.current?.weather[0]?.main ?? 'Unknown'
        const overall = {
          icon: `http://openweathermap.org/img/wn/${response?.current?.weather[0]?.icon}@2x.png`,
          temperature: Utils.formatCF(response?.current?.temp, unit)
        }
        const info = {
          humidity: response?.current?.humidity,
          windStatus: {
            windSpeed: response?.current?.wind_speed,
            windDirection: Utils.generateWindDirection(response?.current?.wind_deg)
          }
        }
        const forecast = map(response.daily, (el: {dt: number, weather: Array<{description: string, icon: string, id: number, main: string}>, temp: {day: 300.95, eve: number, max: number, min: number, morn: number, night: number}}) => {
          return {
            date: el.dt,
            icon: `http://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png`,
            maxTemperature: el.temp.max,
            minTemperature: el.temp.min,
          }
          
        })
        setWeatherData(response)
        setWeatherStatus(status)
        setWeatherOverall(overall)
        setWeatherInfo(info)
        setForecast(forecast)
      }
    } catch(error) {

    }
  }

  const getPollutionStatus = async (requestParams: AirPollutionAPIParams) => {
    try {
      const response = await getAirPollution(requestParams)
      if (response && !isEmpty(response)) {
        const aqiLevel = Utils.generateAirPollutionLevel(response?.list[0]?.main?.aqi)
        setCurrentAqiLevel(aqiLevel)
      }
    } catch(error) {

    }
  }

  const onLocationChange = (event: any) => {
    let coordinateParams = {
      q: event.target.value,
    }
    setLocationParam(coordinateParams)
  }

  const handleChangeTempUnit = (unit: string) => {
    setUnit(unit)
  }

  return (
    <Wrapper>
      <Container>
        <Row>
          <Col xs={24}>
            <Title level={3} className="text-center">Weather Module</Title>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col xs={24} md={3} lg={6} />
          <Col xs={24} md={18} lg={12}>
            <LocationInput 
              placeholder="Please enter your location" 
              size="large" 
              allowClear 
              onChange={onLocationChange}
              onPressEnter={getLocationCoors}
            />
          </Col>
          <Col xs={24} md={3} lg={6} />
        </Row>
        {!!weatherData && 
          <Row className="mt-3">
            <Col xs={24} md={3} lg={6} />
            <Col xs={24} md={18} lg={12}>
              <WeatherWidget
                location={`${currentLocation?.name}, ${currentLocation?.country}`}
                date={`${days[new Date().getDay()]} ${Utils.formatAMPM(new Date().getHours())}`}
                weatherStatus={weatherStatus}
                weatherOverall={weatherOverall}
                weatherInfo={weatherInfo}
                currentAqiLevel={currentAqiLevel}
                forecast={forecast}
                currentUnit={unit}
                handleChangeTempUnit={handleChangeTempUnit}
              />
            </Col>
            <Col xs={24} md={3} lg={6} />
          </Row>
        }
      </Container>
    </Wrapper>
  )
}

export default HomePage