import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {
    STATE__COMPLETE, STATE__ERROR, STATE__IDLE, STATE__LOADING
} from './../../utils/helper-states';

export const Button = ({
    className,
    type,
    disabled,
    buttonState,
    loadingText,
    completeText,
    errorText,
    onClick,
    children
}) => {
    const getButtonChildren = () => {
        if (buttonState === STATE__ERROR) {
            return errorText;
        }
        if (buttonState === STATE__COMPLETE) {
            return completeText;
        }
        if (buttonState === STATE__LOADING) {
            return loadingText;
        }
        return children;
    };
    return (
        <button
            className={classnames(className,
                'button',
                'button-component',
                `button-component-${type}`, {
                'button--primary': type === 'submit',
                'button--secondary': type === 'button',
                'button-component--is-complete': buttonState === STATE__COMPLETE,
                'button-component--is-loading': buttonState === STATE__LOADING,
                'button-component--is-disabled': disabled,
                'button-component--has-error': buttonState === STATE__ERROR
            })}
            onClick={onClick}
            type={type}
            disabled={disabled || buttonState === STATE__LOADING}
        >
            {getButtonChildren()}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    type: PropTypes.oneOf(['submit', 'button']),
    disabled: PropTypes.bool,
    buttonState: PropTypes.oneOf([STATE__LOADING, STATE__COMPLETE, STATE__ERROR, STATE__IDLE]),
    errorText: PropTypes.string,
    loadingText: PropTypes.string,
    completeText: PropTypes.string,
    onClick: PropTypes.func
};

Button.defaultProps = {
    className: '',
    type: 'submit',
    disabled: false,
    buttonState: STATE__IDLE,
    loadingText: 'Loading',
    completeText: 'Done',
    errorText: 'Error',
    onClick: () => {}
};

export default Button;
