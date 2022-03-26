import { useState } from 'react'

import {
  game as GAME_INIT,
  round as ROUND_INIT,
  maxScore as MAX_SCORE,
  maxDistance as MAX_DISTANCE
} from '../constants/game'

const getRoundScore = (distance) => MAX_SCORE * (0.999 ** (distance / 1000))

// TODO: review
const formatDistanceForScore = (distance) => {
  const values = {
    minDistance: 1,
    maxDistance: MAX_DISTANCE
  }
  if (distance <= values.minDistance) {
    return 1
  }
  if (distance >= MAX_DISTANCE) {
    return MAX_DISTANCE
  }
  return distance
}

const useGame = () => {
  const [game, setGame] = useState(GAME_INIT)
  // creates a new game from scratch
  const setNewGame = () => {
    setGame(GAME_INIT)
  }
  // fill new fields of the current round
  const setStartedRound = (fields, calculateScore = false) => {
    if (Object.prototype.hasOwnProperty.call(fields, 'distance') && calculateScore) {
      // eslint-disable-next-line no-param-reassign
      fields = {
        ...fields,
        score: getRoundScore(formatDistanceForScore(fields.distance))
      }
    }

    const newGame = (startedGame) => {
      const startedRound = {
        ...startedGame.rounds[startedGame.rounds.length - 1],
        ...fields,
      }
      // eslint-disable-next-line no-param-reassign
      startedGame.rounds[startedGame.rounds.length - 1] = startedRound

      const totalRoundsScore = startedGame.rounds.reduce(
        (totalSumScore, { score }) => totalSumScore + score,
        0
      )

      return {
        ...startedGame,
        score: Math.floor(totalRoundsScore / startedGame.rounds.length),
        rounds: [
          ...startedGame.rounds,
        ]
      }
    }
    setGame(newGame)
  }
  // add a new round to an ongoing game
  const setNewRound = () => {
    setGame((startedGame) => ({
      ...startedGame,
      rounds: [
        ...startedGame.rounds,
        { ...ROUND_INIT },
      ]
    }))
  }

  return [
    game,
    setNewGame,
    setStartedRound,
    setNewRound,
  ]
}

export default useGame
