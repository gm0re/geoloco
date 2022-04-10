import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, Tag, Typography } from 'antd'
import countries from '../../constants/countries/index.json'

const { Title } = Typography
const { CheckableTag } = Tag

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const CountriesWrapper = styled.div`
`

const PlayButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > div {
    padding: 24px;
  }
`

const GeoLocoTitle = () => (
  <Title>GeoLoco 🌎</Title>
)

const Home = () => {
  const [selectedCountries, setSelectedCountries] = useState([])

  const onCountrySelect = (country) => {
    if (selectedCountries.indexOf(country) === -1) {
      setSelectedCountries([
        ...selectedCountries,
        country
      ])
    } else {
      setSelectedCountries(selectedCountries.filter(
        (selectedCountry) => selectedCountry !== country
      ))
    }
  }

  return (
    <ContentWrapper>
      <GeoLocoTitle />
      <MenuWrapper>
        <PlayButtonWrapper>
          <Button
            size="large"
            href="/geoloco"
          >
            Play all countries!
          </Button>
        </PlayButtonWrapper>
        <Title level={3}> - OR - </Title>
        <CountriesWrapper>
          {countries.map((country) => (
            <CheckableTag
              key={country}
              checked={selectedCountries.indexOf(country) > -1}
              onChange={() => onCountrySelect(country)}
            >
              {country.toUpperCase()}
            </CheckableTag>
          ))}
        </CountriesWrapper>
        <Button href={`/geoloco?countries=${selectedCountries.join(',')}`}>Play!</Button>
      </MenuWrapper>
    </ContentWrapper>
  )
}

export default Home
