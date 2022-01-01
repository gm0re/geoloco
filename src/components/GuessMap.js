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

const GUESS_BUTTON_TEXT = 'Guess!'
const DEFAULT_POSITION = { lat: 0, lng: 0 }

const GuessMapWrapper = styled.div`
  position: relative;
`

const GuessButtonWrapper = styled.div`
  display: flex;
  align-elements: center;
  justify-content: center;
  width: 100%;
  position: absolute;
  top: -20px;
`

const GuessButton = styled(Button)`
  width: 200px;
  z-index: 1000;
`

const GuessMap = ({
  google,
  mapContainerStyle,
  position,
  onPolygonLoad,
  setShowRoundResultsModal,
  setGame,
  guessPosition,
  polygonKey,
  round,
  setGuessPosition,
  site
}) => {
  const [distanceFromGuessed, setDistanceFromGuessed] = useState()

  const calculateDistance = (pointA, pointB) => (
    google.maps.geometry.spherical.computeDistanceBetween(pointA, pointB)
  )

  const onMapClick = (event) => {
    const newGuessPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    }
    setGuessPosition(newGuessPosition)
    setDistanceFromGuessed(calculateDistance(event.latLng, new google.maps.LatLng(position)))
  }

  const onGuessButtonClick = () => {
    const newGame = (startedGame) => {
      const startedRound = {
        ...startedGame.rounds[startedGame.rounds.length - 1],
        // position,
        guessPosition,
        distance: distanceFromGuessed
      }
      // eslint-disable-next-line no-param-reassign
      startedGame.rounds[startedGame.rounds.length - 1] = startedRound

      return {
        ...startedGame,
        rounds: [
          ...startedGame.rounds,
        ]
      }
    }
    setGame(newGame)
    setShowRoundResultsModal(true)
  }

  useEffect(() => {
    setGuessPosition()
  }, [round])

  return (
    <GuessMapWrapper>
      <GuessButtonWrapper>
        <GuessButton
          size="large"
          onClick={onGuessButtonClick}
          disabled={!guessPosition}
        >
          {GUESS_BUTTON_TEXT}
        </GuessButton>
      </GuessButtonWrapper>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={2}
        center={DEFAULT_POSITION}
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
          visible={false}
        />
        {guessPosition && (
          <Marker position={guessPosition} />
        )}
      </GoogleMap>
    </GuessMapWrapper>
  )
}

GuessMap.propTypes = {
  google: googlePropTypes.isRequired,
  mapContainerStyle: PropTypes.shape({}).isRequired,
  position: PropTypes.shape({}),
  onPolygonLoad: PropTypes.func.isRequired,
  setShowRoundResultsModal: PropTypes.func.isRequired,
  setGame: PropTypes.func.isRequired,
  guessPosition: PropTypes.shape({}),
  setGuessPosition: PropTypes.func.isRequired,
  polygonKey: PropTypes.string.isRequired,
  round: PropTypes.number.isRequired,
  site: PropTypes.arrayOf(PropTypes.shape({})).isRequired
}

GuessMap.defaultProps = {
  position: DEFAULT_POSITION,
  guessPosition: undefined
}

export default GuessMap
