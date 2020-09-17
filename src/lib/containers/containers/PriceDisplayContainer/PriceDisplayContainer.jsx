import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { PriceDisplay } from './../../index';


class PriceDisplayContainer extends PureComponent {

    render() {
        return (
            <PriceDisplay
                { ...this.props }
            />
        );
    }

}

PriceDisplayContainer.propTypes = {
    id: PropTypes.oneOfType([
        PropTypes.number.isRequired,
        PropTypes.string.isRequired
    ]),
    label: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.node.isRequired
    ]),
    price: PropTypes.string.isRequired,
    handleRemove: PropTypes.func,
    className: PropTypes.string,
    subLabel: PropTypes.string,
    discount: PropTypes.bool,
    modifier: PropTypes.bool
};

export default PriceDisplayContainer;
