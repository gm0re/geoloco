import { useState } from 'react'

const SUCCESS = 'OK'

const useStreetViewSvc = () => {
  const [streetViewPosition, setStreetViewPosition] = useState()
  const [streetViewSvc, setStreetViewSvc] = useState()

  const setNewStreetViewPosition = (coords) => {
    const MAX_RADIUS = 50
    const MIN_RADIUS = 1000
    // random radius to get random valid location
    const radius = Math.random() * (MAX_RADIUS - MIN_RADIUS) + MIN_RADIUS

    const setNewStreetView = (streetView, status, maxTries = 10) => {
      if (status === SUCCESS) {
        console.log('StreetViewService results', streetView)
        console.log('coords', radius, streetView?.location?.latLng?.lat(), streetView?.location?.latLng?.lng())

        setStreetViewPosition({
          lat: streetView?.location?.latLng?.lat(),
          lng: streetView?.location?.latLng?.lng()
        })
      } else {
        // eslint-disable-next-line no-param-reassign
        maxTries -= 1
        console.log('err', status, streetView, maxTries)
        setNewStreetViewPosition(coords, maxTries)
      }
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
