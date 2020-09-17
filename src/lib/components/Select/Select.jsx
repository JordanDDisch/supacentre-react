import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * Select Component
 */
const Select = ({
    id, name, options, value, className, onChange, onBlur
}) => {
    const classNames = classnames('select-input', className);

    return (
        <div className="select-wrapper">
            <select className={classNames} name={name} id={id} onBlur={onBlur} onChange={onChange} value={value.value}>
                {options.map((option, index) => {
                    return (
                        <option key={index} value={option.value} disabled={option.disabled}>{option.label}</option>
                    );
                })}
            </select>
        </div>
    );
};

Select.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    value: PropTypes.shape({
        value: PropTypes.oneOfType([
            PropTypes.string.isRequired,
            PropTypes.number.isRequired
        ]),
        label: PropTypes.string.isRequired,
        disabled: PropTypes.bool
    }),
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    className: PropTypes.string
};

export default Select;
