import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SwatchContainer } from './../../index';

export default class SwatchListContainer extends PureComponent {

    render() {
        const {
            title,
            name,
            swatches,
            disabledSwatches,
            onClick,
            noSelectionLabel,
            selectedSwatch
        } = this.props;

        const listTitle = title ? <div className='swatch-list-header__title'>{title}</div> : null;

        const selectedSwatches = swatches.filter((swatch) => swatch.id === selectedSwatch);

        // If no selected swatch label found, use noSelectionLabel prop
        const selectedSwatchLabel = selectedSwatches.length ? selectedSwatches[0].label : noSelectionLabel;
        const selectedTitle = selectedSwatchLabel ? <p className='swatch-list-header__selected'>{selectedSwatchLabel}</p> : null;

        return (
            <div className='swatch-list-wrapper'>
                <div className='swatch-list-header'>
                    {listTitle}
                    {selectedTitle}
                </div>
                <ul className='swatch-list'>
                    {
                        swatches.map((item, index) => {
                            const isDisabled = disabledSwatches ? disabledSwatches.includes(item.id) : false;
                            const isSelected = item.id === selectedSwatch;
                            const swatchClass = classNames('swatch-list__item', {
                                'swatch-list__item--selected': isSelected,
                                'swatch-list__item--disabled': isDisabled
                            });
                            return (
                                <li
                                    key={index}
                                    className={swatchClass}
                                >
                                    <SwatchContainer
                                        key={index}
                                        name={name}
                                        onClick={onClick}
                                        isSelected={isSelected}
                                        isDisabled={isDisabled}
                                        {...item}
                                    />
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }

}

SwatchListContainer.propTypes = {
    swatches: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    selectedSwatch: PropTypes.string,
    disabledSwatches: PropTypes.array,
    onClick: PropTypes.func,
    title: PropTypes.object,
    noSelectionLabel: PropTypes.string
};
