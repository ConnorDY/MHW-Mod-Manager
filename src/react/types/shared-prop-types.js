import PropTypes from 'prop-types';

export const filesPropType = PropTypes.arrayOf(
  PropTypes.shape({
    installed: PropTypes.bool.isRequired,
    path: PropTypes.string.isRequired
  })
).isRequired;

export const modsPropType = PropTypes.arrayOf(
  PropTypes.shape({
    files: filesPropType,
    name: PropTypes.string.isRequired,
    zip: PropTypes.object.isRequired
  })
).isRequired;
