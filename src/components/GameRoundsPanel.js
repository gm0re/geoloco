import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Typography } from 'antd'

const { Title, Text } = Typography

const Wrapper = styled.div`
  margin: 16px;
  color: white;
  position: absolute;
  right: 0;
  z-index: 100;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`

const Card = styled.div`
  border-radius: 100%;
  background-color: white;
  width: 100px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 8px;
`

const GameRoundsPanel = ({ game }) => (
  <Wrapper>
    <Card>
      <Title level={4}>Round</Title>
      <Text>{game.rounds.length} / {game.maxRounds}</Text>
    </Card>
    <Card>
      <Title level={4}>Score</Title>
      <Text>{game.score}</Text>
    </Card>
  </Wrapper>
)

GameRoundsPanel.propTypes = {
  game: PropTypes.shape({
    rounds: PropTypes.arrayOf(PropTypes.shape({
      number: PropTypes.number
    })),
    score: PropTypes.number,
    maxRounds: PropTypes.number
  }).isRequired
}

export default GameRoundsPanel
