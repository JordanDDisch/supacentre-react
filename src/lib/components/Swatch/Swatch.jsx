import React, { PureComponent } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export default class Swatch extends PureComponent {

    render() {
        const {
            id,
            name,
            label,
            backgroundColor,
            backgroundImage,
            link,
            isSelected,
            isDisabled,
            onClick
        } = this.props;

        const style = {
            ...backgroundImage && { backgroundImage: `url(${backgroundImage})` },
            ...backgroundColor && { backgroundColor }
        };


        const swatchClass = classNames('swatch', {
            'swatch--selected': isSelected,
            'swatch--disabled': isDisabled
        });

        const swatchLabel = (
            <span className='swatch__label'>{label}</span>
        );

        if (link) {
            return (
                <a
                    href={link}
                    id={id}
                    name={name}
                    style={style}
                    onClick={onClick}
                    className={swatchClass}
                    disabled={isDisabled}
                    title={label}
                >
                    {swatchLabel}
                </a>
            );
        }

        return (
            <button
                id={id}
                name={name}
                style={style}
                onClick={onClick}
                className={swatchClass}
                disabled={isDisabled}
                title={label}
            >
                {swatchLabel}
            </button>
        );
    }

}

Swatch.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    backgroundColor: PropTypes.string,
    backgroundImage: PropTypes.string,
    isSelected: PropTypes.bool,
    isDisabled: PropTypes.bool,
    link: PropTypes.string,
    onClick: PropTypes.func
};
