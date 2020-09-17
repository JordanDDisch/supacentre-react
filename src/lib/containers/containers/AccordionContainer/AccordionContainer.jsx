import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { AccordionKeyContainer } from './../../index';

/**
 * AccordionContainer React Component
 */
class AccordionContainer extends PureComponent {

    render() {
        return (
            <div className='accordion'>
                {
                    this.props.keys.map((item, index) => {
                        const isDisabled = this.props.disabledKeys ? this.props.disabledKeys.includes(item.id) : false;
                        const isOpen = this.props.openKeys ? this.props.openKeys.includes(item.id) : false;

                        return (
                            <AccordionKeyContainer
                                key={index}
                                name={this.props.name}
                                transitionSpeed={this.props.transitionSpeed}
                                onClick={this.props.onClick}
                                isOpen={isOpen}
                                isDisabled={isDisabled}
                                openLimit={this.props.openLimit}
                                {...item}
                            />
                        );
                    })
                }
            </div>
        );
    }

}

AccordionContainer.propTypes = {
    keys: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    openKeys: PropTypes.array,
    disabledKeys: PropTypes.array,
    onClick: PropTypes.func,
    transitionSpeed: PropTypes.number,
    openLimit: PropTypes.bool
};

export default AccordionContainer;
