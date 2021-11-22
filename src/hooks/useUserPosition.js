import { useState } from 'react'

const initialPosition = {
  lat: -3.745,
  lng: -38.520
}

const useUserPosition = (streetViewPanorama) => {
  const [userPosition, setUserPosition] = useState(initialPosition)

  const setUserNewPosition = () => {
    const isNewPosition = streetViewPanorama && (
      streetViewPanorama.position.lat() !== userPosition.lat
      && streetViewPanorama.position.lng() !== userPosition.lng
    )

    console.log(
      'isNewPos',
      isNewPosition,
      userPosition,
      streetViewPanorama && streetViewPanorama.position.lat(),
      streetViewPanorama && streetViewPanorama.position.lng()
    )

    if (isNewPosition) {
      setUserPosition({
        lat: streetViewPanorama.position.lat(),
        lng: streetViewPanorama.position.lng()
      })
    }
  }

  return [
    userPosition,
    setUserNewPosition
  ]
}

export default useUserPosition
