import { useState } from 'react'

const SUCCESS = 'OK'
const MIN_RADIUS = 50
const MAX_RADIUS = 75

const useStreetViewSvc = () => {
  const [streetViewPosition, setStreetViewPosition] = useState()
  const [streetViewSvc, setStreetViewSvc] = useState()

  const setNewStreetViewPosition = (coords, maxTries = 25, accRadius = 1) => {
    if (!coords) {
      setStreetViewPosition()
      return
    }
    // random radius to get random valid location
    const radius = (Math.random() * (MAX_RADIUS - MIN_RADIUS) + MIN_RADIUS) * accRadius

    const setNewStreetView = (streetView, status) => {
      console.log('radius', radius)

      if (status === SUCCESS) {
        console.log(
          'streetView coords',
          streetView?.location?.latLng?.lat(),
          streetView?.location?.latLng?.lng()
        )
        setStreetViewPosition({
          lat: streetView?.location?.latLng?.lat(),
          lng: streetView?.location?.latLng?.lng()
        })
      } else if (maxTries > 0) {
        console.log('street no encontrada', status, streetView, maxTries)

        const newMaxTries = maxTries - 1
        setNewStreetViewPosition(coords, newMaxTries, accRadius * 1.5)
      }
      // eslint-disable-next-line
      return
    }

    streetViewSvc.getPanorama({
      location: { ...coords },
      radius,
      source: 'outdoor'
    }, setNewStreetView)
  }

  return [
    streetViewSvc,
    setStreetViewSvc,
    streetViewPosition,
    setNewStreetViewPosition
  ]
}

export default useStreetViewSvc
