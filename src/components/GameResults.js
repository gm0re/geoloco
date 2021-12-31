import React from 'react'
import styled from 'styled-components'
import {
  GoogleMap,
  Marker,
  Polyline,
} from '@react-google-maps/api'
import { Typography } from 'antd'

import { game as gamePropTypes } from './propTypes/game'

const { Title } = Typography

const mapContainerStyle = {
  height: 600,
  width: '100%'
}

const DEFAULT_POSITION = { lat: 0, lng: 0 }

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const GameResults = ({
  game
}) => (
  <Wrapper>
    <Title level={2}>
      Round Results
    </Title>
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={2}
      center={DEFAULT_POSITION}
      options={{
        keyboardShortcuts: false,
        mapTypeControl: false,
        streetViewControl: false,
        zoomControl: true,
        gestureHandling: 'greedy'
      }}
    >
      {game.rounds.map(({
        position,
        guessPosition
      }, key) => (
        <>
          <Marker position={position} key={`round-position-${key}`} />
          <Marker position={guessPosition} key={`round-guess-position-${key}`} />
          <Polyline
            key={`round-poly-${key}`}
            path={[position, guessPosition]}
            options={{ strokeWeight: 2 }}
          />
        </>
      ))}
    </GoogleMap>
  </Wrapper>
)

GameResults.propTypes = {
  game: gamePropTypes.isRequired
}

export default GameResults
