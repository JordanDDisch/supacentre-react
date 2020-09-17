import React, { PureComponent } from 'react';
import { Price } from './../../index';

export default class PriceContainer extends PureComponent {

    render() {
        return (
            <Price
                { ...this.props }
            />
        );
    }

}

PriceContainer.propTypes = { ...Price.propTypes };
