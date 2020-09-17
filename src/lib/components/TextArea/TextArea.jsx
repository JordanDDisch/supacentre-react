import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';

/**
 * Display an error message if the data isn't valid, and the user is ready to accept errors
 *
 * @param {string}  errorMessage The error message to display
 * @param {boolean} showMessage  Boolean indicating if the user is ready to accept errors (e.g. a form has been submitted)
 *
 * @returns {*}
 */
function getErrorDiv(errorMessage, showMessage) {
    return showMessage
        ? <div className="validation-message">{errorMessage || 'Please enter a value'}</div>
        : <Fragment />;
}

export default class TextArea extends PureComponent {

    render() {
        const {
            id,
            label,
            value,
            onChange,
            name = null,
            onBlur = null,
            errorMessage = null,
            isRequired = false,
            isValid = true,
            showMessage = false
        } = this.props;

        return (
            <div className="textarea-component">
                <label htmlFor={id}>{label}</label>
                <textarea
                    className="form-input"
                    id={id}
                    name={name !== null ? name : id}
                    value={value}
                    onChange={onChange}
                    required={isRequired}
                    onBlur={onBlur}
                />
                {getErrorDiv(errorMessage, !isValid && showMessage)}
            </div>

        );
    }

}

TextArea.propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string,
    label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ]),
    onBlur: PropTypes.func,
    errorMessage: PropTypes.string,
    isRequired: PropTypes.bool,
    isValid: PropTypes.bool,
    showMessage: PropTypes.bool
};
