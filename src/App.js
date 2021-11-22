import {
  GoogleMap,
  StreetViewPanorama,
  LoadScript,
  Marker,
  Polyline
} from '@react-google-maps/api'
import { useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'

import useStreetView from './hooks/useStreetView'

const containerStyle = {
  width: '100%',
  height: '800px'
}

const initialPosition = {
  lat: -3.745,
  lng: -38.523
}

const onPolylineLoad = polyline => {
  console.log('polyline: ', polyline)
}

const initPolylineOptions = {
  strokeColor: '#FF0000',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: '#FF0000',
  fillOpacity: 0.35,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
  radius: 30000,
  paths: [
    {lat: 37.772, lng: -122.214},
    {lat: 21.291, lng: -157.821},
    {lat: -18.142, lng: 178.431},
    {lat: -27.467, lng: 153.027}
  ],
  zIndex: 1
}

const GlobalStyle = createGlobalStyle`
  html, body {
    background-color: black;
    padding: 0;
    margin: 0;
  }
`

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 8px;
`

const App = () => {
  const [movements, setMovements] = useState(0)
  const [position, setPosition] = useState(initialPosition)
  const [streetViewPanorama, onLoadStreetView] = useStreetView()
  const [marker, setMarker] = useState()
  const [distanceLine, setDistanceLine] = useState(initPolylineOptions)

  const onPositionChanged = () => {
    setMovements(movements + 1)

    console.log('movements', movements)
    console.log('position', position)

    setPosition({
      lat: streetViewPanorama ? streetViewPanorama.position.lat() : initialPosition,
      lng: streetViewPanorama ? streetViewPanorama.position.lng() : initialPosition
    })
  }

  const onMapClick = (cursor) => {
    console.log(cursor)
    setMarker({
      lat: cursor.latLng.lat(),
      lng: cursor.latLng.lng(),
    })

    setDistanceLine({
      ...distanceLine,
      paths: [
        initialPosition,
        {
          lat: cursor.latLng.lat(),
          lng: cursor.latLng.lng(),
        }
      ]
    })
    console.log('dline', distanceLine)
  }

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY}>
          <GoogleMap mapContainerStyle={containerStyle}>
            <StreetViewPanorama
              position={initialPosition}
              visible={true}
              onPositionChanged={onPositionChanged}
              onLoad={onLoadStreetView}
            />
          </GoogleMap>
          <GoogleMap
            mapContainerStyle={containerStyle}
            zoom={12}
            center={initialPosition}
            onClick={onMapClick}
          >
            {marker && (
              <>
                <Marker position={marker} />
                <Polyline
                  onLoad={onPolylineLoad}
                  path={distanceLine.paths}
                  options={distanceLine}
                />
              </>
            )}
          </GoogleMap>
        </LoadScript>
      </Wrapper>
    </>
  )
};

export default App;
