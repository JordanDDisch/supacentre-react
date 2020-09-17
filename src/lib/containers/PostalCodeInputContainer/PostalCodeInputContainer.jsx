import React from 'react';
import PropTypes from 'prop-types';
import InputContainer from './../InputContainer/InputContainer';

/**
 * @param props
 */
export default function PostalCodeInputContainer(props) {
    return (
        <InputContainer
            label="Postcode"
            placeholder={props.placeholder}
            name={'postcode'}
            pattern={props.pattern}
            errorMessage={props.errorMessage}
            {...props}

            type="text"
        />
    );
}

PostalCodeInputContainer.propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    validate: PropTypes.func,
    isValid: PropTypes.bool,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    errorMessage: PropTypes.string,
    isRequired: PropTypes.bool,
    constraints: PropTypes.object,
    pattern: PropTypes.string
};

PostalCodeInputContainer.defaultProps = {
    placeholder: 'Enter postcode',
    pattern: '[0-9]{3,4}',
    errorMessage: 'Please enter a valid postcode'
};
