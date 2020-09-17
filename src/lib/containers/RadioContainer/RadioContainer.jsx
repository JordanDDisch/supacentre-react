import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Radio } from './../../index';

export default class RadioContainer extends PureComponent {

    render() {
        return (
            <Radio
                name={this.props.id}
                { ...this.props }
            />
        );
    }

}

RadioContainer.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    type: PropTypes.string,
    isSelected: PropTypes.bool,
    isRequired: PropTypes.bool,
    onChange: PropTypes.func
};
