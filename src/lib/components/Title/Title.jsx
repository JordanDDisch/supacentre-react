import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Title extends PureComponent {

    render() {
        const {
            title,
            subtitle
        } = this.props;
        const subtitleWrap = subtitle ? <small className='page-title__subtitle'>{subtitle}</small> : null;

        return (
            <h1 className='page-title'>
                {title} {subtitleWrap}
            </h1>
        );
    }

}

Title.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string
};
