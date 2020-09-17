import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';


export default class RatingIcon extends PureComponent {

    render() {
        const {
            isInteractive,
            children,
            ratingIndex,
            onMouseEnter,
            onClick,
            className
        } = this.props;

        return isInteractive
            ? <button
                type='button'
                className={className}
                data-rating={ratingIndex}
                onClick={onClick}
                onMouseEnter={onMouseEnter}
            >
                {children}
            </button>
            : <span
                className={className}
                data-rating={ratingIndex}
            >
                {children}
            </span>;
    }

}

RatingIcon.propTypes = {
    isInteractive: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ]).isRequired,
    ratingIndex: PropTypes.number.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func,
    onMouseEnter: PropTypes.func
};
