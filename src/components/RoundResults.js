import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {
  GoogleMap,
  Marker,
  Polygon,
  Polyline,
} from '@react-google-maps/api'
import { Progress, Typography } from 'antd'
import { round as roundPropTypes } from './propTypes/game'

const { Title } = Typography

const mapContainerStyle = {
  height: 600,
  width: '100%'
}

const getScorePercent = (score) => score

const getFormattedDistance = (distance) => {
  let formattedDistance = {
    value: parseFloat(distance.toFixed(3)),
    um: 'm'
  }

  if (distance >= 1000) {
    formattedDistance = {
      value: parseFloat((distance / 1000).toFixed(3)),
      um: 'km'
    }
  }

  if (distance < 1) {
    formattedDistance = {
      value: 0,
      um: 'm'
    }
  }

  return formattedDistance
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const RoundResults = ({
  round,
  position,
  site,
  guessMarker
}) => {
  const [formattedDistance, setFormattedDistance] = useState(getFormattedDistance(
    round.distance
  ))
  const [scorePercent] = useState(
    getScorePercent(round.score) || 50
  )

  useEffect(() => {
    setFormattedDistance(getFormattedDistance(
      round.distance
    ))
  }, [round.distance])

  return (
    <Wrapper>
      <Title level={2}>
        Distance: {`${formattedDistance.value} ${formattedDistance.um}`}
      </Title>
      <Progress
        percent={scorePercent}
        showInfo={false}
        strokeColor={{
          from: '#108ee9',
          to: '#87d068',
        }}
      />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={2}
        center={position}
        options={{
          keyboardShortcuts: false,
          mapTypeControl: false,
          streetViewControl: false,
          zoomControl: true,
          gestureHandling: 'greedy'
        }}
      >
        {/* just for debugging purpose show polygon: */}
        {/* <Polygon
          options={{ clickable: false }}
          paths={site}
        /> */}
        {position && (
          <Marker position={position} />
        )}
        {guessMarker && (
          <Marker position={guessMarker} />
        )}
        {position && guessMarker && (
          <Polyline
            path={[position, guessMarker]}
            options={{ strokeWeight: 2 }}
          />
        )}
      </GoogleMap>
    </Wrapper>
  )
}

RoundResults.propTypes = {
  round: roundPropTypes.isRequired,
  site: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  position: PropTypes.shape({}),
  guessMarker: PropTypes.shape({})
}

RoundResults.defaultProps = {
  position: undefined,
  guessMarker: undefined
}

export default RoundResults
