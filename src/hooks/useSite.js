import { useState } from 'react'
import countries from '../constants/countries/index.json'

const randomAreaIndex = Math.floor(Math.random() * countries.length)

const getCountryName = (country) => (
  country
    ? country[Math.floor(Math.random() * country.length)]
    : countries[Math.floor(Math.random() * countries.length)]
)

const useSite = (country) => {
  const [site, setSite] = useState()
  const [countryName] = useState(getCountryName(country))

  const getRandomSiteIndexBasedOnArea = (countryBounds) => {
    const areas = countryBounds.map(({ area }) => area)
    // eslint-disable-next-line
    const areasWeights = areas.map((sum => value => sum += value)(0))
    const randomIndex = Math.floor(Math.random() * areasWeights[areasWeights.length - 1])
    const randomSiteIndex = areasWeights.filter((areaWeight) => randomIndex >= areaWeight).length
    console.log('areas', areas, areasWeights, randomSiteIndex)
    // returns higher index or area where the random is bigger or equal
    return randomSiteIndex
  }

  const setCountryBounds = (countryBounds) => {
    let selectedBounds = countryBounds
    // found a multi polygon country
    if (Array.isArray(countryBounds[0].coords)) {
      // get one of the polygons randomly
      selectedBounds = countryBounds[getRandomSiteIndexBasedOnArea(countryBounds)].coords
    }
    setSite(selectedBounds)
  }

  const setSiteCountryBounds = () => {
    fetch(`/countries/${countryName}.json`)
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
      })
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
