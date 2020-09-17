import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import debounce from 'debounce-promise';
import { AutoComplete } from './../../index';

class AutoCompleteAddressContainer extends Component {

    constructor(props) {
        super(props);

        this.transformCompleteRequest = this.props.transformCompleteRequest || ((response) => response);

        this.state = {
            suggestions: [],
            minCharacters: this.props.minCharacters || 0,
            // Indicates if the getResults function can run
            canGetResults: true
        };

        this.getResultsDebounced = debounce(this.getResults, 400);
    }

    componentDidUpdate(prevProps) {
        // If the previous address and current address are the same, then don't need to run the search again
        if (this.props.address === prevProps.address) {
            return;
        }

        // If canGetResults === false, this means the user has likely just selected one of the suggested values,
        // and the address prop has been updated to match that selection. In this case, the getResults function
        // doesn't need to run again
        if (!this.state.canGetResults) {
            // Flip the value of canGetResults, so the component will handle the next time the props update,
            // which will likely be when the user types into the field
            this.setState((prevState) => ({
                canGetResults: !prevState.canGetResults
            }));

            return;
        }

        if (this.props.address.length >= this.state.minCharacters) {
            this.getResultsDebounced();
        } else {
            this.clearResults();
        }
    }

    clickResult = (selectedResult) => {
        const selectedAddress = this.state.suggestions.find((suggestion, index) => selectedResult === index);

        // If the address will change when the user selects a suggested value, we need to prevent the search
        // from running a second time
        if (this.props.willUpdateValue) {
            this.setState({
                canGetResults: false
            });
        }

        this.props.handleClick(selectedAddress);
        this.clearResults();
    };

    getResults = async () => {
        this.setState({
            suggestions: [{
                value: 'Searching...',
                selectable: false
            }]
        });

        const response = await this.props.handleSearch(this.props.address);

        this.setState({
            suggestions: this.transformCompleteRequest(response)
        });
    };

    clearResults = () => {
        this.setState({
            suggestions: []
        });
    };

    handleChange = (event) => {
        const { target } = event;
        this.props.handleChange(target.value);
    };

    /**
     * Render with a text input or a select input, depending on whether default addresses have been supplied
     *
     * @returns {object}
     */
    renderInput() {
        // Not using InputContainer so that autoComplete can be added as an attribute, without a large rewrite of the entire component
        // The value for autoComplete, "nope", is required because it's an obviously incorrect value, which will break autocomplete
        // in the browser, whereas "off" is an accepted value, but it doesn't actually do what it says.
        return (
            <Fragment>
                <input
                    id={this.props.id}
                    name={this.props.name}
                    type="text"
                    onChange={this.handleChange}
                    autoComplete="nope"
                    value={this.props.address}
                    placeholder={this.props.placeholder}
                />
                <label htmlFor={this.props.id}>
                    {this.props.label}
                </label>
            </Fragment>
        );
    }

    render() {
        return (
            <div className="autocomplete-container">
                {this.renderInput()}
                <AutoComplete
                    suggestions={this.state.suggestions}
                    onClick={this.clickResult}
                />
            </div>
        );
    }

}

AutoCompleteAddressContainer.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    handleSearch: PropTypes.func.isRequired,
    handleClick: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    minCharacters: PropTypes.number,
    transformCompleteRequest: PropTypes.func,
    /** Set this prop if the value of the input will change once a suggested value is selected */
    willUpdateValue: PropTypes.bool
};

AutoCompleteAddressContainer.defaultProps = {
    label: 'Address',
    willUpdateValue: false
};

export default AutoCompleteAddressContainer;
