import React, { PureComponent } from 'react';
import { CheckboxRadio } from './../../index';

/**
 * CheckboxRadioContainer React Component
 */
export default class CheckboxRadioContainer extends PureComponent {

    render() {
        return (
            <CheckboxRadio
                { ...this.props }
            />
        );
    }

}

CheckboxRadioContainer.propTypes = { ...CheckboxRadio.propTypes };
CheckboxRadioContainer.defaultProps = { ...CheckboxRadio.defaultProps };
