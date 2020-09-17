import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StoreDetails } from './../../index';

class StoreDetailsContainer extends PureComponent {

    /**
     * Determine if click and collect is available by first checking the store setting, and then checking the
     * stock level of all of the products added to a users cart
     *
     * @returns {boolean|boolean}
     */
    isClickAndCollectAvailable() {
        return this.props.click_collect_available // Store is marked as available and...
            && this.props.product_stock.every(({ stock_level }) => parseInt(stock_level, 10) > 0);
        /* eslint camelcase: 0 */ // Stock level of every product is non-zero
    }

    render() {
        const {
            id,
            name,
            address,
            is_featured: isFeatured,
            distance,
            additional_info: additionalInfo,
            onChange,
            isSelected,
            errorMessage
        } = this.props;

        return (
            <StoreDetails
                key={id}
                id={id}
                name={name}
                address={address}
                isFeatured={isFeatured}
                distance={distance}
                additionalInfo={additionalInfo}
                onChange={onChange}
                isSelected={isSelected}
                errorMessage={errorMessage}
                clickCollectAvailable={this.isClickAndCollectAvailable()}
            />
        );
    }

}

StoreDetailsContainer.propTypes = {
    id: PropTypes.oneOfType([
        PropTypes.number.isRequired,
        PropTypes.string.isRequired
    ]),
    name: PropTypes.string.isRequired,
    address: PropTypes.object.isRequired,
    distance: PropTypes.string.isRequired,
    errorMessage: PropTypes.string.isRequired,
    click_collect_available: PropTypes.bool,
    product_stock: PropTypes.array,
    is_featured: PropTypes.bool,
    additional_info: PropTypes.object,
    onChange: PropTypes.func,
    isSelected: PropTypes.bool
};

export default StoreDetailsContainer;
