import React from 'react'
import styled from 'styled-components';
import {
  Routes,
  Route,
} from 'react-router-dom';
import {
  Layout,
  Menu
} from 'antd'

import {
  Home,
  GeoLocoInit,
  GuessResults
} from './components/pages'

const { Content } = Layout

const StyledContent = styled(Content)`
  padding: 20px;
`

const App = () => (
  <Layout>
    <StyledContent>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<GeoLocoInit />} />
        <Route path="/results" element={<GuessResults />} />
      </Routes>
    </StyledContent>
  </Layout>
)

export default App
