import { useState } from 'react'

const SUCCESS = 'OK'
const MAX_RADIUS = 50
const MIN_RADIUS = 1000

const useStreetViewSvc = () => {
  const [streetViewPosition, setStreetViewPosition] = useState()
  const [streetViewSvc, setStreetViewSvc] = useState()

  const setNewStreetViewPosition = (coords, maxTries = 10, accRadius = 1) => {
    // random radius to get random valid location
    const radius = (Math.random() * (MAX_RADIUS - MIN_RADIUS) + MIN_RADIUS) * accRadius

    const setNewStreetView = (streetView, status) => {
      console.log('radius', radius)
      if (status === SUCCESS) {
        console.log(
          'coords',
          streetView?.location?.latLng?.lat(),
          streetView?.location?.latLng?.lng()
        )

        setStreetViewPosition({
          lat: streetView?.location?.latLng?.lat(),
          lng: streetView?.location?.latLng?.lng()
        })
      } else if (maxTries > 0) {
        console.log('err', status, streetView, maxTries)

        const newMaxTries = maxTries - 1
        setNewStreetViewPosition(coords, newMaxTries, radius)
      }
      // eslint-disable-next-line
      return
    }

    console.log(streetViewSvc)

    streetViewSvc.getPanorama({
      location: {
        lat: coords.lat,
        lng: coords.lng
      },
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
