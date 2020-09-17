import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { RadioContainer } from './../../index';

export default class StoreDetails extends PureComponent {

    render() {
        const {
            id,
            name,
            address,
            clickCollectAvailable,
            isFeatured,
            distance,
            additionalInfo,
            onChange,
            isSelected,
            errorMessage
        } = this.props;

        const {
            street, suburb, state, postcode
        } = address;
        const storeId = `store-${id}`;
        const className = classnames(
            'store-details',
            {
                featured: isFeatured,
                'store-details--featured': isFeatured,
                'store-details--available': clickCollectAvailable,
                'store-details--selected': isSelected
            }
        );
        const error = !clickCollectAvailable ? <span className="store-details__error">{errorMessage}</span> : null;

        const additional = additionalInfo ? (
            <span className="store-details__additional-info">
                <span className="addition-info__label">
                    {additionalInfo.label}
                </span>
                <span className="addition-info__value">
                    {additionalInfo.value}
                </span>
            </span>
        ) : null;

        return (
            <div className={className}>
                <div className="input-container">
                    <RadioContainer
                        id={storeId}
                        name="selected_store"
                        value={id}
                        onChange={onChange}
                        isSelected={isSelected}
                        disabled={!clickCollectAvailable}
                    />
                </div>
                <label htmlFor={storeId}>
                    <span className="store-details__name-container">
                        {name}
                    </span>
                    <span className="store-details__address">
                        <span className="address__street">{street}</span>
                        <span className="address__suburb">{suburb}</span>
                        <span className="address__state">{state}</span>
                        <span className="address__postcode">{postcode}</span>
                    </span>
                    {
                        distance && (
                            <span className="store-details__distance">
                                {distance}
                            </span>
                        )
                    }
                    {additional}
                    {error}
                </label>
            </div>
        );
    }

}

StoreDetails.propTypes = {
    id: PropTypes.oneOfType([
        PropTypes.number.isRequired,
        PropTypes.string.isRequired
    ]),
    name: PropTypes.string.isRequired,
    address: PropTypes.object.isRequired,
    errorMessage: PropTypes.string.isRequired,
    distance: PropTypes.string,
    additionalInfo: PropTypes.object,
    clickCollectAvailable: PropTypes.bool,
    productStock: PropTypes.array,
    isFeatured: PropTypes.bool,
    onChange: PropTypes.func,
    isSelected: PropTypes.bool
};
