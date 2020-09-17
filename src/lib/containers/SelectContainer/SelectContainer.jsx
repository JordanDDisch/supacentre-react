import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Select } from './../../index';

class SelectContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedValue: this.props.value || '',
            selectedOption: SelectContainer.getSelectedOption(this.props),
            valid: typeof this.props.isValid !== 'undefined' ? this.props.isValid : true
        };
    }

    /**
     * Map the new value to the object option in the options prop
     *
     * @param {object} nextProps The updated props passed to the component
     * @param {object} prevState The current value of state for the component
     * @returns {*}
     */
    static getDerivedStateFromProps(nextProps, prevState) {
        // If the value hasn't changed, don't update state
        if (nextProps.value === prevState.selectedValue && nextProps.isValid !== prevState.valid) {
            return null;
        }

        return {
            ...prevState,
            selectedValue: nextProps.value,
            selectedOption: SelectContainer.getSelectedOption(nextProps),
            valid: typeof nextProps.isValid !== 'undefined' ? nextProps.isValid : true
        };
    }

    /**
     * Map the value passed in as a prop to the option object in the prop for options
     *
     * @param {object} props The props passed to the component
     *
     * @returns {{ value: string, label: string }}
     */
    static getSelectedOption(props) {
        return props.options.find((option) => option.value === props.value) || {
            value: '',
            label: ''
        };
    }

    handleChange = ({ target: { value } }) => {
        const { label } = this.props.options.find((option) => option.value.toString() === value.toString());

        const selectedOption = {
            value,
            label
        };

        this.setState({
            ...this.state,
            selectedOption
        });

        this.props.handleChange({
            target: {
                name: this.props.name !== null ? this.props.name : this.props.id,
                value: selectedOption.value
            }
        });
    };

    /**
     * Make sure a value is selected
     */
    validate = () => {
        this.setState({
            ...this.state,
            valid: this.state.value !== ''
        });
    };

    getValidationMessage() {
        const { errorMessage } = this.props;
        const { valid } = this.state;

        if (!valid) {
            return <div className="validation-message error">{errorMessage || 'Please select a value'}</div>;
        }

        return null;
    }

    render() {
        const { selectedOption } = this.state;
        const className = classnames('select-container', `${this.props.id}-container`, { 'validation-error': !this.props.isValid });

        return (
            <div className={className}>
                <label htmlFor={this.props.id} className="select-label">
                    {this.props.label}
                    {this.props.isRequired && <span className="input-label-required" title="Required">{this.props.requiredIndicator}</span>}
                </label>
                <Select {...this.props} value={selectedOption} onChange={this.handleChange} />
                {this.getValidationMessage()}
            </div>
        );
    }

}

SelectContainer.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    isRequired: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    requiredIndicator: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    required: PropTypes.bool,
    isValid: PropTypes.bool,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
};

SelectContainer.defaultProps = {
    isRequired: false,
    requiredIndicator: '*'
};

export default SelectContainer;
