import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb } from './../../index';

/**
 * BreadcrumbContainer React Component
 */
class BreadcrumbContainer extends PureComponent {

    render() {
        return (
            <ul className='breadcrumb-list'>
                {
                    this.props.crumbs.map((item, index) => {
                        return (
                            <Breadcrumb
                                key={index}
                                { ...item }
                            />
                        );
                    })
                }
            </ul>
        );
    }

}

BreadcrumbContainer.propTypes = {
    crumbs: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        link: PropTypes.string
    }))
};

export default BreadcrumbContainer;
