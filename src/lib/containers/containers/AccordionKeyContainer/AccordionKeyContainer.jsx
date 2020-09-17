import React, { PureComponent } from 'react';
import { AccordionKey } from './../../index';

/**
 * AccordionKeyContainer React Component
 */
class AccordionKeyContainer extends PureComponent {

    render() {
        return (
            <AccordionKey
                {...this.props}
            >
                {this.props.children}
            </AccordionKey>
        );
    }

}

AccordionKeyContainer.propTypes = {
    ...AccordionKey.propTypes
};

export default AccordionKeyContainer;
