import React, { useState, useEffect } from 'react'
import { useJsApiLoader } from '@react-google-maps/api'
import { Spin } from 'antd'

import GeoLoco from '../GeoLoco'

const GeoLocoInit = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
    libraries: ['geometry']
  })
  const [google, setGoogle] = useState()

  useEffect(() => {
    setGoogle(window.google)
  }, [isLoaded])

  if (loadError) {
    return (
      <div>Error: {loadError}</div>
    )
  }

  return (isLoaded && google) ? (
    <GeoLoco google={google} />
  ) : (
    <Spin spinning={!isLoaded}>Loading...</Spin>
  )
}

export default GeoLocoInit
