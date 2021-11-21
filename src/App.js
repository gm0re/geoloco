import { GoogleMap, StreetViewPanorama, LoadScript, Marker } from '@react-google-maps/api'
import { useState } from 'react'

const containerStyle = {
  width: '800px',
  height: '400px'
};

const initialPosition = {
  lat: -3.745,
  lng: -38.523
};

const App = () => {
  const [movements, setMovements] = useState(0)
  const [position, setPosition] = useState(initialPosition)
  const [streetViewPanorama, setStreetViewPanorama] = useState(undefined)

  const onLoad = (streetViewPanorama) => {
    console.log('onLoad', streetViewPanorama)
    setStreetViewPanorama(streetViewPanorama)
  }

  const onPositionChanged = () => {
    setMovements(movements + 1)

    console.log('movements', movements)
    console.log('position', position)

    setPosition({
      lat: streetViewPanorama ? streetViewPanorama.position.lat() : initialPosition,
      lng: streetViewPanorama ? streetViewPanorama.position.lng() : initialPosition
    })
  }

  return (
    <div>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY}>
        <GoogleMap mapContainerStyle={containerStyle}>
          <StreetViewPanorama
            position={initialPosition}
            visible={true}
            onPositionChanged={onPositionChanged}
            onLoad={onLoad}
          />
        </GoogleMap>
        <GoogleMap
          mapContainerStyle={containerStyle}
          zoom={12}
          center={position}
        >
          <Marker
            onLoad={onLoad}
            position={position}
          />
        </GoogleMap>
      </LoadScript>
    </div>
  )
};

export default App;
