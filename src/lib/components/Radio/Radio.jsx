import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Radio extends PureComponent {

    render() {
        const {
            id, name, value, onChange, isSelected, isDisabled
        } = this.props;
        return (
            <input
                type="radio"
                className="radio"
                name={name}
                id={id}
                value={value}
                disabled={isDisabled}
                checked={isSelected}
                onChange={onChange}
            />
        );
    }

}

Radio.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    isSelected: PropTypes.bool,
    isDisabled: PropTypes.bool,
    onChange: PropTypes.func
};

Radio.defaultProps = {
    isSelected: false,
    isDisabled: false
};
