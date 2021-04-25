import React from 'react'
import { Container } from 'reactstrap'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Typography from 'antd/lib/typography'
import { isEmpty, isEqual, map } from 'lodash'

import { Forecast, WeatherWidgetProps } from 'models/components'
import EmptyVector from 'assets/images/Vector.png'

import Wrapper from './Wrapper'

const { Title, Text } = Typography

function WeatherWidget(props: WeatherWidgetProps) {
  const {
    hasData,
    location,
    date,
    weatherStatus,
    weatherOverall,
    weatherInfo,
    currentAqiLevel,
    forecast,
    currentUnit,
    currentWindSpeedUnit,
    handleChangeTempUnit
  } = props

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const fullDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  const [selectedWeatherOverall, setSelectedWeatherOverall] = React.useState(null)

  React.useEffect(() => {
    if (weatherOverall && date && !isEmpty(weatherOverall)) {
      let preLoad = {
        date,
        icon: weatherOverall.icon,
        temperature: weatherOverall.temperature,
        wStatus: weatherStatus
      }
      setSelectedWeatherOverall(preLoad)
    }
  }, [weatherOverall, date, currentUnit, weatherStatus])

  const onChangeTempUnit = (unit: string) => {
    handleChangeTempUnit && handleChangeTempUnit(unit)
  }

  const handleSelectForecast = (forecast: Forecast, index: number) => {
    const { date, icon, maxTemperature, avgTemperature, wStatus } = forecast
    let afterLoad = {...selectedWeatherOverall}
    if (index === 0) {
      afterLoad = {
        date: `${fullDays[new Date(date).getDay()]}`,
        icon,
        temperature: avgTemperature,
        wStatus
      }
    } else {
      afterLoad = {
        date: `${fullDays[new Date(date).getDay()]}`,
        icon,
        temperature: maxTemperature,
        wStatus
      }
    }
    setSelectedWeatherOverall(afterLoad)
  }

  return (
    <Wrapper>
      <Container fluid className="px-0">
        {hasData ?
          <React.Fragment>
            <div className="w-widget__info-block">
              <Row>
                <Col xs={24}>
                  <Title level={4} className="w-widget__info-block__title" >{location && location}</Title>
                  <div className="w-widget__info-block__info">
                    <Text>{selectedWeatherOverall && selectedWeatherOverall.date}</Text>
                    <Text className="mx-2">•</Text>
                    <Text>{selectedWeatherOverall && selectedWeatherOverall.wStatus}</Text>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col xs={24} md={12}>
                  <Row>
                    <Col xs={8} sm={8}>
                      {/* {weatherOverall && <img className="img" src={weatherOverall.icon} alt="" />} */}
                      {selectedWeatherOverall && <img className="img" src={selectedWeatherOverall.icon} alt="" />}
                    </Col>
                    <Col xs={12} sm={12}>
                      {/* {weatherOverall && <Title level={1} className="w-widget__title-temp">{Math.floor(weatherOverall.temperature)}&#176;</Title>} */}
                      {selectedWeatherOverall && <Title level={1} className="w-widget__title-temp">{Math.floor(selectedWeatherOverall.temperature)}&#176;</Title>}
                    </Col>
                    <Col xs={4} sm={4}>
                      <p className="w-widget__unit-selector">
                        <span className={`${currentUnit && currentUnit === 'imperial' && 'activated'}`} onClick={() => onChangeTempUnit('imperial')}>F</span>
                        <span className="mx-2">/</span>
                        <span className={`${currentUnit && currentUnit === 'metric' && 'activated'}`} onClick={() => onChangeTempUnit('metric')}>C</span>
                      </p>
                    </Col>
                  </Row>
                </Col>
                <Col xs={24} md={12} className="w-widget__w-info">
                  <div><span>Humidity: </span>{weatherInfo && weatherInfo.humidity}%</div>
                  <div><span>Wind: </span>{weatherInfo && weatherInfo.windStatus.windSpeed} {currentWindSpeedUnit && currentWindSpeedUnit} {weatherInfo && weatherInfo.windStatus.windDirection}</div>
                  <div><span>Air Quality: </span> {currentAqiLevel && currentAqiLevel}</div>
                </Col>
              </Row>
            </div>
            <div className="w-widget__forecast">
              <Row>
                {forecast && !isEmpty(forecast) && map(forecast, (fc: Forecast, index) => {
                  return (
                    <Col xs={3} key={`forecast--${index}`} className={`text-center forecast__wrapper ${isEqual(fc, selectedWeatherOverall) && 'activated'}`} onClick={() => handleSelectForecast(fc, index)}>
                      <div className="forecast__dt">
                        {`${days[new Date(fc.date).getDay()]}`}
                      </div>
                      <div className="forecast__icon">
                        <img src={fc.icon} alt="Forecast Icon" className="img" />
                      </div>
                      <div className="forecast__temp-block">
                        <div className="forecast__max-temp">{Math.floor(fc.maxTemperature)}&#176;</div>
                        <div className="forecast__min-temp">{Math.floor(fc.minTemperature)}&#176;</div>
                      </div>
                    </Col>
                  )
                })}
              </Row>
            </div>
          </React.Fragment>
          :
          <div className="w-widget__no-data">
            <img className="img" src={EmptyVector} alt="Empty Img"/>
            <div className="w-widget__no-data-desc">
              <Text type="secondary">We could not find weather information for the location above</Text>
            </div>
          </div>
        }
      </Container>
    </Wrapper>
  )
}

export default WeatherWidget