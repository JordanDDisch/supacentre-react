import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InputContainer, PostalCodeInputContainer, SelectContainer } from './../../index';

class ManualAddressContainer extends Component {

    /**
     * Map the value provided to this function by the react-select component, to a format that the
     * handleChange prop can manage, without requiring custom code in the parent
     *
     * @param {object} regionSelector The value/label object for the selected option
     *
     * @returns {null}
     */
    handleRegionChange = ({ value }) => {
        this.setState({
            ...this.state,
            region: {
                value,
                valid: true
            }
        }, () => {
            this.props.handleChange({
                target: {
                    name: 'region',
                    value
                }
            });
        });
    };

    renderRegionSelect() {
        if (!this.props.address.region) {
            return null;
        }

        if (this.props.regions && this.props.regions.length > 0) {
            return (
                <SelectContainer
                    id={`region-manual-${this.props.id}`}
                    name="region"
                    label={this.props.address.region.label}
                    options={this.props.regions}
                    handleChange={this.props.handleChange}
                    value={this.props.address.region.value}
                    isValid={this.props.address.region.valid}
                    placeholder={this.props.address.region.placeholder}
                    errorMessage={this.props.address.region.errorMessage}
                />
            );
        }

        return (
            <InputContainer
                id={`region-manual-${this.props.id}`}
                name="region"
                label={this.props.address.region.label}
                value={this.props.address.region.value}
                onChange={this.props.handleChange}
                placeholder={this.props.address.region.placeholder}
                errorMessage={this.props.address.region.errorMessage}
                isValid={this.props.address.region.valid}
                disabled={this.props.address.region.disabled}
            />
        );
    }

    renderCityInput() {
        if (!this.props.address.city) {
            return null;
        }

        return (
            <InputContainer
                id={`city-manual-${this.props.id}`}
                name="city"
                label={this.props.address.city.label}
                value={this.props.address.city.value}
                isValid={this.props.address.city.valid}
                onChange={this.props.handleChange}
                placeholder={this.props.address.city.placeholder}
                errorMessage={this.props.address.city.errorMessage}
                disabled={this.props.address.city.disabled}
            />
        );
    }

    renderProvinceInput() {
        if (!this.props.address.province) {
            return null;
        }

        return (
            <InputContainer
                id={`province-manual-${this.props.id}`}
                name="city"
                label={this.props.address.province.label}
                value={this.props.address.province.value}
                isValid={this.props.address.province.valid}
                onChange={this.props.handleChange}
                placeholder={this.props.address.province.placeholder}
                errorMessage={this.props.address.province.errorMessage}
                disabled={this.props.address.province.disabled}
            />
        );
    }

    renderCountryInput() {
        if (!this.props.address.country) {
            return null;
        }

        return (
            <InputContainer
                id={`country-manual-${this.props.id}`}
                name="country"
                label={this.props.address.country.label}
                value={this.props.address.country.value}
                isValid={this.props.address.country.valid}
                onChange={this.props.handleChange}
                placeholder={this.props.address.country.placeholder}
                errorMessage={this.props.address.country.errorMessage}
                disabled={this.props.address.country.disabled}
            />
        );
    }

    render() {
        return (
            <div className="manual-address-container">
                <InputContainer
                    id={`street-address-manual-${this.props.id}`}
                    name="street"
                    label={this.props.address.street.label}
                    placeholder={this.props.address.street.placeholder}
                    errorMessage={this.props.address.street.errorMessage}
                    value={this.props.address.street.value}
                    isValid={this.props.address.street.valid}
                    onChange={this.props.handleChange}
                    disabled={this.props.address.street.disabled}
                />

                <InputContainer
                    id={`suburb-manual-${this.props.id}`}
                    name="suburb"
                    label={this.props.address.suburb.label}
                    placeholder={this.props.address.suburb.placeholder}
                    errorMessage={this.props.address.suburb.errorMessage}
                    value={this.props.address.suburb.value}
                    isValid={this.props.address.suburb.valid}
                    onChange={this.props.handleChange}
                    disabled={this.props.address.suburb.disabled}
                />

                {this.renderRegionSelect()}

                {this.renderCityInput()}

                {this.renderProvinceInput()}

                <PostalCodeInputContainer
                    id="postcode-manual"
                    name="postcode"
                    label={this.props.address.postcode.label}
                    placeholder={this.props.address.postcode.placeholder}
                    errorMessage={this.props.address.postcode.errorMessage}
                    value={this.props.address.postcode.value}
                    isValid={this.props.address.postcode.valid}
                    isRequired={true}
                    onChange={this.props.handleChange}
                    disabled={this.props.address.postcode.disabled}
                />

                {this.renderCountryInput()}
            </div>
        );
    }

}

ManualAddressContainer.propTypes = {
    id: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    address: PropTypes.shape({
        street: PropTypes.shape({
            value: PropTypes.any.isRequired,
            label: PropTypes.string.isRequired,
            placeholder: PropTypes.string,
            errorMessage: PropTypes.string,
            valid: PropTypes.bool,
            disabled: PropTypes.bool
        }),
        suburb: PropTypes.shape({
            value: PropTypes.any.isRequired,
            label: PropTypes.string.isRequired,
            placeholder: PropTypes.string,
            errorMessage: PropTypes.string,
            valid: PropTypes.bool,
            disabled: PropTypes.bool
        }),
        postcode: PropTypes.shape({
            value: PropTypes.any.isRequired,
            label: PropTypes.string.isRequired,
            placeholder: PropTypes.string,
            errorMessage: PropTypes.string,
            valid: PropTypes.bool,
            disabled: PropTypes.bool
        }),
        region: PropTypes.shape({
            value: PropTypes.any,
            label: PropTypes.string,
            placeholder: PropTypes.string,
            errorMessage: PropTypes.string,
            valid: PropTypes.bool,
            disabled: PropTypes.bool
        }),
        city: PropTypes.shape({
            value: PropTypes.any,
            label: PropTypes.string,
            placeholder: PropTypes.string,
            errorMessage: PropTypes.string,
            valid: PropTypes.bool,
            disabled: PropTypes.bool
        }),
        province: PropTypes.shape({
            value: PropTypes.any,
            label: PropTypes.string,
            placeholder: PropTypes.string,
            errorMessage: PropTypes.string,
            valid: PropTypes.bool,
            disabled: PropTypes.bool
        }),
        country: PropTypes.shape({
            value: PropTypes.any,
            label: PropTypes.string,
            placeholder: PropTypes.string,
            errorMessage: PropTypes.string,
            valid: PropTypes.bool,
            disabled: PropTypes.bool
        })
    }),
    regions: PropTypes.array
};

export default ManualAddressContainer;
