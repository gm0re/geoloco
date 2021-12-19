import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  GoogleMap,
  StreetViewPanorama
} from '@react-google-maps/api'

import GameRoundsPanel from './GameRoundsPanel'

const StreetViewWrapper = styled.div`
  position: relative;
`

const Street = ({
  mapContainerStyle,
  streetViewPosition,
  game
}) => (
  <StreetViewWrapper>
    <GameRoundsPanel game={game} />
    <GoogleMap mapContainerStyle={mapContainerStyle}>
      <StreetViewPanorama
        position={streetViewPosition}
        options={{
          addressControl: false,
          showRoadLabels: false,
          zoomControl: false,
          fullscreenControl: false
        }}
        visible
      />
    </GoogleMap>
  </StreetViewWrapper>
)

Street.propTypes = {
  mapContainerStyle: PropTypes.shape({}).isRequired,
  streetViewPosition: PropTypes.shape({}).isRequired,
  game: PropTypes.shape({}).isRequired
}

export default Street
