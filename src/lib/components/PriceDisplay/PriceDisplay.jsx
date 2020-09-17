import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class PriceDisplay extends PureComponent {

    render() {
        const {
            id,
            className,
            label,
            subLabel,
            price,
            discount,
            modifier,
            handleRemove
        } = this.props;

        const subLabelJSX = subLabel ? <span>{subLabel}</span> : null;
        const classNames = classnames('price-display', `price--${id}`, className, { discount });
        return (

            <div className={classNames}>
                <div className="price-display__label">
                    <PriceLabel label={label} modifier={modifier} handleRemove={handleRemove} id={id} />
                    {subLabelJSX}
                </div>
                <div className="price-display__price">
                    {price}
                </div>
            </div>

        );
    }

}

class PriceLabel extends PureComponent {

    render() {
        const {
            label, modifier, handleRemove, id
        } = this.props;
        if (!label) return null;
        const remove = modifier ? <button className="remove-modifier" onClick={handleRemove} data-index={id}>X</button> : null;
        return (
            <span className="price-display__label--control">
                {label}
                {remove}
            </span>
        );
    }

}

PriceDisplay.propTypes = {
    id: PropTypes.oneOfType([
        PropTypes.number.isRequired,
        PropTypes.string.isRequired
    ]),
    label: PropTypes.oneOfType([
        PropTypes.array.isRequired,
        PropTypes.element.isRequired,
        PropTypes.string.isRequired
    ]),
    price: PropTypes.oneOfType([
        PropTypes.number.isRequired,
        PropTypes.string.isRequired
    ]),
    handleRemove: PropTypes.func,
    className: PropTypes.string,
    subLabel: PropTypes.string,
    discount: PropTypes.bool,
    modifier: PropTypes.bool
};

PriceLabel.propTypes = {
    label: PropTypes.oneOfType([
        PropTypes.array.isRequired,
        PropTypes.element.isRequired,
        PropTypes.string.isRequired
    ]),
    id: PropTypes.oneOfType([
        PropTypes.number.isRequired,
        PropTypes.string.isRequired
    ]),
    handleRemove: PropTypes.func,
    modifier: PropTypes.bool
};
