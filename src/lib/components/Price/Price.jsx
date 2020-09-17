import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Price extends PureComponent {

    render() {
        const { prices } = this.props;

        const renderPrices = () => {
            return prices.map((price, index) => {
                const priceLabel = (
                    <span className="price__label">{price.type} </span>
                );

                const priceValue = (
                    <span className="price__value">
                        {price.value}
                    </span>
                );

                // If more than one price type, strikethrough all but last price
                if (prices.length > 1 && index + 1 < prices.length) {
                    return (
                        <p
                            key={index}
                            className={`price price--${price.type.toLowerCase()}`}
                        >
                            <s>
                                {priceLabel}
                                {priceValue}
                            </s>
                        </p>
                    );
                }

                return (
                    <p
                        key={index}
                        className={`price price--${price.type.toLowerCase()}`}
                    >
                        {priceLabel}
                        {priceValue}
                    </p>
                );
            });
        };

        return (
            <div className='price-wrapper'>
                {renderPrices()}
            </div>
        );
    }

}

Price.propTypes = {
    prices: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
    })).isRequired
};
