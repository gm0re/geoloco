import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 250px;
  height: 100px;
  background-color: white;
  margin: 16px;
  color: white;
  position: absolute;
  right: 0;
  z-index: 100;
  border: 1px #d9d9d9 solid;
  box-shadow: 0 2px 0 rgb(0 0 0 / 2%)
`

const GameRoundsPanel = () => (
  <Wrapper>Hola</Wrapper>
)

export default GameRoundsPanel
