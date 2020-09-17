import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Rating extends PureComponent {

    render() {
        const {
            icons,
            rating,
            max,
            name,
            onMouseLeave
        } = this.props;

        return (
            <div
                className='rating'
                data-rating={rating}
                data-rating-max={max}
                name={name}
                onMouseLeave={onMouseLeave}
            >
                <p className="rating__label">
                    <span className="rating__label__rated">Rated</span> {rating} out of {max}
                </p>
                <div className='rating__icons'>
                    {icons}
                </div>
            </div>
        );
    }

}

Rating.propTypes = {
    icons: PropTypes.arrayOf(PropTypes.object).isRequired,
    rating: PropTypes.number,
    max: PropTypes.number,
    name: PropTypes.string,
    onMouseLeave: PropTypes.func
};

Rating.defaultProps = {
    rating: 0,
    max: 5
};
