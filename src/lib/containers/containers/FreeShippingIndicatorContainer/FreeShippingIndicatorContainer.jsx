import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FreeShippingIndicator } from './../../index';


class FreeShippingIndicatorContainer extends PureComponent {

    getMessage = () => {
        const { isAvailable, messageAvailable, messageUnavailable } = this.props;

        return isAvailable ? messageAvailable : messageUnavailable;
    };

    render() {
        const { progress, isAvailable } = this.props;

        const percentage = parseFloat(progress) > 100.00 ? 100 : parseFloat(progress);

        return (
            <FreeShippingIndicator
                progress={percentage}
                message={this.getMessage()}
                isAvailable={isAvailable}
            />
        );
    }

}

FreeShippingIndicatorContainer.propTypes = {
    progress: PropTypes.number.isRequired,
    messageAvailable: PropTypes.string.isRequired,
    messageUnavailable: PropTypes.string.isRequired,
    isAvailable: PropTypes.bool
};

export default FreeShippingIndicatorContainer;
