import PropTypes from 'prop-types'

const game = PropTypes.shape({
  rounds: PropTypes.arrayOf(PropTypes.shape({
    number: PropTypes.number,
    score: PropTypes.number,
    distance: PropTypes.number,
    length: PropTypes.number
  })),
  score: PropTypes.number,
  maxRounds: PropTypes.number,
})

export default game
