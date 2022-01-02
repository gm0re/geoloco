import { useState } from 'react'

import {
  game as GAME_INIT,
  round as ROUND_INIT
} from '../constants/game'

const useGame = () => {
  const [game, setGame] = useState(GAME_INIT)
  // creates a new game from scratch
  const setNewGame = () => {
    setGame(GAME_INIT)
  }
  // fill new fields of the current round
  const setStartedRound = (fields) => {
    const newGame = (startedGame) => {
      const startedRound = {
        ...startedGame.rounds[startedGame.rounds.length - 1],
        ...fields,
      }
      // eslint-disable-next-line no-param-reassign
      startedGame.rounds[startedGame.rounds.length - 1] = startedRound

      return {
        ...startedGame,
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
    setGame,
    setNewGame,
    setStartedRound,
    setNewRound
  ]
}

export default useGame
