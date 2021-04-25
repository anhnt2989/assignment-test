import React from 'react'
import { Container } from 'reactstrap'
import { Row, Col, Typography } from 'antd'
import { isEmpty, map } from 'lodash'
// import dayjs from 'dayjs'

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

// var customParseFormat = require('dayjs/plugin/customParseFormat')
// dayjs.extend(customParseFormat)

function HomePage() {
  const [currentLocation, setCurrentLocation] = React.useState(null)
  const [weatherData, setWeatherData] = React.useState(null)
  const [weatherOverall, setWeatherOverall] = React.useState(null)
  const [weatherInfo, setWeatherInfo] = React.useState(null)
  const [locationParam, setLocationParam] = React.useState({q: ''})
  const [unit, setUnit] = React.useState('imperial')
  const [windSpeedUnit, setWindSpeedUnit] = React.useState('MPH')
  const [currentAqiLevel, setCurrentAqiLevel] = React.useState('Good')
  const [weatherStatus, setWeatherStatus] = React.useState('Unknown')
  const [forecast, setForecast] = React.useState([])

  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

  React.useEffect(() => {
    if (currentLocation) {
      const { lat, lon } = currentLocation
      getForecastWeather({ lat, lon, exclude: 'hourly', units: unit })
      getPollutionStatus({ lat, lon })
    }
    // eslint-disable-next-line
  }, [currentLocation, unit])

  const getLocationCoors = async () => {
    try {
      const response = await getCoordinatesFromLocationName(locationParam)
      if (response && !isEmpty(response)) {
        setCurrentLocation(response[0])
      } else {
        setWeatherData(null)
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
          temperature: response?.current?.temp
        }
        const info = {
          humidity: response?.current?.humidity,
          windStatus: {
            windSpeed: unit === 'imperial' ? response?.current?.wind_speed : (response?.current?.wind_speed * 3.60).toFixed(2),
            windDirection: Utils.generateWindDirection(response?.current?.wind_deg)
          }
        }
        const forecast = map(response.daily, (el: {dt: number, weather: Array<{description: string, icon: string, id: number, main: string}>, temp: {day: number, eve: number, max: number, min: number, morn: number, night: number}}) => {
          return {
            date: el.dt,
            icon: `http://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png`,
            maxTemperature: el.temp.max,
            minTemperature: el.temp.min,
            avgTemperature: el.temp.eve
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
    // eslint-disable-next-line
    if (event.target.value && event.target.value != '') {
      let coordinateParams = {
        q: event.target.value,
      }
      setLocationParam(coordinateParams)
    } else {
      setLocationParam({q: ''})
      setWeatherData(null)
    }
  }

  const handleChangeTempUnit = (unit: string) => {
    setUnit(unit)
    if (unit === 'metric') {
      setWindSpeedUnit('KPH')
    } else {
      setWindSpeedUnit('MPH')
    }
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
              placeholder="Please type your location and press Enter" 
              size="large" 
              allowClear 
              onChange={onLocationChange}
              onPressEnter={getLocationCoors}
            />
          </Col>
          <Col xs={24} md={3} lg={6} />
        </Row>
        {locationParam && !isEmpty(locationParam.q) &&
          <Row className="mt-3">
            <Col xs={24} md={3} lg={6} />
            <Col xs={24} md={18} lg={12}>
              <WeatherWidget
                hasData={!!weatherData}
                location={`${currentLocation?.name}, ${currentLocation?.country}`}
                date={`${days[new Date().getDay()]} ${Utils.formatAMPM(new Date().getHours())}`}
                weatherStatus={weatherStatus}
                weatherOverall={weatherOverall}
                weatherInfo={weatherInfo}
                currentAqiLevel={currentAqiLevel}
                forecast={forecast}
                currentUnit={unit}
                currentWindSpeedUnit={windSpeedUnit}
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