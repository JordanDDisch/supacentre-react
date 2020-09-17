import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class FreeShippingIndicator extends PureComponent {

    render() {
        const { progress: percent, message, isAvailable } = this.props;
        const meterClassNames = classnames('meter', { 'meter-full': isAvailable });

        return (
            <div className='free-shipping-indicator'>
                <div className="progress-label">
                    {message}
                </div>
                <div className="meter-container">
                    <div className={meterClassNames} style={{ width: `${percent}%` }}></div>
                </div>
            </div>
        );
    }

}

FreeShippingIndicator.propTypes = {
    progress: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
    isAvailable: PropTypes.bool
};

FreeShippingIndicator.defaultProps = {
    isAvailable: false
};
