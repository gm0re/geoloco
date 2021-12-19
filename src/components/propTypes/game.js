import PropTypes from 'prop-types'

export const round = PropTypes.shape({
  score: PropTypes.number,
  distance: PropTypes.number,
  length: PropTypes.number
})

export const rounds = PropTypes.arrayOf(round)

export const game = PropTypes.shape({
  rounds,
  score: PropTypes.number,
  maxRounds: PropTypes.number,
})
