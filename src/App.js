import React from 'react'
import styled from 'styled-components';
import {
  Routes,
  Route,
} from 'react-router-dom';
import {
  Layout
} from 'antd'

import {
  Home,
  GeoLocoInit,
  GuessResults
} from './components/pages'

const { Content } = Layout

const StyledLayout = styled(Layout)`
  background: #fff;
`

const StyledContent = styled(Content)`
  padding: 20px;
  height: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const App = () => (
  <StyledLayout>
    <StyledContent>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/geoloco" element={<GeoLocoInit />} />
        <Route path="/results" element={<GuessResults />} />
      </Routes>
    </StyledContent>
  </StyledLayout>
)

export default App
