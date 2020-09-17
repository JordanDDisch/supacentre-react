import PropTypes from 'prop-types';

export default {
    value: PropTypes.any.isRequired,
    label: PropTypes.string.isRequired,
    errorMessage: PropTypes.string,
    valid: PropTypes.bool
};
