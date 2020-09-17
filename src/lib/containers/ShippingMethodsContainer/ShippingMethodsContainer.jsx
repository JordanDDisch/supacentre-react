import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { RadioContainer } from './../../index';


class ShippingMethodsContainer extends PureComponent {

    constructor(props) {
        super(props);

        this.id = 'shipping-methods';
    }

    handleRadioChange = ({ target }) => {
        this.props.onChange(target.value);
    };

    getShippingMethod({
        id, label, description, price
    }, index) {
        const optionId = `shipping-method--${id}`;
        const className = classnames('shipping-method', `shipping-method--${id}`);

        return (
            <li key={index} className={className}>
                <RadioContainer
                    id={optionId}
                    name={`${this.id}-radio`}
                    value={id}
                    onChange={this.handleRadioChange}
                    isSelected={this.props.selected === id}
                />

                <label className="shipping-method__label" htmlFor={optionId}>
                    <span className="shipping-label">{label}</span>
                    <span className="shipping-description">{description}</span>
                    <span className="shipping-price">{price}</span>
                </label>
            </li>
        );
    }

    getShippingMethods() {
        if (!this.props.shippingMethods.length) {
            return (
                <p className={`${this.id}-message`}>
                    Please enter address to see available shipping methods
                </p>
            );
        }

        return (
            <ul className={this.id}>
                {this.props.shippingMethods.map((item, index) => this.getShippingMethod(item, index))}
            </ul>
        );
    }

    render() {
        const label = this.props.label && <label htmlFor={this.id} className={`${this.id}__title`}>{this.props.label}</label>;

        return (
            <section className={`${this.id}-container`}>
                {label}
                {this.props.slotOne}
                {this.getShippingMethods()}
            </section>
        );
    }

}

ShippingMethodsContainer.propTypes = {
    shippingMethods: PropTypes.array.isRequired,
    selected: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    slotOne: PropTypes.element
};

ShippingMethodsContainer.defualtProps = {
    label: null,
    slotOne: null
};

export default ShippingMethodsContainer;
