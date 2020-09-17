import React, { PureComponent } from 'react';
import { Swatch } from './../../index';

export default class SwatchContainer extends PureComponent {

    render() {
        return (
            <Swatch
                { ...this.props }
            />
        );
    }

}

SwatchContainer.propTypes = {
    ...Swatch.propTypes
};
