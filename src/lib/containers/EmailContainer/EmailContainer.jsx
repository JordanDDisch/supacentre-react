import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { InputContainer } from './../../index';

export default class EmailContainer extends PureComponent {

    render() {
        return (
            <InputContainer
                name="email"
                label="Email"
                placeholder={this.props.placeholder}
                errorMessage={this.props.errorMessage}
                { ...this.props }

                type='email'
            />
        );
    }

}

EmailContainer.propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    validate: PropTypes.func,
    isValid: PropTypes.bool,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    errorMessage: PropTypes.string,
    isRequired: PropTypes.bool,
    constraints: PropTypes.object
};

EmailContainer.defaultProps = {
    errorMessage: 'Please enter a valid email',
    placeholder: 'Email'
};
