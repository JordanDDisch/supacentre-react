import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { SelectContainer } from './../../index';


class ItemSummaryContainer extends PureComponent {

    constructor(props) {
        super(props);

        this.name = 'item-summary';
    }

    getSalePrice() {
        return this.props.item.priceSale ? (
            <div className="item-price item-price--sale">
                <span>{this.props.item.priceSale}</span>
            </div>
        ) : null;
    }

    getPrice() {
        const classNames = classnames('item-price', { 'item-price--old': this.props.item.priceSale });

        return (
            <div className={classNames}>
                <span>{this.props.item.price}</span>
            </div>
        );
    }

    getConfigurable({
        id: instanceId, label, labelOnly, selection, options, id
    }, index) {
        const showOptions = !labelOnly && this.props.updateConfigurable && options && options.length > 1;
        const classNames = classnames(`${this.name}__option`, `${this.name}__options--${instanceId}`, { 'label-only': !showOptions });

        const selectedLabel = !showOptions ? (
            <div className={`${this.name}__option-value`}>
                {options.filter((option) => option.value === selection)[0].label}
            </div>
        ) : null;

        const selectOptions = showOptions ? (
            <SelectContainer
                id={`select-${instanceId}__${this.props.item.sku}`}
                label={label}
                options={options}
                value={selection}
                name={id}
                isValid={true}
                handleChange={(val) => this.props.updateConfigurable(instanceId, val)}
            />
        ) : null;

        return (
            <div key={index} className={classNames}>
                <div className={`${this.name}__option-label`}>{label}</div>
                {selectedLabel}
                {selectOptions}
            </div>
        );
    }

    getConfigurables() {
        const configurables = Object.keys(this.props.item.configurables);
        const blacklist = this.props.blackListConfigurables || [];
        return configurables
            .filter((configurable) => !blacklist.includes(configurable))
            .map((key, index) => this.getConfigurable(this.props.item.configurables[key], index));
    }


    renderCloseAction() {
        return this.props.removeItem ? (
            <button className="remove-item"
                data-item-id={this.props.itemId}
                onClick={this.props.removeItem}
                title={this.props.closeButtonTitle || 'Remove'}
                type="button">
                {this.props.closeButtonContent || 'X'}
            </button>
        ) : null;
    }

    renderErrorMessage() {
        if (!this.props.item.errorMessage || this.props.item.errorMessage === '') {
            return null;
        }

        return (
            <div className={`${this.name}__error-message`}>
                {this.props.item.errorMessage}
            </div>
        );
    }

    renderMessage() {
        return this.props.item.message ? (
            <div className={`${this.name}__message`}>
                {this.props.item.message}
            </div>
        ) : null;
    }

    render() {
        const { item, className } = this.props;

        const classNames = classnames(this.name, className);

        return (
            <section className={classNames}>
                <div className={`${this.name}__product-image`}>
                    <a href={item.uri}><img src={item.image.src} alt={item.image.alt} title={item.image.alt}/></a>
                </div>

                <div className={`${this.name}__product-details`}>
                    <h3 className={`${this.name}__title`}>
                        <a className={`${this.name}__link`} href={item.uri}>{this.props.title || item.name}</a>
                        {this.props.subtitle && (
                            <div className={`${this.name}__subtitle`}>{this.props.subtitle}</div>
                        )}
                    </h3>

                    <div className={`${this.name}__children`}>
                        {this.props.children}
                    </div>

                    {this.renderErrorMessage()}

                    <div className={`${this.name}__price`}>
                        {this.getPrice()}
                        {this.getSalePrice()}
                    </div>

                    {this.getConfigurables()}
                    {this.renderMessage()}
                </div>

                <div className={`${this.name}__actions`}>
                    {this.renderCloseAction()}
                </div>
            </section>
        );
    }

}

ItemSummaryContainer.propTypes = {
    itemId: PropTypes.oneOfType([
        PropTypes.number.isRequired,
        PropTypes.string.isRequired
    ]),
    item: PropTypes.object.isRequired,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    updateConfigurable: PropTypes.func,
    blackListConfigurables: PropTypes.arrayOf(PropTypes.string),
    closeButtonContent: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.object,
        PropTypes.string
    ]),
    closeButtonTitle: PropTypes.string,
    removeItem: PropTypes.func,
    className: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.element,
        PropTypes.object
    ])
};

export default ItemSummaryContainer;
