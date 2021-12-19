import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  GoogleMap,
  Marker,
  Polygon
} from '@react-google-maps/api'
import styled from 'styled-components'
import { Button } from 'antd'

import googlePropTypes from './propTypes/google'
import areas from '../constants/areas'

const GUESS_BUTTON_TEXT = 'Guess!'
const DEFAULT_POSITION = { lat: 0, lng: 0 }

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
  setShowRoundResultsModal,
  setGame,
  polygonKey,
  round
}) => {
  const [site, setSite] = useState()
  const [guessMarker, setGuessMarker] = useState()
  const [distanceFromGuessed, setDistanceFromGuessed] = useState()

  const calculateDistance = (pointA, pointB) => (
    google.maps.geometry.spherical.computeDistanceBetween(pointA, pointB)
  )

  const onMapClick = (event) => {
    const newGuessMarker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    }
    setGuessMarker(newGuessMarker)
    setDistanceFromGuessed(calculateDistance(event.latLng, new google.maps.LatLng(position)))
  }

  const onGuessButtonClick = () => {
    const newGame = (game) => {
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
    setShowRoundResultsModal(true)
  }

  useEffect(() => {
    setSite(areas[Math.floor(Math.random() * areas.length)])
  }, [])

  useEffect(() => {
    setGuessMarker()
  }, [round])

  return (
    <div>
      <GuessButtonWrapper>
        <GuessButton
          size="large"
          onClick={onGuessButtonClick}
          disabled={!guessMarker}
        >
          {GUESS_BUTTON_TEXT}
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
          key={polygonKey}
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
  google: googlePropTypes.isRequired,
  mapContainerStyle: PropTypes.shape({}).isRequired,
  position: PropTypes.shape({}),
  onPolygonLoad: PropTypes.func.isRequired,
  setShowRoundResultsModal: PropTypes.func.isRequired,
  setGame: PropTypes.func.isRequired,
  polygonKey: PropTypes.number.isRequired,
  round: PropTypes.number.isRequired
}

GuessMap.defaultProps = {
  position: DEFAULT_POSITION
}

export default GuessMap
