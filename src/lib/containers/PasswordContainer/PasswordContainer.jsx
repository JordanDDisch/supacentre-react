import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputContainer from './../InputContainer/InputContainer';

class PasswordContainer extends Component {

    render() {
        return (
            <InputContainer
                label="Password"
                placeholder="Password..."
                name="password"

                { ...this.props }

                type='password'
            />
        );
    }

}

PasswordContainer.propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    isValid: PropTypes.bool,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    errorMessage: PropTypes.string,
    isRequired: PropTypes.bool,
    constraints: PropTypes.object
};

export default PasswordContainer;
