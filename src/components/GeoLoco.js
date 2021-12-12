import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { StreetViewService } from '@react-google-maps/api'
import { Button, BackTop } from 'antd'

import Street from './Street'
import GuessMap from './GuessMap'

import usePosition from '../hooks/usePosition'
import useStreetViewSvc from '../hooks/useStreetViewSvc'

const mapContainerStyle = {
  width: '100%',
  height: '800px'
}

const Page = styled.div`
  height: 1640px;
`

const GuessButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 8px;
`

const GuessButton = styled(Button)`
  width: 800px;
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
  const [polygon, setPolygon] = useState()
  const [position, setRandomPosition] = usePosition()
  const [
    ,
    setStreetViewSvc,
    streetViewPosition,
    setNewStreetViewPosition
  ] = useStreetViewSvc()

  const onPolygonLoad = (newPolygon) => {
    console.log('poly', newPolygon)
    setPolygon(newPolygon)
  }

  const onStreetViewServicesLoad = (streetViewServiceInstance) => {
    console.log('streetViewServiceInstance', streetViewServiceInstance)
    setStreetViewSvc(streetViewServiceInstance)
  }

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

  return (
    <Page>
      {google && (
        <>
          <StreetViewService onLoad={onStreetViewServicesLoad} />
          {streetViewPosition && (
            <Street
              mapContainerStyle={mapContainerStyle}
              streetViewPosition={streetViewPosition}
            />
          )}
          <GuessButtonWrapper>
            <GuessButton
              size="large"
              href="/results"
            >
              Guess!
            </GuessButton>
          </GuessButtonWrapper>
          <GuessMap
            google={google}
            mapContainerStyle={mapContainerStyle}
            onPolygonLoad={onPolygonLoad}
            position={position}
          />
        </>
      )}
      <BackTop>
        <GoUpButton>Up!</GoUpButton>
      </BackTop>
    </Page>
  )
}

GeoLoco.propTypes = {
  google: PropTypes.shape({}).isRequired
}

export default GeoLoco
