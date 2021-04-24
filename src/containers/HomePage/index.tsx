import React from 'react'
import { Container } from 'reactstrap'
import { Row, Col, Typography } from 'antd'
import { isEmpty, map } from 'lodash'
import dayjs from 'dayjs'

import LocationInput from 'components/LocationInput'
import WeatherWidget from 'components/WeatherWidget'

import { CFWeatherAPIParams } from 'models'
import { 
  getCoordinatesFromLocationName,
  getCFWeather
} from 'services'

import Wrapper from './HomePageWrapper'

const { Title } = Typography

var customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

function HomePage() {
  const [currentLocation, setCurrentLocation] = React.useState(null)
  const [locationParam, setLocationParam] = React.useState({q: ''})
  // const [units, setUnits] = React.useState('celcius')
  const [weatherData, setWeatherData] = React.useState(null)
  const [weatherOverall, setWeatherOverall] = React.useState(null)
  const [weatherInfo, setWeatherInfo] = React.useState(null)
  const [weatherStatus, setWeatherStatus] = React.useState('Unknown')
  const [forecast, setForecast] = React.useState([])

  var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  React.useEffect(() => {
    if (currentLocation) {
      // const { lat, lon } = currentLocation
      getForecastWeather({lat: currentLocation.lat, lon: currentLocation.lon})
    }
  }, [currentLocation])

  const onLocationChange = (event: any) => {
    let coordinateParams = {
      q: event.target.value,
    }
    setLocationParam(coordinateParams)
  }

  const getLocationCoors = async (event: any) => {
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
        console.log(response)
        const status = response?.current?.weather[0]?.main ?? 'Unknown'
        const overall = map(response, el => {
          // return {
          //   icon: el.current.weather[0].icon,
          //   temperature: ,
          // }
          console.log(el)
        })
        setWeatherData(response)
        setWeatherStatus(status)
      }
    } catch(error) {

    }
  }

  const formatAMPM = (hour: number) => {
    var hours = hour
    var ampm = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12
    hours = hours ? hours : 12 // the hour '0' should be '12'
    var strTime = hours + ampm
    return strTime;
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
                date={`${days[new Date().getDay()]} ${formatAMPM(new Date().getHours())}`}
                weatherStatus={weatherStatus}
                weatherOverall={weatherOverall}
                weatherInfo={weatherInfo}
                forecast={forecast}
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