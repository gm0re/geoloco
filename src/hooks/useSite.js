import { useState } from 'react'
import countries from '../constants/countries/index.json'

const useSite = (country) => {
  const [site, setSite] = useState()
  const [countryName] = useState(country)

  const randomAreaIndex = Math.floor(Math.random() * countries.length)

  const setCountryBounds = (countryBounds) => {
    let selectedBounds = countryBounds
    // found a multi polygon country
    if (Array.isArray(countryBounds[0])) {
      // get one of the polygons randomly
      selectedBounds = countryBounds[Math.floor(Math.random() * countryBounds.length)]
    }
    setSite(selectedBounds)
  }

  const setSiteCountryBounds = () => {
    fetch(`/countries/${countryName || countries[randomAreaIndex]}.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`)
        }
        return response.json()
      })
      .then(((countryBounds) => {
        console.log('country', countryBounds, randomAreaIndex, countryName || countries[randomAreaIndex])
        setCountryBounds(countryBounds)
      }))
      .catch((error) => {
        console.log(error)
      });
  }

  const setRandomSite = () => {
    setSite()
    setSiteCountryBounds()
  }

  return [
    site,
    setRandomSite,
  ]
}

export default useSite
