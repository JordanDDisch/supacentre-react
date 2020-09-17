import React, { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class CheckboxRadio extends PureComponent {

    constructor(props) {
        super(props);
        this.inputRef = createRef();
    }

    /**
     * Call focus() on the input element
     *
     * @returns {null}
     */
    focusInput() {
        this.inputRef.current.focus();
    }

    render() {
        const {
            id,
            label,
            value,
            name,
            onChange,
            onBlur,
            type,
            errorMessage,
            isRequired,
            isSelected,
            requiredIndicator,
            isValid,
            disabled,
            isDisabled,
            checked,
            className,
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
                'input-container--empty': value === ''
            }
        );

        return (
            <div className={wrapperClassNames}>
                <input
                    ref={this.inputRef}
                    type={type}
                    id={id}
                    name={name !== null ? name : id}
                    value={value}
                    onChange={onChange}
                    required={isRequired}
                    onBlur={onBlur}
                    disabled={disabled || isDisabled}
                    checked={checked || isSelected}
                    className={`form-input ${className}`}
                    {...remainingProps}
                />
                <label className="input-label" htmlFor={id}>
                    {label}
                    {isRequired && (
                        <span className="input-label-required" title="Required">
                            {requiredIndicator}
                        </span>
                    )}
                </label>
                {!isValid && errorMessage && <div className="validation-message">{errorMessage}</div>}
            </div>
        );
    }

}

CheckboxRadio.defaultProps = {
    requiredIndicator: '*',
    name: null,
    onBlur: undefined,
    type: 'text',
    placeholder: '',
    errorMessage: null,
    isRequired: false,
    isValid: true,
    disabled: false
};

CheckboxRadio.propTypes = {
    type: PropTypes.oneOf(['checkbox', 'radio']).isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    label: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    isSelected: PropTypes.bool,
    isDisabled: PropTypes.bool,
    disabled: PropTypes.bool,
    checked: PropTypes.bool,
    isRequired: PropTypes.bool,
    isValid: PropTypes.bool,
    requiredIndicator: PropTypes.string.isRequired,
    errorMessage: PropTypes.string
};
