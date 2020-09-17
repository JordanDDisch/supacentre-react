import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { collateModifierClasses } from './../../utils/helpers';


export default class ListContainer extends PureComponent {

    render() {
        const {
            items,
            className
        } = this.props;

        const classes = classNames('list', collateModifierClasses(className, 'list--'));

        return (
            <ul className={classes}>
                {
                    items.map((item, index) => {
                        return (
                            <li
                                key={index}
                                className='list__item'
                            >
                                { item }
                            </li>
                        );
                    })
                }
            </ul>
        );
    }

}

ListContainer.propTypes = {
    items: PropTypes.arrayOf(PropTypes.node).isRequired,
    className: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
    ])
};
