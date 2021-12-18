import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  GoogleMap,
  Marker,
  Polygon
} from '@react-google-maps/api'
import styled from 'styled-components'
import { Button } from 'antd'

import gamePropTypes from './propTypes/game'
import areas from '../constants/areas'

const GuessButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 8px;
`

const GuessButton = styled(Button)`
  width: 800px;
`

const GuessMap = ({
  google,
  mapContainerStyle,
  position,
  onPolygonLoad,
  setRoundOver,
  setGame
}) => {
  const [site, setSite] = useState()
  const [guessMarker, setGuessMarker] = useState()
  const [distanceFromGuessed, setDistanceFromGuessed] = useState()

  const calculateDistance = (pointA, pointB) => (
    google.maps.geometry.spherical.computeDistanceBetween(pointA, pointB)
  )

  const onMapClick = (event) => {
    console.log('click', event)
    const newGuessMarker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    }
    setGuessMarker(newGuessMarker)
    setDistanceFromGuessed(calculateDistance(event.latLng, new google.maps.LatLng(position)))
  }

  const onGuessButtonClick = () => {
    const newGame = (game) => {
      console.log('check')
      // eslint-disable-next-line
      game.rounds[game.rounds.length - 1].distance = distanceFromGuessed
      return {
        ...game,
        rounds: [
          ...game.rounds,
        ]
      }
    }
    setGame(newGame)
    setRoundOver(true)
  }

  useEffect(() => {
    setSite(areas[Math.floor(Math.random() * areas.length)])
  }, [])

  return (
    <div>
      <GuessButtonWrapper>
        <GuessButton
          size="large"
          onClick={onGuessButtonClick}
          disabled={!guessMarker}
        >
          Guess!
        </GuessButton>
      </GuessButtonWrapper>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={position}
        onClick={onMapClick}
        options={{
          fullscreenControl: false,
          keyboardShortcuts: false,
          mapTypeControl: false,
          streetViewControl: false,
          zoomControl: false
        }}
      >
        <Polygon
          options={{ clickable: false }}
          paths={site}
          onLoad={onPolygonLoad}
        />
        {position && (
          <Marker position={position} />
        )}
        {guessMarker && (
          <Marker position={guessMarker} />
        )}
      </GoogleMap>
    </div>
  )
}

GuessMap.propTypes = {
  google: PropTypes.shape({
    maps: PropTypes.shape({
      LatLng: PropTypes.func,
      geometry: PropTypes.shape({
        spherical: PropTypes.shape({
          computeDistanceBetween: PropTypes.func
        })
      })
    })
  }).isRequired,
  mapContainerStyle: PropTypes.shape({}).isRequired,
  position: PropTypes.shape({}),
  onPolygonLoad: PropTypes.func.isRequired,
  setRoundOver: PropTypes.func.isRequired,
  setGame: PropTypes.func.isRequired
}

GuessMap.defaultProps = {
  position: { lat: 0, lng: 0 }
}

export default GuessMap
