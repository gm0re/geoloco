import React from 'react'
import styled from 'styled-components';
import {
  Routes,
  Route,
  Link
} from 'react-router-dom';
import {
  Layout,
  Menu
} from 'antd'

import Home from './components/Home'
import GeoLocoInit from './components/GeoLocoInit'

const { Content } = Layout
const { Item } = Menu

const StyledContent = styled(Content)`
  padding: 20px;
`

const App = () => (
  <Layout>
    {/* <Menu mode="horizontal" defaultSelectedKeys={['menu']}>
      <Item key="menu">
        <Link to="/">Home</Link>
      </Item>
    </Menu> */}
    <StyledContent>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<GeoLocoInit />} />
      </Routes>
    </StyledContent>
  </Layout>
)

export default App
