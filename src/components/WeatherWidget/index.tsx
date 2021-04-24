import React from 'react'
import { Container } from 'reactstrap'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Typography from 'antd/lib/typography'
// import dayjs from 'dayjs'

import { WeatherWidgetProps } from 'models/components'
import Wrapper from './Wrapper'

const { Title, Text } = Typography

function WeatherWidget(props: WeatherWidgetProps) {
  const {
    location,
    date,
    weatherStatus,
    weatherOverall,
    weatherInfo,
    currentAqiLevel,
    forecast,
    currentUnit,
    handleChangeTempUnit
  } = props

  const onChangeTempUnit = (unit: string) => {
    handleChangeTempUnit && handleChangeTempUnit(unit)
  }

  return (
    <Wrapper>
      <Container fluid>
        <div className="w-widget__info-block">
          <Row>
            <Col xs={24}>
              <Title level={4} className="w-widget__info-block__title" >{location && location}</Title>
              <div className="w-widget__info-block__info">
                <Text>{date && date}</Text>
                <Text className="mx-2">•</Text>
                <Text>{weatherStatus && weatherStatus}</Text>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={24} md={12}>
              <Row>
                <Col xs={8} sm={8}>
                  {weatherOverall && <img className="img" src={weatherOverall.icon} alt=""/>}
                </Col>
                <Col xs={12} sm={12}>
                  {weatherOverall && <Title level={1} className="w-widget__title-temp">{Math.floor(weatherOverall.temperature)}&#176;</Title>}
                </Col>
                <Col xs={4} sm={4}>
                  <p className="w-widget__unit-selector"><span className={`${currentUnit && currentUnit === 'farenheit' && 'activated'}`} onClick={() => onChangeTempUnit('farenheit')}>F</span> / <span className={`${currentUnit && currentUnit === 'celcius' && 'activated'}`} onClick={() => onChangeTempUnit('celcius')}>C</span></p>
                </Col>
              </Row>
            </Col>
            <Col xs={24} md={12} className="w-widget__w-info">
              <div><span>Humidity: </span>{weatherInfo && weatherInfo.humidity}%</div>
              <div><span>Wind: </span>{weatherInfo && weatherInfo.windStatus.windSpeed} KPH {weatherInfo && weatherInfo.windStatus.windDirection}</div>
              <div><span>Air Quality: </span> {currentAqiLevel && currentAqiLevel}</div>
            </Col>
          </Row>
        </div>
      </Container>
    </Wrapper>
  )
}

export default WeatherWidget