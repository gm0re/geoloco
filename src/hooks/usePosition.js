import { useState } from 'react'

const getNewRandomCoordsInPoly = (google, polygon, ne, sw, maxTries = 10) => {
  const newPositionLat = Math.random() * (ne.lat() - sw.lat()) + sw.lat()
  const newPositionLng = Math.random() * (ne.lng() - sw.lng()) + sw.lng()

  const newPosition = new google.maps.LatLng(newPositionLat, newPositionLng)

  console.log(
    'newPosition',
    newPosition.lat(),
    newPosition.lng(),
    google.maps.geometry.poly.containsLocation(newPosition, polygon)
  )
  // new position found in the polygon
  if (google.maps.geometry.poly.containsLocation(newPosition, polygon)) {
    console.log('encontre: ', { lat: newPosition.lat(), lng: newPosition.lng() })
    return {
      lat: newPosition.lat(),
      lng: newPosition.lng(),
    }
  }
  // try again new position until you reach the max tries
  if (maxTries > 0) {
    // eslint-disable-next-line no-param-reassign
    maxTries -= 1
    console.log('no encontrado', maxTries)
    return getNewRandomCoordsInPoly(google, polygon, ne, sw, maxTries)
  }
  // found nothing
  return { lat: 0, lng: 0 }
}

const usePosition = () => {
  const [position, setPosition] = useState()

  const setRandomPosition = (google, polygon) => {
    const bounds = new google.maps.LatLngBounds();

    // eslint-disable-next-line
    for (let i = 0; i < polygon.getPath().getLength(); i++) {
      bounds.extend(polygon.getPath().getAt(i))
    }

    const sw = bounds.getSouthWest()
    const ne = bounds.getNorthEast()

    setPosition(getNewRandomCoordsInPoly(google, polygon, ne, sw))
  }

  return [
    position,
    setRandomPosition
  ]
}

export default usePosition
