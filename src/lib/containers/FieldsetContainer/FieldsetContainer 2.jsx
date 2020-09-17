import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

/**
 * FieldsetContainer React Component
 */
class FieldsetContainer extends PureComponent {

    render() {
        const className = `fieldset${` fieldset--${this.props.name}`}`;

        return (
            <fieldset className={className}>
                <legend className='fieldset__legend'>{this.props.legend}</legend>
                <div className='fieldset__content'>
                    {this.props.children}
                </div>
            </fieldset>
        );
    }

}

FieldsetContainer.propTypes = {
    name: PropTypes.string.isRequired,
    legend: PropTypes.string.isRequired,
    children: PropTypes.array.isRequired
};

export default FieldsetContainer;
