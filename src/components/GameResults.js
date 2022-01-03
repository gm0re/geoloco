import React, { Fragment } from 'react'
import styled from 'styled-components'
import {
  GoogleMap,
  Marker,
  Polyline,
} from '@react-google-maps/api'
import { Progress, Typography } from 'antd'
import { v4 as uuid } from 'uuid'

import { game as gamePropTypes } from './propTypes/game'
import { maxScore as MAX_SCORE } from '../constants/game'

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
    <Title level={3}>
      Game Score: {game.score}
    </Title>
    <Progress
      percent={(game.score / MAX_SCORE) * 100}
      showInfo={false}
      strokeColor={{
        from: '#108ee9',
        to: '#87d068',
      }}
    />
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
      }) => (
        <Fragment key={uuid()}>
          <Marker position={position} key={`round-position-${uuid()}`} />
          <Marker position={guessPosition} key={`round-guess-position-${uuid()}`} />
          <Polyline
            key={`round-poly-${uuid()}`}
            path={[position, guessPosition]}
            options={{ strokeWeight: 2 }}
          />
        </Fragment>
      ))}
    </GoogleMap>
  </Wrapper>
)

GameResults.propTypes = {
  game: gamePropTypes.isRequired
}

export default GameResults
