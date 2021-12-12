import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  GoogleMap,
  Marker,
  Polygon
} from '@react-google-maps/api'

import areas from '../constants/areas'

const GuessMap = ({
  google,
  mapContainerStyle,
  position,
  onPolygonLoad
}) => {
  const [site, setSite] = useState()
  const [guessMarker, setGuessMarker] = useState([])
  const [, setDistanceFromGuessed] = useState()

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

  useEffect(() => {
    setSite(areas[Math.floor(Math.random() * areas.length)])
  }, [])

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={12}
      center={position}
      onClick={onMapClick}
      options={{
        fullscreenControl: false,
        keyboardShortcuts: false,
        mapTypeControl: false,
        streetViewControl: false
      }}
    >
      <Polygon
        onLoad={onPolygonLoad}
        paths={site}
      />
      {position && (
        <Marker position={position} />
      )}
      {guessMarker && (
        <Marker position={guessMarker} />
      )}
    </GoogleMap>
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
  onPolygonLoad: PropTypes.func.isRequired
}

GuessMap.defaultProps = {
  position: { lat: 0, lng: 0 }
}

export default GuessMap
