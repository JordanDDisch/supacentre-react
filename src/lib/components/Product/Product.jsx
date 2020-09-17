import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Product extends PureComponent {

    render() {
        const {
            images,
            title,
            prices,
            slotImage,
            slotDescription
        } = this.props;

        return (
            <article className='product'>
                <div className='product__images'>
                    { images }
                    { slotImage }
                </div>
                <div className='product__description'>
                    { title }
                    { prices }
                    { slotDescription }
                </div>
            </article>
        );
    }

}

Product.propTypes = {
    images: PropTypes.object,
    title: PropTypes.object,
    prices: PropTypes.object,
    slotImage: PropTypes.object,
    slotDescription: PropTypes.object
};
