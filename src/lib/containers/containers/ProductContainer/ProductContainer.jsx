import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Product, TitleContainer, PriceContainer } from './../../index';


export default class ProductContainer extends Component {

    renderImages = () => {
        const imagesSlotClass = classNames('product-slot product-slot--images', {
            'product-slot--images--multiple': this.props.images.length > 1
        });

        return (
            <div className={imagesSlotClass} key='images'>
                <a href={this.props.link} target={this.props.linkTarget}>
                    {
                        this.props.images.map((image, index) => {
                            return (
                                <img
                                    key={index}
                                    src={image}
                                    alt={this.props.title.title}
                                />
                            );
                        })
                    }
                </a>
            </div>
        );
    };

    renderTitle = () => {
        return (
            <div className='product-slot product-slot--title' key='title'>
                <a href={this.props.link} target={this.props.linkTarget}>
                    <TitleContainer
                        title={this.props.title.title}
                        subtitle={this.props.title.subtitle}
                    />
                </a>
            </div>
        );
    };

    renderPrices = () => {
        return (
            <div className='product-slot product-slot--prices' key='prices'>
                <a href={this.props.link} target={this.props.linkTarget}>
                    <PriceContainer
                        prices={this.props.prices}
                    />
                </a>
            </div>
        );
    };

    render() {
        const {
            slotImage,
            slotDescription,
            title,
            prices,
            images
        } = this.props;

        return (
            <Product
                images={images && this.renderImages()}
                title={title && this.renderTitle()}
                prices={prices && this.renderPrices()}
                slotImage={slotImage}
                slotDescription={slotDescription}
            />
        );
    }

}

ProductContainer.propTypes = {
    title: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.element,
        PropTypes.object
    ]),
    slotImage: PropTypes.object,
    slotDescription: PropTypes.object,
    link: PropTypes.string.isRequired,
    linkTarget: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
    prices: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.element,
        PropTypes.object
    ])
};
