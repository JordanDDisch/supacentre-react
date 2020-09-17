import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { TextArea } from './../../index';

class TextAreaContainer extends PureComponent {

    render() {
        const classname = classnames('textarea-container', { 'validation-error': !this.props.isValid });
        return (
            <div className={classname}>
                <TextArea
                    {...this.props}
                />
            </div>
        );
    }

}

TextAreaContainer.propTypes = {
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

export default TextAreaContainer;
