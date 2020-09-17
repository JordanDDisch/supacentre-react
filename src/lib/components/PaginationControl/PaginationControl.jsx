import React, { PureComponent } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { collateModifierClasses } from './../../utils/helpers';

export default class PaginationControl extends PureComponent {

    render() {
        const {
            children,
            onClick,
            isSelected,
            isDisabled,
            isHidden,
            className,
            title
        } = this.props;

        const paginationControlModifier = 'pagination__control--';

        const paginationControlClass = classNames('pagination__control', {
            [`${paginationControlModifier}selected`]: isSelected,
            [`${paginationControlModifier}disabled`]: isDisabled,
            [`${paginationControlModifier}hidden`]: isHidden,
            [`${paginationControlModifier}visible`]: isHidden === false
        }, collateModifierClasses(className, paginationControlModifier));

        return (
            <div className={paginationControlClass}>
                { isSelected
                    ? <span
                        className='pagination__text'
                        title={title}
                    >
                        {children}
                    </span>
                    : <button
                        className='pagination__button'
                        onClick={onClick}
                        type='button'
                        title={title}
                        disabled={isDisabled}
                    >
                        {children}
                    </button>
                }
            </div>
        );
    }

}

PaginationControl.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    isSelected: PropTypes.bool,
    isDisabled: PropTypes.bool,
    isHidden: PropTypes.bool,
    className: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
    ]),
    title: PropTypes.string
};
