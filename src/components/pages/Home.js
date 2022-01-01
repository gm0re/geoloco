import React from 'react'
import styled from 'styled-components'
import { Button, Typography } from 'antd'

const { Title } = Typography

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  padding: 16px;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const MenuWrapper = styled.div`
  padding: 100px 50px 100px 50px;
`

const GeoLocoTitle = () => (
  <Title>GeoLoco 🌎</Title>
)

const Home = () => (
  <ContentWrapper>
    <MenuWrapper>
      <GeoLocoTitle />
      <ButtonWrapper>
        <Button
          size="large"
          href="/geoloco"
        >
          Play!
        </Button>
      </ButtonWrapper>
    </MenuWrapper>
  </ContentWrapper>
)

export default Home
