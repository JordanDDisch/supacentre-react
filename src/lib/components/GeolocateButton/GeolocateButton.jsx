/**
 * GeolocateButton React Component
 */
import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { canGeolocate } from './../../utils/helpers';
import WindowNavigatorWrapper from './../../utils/WindowNavigatorWrapper';

class GeolocateButton extends PureComponent {

    getGeolocation = () => {
        WindowNavigatorWrapper.geolocation.getCurrentPosition(this.props.handleGeolocation);
    };

    getButton() {
        return canGeolocate()
            ? (
                <div className="geolocation-container">
                    <button className="geolocate-btn" onClick={this.getGeolocation} type="button">Geolocate</button>
                </div>
            )
            : null;
    }

    render() {
        return <Fragment>{this.getButton()}</Fragment>;
    }

}

GeolocateButton.propTypes = {
    handleGeolocation: PropTypes.func.isRequired
};

export default GeolocateButton;
