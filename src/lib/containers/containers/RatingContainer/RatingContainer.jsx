import React, { PureComponent } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Rating, RatingIcon } from './../../index';

export default class RatingContainer extends PureComponent {

    render() {
        const {
            rating = 0,
            ratingHover,
            max = 5,
            icons,
            name,
            onClick,
            onMouseEnter,
            onMouseLeave
        } = this.props;

        // Inactive icons default to active set, unless set to null
        const inactiveIcons = icons.inactive === undefined ? icons.active : icons.inactive;

        const ratingPercent = (ratingHover > rating ? ratingHover : rating) / max * 100;

        const renderIcons = (iconSet, type) => {
            if (iconSet === null) return null;

            // If singular icon provided, fill array
            const iconSetArray = typeof iconSet === 'string' ? Array(max).fill(iconSet) : iconSet;

            const iconSetWidth = type === 'inactive' ? `${100 - ratingPercent}%` : `${ratingPercent}%`;

            return (
                <div
                    key={type}
                    className={`rating__icons__set rating__icons__set--${type}`}
                    style={
                        { width: iconSetWidth }
                    }
                >
                    {
                        iconSetArray.map((icon, index) => {
                            const iconElement = icons.type === 'image'
                                ? <img src={icon} alt='Rating icon' />
                                : icon;
                            const iconIndex = index + 1;
                            const iconHover = ratingHover && type === 'active'
                            && (iconIndex <= rating && ratingHover < iconIndex
                            || iconIndex > rating && ratingHover >= iconIndex);

                            const iconClass = classNames('rating-icon', {
                                'rating-icon--hover': iconHover
                            });

                            return (
                                <RatingIcon
                                    key={index}
                                    className={iconClass}
                                    isInteractive={ratingHover !== undefined}
                                    ratingIndex={iconIndex}
                                    onMouseEnter={onMouseEnter ? () => onMouseEnter(name, iconIndex) : undefined}
                                    onClick={onClick ? () => onClick(name, iconIndex) : undefined}
                                >
                                    {iconElement}
                                </RatingIcon>
                            );
                        })
                    }
                </div>
            );
        };

        const iconSets = [
            renderIcons(icons.active, 'active'),
            renderIcons(inactiveIcons, 'inactive')
        ];

        return (
            <Rating
                rating={rating}
                ratingHover={ratingHover}
                max={max}
                icons={iconSets}
                name={name}
                onMouseLeave={onMouseLeave}
            />
        );
    }

}

RatingContainer.propTypes = {
    rating: PropTypes.number,
    ratingHover: PropTypes.number,
    max: PropTypes.number,
    icons: PropTypes.shape({
        type: PropTypes.oneOf([
            'text',
            'image'
        ]).isRequired,
        active: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.arrayOf(PropTypes.string)
        ]).isRequired,
        inactive: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.arrayOf(PropTypes.string)
        ])
    }),
    name: PropTypes.string,
    onClick: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func
};
