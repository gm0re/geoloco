import { useState } from 'react'

const useStreetView = () => {
  const [streetViewPanorama, setStreetViewPanorama] = useState()

  const onStreetViewPanoramaLoad = (streetViewPanoramaInit) => {
    console.log('street view onLoad', streetViewPanoramaInit)
    setStreetViewPanorama(streetViewPanoramaInit)
  }

  return [
    streetViewPanorama,
    onStreetViewPanoramaLoad
  ]
}

export default useStreetView
