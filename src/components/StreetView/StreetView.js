import React, { useState } from 'react'
import {
  GoogleMap,
  StreetViewPanorama
} from '@react-google-maps/api'
import PropTypes from 'prop-types'

const mapContainerStyle = {
  width: '100%',
  height: '800px'
}

const StreetView = ({
  userPosition,
  setUserNewPosition,
  onStreetViewPanoramaLoad
}) => {
  const [movements, setMovements] = useState(0)

  const onPositionChanged = () => {
    if (movements !== 0) {
      setUserNewPosition()
    }
    setMovements(movements + 1)

    console.log('movements', movements)
    console.log('userPosition', userPosition)
  }

  return (
    <GoogleMap mapContainerStyle={mapContainerStyle}>
      <StreetViewPanorama
        position={userPosition}
        onPositionChanged={onPositionChanged}
        onLoad={onStreetViewPanoramaLoad}
        visible
      />
    </GoogleMap>
  )
}

StreetView.propTypes = {
  userPosition: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number
  }).isRequired,
  setUserNewPosition: PropTypes.func.isRequired,
  onStreetViewPanoramaLoad: PropTypes.func.isRequired
}

export default StreetView
