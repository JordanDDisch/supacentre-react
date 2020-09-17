import React, { PureComponent } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export default class Breadcrumb extends PureComponent {

    render() {
        const {
            title,
            link
        } = this.props;

        const breadcrumbClass = classNames('breadcrumb', {
            'breadcrumb--link': link,
            'breadcrumb--text': !link
        });

        if (link) {
            return (
                <li className={breadcrumbClass}>
                    <a href={link} className='breadcrumb__inner'>
                        {title}
                    </a>
                </li>
            );
        }

        return (
            <li className={breadcrumbClass}>
                <span className='breadcrumb__inner'>
                    {title}
                </span>
            </li>
        );
    }

}

Breadcrumb.propTypes = {
    title: PropTypes.string.isRequired,
    link: PropTypes.string
};
