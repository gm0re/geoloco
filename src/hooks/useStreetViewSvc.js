import { useState } from 'react'

const SUCCESS = 'OK'

const useStreetViewSvc = () => {
  const [streetViewPosition, setStreetViewPosition] = useState()
  const [streetViewSvc, setStreetViewSvc] = useState()

  const setNewStreetViewPosition = (coords, maxTries = 10) => {
    const MAX_RADIUS = 50
    const MIN_RADIUS = 1000
    // random radius to get random valid location
    const radius = Math.random() * (MAX_RADIUS - MIN_RADIUS) + MIN_RADIUS

    const setNewStreetView = (streetView, status) => {
      if (status === SUCCESS) {
        console.log('StreetViewService results', streetView)
        console.log('coords', radius, streetView?.location?.latLng?.lat(), streetView?.location?.latLng?.lng())

        setStreetViewPosition({
          lat: streetView?.location?.latLng?.lat(),
          lng: streetView?.location?.latLng?.lng()
        })
      } else if (maxTries > 0) {
        const newMaxTries = maxTries - 1
        console.log('err', status, streetView, newMaxTries)
        setNewStreetViewPosition(coords, newMaxTries)
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
      radius
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
