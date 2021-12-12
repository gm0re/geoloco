import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  GoogleMap,
  StreetViewPanorama
} from '@react-google-maps/api'

const StreetViewWrapper = styled.div`
  position: relative;
`

const GameRoundsPanel = styled.div`
  width: 250px;
  height: 100px;
  background-color: white;
  margin: 16px;
  color: white;
  position: absolute;
  right: 0;
  z-index: 100;
  border: 1px #d9d9d9 solid;
  box-shadow: 0 2px 0 rgb(0 0 0 / 2%)
`

const Street = ({
  mapContainerStyle,
  streetViewPosition,
}) => {
  console.log('Street')

  return (
    <StreetViewWrapper>
      <GameRoundsPanel />
      <GoogleMap mapContainerStyle={mapContainerStyle}>
        <StreetViewPanorama
          position={streetViewPosition}
          options={{
            addressControl: false,
            showRoadLabels: false,
            zoomControl: true,
            fullscreenControl: false
          }}
          visible
        />
      </GoogleMap>
    </StreetViewWrapper>
  )
}

Street.propTypes = {
  mapContainerStyle: PropTypes.shape({}).isRequired,
  streetViewPosition: PropTypes.shape({}).isRequired
}

export default Street
