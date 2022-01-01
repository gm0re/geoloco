import { useState } from 'react'
import countriesIndex from '../constants/countries/index.json'

const useSite = () => {
  const [site, setSite] = useState()

  const randomAreaIndex = Math.floor(Math.random() * countriesIndex.length)

  const setRandomSite = () => {
    fetch(`/countries/${countriesIndex[randomAreaIndex]}.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`)
        }
        return response.json()
      })
      .then(((countryBundles) => {
        console.log('country', countryBundles, randomAreaIndex, countriesIndex[randomAreaIndex])
        let selectedBundles = countryBundles
        // found a multi polygon country
        if (Array.isArray(countryBundles[0])) {
          // get one of the polygons randomly
          selectedBundles = countryBundles[Math.floor(Math.random() * countryBundles.length)]
        }
        setSite(selectedBundles)
      }))
      .catch((error) => {
        console.log(error)
      });
  }
  return [
    site,
    setSite,
    setRandomSite,
  ]
}

export default useSite
