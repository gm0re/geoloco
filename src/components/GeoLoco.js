import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  GoogleMap,
  Marker,
  Polygon,
  StreetViewPanorama,
  StreetViewService
} from '@react-google-maps/api'
import { Button, BackTop } from 'antd'

import areas from '../constants/areas'
import usePosition from '../hooks/usePosition'
import useStreetViewSvc from '../hooks/useStreetViewSvc'

const mapContainerStyle = {
  width: '100%',
  height: '800px'
}

const Page = styled.div`
  height: 1640px;
`

const StreetViewWrapper = styled.div`
  position: relative;
`

const GuessButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 8px;
`

const GuessButton = styled(Button)`
  width: 800px;
`

const GameRoundsPanel = styled.div`
  width: 250px;
  height: 100px;
  background-color: white;
  margin: 16px;
  color: white;
  position: absolute;
  right: 0;
  z-index: 100;
  border: 1px #d9d9d9 solid;
  box-shadow: 0 2px 0 rgb(0 0 0 / 2%)
`

const GoUpButton = styled.div`
  height: 40px;
  width: 40px;
  line-height: 40px;
  border-radius: 4px;
  background-color: #1088e9;
  color: #fff;
  text-align: center;
  font-size: 14;
  z-index: 1000;
`

const GeoLoco = ({ google }) => {
  const [, setMap] = useState()
  const [guessMarker, setGuessMarker] = useState([])
  const [polygon, setPolygon] = useState()
  const [site, setSite] = useState()
  const [, setStreetViewPanorama] = useState()
  const [distanceFromGuessed, setDistanceFromGuessed] = useState()
  const [position, setRandomPosition] = usePosition()
  const [
    ,
    setStreetViewSvc,
    streetViewPosition,
    setNewStreetViewPosition
  ] = useStreetViewSvc()

  useEffect(() => {
    setSite(areas[Math.floor(Math.random() * areas.length)])
  }, [])

  useEffect(() => {
    if (polygon) {
      setRandomPosition(google, polygon)
    }
  }, [polygon])

  useEffect(() => {
    if (position) {
      setNewStreetViewPosition(position)
    }
  }, [position])

  const calculateDistance = (pointA, pointB) => (
    google.maps.geometry.spherical.computeDistanceBetween(pointA, pointB)
  )

  const onMapClick = (event) => {
    console.log('click', event)
    const newGuessMarker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    }
    setGuessMarker(newGuessMarker)
    setDistanceFromGuessed(calculateDistance(event.latLng, new google.maps.LatLng(position)))
  }

  const onMapLoad = (newMap) => {
    console.log('map', newMap)
    setMap(newMap)
  }

  const onPolygonLoad = (newPolygon) => {
    console.log('poly', newPolygon)
    setPolygon(newPolygon)
  }

  const onStreetViewServicesLoad = (streetViewServiceInstance) => {
    console.log('streetViewServiceInstance', streetViewServiceInstance)
    setStreetViewSvc(streetViewServiceInstance)
  }

  const onStreetViewPanoramaLoad = (streetViewPanoramaInstance) => {
    console.log('streetViewPanoramaInstance', streetViewPanoramaInstance)
    setStreetViewPanorama(streetViewPanoramaInstance)
  }

  const onGuessButtonClick = () => {
    console.log('Guess!')
  }

  return (
    <Page>
      {google && (
        <>
          <StreetViewService onLoad={onStreetViewServicesLoad} />
          <StreetViewWrapper>
            <GameRoundsPanel />
            <GoogleMap mapContainerStyle={mapContainerStyle}>
              <StreetViewPanorama
                position={streetViewPosition}
                onStreetViewPanoramaLoad={onStreetViewPanoramaLoad}
                options={{
                  addressControl: false,
                  showRoadLabels: false,
                  zoomControl: true,
                  fullscreenControl: false
                }}
                visible
              />
            </GoogleMap>
          </StreetViewWrapper>
          <GuessButtonWrapper>
            <GuessButton
              size="large"
              href="/results"
              onClick={onGuessButtonClick}
            >
              Guess!
            </GuessButton>
          </GuessButtonWrapper>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={12}
            center={position}
            onLoad={onMapLoad}
            onClick={onMapClick}
            options={{
              fullscreenControl: false,
              keyboardShortcuts: false,
              mapTypeControl: false,
              streetViewControl: false
            }}
          >
            <Polygon
              onLoad={onPolygonLoad}
              paths={site}
            />
            {position && (
              <Marker position={position} />
            )}
            {guessMarker && (
              <Marker position={guessMarker} />
            )}
          </GoogleMap>
        </>
      )}
      <BackTop>
        <GoUpButton>Up!</GoUpButton>
      </BackTop>
    </Page>
  )
}

GeoLoco.propTypes = {
  google: PropTypes.shape({
    maps: PropTypes.shape({
      geometry: PropTypes.shape({
        spherical: PropTypes.shape({
          computeDistanceBetween: PropTypes.func,
        })
      }),
      LatLng: PropTypes.func
    })
  }).isRequired
}

export default GeoLoco
