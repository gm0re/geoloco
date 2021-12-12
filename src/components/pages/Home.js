import React from 'react'
import styled from 'styled-components'
import { Anchor, Typography } from 'antd'

const { Link } = Anchor
const { Title } = Typography

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const GeoLocoTitle = () => (
  <Title>GeoLoco 🌎</Title>
)

const Home = () => (
  <ContentWrapper>
    <div>
      <GeoLocoTitle />
      <ButtonWrapper>
        <Anchor affix={false}>
          <Link href="/map" title="Play!" />
        </Anchor>
      </ButtonWrapper>
    </div>
  </ContentWrapper>
)

export default Home
