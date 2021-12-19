import PropTypes from 'prop-types'

const google = PropTypes.shape({
  maps: PropTypes.shape({
    LatLng: PropTypes.func,
    geometry: PropTypes.shape({
      spherical: PropTypes.shape({
        computeDistanceBetween: PropTypes.func
      })
    })
  })
})

export default google
