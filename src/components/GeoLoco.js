import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  GoogleMap,
  Marker,
  Polygon,
  StreetViewPanorama,
  StreetViewService
} from '@react-google-maps/api'

import areas from '../constants/areas'
import usePosition from '../hooks/usePosition'
import useStreetViewSvc from '../hooks/useStreetViewSvc'

const mapContainerStyle = {
  width: '100%',
  height: '800px'
}

const GeoLoco = ({ google }) => {
  const [, setMap] = useState()
  const [guessMarker, setGuessMarker] = useState([])
  const [polygon, setPolygon] = useState()
  const [site, setSite] = useState()
  const [, setStreetViewPanorama] = useState()
  const [position, setRandomPosition] = usePosition()
  const [
    ,
    setStreetViewSvc,
    streetViewPosition,
    setNewStreetViewPosition
  ] = useStreetViewSvc()

  useEffect(() => {
    setSite(areas[Math.floor(Math.random() * areas.length)])
  }, [])

  useEffect(() => {
    if (polygon) {
      setRandomPosition(google, polygon)
    }
  }, [polygon])

  useEffect(() => {
    if (position) {
      setNewStreetViewPosition(position)
    }
  }, [position])

  const onMapClick = (event) => {
    console.log('click', event)
    const newGuessMarker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    }
    setGuessMarker(newGuessMarker)
  }

  const onMapLoad = (newMap) => {
    console.log('map', newMap)
    setMap(newMap)
  }

  const onPolygonLoad = (newPolygon) => {
    console.log('poly', newPolygon)
    setPolygon(newPolygon)
  }

  const onStreetViewServicesLoad = (streetViewServiceInstance) => {
    console.log('streetViewServiceInstance', streetViewServiceInstance)
    setStreetViewSvc(streetViewServiceInstance)
  }

  const onStreetViewPanoramaLoad = (streetViewPanoramaInstance) => {
    console.log('streetViewPanoramaInstance', streetViewPanoramaInstance)
    setStreetViewPanorama(streetViewPanoramaInstance)
  }

  return (
    <div>
      {google && (
        <>
          <StreetViewService onLoad={onStreetViewServicesLoad} />
          <GoogleMap mapContainerStyle={mapContainerStyle}>
            <StreetViewPanorama
              position={streetViewPosition}
              onStreetViewPanoramaLoad={onStreetViewPanoramaLoad}
              visible
            />
          </GoogleMap>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={12}
            center={position}
            onLoad={onMapLoad}
            onClick={onMapClick}
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
        </>
      )}
    </div>
  )
}

GeoLoco.propTypes = {
  google: PropTypes.shape({}).isRequired
}

export default GeoLoco
