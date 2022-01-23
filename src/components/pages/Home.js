import React from 'react'
import styled from 'styled-components'
import { Button, Typography } from 'antd'
import countries from '../../constants/countries/index.json'

const { Title } = Typography

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const CountriesWrapper = styled.div`
`

const CountryButton = styled(Button)`
  margin: 4px;
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

const Home = () => (
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
          <CountryButton
            size="middle"
            href={`/geoloco?country=${country}`}
          >
            {country.toUpperCase()}
          </CountryButton>
        ))}
      </CountriesWrapper>
    </MenuWrapper>
  </ContentWrapper>
)

export default Home
