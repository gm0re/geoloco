import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, Typography } from 'antd'

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
        <Button
          size="large"
          href="/geoloco"
        >
          Play!
        </Button>
      </ButtonWrapper>
    </div>
  </ContentWrapper>
)

export default Home
