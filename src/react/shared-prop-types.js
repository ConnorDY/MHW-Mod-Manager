import PropTypes from 'prop-types';

export const zipsPropType = PropTypes.arrayOf(
  PropTypes.shape({
    files: PropTypes.arrayOf(PropTypes.string).isRequired,
    name: PropTypes.string.isRequired,
    zip: PropTypes.object.isRequired
  })
).isRequired;
