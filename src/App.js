import React, { useState, useEffect } from 'react'
import {
  GoogleMap,
  Marker,
  Polygon,
  StreetViewPanorama,
  StreetViewService,
  useJsApiLoader
} from '@react-google-maps/api'

import areas from './constants/areas'
import usePosition from './hooks/usePosition'
import useStreetViewSvc from './hooks/useStreetViewSvc'

const mapContainerStyle = {
  width: '100%',
  height: '800px'
}

const App = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
    libraries: ['geometry']
  })
  const [google, setGoogle] = useState(window.google)
  const [map, setMap] = useState()
  const [markers, setMarkers] = useState([])
  const [polygon, setPolygon] = useState()
  const [site, setSite] = useState()
  const [streetViewPanorama, setStreetViewPanorama] = useState()
  const [position, setRandomPosition] = usePosition()
  const [
    streetViewSvc,
    setStreetViewSvc,
    streetViewPosition,
    setNewStreetViewPosition
  ] = useStreetViewSvc()

  useEffect(() => {
    setSite(areas[Math.floor(Math.random() * areas.length)])
  }, [])

  useEffect(() => {
    if (position && streetViewSvc) {
      // setNewStreetViewPosition(setNewStreetViewPosition(site))
      setNewStreetViewPosition(position)
    }
  }, [position, streetViewSvc])

  useEffect(() => {
    setGoogle(window.google)

    if (google && polygon) {
      setRandomPosition(google, polygon)
    }
  }, [google, map])

  // debugging position found on map with marker
  useEffect(() => {
    if (position) {
      setMarkers((oldMarkers) => [
        ...oldMarkers,
        { lat: position.lat, lng: position.lng }
      ])
    }
  }, [position])

  const renderMap = () => {
    const onGoogleMapLoad = (newMap) => {
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
          onLoad={onGoogleMapLoad}
          zoom={12}
          center={position}
        >
          <Polygon
            onLoad={onPolygonLoad}
            paths={site}
          />
          {markers.map((marker, key) => {
            console.log('m', marker)
            return (
              // eslint-disable-next-line
              <Marker position={marker} key={`marker-${key}`} />
            )
          })}
        </GoogleMap>
      </>
    )
  }

  if (loadError) {
    return <div>Todo roto</div>
  }

  return isLoaded && renderMap()
}

export default App
