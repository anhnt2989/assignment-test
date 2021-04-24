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
    forecast
  } = props
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
        </div>
      </Container>
    </Wrapper>
  )
}

export default WeatherWidget