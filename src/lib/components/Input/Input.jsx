import React, { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class Input extends PureComponent {

    constructor(props) {
        super(props);
        this.inputRef = createRef();
        this.state = {
            focused: false
        };
    }

    /**
     * Call focus() on the input element
     *
     * @returns {null}
     */
    focusInput() {
        this.inputRef.current.focus();
    }

    toggleHasFocus(value) {
        this.setState({ focused: value });
    }

    handleBlur(event) {
        this.toggleHasFocus(false);

        if (this.props.onBlur) {
            this.props.onBlur(event);
        }
    }

    render() {
        const {
            id,
            label,
            value,
            onChange,
            name,
            onBlur,
            onFocus,
            type,
            placeholder,
            errorMessage,
            isRequired,
            requiredIndicator,
            isValid,
            disabled,
            className = '',
            ...remainingProps
        } = this.props;

        const wrapperClassNames = classnames(
            'input-container',
            `${id}-container`,
            `${type}-container`,
            !isValid && `${type}-container--validation-error`,
            value === '' && `${type}-container--empty`,
            {

                'validation-error': !isValid,
                'input-container--validation-error': !isValid,
                'input-container--empty': value === '',
                'input-container--focused': this.state.focused
            }
        );

        return (

            <div className={wrapperClassNames}>
                <label className="input-label" htmlFor={id}>
                    {label}
                    {isRequired && <span className="input-label-required" title="Required">{requiredIndicator}</span>}
                </label>
                <input
                    ref={this.inputRef}
                    type={type}
                    id={id}
                    name={name !== null ? name : id}
                    value={value}
                    placeholder={placeholder === false ? '' : placeholder || label}
                    onChange={onChange}
                    required={isRequired}
                    onBlur={ (event) => { this.handleBlur(event); } }
                    onFocus={ () => { this.toggleHasFocus(true); } }
                    disabled={disabled}
                    className={`form-input ${className}`}
                    {...remainingProps}
                />
                { !isValid && errorMessage && (<div className="validation-message">{errorMessage}</div>) }
            </div>
        );
    }

}

Input.propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string,
    label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
        PropTypes.bool
    ]),
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    type: PropTypes.string,
    placeholder: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ]),
    errorMessage: PropTypes.string,
    className: PropTypes.string,
    isRequired: PropTypes.bool,
    requiredIndicator: PropTypes.string,
    isValid: PropTypes.bool,
    disabled: PropTypes.bool
};

Input.defaultProps = {
    name: null,
    type: 'text',
    placeholder: '',
    requiredIndicator: '*',
    errorMessage: null,
    isRequired: false,
    isValid: true,
    disabled: false
};
