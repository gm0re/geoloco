import React from 'react'

import gamePropTypes from './propTypes/game'

const RoundResults = ({ game }) => {
  console.log('res', game)
  return (
    <div>
      Distance: {game.rounds[game.rounds.length - 1].distance}
    </div>
  )
}

RoundResults.propTypes = {
  game: gamePropTypes.isRequired
}

export default RoundResults
