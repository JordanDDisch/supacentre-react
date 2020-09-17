import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { PriceDisplayContainer } from './../../index';

export default class OrderSummaryPriceContainer extends PureComponent {

    constructor(props) {
        super(props);

        this.id = 'order-summary-price';
    }

    getPrices() {
        return this.props.prices.map((price, index) => {
            return (
                <PriceDisplayContainer
                    key = {index}
                    handleRemove={this.props.handleRemove}
                    {...price}
                    id = {price.code}
                />
            );
        });
    }

    render() {
        const heading = this.props.heading ? <h3>{this.props.heading}</h3> : null;

        return (
            <section className={this.id}>
                {heading}
                {this.getPrices()}
            </section>
        );
    }

}

OrderSummaryPriceContainer.propTypes = {
    prices: PropTypes.array.isRequired,
    handleRemove: PropTypes.func.isRequired,
    heading: PropTypes.string
};
