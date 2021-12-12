import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Typography } from 'antd'

const { Title, Text } = Typography

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
  box-shadow: 0 2px 0 rgb(0 0 0 / 2%);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  > div {
    display: flex;
    justify-content: space-around;
    align-items: baseline;
    flex-direction: row;
  }
`

const GameRoundsPanel = ({ game }) => (
  <Wrapper>
    <div>
      <Title level={4}>Round</Title>
      <Title level={4}>Score</Title>
    </div>
    <div>
      <Text>{game.round} / {game.maxRounds}</Text>
      <Text>{game.score}</Text>
    </div>
  </Wrapper>
)

GameRoundsPanel.propTypes = {
  game: PropTypes.shape({
    round: PropTypes.number,
    score: PropTypes.number,
    maxRounds: PropTypes.number
  }).isRequired
}

export default GameRoundsPanel
