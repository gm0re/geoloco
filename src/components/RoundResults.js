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

import googlePropTypes from './propTypes/google'
import { round as roundPropTypes } from './propTypes/game'
import { maxScore as MAX_SCORE } from '../constants/game'

const { Title } = Typography

const mapContainerStyle = {
  height: 600,
  width: '100%'
}

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
  google,
  round,
  position,
  site,
  guessPosition
}) => {
  const [formattedDistance, setFormattedDistance] = useState(
    getFormattedDistance(round.distance)
  )

  const onResultsMapLoad = (newGuessMap) => {
    const bounds = new google.maps.LatLngBounds()
    const markersCoords = [
      new google.maps.LatLng(position.lat, position.lng),
      new google.maps.LatLng(guessPosition.lat, guessPosition.lng)
    ]
    markersCoords.forEach((markerCoords) => bounds.extend(markerCoords))
    newGuessMap.fitBounds(bounds)
  }

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
      <Title level={3}>
        Round Score: {round.score}
      </Title>
      <Progress
        percent={(round.score / MAX_SCORE) * 100}
        showInfo={false}
        strokeColor={{
          from: '#108ee9',
          to: '#87d068',
        }}
      />
      <GoogleMap
        onLoad={onResultsMapLoad}
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
        <Polygon
          options={{ clickable: false }}
          paths={site}
        />
        {position && (
          <Marker position={position} />
        )}
        {guessPosition && (
          <Marker position={guessPosition} />
        )}
        {position && guessPosition && (
          <Polyline
            path={[position, guessPosition]}
            options={{ strokeWeight: 2 }}
          />
        )}
      </GoogleMap>
    </Wrapper>
  )
}

RoundResults.propTypes = {
  google: googlePropTypes.isRequired,
  round: roundPropTypes.isRequired,
  site: PropTypes.arrayOf(PropTypes.shape({})),
  position: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number
  }),
  guessPosition: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number
  })
}

RoundResults.defaultProps = {
  position: undefined,
  guessPosition: undefined,
  site: undefined
}

export default RoundResults
