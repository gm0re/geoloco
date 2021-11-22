import { useState } from 'react'

const useStreetView = () => {
  const [streetViewPanorama, setStreetViewPanorama] = useState()

  const onStreetViewLoad = (streetViewPanorama) => {
    console.log('onLoad', streetViewPanorama)
    setStreetViewPanorama(streetViewPanorama)
  }

  return [
    streetViewPanorama,
    onStreetViewLoad
  ]
}

export default useStreetView
