import React, { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';
import { Input } from './../../index';

export default class InputContainer extends PureComponent {

    constructor(props) {
        super(props);
        this.inputRef = createRef();
    }

    /**
     * Call the focusInput function on the Input component
     * This function is essentially just a pass through to get from an InputContainer through to the child <input> inside
     * the Input component
     *
     * @returns {null}
     */
    focusInput() {
        this.inputRef.current.focusInput();
    }

    render() {
        const {
            validate,
            ...remainingProps
        } = this.props;
        /**
         * onBlur will call the validate function passed in as a prop, if included, otherwise it will call the default
         * validation function within this container
         */
        return (
            <Input
                ref={this.inputRef}
                onBlur={validate}
                { ...remainingProps }
            />
        );
    }

}

InputContainer.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.object.isRequired
    ]),
    onChange: PropTypes.func,
    value: PropTypes.any.isRequired,
    validate: PropTypes.func,
    isValid: PropTypes.bool,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ]),
    errorMessage: PropTypes.string,
    isRequired: PropTypes.bool,
    disabled: PropTypes.bool
};

InputContainer.defaultProps = {
    type: 'text'
};
