import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { AutoCompleteAddressContainer, ManualAddressContainer, SelectContainer } from './../../index';
import addressPropShape from './../../utils/default-prop-types';

class DeliveryForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            displayAddressBook: this.props.customerAddresses && this.props.customerAddresses.length > 0
        };
    }

    componentDidMount() {
        if (this.props.onComponentDidMount) {
            this.props.onComponentDidMount();
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.onComponentDidUpdate) {
            this.props.onComponentDidUpdate(prevProps, prevState, snapshot);
        }
    }

    /**
     * Get the options for the address book select
     * This will include the "New Address" option, that will be used to trigger an input field
     *
     * @returns {object}
     */
    getOptions = () => {
        const addresses = this.props.customerAddresses.map((address) => {
            const region = this.extractRegion(address);

            return {
                label: `${address.street.join(' ')}, ${address.city} ${region || ''}${address.postcode}`,
                value: address.id
            };
        });

        // Add the extra "New Address" option, which will re-render the component with a blank input field
        return [
            ...addresses,
            {
                label: 'New Address',
                value: 'new'
            }
        ];
    };

    /**
     * Get the default shipping address
     *
     * If no default shipping address is found, then the function will return an empty string
     *
     * @returns { {label: string, value: *} | string }
     */
    getSelectedAddress = () => {
        if (!this.props.defaultAddresses) {
            return '';
        }

        const selectedAddress = this.props.customerAddresses
            .find((address) => parseInt(address.id, 10) === parseInt(this.props.defaultAddresses.shipping, 10));

        if (!selectedAddress) {
            return '';
        }

        return selectedAddress.id;
    };

    /**
     * Handle the event fired when the user selects a different saved address
     *
     * @param {object} selected The selected object
     *
     * @returns {null}
     */
    handleAddressBookChange = (selected) => {
        const { value } = selected.target;
        const { handleSelectNewAddress, customerAddresses, onSelectAddressBook } = this.props;

        if (value === 'new') {
            handleSelectNewAddress();

            this.setState({
                ...this.state,
                displayAddressBook: false
            });

            return;
        }

        const selectedAddress = customerAddresses.filter((address) => address.id === value)[0];
        const oneLineAddress = `${selectedAddress.street.join(' ')}, ${selectedAddress.city} ${selectedAddress.postcode}`;

        onSelectAddressBook(oneLineAddress);
    };

    /**
     * Extract the region from the provided address data.
     *
     * @param {object} addressData An object containing all of the address data
     *
     * @returns {boolean|string}
     */
    extractRegion = (addressData) => {
        return addressData.region && addressData.region.region && `${addressData.region.region} `;
    };

    /**
     * Render a SelectContainer with pre-filled addresses from a users address book
     *
     * @returns {Element|null}
     */
    renderAddressBook() {
        if (!this.state.displayAddressBook) {
            return null;
        }

        return (
            <SelectContainer
                id={`delivery-form-address_book-${this.props.id}`}
                name="delivery-form-address_book"
                className="delivery-form__address-book"
                label=""
                options={this.getOptions()}
                value={this.getSelectedAddress()}
                handleChange={this.handleAddressBookChange}
                isValid={true}
            />
        );
    }

    /**
     * Render the AutoCompleteAddressContainer
     *
     * @returns {Element|null}
     */
    renderAutoCompleteAddress() {
        if (!this.props.displayOneLineAddress || this.state.displayAddressBook) {
            return null;
        }

        return (
            <Fragment>
                <label className="input-label" htmlFor={`delivery-address-${this.props.id}`}>{this.props.label}</label>
                <AutoCompleteAddressContainer
                    id={`delivery-address-${this.props.id}`}
                    name="oneLineAddress"
                    handleSearch={this.props.handleSearch}
                    handleClick={this.props.onSelectAutosuggest}
                    onSelectAddressBook={this.props.onSelectAddressBook}
                    address={this.props.oneLineAddress.value}
                    transformCompleteRequest={this.props.transformCompleteRequest}
                    minCharacters={this.props.minCharacters}
                    customerAddresses={this.props.customerAddresses}
                    defaultAddresses={this.props.defaultAddresses}
                    placeholder={this.props.oneLineAddress.placeholder}
                    handleChange={this.props.handleChangeAutoCompleteInput}
                />
            </Fragment>
        );
    }

    /**
     * Render the ManualAddressContainer input
     *
     * @returns {Element|null}
     */
    renderManualAddressForm() {
        if (this.props.displayOneLineAddress || this.state.displayAddressBook) {
            return null;
        }

        return (
            <ManualAddressContainer
                id={`delivery-address-${this.props.id}`}
                handleChange={this.props.onManualAddressChange}
                address={this.props.address}
                regions={this.props.regions}
            />
        );
    }

    renderAddressToggle() {
        if (this.state.displayAddressBook) {
            return null;
        }

        return (
            <div className="delivery-form__toggle-address-input">
                <p className="delivery-form__label">{this.props.fullFormToggleInfo}</p>
                <button className="delivery-form__button--toggle-full-address" onClick={this.props.handleToggleFullForm}>
                    {this.props.fullFormToggleLabel}
                </button>
            </div>
        );
    }

    render() {
        return (
            <section className="delivery-form-container">
                <div className="address-container">
                    {this.renderAddressBook()}
                    {this.renderAutoCompleteAddress()}
                    {this.renderManualAddressForm()}
                </div>
                {this.renderAddressToggle()}
            </section>
        );
    }

}

DeliveryForm.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    handleSearch: PropTypes.func.isRequired,
    displayOneLineAddress: PropTypes.bool.isRequired,
    onSelectAutosuggest: PropTypes.func.isRequired,
    onSelectAddressBook: PropTypes.func.isRequired,
    oneLineAddress: PropTypes.shape({
        value: PropTypes.string.isRequired,
        placeholder: PropTypes.string
    }),
    onManualAddressChange: PropTypes.func.isRequired,
    transformCompleteRequest: PropTypes.func,
    address: PropTypes.shape({
        street: PropTypes.shape(addressPropShape),
        suburb: PropTypes.shape(addressPropShape),
        postcode: PropTypes.shape(addressPropShape),
        region: PropTypes.shape(addressPropShape)
    }),
    regions: PropTypes.array.isRequired,
    handleToggleFullForm: PropTypes.func,
    minCharacters: PropTypes.number,
    customerAddresses: PropTypes.array,
    defaultAddresses: PropTypes.shape({
        billing: PropTypes.string,
        shipping: PropTypes.string
    }),
    handleChangeAutoCompleteInput: PropTypes.func.isRequired,
    handleSelectNewAddress: PropTypes.func,
    fullFormToggleInfo: PropTypes.string,
    fullFormToggleLabel: PropTypes.string,
    onComponentDidMount: PropTypes.func,
    onComponentDidUpdate: PropTypes.func
};

DeliveryForm.defaultProps = {
    label: 'Delivery Form',
    fullFormToggleInfo: 'Can\'t find your address?',
    fullFormToggleLabel: 'Try full form',
    handleSelectNewAddress: () => {}
};

export default DeliveryForm;
